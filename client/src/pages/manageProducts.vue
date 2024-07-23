<template>
  <Breadcrumbs />
  <div class="container mx-auto py-8">
    <div class="mb-8 flex justify-between items-center">
      <button
        @click="openCreateProductModal"
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Ajouter un Produit
      </button>
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
          <td class="py-2 px-4 border">
            {{ product.nom }}
          </td>
          <td class="py-2 px-4 border">{{ product.prix }}</td>
          <td class="py-2 px-4 border">{{ product.stock }}</td>
          <td class="py-2 px-4 border">
            <div class="flex space-x-2 justify-center">
              <button
                @click="openEditProductModal(product)"
                class="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                <i class="bi bi-pencil"></i>
              </button>
              <delete-button
                :on-confirm="() => deleteProduct(product.id)"
                button-class="bg-red-500 text-white px-4 py-2 rounded"
                confirmation-message="Êtes-vous sûr de vouloir supprimer ce produit ?"
              >
                <i class="bi bi-trash"></i>
              </delete-button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <ProductModal
      v-if="showModal"
      :product="currentProduct"
      @close="closeModal"
      @save="fetchProducts"
    />

    <div class="mt-8 flex items-center">
      <label for="product-select" class="mr-4 font-semibold">Afficher le graphique d'évolution des stocks pour le produit :</label>
      <select id="product-select" v-model="selectedProductId" @change="updateSelectedProduct" class="form-select">
        <option value="" disabled>Choisissez un produit</option>
        <option v-for="product in products" :key="product.id" :value="product.id">{{ product.nom }}</option>
      </select>
    </div>

    <StockChart v-if="selectedProductId" :produitId="selectedProductId" class="mt-8" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import ProductModal from "../components/manageProducts/ProductModal.vue";
import Breadcrumbs from "../components/manageProducts/Breadcrumbs.vue";
import StockChart from "../components/manageProducts/StockChart.vue";
import DeleteButton from "../components/challengesRequirement/deleteButton.vue";

const products = ref([]);
const showModal = ref(false);
const currentProduct = ref(null);
const selectedProductId = ref("");

const fetchProducts = async () => {
  try {
    const response = await axios.get("http://localhost:8000/product");
    products.value = response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
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
    console.error("Error deleting product:", error);
  }
};

const updateSelectedProduct = () => {
  // Trigger la méthode fetchStockHistory dans le composant StockChart via le watcher
};

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}

.form-select {
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}
</style>
