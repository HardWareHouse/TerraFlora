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
                <button v-if="contact.isResponded == false" @click="openReplyModal(contact)" class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Répondre
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ReplyModal v-if="showReplyModal" :isVisible="showReplyModal" :contact="selectedContact" @close="closeReplyModal" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useContact } from '../../../composables/useContact';
import ReplyModal from './contactsComponents/replyContactsModal.vue'

const { contacts, loading, fetchContacts } = useContact();
const allOrders = ref([]);
const showReplyModal = ref(false);
const selectedContact = ref(null);

onMounted(async () => {
  fetchContacts().then(() => {
    allOrders.value = contacts.value;
  });
});

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return new Date(date).toLocaleDateString('fr-FR', options);
};

const openReplyModal = (contact) => {
  selectedContact.value = contact;
  showReplyModal.value = true;
};

const closeReplyModal = () => {
  showReplyModal.value = false;
  selectedContact.value = null;
};
</script>

<style scoped>
</style>
