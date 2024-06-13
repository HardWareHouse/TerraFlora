<template>
  <div class="container">
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col.key" @click="col.sortable ? () => sortColumn(col.key) : null"
                class="py-2 px-4 bg-red-600 text-white text-left cursor-pointer">
              {{ col.label }}
              <span v-if="sortKey === col.key">
                {{ sortOrder === 'asc' ? '▲' : '▼' }}
              </span>
              <div v-if="col.searchable">
                <input v-model="col.searchQuery" type="text" placeholder="Search..."
                       class="border rounded px-2 py-1 text-black" />
              </div>
            </th>
            <th class="py-2 px-4 bg-red-600 text-white text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in paginatedData" :key="row.id" class="border-2">
            <td class="py-2 px-4 ">
              <img :src="row.images" class="w-24 h-24 object-cover" />
            </td>
            <td class="py-2 px-4 border-x-2">
              {{ row.product }}
            </td>
            <td class="py-2 px-4 border-x-2">
              {{ row.price }}
            </td>
            <td class="py-2 px-4">
              <button @click="updateQuantity(row.id, row.quantity - 1)" class="px-2 py-1 text-black">-</button>
              <span class="px-2">{{ row.quantity }}</span>
              <button @click="updateQuantity(row.id, row.quantity + 1)" class="px-2 py-1 text-black">+</button>
            </td>
            <td class="py-2 px-4 border-x-2">
              {{ row.price * row.quantity }}
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
      <button @click="prevPage" :disabled="currentPage === 1"
              class="px-2 py-1 border rounded mr-2">
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages"
              class="px-2 py-1 border rounded ml-2">
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  data: Array,
  columns: Array
});

const sortKey = ref('');
const sortOrder = ref('asc');
const currentPage = ref(1);
const itemsPerPage = ref(5);

const sortedData = computed(() => {
  if (!sortKey.value) return props.data;

  return [...props.data].sort((a, b) => {
    let result = 0;
    if (a[sortKey.value] > b[sortKey.value]) result = 1;
    if (a[sortKey.value] < b[sortKey.value]) result = -1;
    return sortOrder.value === 'asc' ? result : -result;
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
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const removeItem = (id) => {
  const index = props.data.findIndex(item => item.id === id);
  if (index !== -1) {
    props.data.splice(index, 1);
  }
};

const updateQuantity = (id, quantity) => {
  if (quantity < 1) return;
  const index = props.data.findIndex(item => item.id === id);
  if (index !== -1) {
    props.data[index].quantity = quantity;
  }
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
