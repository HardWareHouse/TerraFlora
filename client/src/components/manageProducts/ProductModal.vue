<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
  >
    <div class="bg-white p-6 rounded shadow-lg w-full max-w-4xl">
      <h2 class="text-2xl font-bold mb-4">
        {{ product ? "Éditer le Produit" : "Ajouter un Produit" }}
      </h2>
      <form @submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="mb-4">
            <label for="nom" class="block text-sm font-medium">Nom</label>
            <input
              type="text"
              id="nom"
              v-model="form.nom"
              @input="handleChange('nom', $event.target.value)"
              required
              class="mt-1 p-2 border rounded-md w-full bg-gray-100"
            />
            <span class="text-red-500 text-sm">{{ errors.nom }}</span>
          </div>
          <div class="mb-4 md:col-span-2">
            <label for="description" class="block text-sm font-medium">Description</label>
            <textarea
              id="description"
              v-model="form.description"
              @input="handleChange('description', $event.target.value)"
              class="mt-1 p-2 border rounded-md w-full bg-gray-100"
            ></textarea>
            <span class="text-red-500 text-sm">{{ errors.description }}</span>
          </div>
          <div class="mb-4">
            <label for="prix" class="block text-sm font-medium">Prix</label>
            <input
              type="number"
              id="prix"
              v-model="form.prix"
              @input="handleChange('prix', parseFloat($event.target.value))"
              step="0.01"
              required
              class="mt-1 p-2 border rounded-md w-full bg-gray-100"
            />
            <span class="text-red-500 text-sm">{{ errors.prix }}</span>
          </div>
          <div class="mb-4">
            <label for="stock" class="block text-sm font-medium">Stock</label>
            <input
              type="number"
              id="stock"
              v-model="form.stock"
              @input="handleChange('stock', parseInt($event.target.value, 10))"
              required
              class="mt-1 p-2 border rounded-md w-full bg-gray-100"
            />
            <span class="text-red-500 text-sm">{{ errors.stock }}</span>
          </div>
          <div class="mb-4">
            <label for="stockThreshold" class="block text-sm font-medium">Seuil de Stock</label>
            <input
              type="number"
              id="stockThreshold"
              v-model="form.stockThreshold"
              @input="handleChange('stockThreshold', parseInt($event.target.value, 10))"
              required
              class="mt-1 p-2 border rounded-md w-full bg-gray-100"
            />
            <span class="text-red-500 text-sm">{{ errors.stockThreshold }}</span>
          </div>
          <div class="mb-4">
            <label for="marque" class="block text-sm font-medium">Marque</label>
            <select
              id="marque"
              v-model="form.marque"
              @change="handleChange('marque', $event.target.value)"
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
            <span class="text-red-500 text-sm">{{ errors.marque }}</span>
          </div>
          <div class="mb-4">
            <label for="couleur" class="block text-sm font-medium">Couleur</label>
            <select
              id="couleur"
              v-model="form.couleur"
              @change="handleChange('couleur', $event.target.value)"
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
            <span class="text-red-500 text-sm">{{ errors.couleur }}</span>
          </div>
          <div class="mb-4">
            <label for="taille" class="block text-sm font-medium">Taille</label>
            <select
              id="taille"
              v-model="form.taille"
              @change="handleChange('taille', $event.target.value)"
              required
              class="mt-1 p-2 border rounded-md w-full bg-gray-100"
            >
              <option value="">Sélectionner une taille</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
            <span class="text-red-500 text-sm">{{ errors.taille }}</span>
          </div>
          <div class="mb-4 flex items-center">
            <label for="isPromotion" class="block text-sm font-medium mr-2">Promotion</label>
            <input
              type="checkbox"
              id="isPromotion"
              v-model="form.isPromotion"
              @change="handleChange('isPromotion', $event.target.checked)"
              class="mt-1 p-2 border rounded-md bg-gray-100"
            />
          </div>
          <div class="mb-4" v-if="form.isPromotion">
            <label for="pourcentagePromotion" class="block text-sm font-medium">Pourcentage de Promotion</label>
            <input
              type="number"
              id="pourcentagePromotion"
              v-model="form.pourcentagePromotion"
              @input="handleChange('pourcentagePromotion', parseFloat($event.target.value))"
              required
              class="mt-1 p-2 border rounded-md w-full bg-gray-100"
            />
            <span class="text-red-500 text-sm">{{ errors.pourcentagePromotion }}</span>
          </div>
          <div class="mb-4">
            <label for="categorieId" class="block text-sm font-medium">Catégorie</label>
            <select
              id="categorieId"
              v-model="form.categorieId"
              @change="handleChange('categorieId', $event.target.value)"
              required
              class="mt-1 p-2 border rounded-md w-full bg-gray-100"
            >
              <option value="">Sélectionner une catégorie</option>
              <option v-for="categorie in categories" :value="categorie.id" :key="categorie.id">
                {{ categorie.nom }}
              </option>
            </select>
            <span class="text-red-500 text-sm">{{ errors.categorieId }}</span>
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
          <button type="button" @click="closeModal" class="bg-gray-500 text-white px-4 py-2 rounded mr-2">
            Annuler
          </button>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded" :disabled="isSubmitting">
            Enregistrer
          </button>
        </div>
        <div v-if="serverError" class="text-red-500 mt-4">{{ serverError }}</div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';
