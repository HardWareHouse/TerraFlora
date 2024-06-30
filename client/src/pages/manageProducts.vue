<template>
  <Breadcrumbs/>
    <div class="container mx-auto py-8">
      <h2 class="text-3xl font-bold text-center mb-4">Gestion des Produits</h2>
      <div class="mb-8">
        <button @click="openCreateProductModal" class="bg-blue-500 text-white px-4 py-2 rounded">Ajouter un Produit</button>
      </div>
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="py-2 px-4 border">Nom</th>
            <th class="py-2 px-4 border">Prix</th>
            <th class="py-2 px-4 border">Stock</th>
            <th class="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td class="py-2 px-4 border">{{ product.nom }}</td>
            <td class="py-2 px-4 border">{{ product.prix }}</td>
            <td class="py-2 px-4 border">{{ product.stock }}</td>
            <td class="py-2 px-4 border">
              <button @click="openEditProductModal(product)" class="bg-yellow-500 text-white px-4 py-2 rounded mr-2">Éditer</button>
              <button @click="deleteProduct(product.id)" class="bg-red-500 text-white px-4 py-2 rounded">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
      <ProductModal v-if="showModal" :product="currentProduct" @close="closeModal" @save="fetchProducts" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import ProductModal from '../components/manageProducts/ProductModal.vue'
  import Breadcrumbs from '../components/manageProducts/Breadcrumbs.vue';
  
  const products = ref([]);
  const showModal = ref(false);
  const currentProduct = ref(null);
  
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/product');
      products.value = response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  const openCreateProductModal = () => {
    currentProduct.value = null;
    showModal.value = true;
  };
  
  const openEditProductModal = (product) => {
    currentProduct.value = product;
    showModal.value = true;
  };
  
  const closeModal = () => {
    showModal.value = false;
  };
  
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/product/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  
  onMounted(() => {
    fetchProducts();
  });
  </script>
  
  <style scoped>
  .container {
    max-width: 1200px;
  }
  </style>
  