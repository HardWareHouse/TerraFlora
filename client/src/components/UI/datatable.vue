<template>
  <div class="w-full">
    <div class="container overflow-x-auto">
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col.key" class="py-2 px-4 bg-red-600 text-white text-left cursor-pointer">
              <div @click="sortColumn(col.key)">
                {{ col.label }}
                <span class="ml-4 w-12">{{ sortIndicator(col.key) }}</span>
              </div>
              <div v-if="col.searchable">
                <input  type="text" placeholder="Rechercher..." class="border rounded px-2 py-1 text-black" @input="currentPage = 1" />
              </div>
            </th>
            <th class="py-2 px-4 bg-red-600 text-white text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in paginatedData" :key="row.id" class="border-2">
            <td class="py-2 px-4">
              <img :src="getImageUrl(row.Images[0]?.imageUrl)" class="w-24 h-24 object-cover" v-if="row.Images && row.Images.length > 0" />
              <img src="/images/flower.webp" class="w-24 h-24 object-cover" v-else />
            </td>
            <td class="py-2 px-4 border-x-2">{{ row.nom }}</td>
            <td class="py-2 px-4 border-x-2">{{ row.prix }}</td>
            <td class="py-2 px-4">
              <button @click="updateQuantity(row.id, row.Panier_Produits.quantity - 1, row.stock)" class="px-2 py-1 text-black">-</button>
              <span class="px-2">{{ row.Panier_Produits.quantity }}</span>
              <button @click="updateQuantity(row.id, row.Panier_Produits.quantity + 1, row.stock)" class="px-2 py-1 text-black">+</button>
            </td>
            <td class="py-2 px-4 border-x-2">{{ (row.prix * row.Panier_Produits.quantity).toFixed(2) }}</td>
            <td class="py-2 px-4">
              <button @click="removeItem(row.id)" class="text-red-600">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="container flex justify-between items-center mt-6">
      <button @click="prevPage" v-if="totalPages > 0 && currentPage < totalPages" :disabled="currentPage === 1" class="px-2 py-1 border rounded mr-2">
        Précédent
      </button>
      <span class="flex items-center w-full justify-center">Page {{ currentPage }} sur {{ totalPages }}</span>
      <button v-if="totalPages > 1 && currentPage < totalPages" @click="nextPage" class="px-2 py-1 border rounded ml-2">
        Suivant
      </button>
    </div>
    <div class="mt-4 container w-full flex justify-between" v-if="showCSVButton">
      <button @click="exportToCSV" class="px-4 py-2 bg-green-500 text-white rounded">Exporter en CSV</button>
      <button @click="reserveCart" class="px-4 py-2 bg-blue-500 text-white rounded">Réserver le panier pour 15 min </button>
      
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useCartStore } from '../../pinia/cart.js';
import instance from '../../axios.js';

const props = defineProps({
  data: Array,
  columns: Array,
  showCSVButton: {
    type: Boolean,
    default: true
  }
});

const cartStore = useCartStore();

const sortKey = ref('');
const sortOrder = ref(false);
const currentPage = ref(1);
const itemsPerPage = ref(5);

const reserveCart = async () => {
  try {
    const response = await instance.post('cart/reserve', {
      userId: cartStore.userId
    });
    alert('Panier réservé avec succès!');
  } catch (error) {
    console.error('Error reserving cart:', error);
    alert('Erreur lors de la réservation du panier.');
  }
};

// Initialiser searchQuery pour chaque colonne
props.columns.forEach(col => {
  if (col.searchable) {
    col.searchQuery = ref('');
  }
});

const sortedData = computed(() => {
  if (!sortKey.value) return props.data;

  return [...props.data].sort((a, b) => {
    let valA = a[sortKey.value];
    let valB = b[sortKey.value];

    if (typeof valA === 'string' && typeof valB === 'string') {
      return sortOrder.value ? valA.localeCompare(valB) : valB.localeCompare(valA);
    } else {
      return sortOrder.value ? valA - valB : valB - valA;
    }
  });
});

const filteredData = computed(() => {
  return sortedData.value.filter(row =>
    props.columns.every(col => {
      if (!col.searchable || !col.searchQuery.value) return true;
      const searchQuery = col.searchQuery.value.toLowerCase();
      const value = row[col.key];
      return value && String(value).toLowerCase().includes(searchQuery);
    })
  );
});

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / itemsPerPage.value);
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredData.value.slice(start, end);
});

const sortIndicator = computed(() => {
  return (column) => {
    if (sortKey.value === column) {
      return sortOrder.value ? '▲' : '▼';
    }
    return '';
  };
});

const sortColumn = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = !sortOrder.value;
  } else {
    sortKey.value = key;
    sortOrder.value = true;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const removeItem = (id) => {
  cartStore.removeItem(id);
};

const updateQuantity = (id, quantity, stock) => {
  if (quantity >= 1 && quantity <= stock) {
    cartStore.updateQuantity(id, quantity);
  }
};

const exportToCSV = () => {
  const rows = filteredData.value;
  if (rows.length === 0) return;

  const csvContent = [
    props.columns.map(col => col.label).join(','), 
    ...rows.map(row => props.columns.map(col => row[col.key]).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'data.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return '/images/flower.webp';
  }
  return import.meta.env.VITE_API_URL + `uploads/${imagePath}`;
};

watch(() => props.data, () => {
  currentPage.value = 1;
});

watch(
  () => props.columns.flatMap(col => col.searchQuery),
  () => {
    currentPage.value = 1;
  },
  { deep: true }
);
</script>

<style scoped>
th {
  cursor: pointer;
}
.container {
  max-width: 1400px;
  margin: 10px auto;
}
</style>