import { z } from 'zod';
import useForm from '../../composables/useForm.js';

const props = defineProps({
  product: Object,
});
const emit = defineEmits(['close', 'save']);

const initialValues = {
  nom: '',
  description: '',
  prix: 0,
  stock: 0,
  stockThreshold: 5,
  marque: '',
  couleur: '',
  taille: '',
  isPromotion: false,
  pourcentagePromotion: 0,
  categorieId: '',
};

const validationSchema = z.object({
  nom: z.string().max(50, 'Le nom doit avoir au maximum 50 caractères'),
  description: z.string().max(250, 'La description doit avoir au maximum 250 caractères'),
  prix: z.number().min(0, 'Le prix ne peut pas être négatif'),
  stock: z.number().int().min(0, 'Le stock ne peut pas être négatif'),
  stockThreshold: z.number().int().min(0, 'Le seuil de stock ne peut pas être négatif'),
  marque: z.string().nonempty('Veuillez sélectionner une marque'),
  couleur: z.string().nonempty('Veuillez sélectionner une couleur'),
  taille: z.string().nonempty('Veuillez sélectionner une taille'),
  isPromotion: z.boolean(),
  pourcentagePromotion: z.number().min(0, 'Le pourcentage de promotion ne peut pas être négatif').optional(),
  categorieId: z.string().nonempty('Veuillez sélectionner une catégorie'),
});

const onSubmit = async (values) => {
  const formData = new FormData();
  Object.keys(values).forEach((key) => {
    formData.append(key, values[key]);
  });
  images.value.forEach((image) => {
    formData.append('images', image);
  });

  if (props.product) {
    var newPriceId = '';
    if (props.product.prix !== values.prix) {
      const updatePayload = {
        ...props.product,
        prix: values.prix,
      };
      const response = await axios.post('http://localhost:8000/stripe/update-price', updatePayload);
      newPriceId = response.data.newPriceId;
    }

    formData.append('newPriceId', newPriceId);
    await axios.put(`http://localhost:8000/product/${props.product.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } else {
    const response = await axios.post('http://localhost:8000/stripe/create-product', values);
    const priceId = response.data.priceId;
    formData.append('priceId', priceId);

    await axios.post('http://localhost:8000/product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  emit('save');
  emit('close');
};

const {
  form,
  errors,
  isSubmitting,
  serverError,
  handleChange,
  handleSubmit,
  handleAbort,
} = useForm(initialValues, validationSchema, onSubmit);

const categories = ref([]);
const images = ref([]);

watch(
  () => props.product,
  (newVal) => {
    if (newVal) {
      Object.keys(newVal).forEach((key) => {
        if (form.value.hasOwnProperty(key)) {
          form.value[key] = newVal[key];
        }
      });
    } else {
      Object.assign(form.value, initialValues);
    }
  },
  { immediate: true }
);

const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:8000/categories');
    categories.value = response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

const closeModal = () => {
  emit('close');
};

const handleFileUpload = (event) => {
  images.value = Array.from(event.target.files);
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
