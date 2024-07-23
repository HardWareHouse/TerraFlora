<template>
  <div>
    <button @click="openModal" :class="buttonClass">
      <slot>Supprimer</slot>
    </button>
    <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div class="bg-white p-6 rounded-lg shadow-lg text-center">
        <p class="mb-4 text-lg">{{ confirmationMessage }}</p>
        <div class="flex justify-center space-x-4">
          <button @click="confirmDelete" :disabled="isLoading" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50">
            Confirmer
          </button>
          <button @click="closeModal" :disabled="isLoading" class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50">
            Annuler
          </button>
        </div>
        <div v-if="isLoading" class="mt-4 text-gray-600">Chargement...</div>
        <div v-if="errorMessage" class="mt-4 text-red-500">{{ errorMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  onConfirm: {
    type: Function,
    required: true,
  },
  buttonClass: {
    type: String,
    default: "",
  },
  confirmationMessage: {
    type: String,
    default: "Êtes-vous sûr de vouloir supprimer cette donnée ?",
  },
});

const isModalOpen = ref(false);
const isLoading = ref(false);
const errorMessage = ref("");

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const confirmDelete = async () => {
  isLoading.value = true;
  try {
    await props.onConfirm();
    isModalOpen.value = false;
  } catch (error) {
    errorMessage.value = "Erreur lors de la suppression. Veuillez réessayer.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
</style>
