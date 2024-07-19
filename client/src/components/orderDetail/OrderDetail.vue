<template>
    <div class="container p-6">
      <h3 class="text-2xl font-medium mb-4">Détails de la Commande</h3>
      <div>
        <div class="mb-6" v-if="order">
          <h4 class="text-lg font-medium">Informations de Commande</h4>
          <p>Numéro de Commande: <strong>{{ order.numero }}</strong></p>
          <p>Date de Commande: <strong>{{ formatDate(order.dateCommande) }}</strong></p>
          <div v-if="order.deliveryAddress">
            <h4 class="text-lg font-medium mt-4">Adresse de Livraison</h4>
            <p>{{ order.deliveryAddress }}</p>
            <div id="map"></div>
          </div>
        </div>
        
        <div class="mb-6" v-if="order && order.items">
          <h4 class="text-lg font-medium">Articles Commandés</h4>
          <table class="min-w-full border border-gray-200 text-center">
            <thead>
              <tr class="bg-gray-100">
                <th class="px-4 py-2 border border-gray-200">Produit</th>
                <th class="px-4 py-2 border border-gray-200">Quantité</th>
                <th class="px-4 py-2 border border-gray-200">Prix</th>
                <th class="px-4 py-2 border border-gray-200">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in order.items" :key="item.id">
                <td class="p-4 border border-gray-200">{{ item.name }}</td>
                <td class="p-4 border border-gray-200">{{ item.quantity }}</td>
                <td class="p-4 border border-gray-200">{{ item.price }} €</td>
                <td class="p-4 border border-gray-200">{{ (item.price * item.quantity).toFixed(2) }} €</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="text-right font-medium text-xl" v-if="order">
          <p>Total de la Commande: {{ order.total }} €</p>
        </div>
  
        <!-- Tracking Information Section -->
        <div class="mt-6">
          <h4 class="text-lg font-medium">Informations de Suivi</h4>
          <p v-if="trackingInfo">Statut: <strong>{{ trackingInfo.shipment.product }}</strong></p>
          <p v-if="trackingInfo">Dernière mise à jour: <strong>{{ formatDate(trackingInfo.shipment.deliveryDate) }}</strong></p>
          <ul v-if="trackingInfo">
                    <li v-for="event in trackingInfo.shipment.timeline" :key="event.date">
                        <p>{{ isValidDate(event.date) }} - {{ event.shortLabel }}</p>
                    </li>
                </ul>
        </div>
        
        <div class="mt-6">
          <button @click="contactSupport" class="bg-red-600 text-white px-4 py-2 rounded">
            Contacter le Support
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useOrder } from '../../composables/useOrder.js';
  import { useRouter } from 'vue-router';
  import axios from 'axios';

  
  const router = useRouter();
  
  const route = useRoute();
  const myOrder = ref(null);
  const { fetchOrderById, order } = useOrder();
  
  const trackingInfo = ref(null);
  
  const formatDate = (date) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
  };
  
  const contactSupport = () => {
      router.push(`/dashboard#contact`);
  };

  const isValidDate = (date) => {
    const parsedDate = Date.parse(date);
    return isNaN(parsedDate) ? "Aucune infos sur la date" : new Date(parsedDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
};
  
  const getTrackingInfo = async () => {
      try {
          const response = await axios.get(`https://api.laposte.fr/suivi/v2/idships/${order.value.trackingNumber}`, {
              headers: {
                  'Accept': 'application/json',
                  'X-Okapi-Key': `${import.meta.env.VITE_LA_POSTE_API_KEY}`,
              },
          });
          console.log(response.data);   
          trackingInfo.value = response.data;
      } catch (error) {
          console.error('Error fetching tracking info:', error);
      }
  };
  
  onMounted(async () => {
      const orderId = route.params.id;
      if (orderId) {
          try {
              await fetchOrderById(orderId);
              myOrder.value = order.value;
              if (myOrder.value.trackingNumber) {
                  await getTrackingInfo(myOrder.value.trackingNumber);
              }
            } catch (error) {
                console.error('Erreur lors de la récupération de la commande:', error);
            }
      }
  });
  </script>
  
  <style scoped>
  #map {
      height: 200px;
      width: 100%;
      background-color: #e5e5e5;
      margin-top: 1rem;
  }
  .container {
    max-width: 1200px;
  }
  </style>
  