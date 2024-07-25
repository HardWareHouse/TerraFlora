<template>
  <div v-if="isVisible" class="fixed z-50 inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4 py-8">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-900 opacity-50"></div>
      </div>
      <div class="relative bg-white rounded-lg shadow-xl transform transition-all sm:max-w-lg w-full p-6">
        <div class="flex items-start justify-between">
          <h3 class="text-xl font-semibold text-gray-800">Répondre à {{ contact.user.nom }} {{ contact.user.prenom }}</h3>
          <button @click="close" class="text-gray-400 hover:text-gray-600">
            <span class="sr-only">Close</span>
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <div class="mt-4">
          <div class="mb-4">
            <label for="subject" class="block text-sm font-medium text-gray-700">Sujet</label>
            <input v-model="localContact.subject" id="subject" type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" disabled>
          </div>
          <div class="mb-4">
            <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
            <textarea v-model="localContact.message" id="message" rows="4" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none" disabled></textarea>
          </div>
          <div class="mb-4">
            <label for="response" class="block text-sm font-medium text-gray-700">Votre réponse</label>
            <textarea v-model="response" id="response" rows="4" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none"></textarea>
          </div>
        </div>
        <div class="mt-6 flex justify-end space-x-3">
          <button @click="close" class="inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Annuler
          </button>
          <button @click="sendResponse" class="inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Envoyer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useContact } from '../../../../composables/useContact';

const { replyToContact } = useContact();


const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  contact: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['close']);

const localContact = ref({ ...props.contact });
const response = ref('');

const close = () => {
  emit('close');
};

const sendResponse = () => {
  replyToContact(localContact.value.id, {response: response.value});
  close();
};

watch(
  () => props.contact,
  (newContact) => {
    localContact.value = { ...newContact };
  }
);
</script>

<style scoped>
.fixed.z-50 {
  z-index: 50;
}
</style>
