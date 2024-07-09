<template>
  <div class="product-detail-container max-w-7xl mx-auto py-8">
    <div class="flex flex-col lg:flex-row">
      <div class="product-images lg:w-1/2 p-4">
        <img
          :src="getImageUrl(product.Images[0]?.imageUrl)"
          alt="Product Image"
          class="w-full h-96 object-cover rounded"
          v-if="product.Images && product.Images.length > 0"
        />
      </div>
      <div class="product-info lg:w-1/2 p-4">
        <h1 class="text-3xl font-bold mb-4">{{ product.nom }}</h1>
        <div class="flex items-center mb-4">
          <div class="text-yellow-500 mr-2">
            <i class="bi bi-star text-gray-300" v-for="n in 5" :key="n"></i>
          </div>
          <span class="text-gray-500">0 Reviews</span>
        </div>
        <div class="flex items-center mb-4">
          <span class="text-2xl font-bold text-red-600 mr-2"
            >${{ product.prix }}</span
          >
          <span v-if="product.isPromotion" class="line-through text-gray-500"
            >${{
              (
                product.prix /
                ((100 - product.pourcentagePromotion) / 100)
              ).toFixed(2)
            }}</span
          >
        </div>
        <div class="mb-4 text-green-600 font-semibold">
          {{ product.stock }} IN STOCK
        </div>
        <p class="mb-4">{{ product.description }}</p>
        <div class="mb-4">
          <div>
            <label class="block text-gray-700">Taille:</label>
            <span>{{ product.taille }}</span>
          </div>
          <div class="mt-4">
            <label class="block text-gray-700">Couleur:</label>
            <span>{{ product.couleur }}</span>
          </div>
        </div>
        <div class="flex items-center mb-4">
          <div class="quantity flex items-center mr-4">
            <button class="px-4 py-2 bg-gray-200" @click="decreaseQuantity">
              -
            </button>
            <input
              type="text"
              v-model="quantity"
              class="w-12 text-center border-t border-b"
            />
            <button class="px-4 py-2 bg-gray-200" @click="increaseQuantity">
              +
            </button>
          </div>
          <button
            class="px-4 py-2 bg-red-600 text-white rounded"
            @click="addToCart"
          >
            Add To Cart
          </button>
        </div>
        <button class="px-4 py-2 border rounded" @click="addToWishlist">
          Add to Wishlist
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "../../pinia/cart.js";
import axios from "axios";

const route = useRoute();
const product = ref({
  nom: "",
  description: "",
  prix: 0,
  stock: 0,
  marque: "",
  couleur: "",
  taille: "",
  isPromotion: false,
  pourcentagePromotion: 0,
  categorieId: "",
  Images: [],
});
const quantity = ref(1);
const cartStore = useCartStore();

onMounted(async () => {
  const productId = route.params.id;
  try {
    const response = await axios.get(
      `http://localhost:8000/product/${productId}`
    );
    product.value = response.data;

    // Transformation de l'URL de l'image
    if (product.value.Images && product.value.Images.length > 0) {
      product.value.Images = product.value.Images.map((image) => ({
        ...image,
        imageUrl: `http://localhost:8000/uploads/${image.imageUrl.split("/").pop()}`,
      }));
    }
  } catch (error) {
    console.error("Error fetching product:", error);
  }
});

const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return "/images/default.jpg";
  }
  return `http://localhost:8000/uploads/${imagePath.split("/").pop()}`;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) quantity.value--;
};

const increaseQuantity = () => {
  quantity.value++;
};

const addToCart = () => {
  cartStore.addToCart(product.value, quantity.value);
  console.log(`Added ${quantity.value} ${product.value.nom} to cart`);
};

const addToWishlist = () => {
  console.log(`Added ${product.value.nom} to wishlist`);
};
</script>

<style scoped>
.product-detail-container {
  max-width: 1200px;
  margin: 0 auto;
}

.breadcrumbs a {
  color: #f56565;
  text-decoration: none;
}

.breadcrumbs span {
  color: #718096;
}
</style>
