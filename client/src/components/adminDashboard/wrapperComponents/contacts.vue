<template>
  <div class="container mx-auto px-4 py-8">
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <div class="px-6 py-4">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Messages reçus</h2>
        
        <div v-if="loading" class="text-center">Chargement des contacts...</div>
        <div v-else-if="allOrders.length === 0" class="text-center">Aucun contact trouvé.</div>
        <div v-else class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="contact in allOrders" :key="contact.id" class="bg-white shadow-md rounded-lg overflow-hidden">
            <div class="px-6 py-4">
              <div class="font-bold text-lg mb-2">{{ contact.user.nom.toUpperCase() }} {{ contact.user.prenom }}</div>
              <div class="text-medium font-semibold mb-2">{{ contact.subject }} : {{ contact.status }}</div>
                <p v-if="contact.message.length > 100" class="text-gray-700 text-base">{{ contact.message.slice(0, 100) }}...</p>
                <p v-else class="text-gray-700 text-base">{{ contact.message }}</p>
              <div class="mt-4 flex justify-between items-center">
                <span class="text-gray-600 text-sm">{{ formatDate(contact.dateContact) }}</span>
                <button @click="deleteMessage(contact.id)" class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useContact } from '../../../composables/useContact';

const { contacts, loading, getAllContacts } = useContact();
const allOrders = ref([]);

onMounted(async () => {
  getAllContacts().then(() => {
    allOrders.value = contacts.value;
  });
});

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return new Date(date).toLocaleDateString('fr-FR', options);
};

const deleteMessage = (id) => {
  allOrders.value = allOrders.value.filter(contact => contact.id !== id);
};
</script>

<style scoped>
</style>
