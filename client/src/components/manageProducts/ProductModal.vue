<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
  >
    <div class="bg-white p-6 rounded shadow-lg w-full max-w-4xl">
      <h2 class="text-2xl font-bold mb-4">
        {{ product ? "Éditer le Produit" : "Ajouter un Produit" }}
      </h2>
      <form @submit.prevent="saveProduct">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="mb-4">
            <label for="nom" class="block text-sm font-medium">Nom</label>
            <input
              type="text"
              id="nom"
              v-model="form.nom"
              required
              class="mt-1 p-2 border rounded-md w-full bg-gray-100"
            />
          </div>
          <div class="mb-4 md:col-span-2">
            <label for="description" class="block text-sm font-medium"
              >Description</label
            >
            <textarea
              id="description"
              v-model="form.description"
              class="mt-1 p-2 border rounded-md w-full bg-gray-100"
            ></textarea>
          </div>
          <div class="mb-4">
            <label for="prix" class="block text-sm font-medium">Prix</label>
            <input
              type="number"
              id="prix"
              v-model="form.prix"
              step="0.01"
              required
              class="mt-1 p-2 border rounded-md w-full bg-gray-100"
            />
          </div>
          <div class="mb-4">
            <label for="stock" class="block text-sm font-medium">Stock</label>
            <input
              type="number"
              id="stock"
              v-model="form.stock"
              required
              class="mt-1 p-2 border rounded-md w-full bg-gray-100"
            />
          </div>
          <div class="mb-4">
            <label for="marque" class="block text-sm font-medium">Marque</label>
            <select
              id="marque"
              v-model="form.marque"
              required
              class="mt-1 p-2 border rounded-md w-full bg-gray-100"
            >
              <option value="">Sélectionner une marque</option>
              <option value="Fleurs de joie">Fleurs de joie</option>
              <option value="Éclat floral">Éclat floral</option>
              <option value="Les jardins épanouis">Les jardins épanouis</option>
              <option value="Boutique florale">Boutique florale</option>
              <option value="Pétales d'amour">Pétales d'amour</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="couleur" class="block text-sm font-medium"
              >Couleur</label
            >
            <select
              id="couleur"
              v-model="form.couleur"
              required
              class="mt-1 p-2 border rounded-md w-full bg-gray-100"
            >
              <option value="">Sélectionner une couleur</option>
              <option value="Noir">Noir</option>
              <option value="Rouge">Rouge</option>
              <option value="Bleu">Bleu</option>
              <option value="Vert">Vert</option>
              <option value="Rose">Rose</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="taille" class="block text-sm font-medium">Taille</label>
            <select
              id="taille"
              v-model="form.taille"
              required
              class="mt-1 p-2 border rounded-md w-full bg-gray-100"
            >
              <option value="">Sélectionner une taille</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>
          <div class="mb-4 flex items-center">
            <label for="isPromotion" class="block text-sm font-medium mr-2"
              >Promotion</label
            >
            <input
              type="checkbox"
              id="isPromotion"
              v-model="form.isPromotion"
              class="mt-1 p-2 border rounded-md bg-gray-100"
            />
          </div>
          <div class="mb-4" v-if="form.isPromotion">
            <label for="pourcentagePromotion" class="block text-sm font-medium"
              >Pourcentage de Promotion</label
            >
            <input
              type="number"
              id="pourcentagePromotion"
              v-model="form.pourcentagePromotion"
              required
              class="mt-1 p-2 border rounded-md w-full bg-gray-100"
            />
          </div>
          <div class="mb-4">
            <label for="categorieId" class="block text-sm font-medium"
              >Catégorie</label
            >
            <select
              id="categorieId"
              v-model="form.categorieId"
              required
              class="mt-1 p-2 border rounded-md w-full bg-gray-100"
            >
              <option value="">Sélectionner une catégorie</option>
              <option
                v-for="categorie in categories"
                :value="categorie.id"
                :key="categorie.id"
              >
                {{ categorie.nom }}
              </option>
            </select>
          </div>
          <div class="mb-4 md:col-span-2">
            <label for="images" class="block text-sm font-medium">Images</label>
            <input
              type="file"
              id="images"
              @change="handleFileUpload"
              multiple
              class="mt-1 p-2 border rounded-md w-full bg-gray-100"
            />
          </div>
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            @click="closeModal"
            class="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Annuler
          </button>
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "axios";

const props = defineProps({
  product: Object,
});
const emit = defineEmits(["close", "save"]);

const form = ref({
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
});

const categories = ref([]);
const images = ref([]);

watch(
  () => props.product,
  (newVal) => {
    if (newVal) {
      form.value = { ...newVal };
    } else {
      form.value = {
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
      };
    }
  },
  { immediate: true }
);

const fetchCategories = async () => {
  try {
    const response = await axios.get("http://localhost:8000/categories");
    categories.value = response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

const handleFileUpload = (event) => {
  images.value = Array.from(event.target.files);
};

const saveProduct = async () => {
  try {
    const formData = new FormData();
    Object.keys(form.value).forEach((key) => {
      formData.append(key, form.value[key]);
    });
    images.value.forEach((image, index) => {
      formData.append("images", image);
    });
    if (props.product) {
      await axios.put(
        `http://localhost:8000/product/${props.product.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } else {
      const response = await axios.post(
        "http://localhost:8000/stripe/create-product",
        form.value
      );
      const priceId = response.data.priceId;

      await axios.post("http://localhost:8000/product", formData, priceId, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }
    emit("save");
    emit("close");
  } catch (error) {
    console.error("Error saving product:", error);
  }
};

const closeModal = () => {
  emit("close");
};

onMounted(() => {
  fetchCategories();
});
</script>

<style scoped>
.fixed {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
