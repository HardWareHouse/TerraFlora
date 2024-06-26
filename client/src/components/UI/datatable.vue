<template>
  <div class="container">
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col.key"
                class="py-2 px-4 bg-red-600 text-white text-left cursor-pointer">
              {{ col.label }}
              <span v-if="sortOrder == true" class="ml-4 w-12" @click="sortColumn(col.key)">
                 ▲
              </span>
              <span v-if="sortOrder == false" class="ml-4 w-12" @click="sortColumn(col.key)">
                 ▼
              </span>
              <div v-if="col.searchable">
                <input v-model="col.searchQuery" type="text" placeholder="Rechercher..."
                       class="border rounded px-2 py-1 text-black" />
              </div>
            </th>
            <th class="py-2 px-4 bg-red-600 text-white text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in paginatedData" :key="row.id" class="border-2">
            <td class="py-2 px-4">
              <img :src="row.image || '/images/flower.webp'" class="w-24 h-24 object-cover" />
            </td>
            <td class="py-2 px-4 border-x-2">
              {{ row.nom }}
            </td>
            <td class="py-2 px-4 border-x-2">
              {{ row.prix }}
            </td>
            <td class="py-2 px-4">
              <button @click="updateQuantity(row.id, row.quantity - 1)" class="px-2 py-1 text-black">-</button>
              <span class="px-2">{{ row.quantity }}</span>
              <button @click="updateQuantity(row.id, row.quantity + 1)" class="px-2 py-1 text-black">+</button>
            </td>
            <td class="py-2 px-4 border-x-2">
              {{ (row.prix * row.quantity).toFixed(2) }}
            </td>
            <td class="py-2 px-4">
              <button @click="removeItem(row.id)" class="text-red-600">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex justify-between items-center mt-4 w-full">
      <button @click="prevPage" :disabled="currentPage.value === 1"
              class="px-2 py-1 border rounded mr-2">
        Précédent
      </button>
      <span>Page {{ currentPage.value }} sur {{ totalPages.value }}</span>
      <button v-if="currentPage.value < totalPages.value" @click="nextPage" 
              class="px-2 py-1 border rounded ml-2">
        Suivant
      </button>
    </div>
    <div class="mt-4" v-if="showCSVButton">
      <button @click="exportToCSV" class="px-4 py-2 bg-green-500 text-white rounded">Exporter en CSV</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useCartStore } from '../../pinia/cart.js';

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
const itemsPerPage = ref(4);

const sortedData = computed(() => {
  if (!sortKey.value) return props.data;

  return [...props.data].sort((a, b) => {
    const valA = a[sortKey.value];
    const valB = b[sortKey.value];

    if (typeof valA === 'string') {
      return (sortOrder.value === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA));
    }
    return (sortOrder.value === 'asc' ? valA - valB : valB - valA);
  });
});

const filteredData = computed(() => {
  return sortedData.value.filter(row =>
    props.columns.every(col =>
      col.searchQuery ? String(row[col.key]).toLowerCase().includes(col.searchQuery.toLowerCase()) : true
    )
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

const sortColumn = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = !sortOrder.value;
  } else {
    sortKey.value = key;
    sortOrder.value = false;
  }
  console.log("Sort Key: " + sortKey.value);
  console.log("Sort Order: " + sortOrder.value);
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

const updateQuantity = (id, quantity) => {
  cartStore.updateQuantity(id, quantity);
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

watch(() => props.data, () => {
  currentPage.value = 1;
});
</script>

<style scoped>
th {
  cursor: pointer;
}
</style>
