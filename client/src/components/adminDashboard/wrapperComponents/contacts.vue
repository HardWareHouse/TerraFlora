<template>
    <div class="container mx-auto p-4">
      <h1 class="text-xl font-semibold text-gray-800 mb-4">Messages reçus</h1>
      <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="message in messages" :key="message.id" class="bg-white shadow-md rounded-lg overflow-hidden">
          <div class="px-6 py-4">
            <div class="text-medium font-semibold mb-2">{{ message.subject }}</div>
            <p class="text-gray-700 text-base">{{ message.body }}</p>
            <div class="mt-4 flex justify-between items-center">
              <span class="text-gray-600 text-sm">{{ formatDate(message.createdAt) }}</span>
              <button @click="deleteMessage(message.id)" class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const messages = ref([
    {
      id: 1,
      subject: 'Nouveau message de support',
      body: 'Bonjour, j\'ai un problème avec mon compte.',
      createdAt: new Date('2023-07-12T09:30:00')
    },
    {
      id: 2,
      subject: 'Demande d\'informations',
      body: 'Pouvez-vous me fournir plus de détails sur vos services ?',
      createdAt: new Date('2023-07-11T15:45:00')
    },
    {
      id: 3,
      subject: 'Feedback sur le site',
      body: 'J\'adore votre nouvelle fonctionnalité !',
      createdAt: new Date('2023-07-10T11:20:00')
    }
  ]);
  
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(date).toLocaleDateString('fr-FR', options);
  };
  
  const deleteMessage = (id) => {
    messages.value = messages.value.filter(message => message.id !== id);
  };
  </script>
  
  <style scoped>
  </style>
  