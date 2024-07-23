<template>
  <div class="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100">
    <div class="bg-red-100 text-red-600 p-6 rounded-full mb-4">
      <i class="bi bi-x-circle-fill" style="font-size: 3rem;"></i>
    </div>
    <h1 class="text-3xl font-bold mb-4">Paiement annulé</h1>
    <p class="text-gray-600 mb-4">Votre paiement a été annulé ou refusé. Veuillez réessayer plus tard ou contacter notre support.</p>
    <router-link to="/basket" class="px-4 py-2 bg-red-600 text-white rounded">Réessayer le paiement</router-link>
    <router-link to="/" class="px-4 py-2 bg-gray-600 text-white rounded mt-2">Retour à l'accueil</router-link>
  </div>
</template>

<script>
export default {
  name: "CancelPage",
};
</script>
