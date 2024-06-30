<template>
  <div class="p-4 bg-white rounded-lg shadow-md">
    <h3 class="text-xl font-medium border-b border-gray-200 pb-2">Mon compte</h3>
    <div class="mt-4">
      <form action="#">
        <div class="flex flex-wrap -mx-2">
          <div class="w-full lg:w-1/2 px-2 mb-4">
            <label for="first-name" class="block text-sm font-medium text-gray-700 required">Prénom <label class="text-red-600 text-l"><label class="text-red-600 text-l">*</label></label></label>
            <input type="text" id="first-name" class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300  focus:outline-none sm:text-sm" placeholder="Prénom">
          </div>
          <div class="w-full lg:w-1/2 px-2 mb-4">
            <label for="last-name" class="block text-sm font-medium text-gray-700 required">Nom <label class="text-red-600 text-l">*</label></label>
            <input type="text" id="last-name" class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300  focus:outline-none sm:text-sm" placeholder="Nom">
          </div>
        </div>
        <div class="mb-4">
          <label for="display-name" class="block text-sm font-medium text-gray-700 required">Pseudonyme <label class="text-red-600 text-l">*</label></label>
          <input type="text" id="display-name" class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300  focus:outline-none sm:text-sm" placeholder="Pseudonyme">
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700 required">Adresse mail <label class="text-red-600 text-l">*</label></label>
          <input type="email" id="email" class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300  focus:outline-none sm:text-sm" placeholder="Adresse mail">
        </div>
          <label class="text-xl font-medium border-b border-gray-200 pb-2 w-full">Modifier mon mot de passe</label>
          <div class="mb-4 mt-3">
            <label for="current-pwd" class="block text-sm font-medium text-gray-700 required">Mot de passe actuel <label class="text-red-600 text-l">*</label></label>
            <input type="password" id="current-pwd" class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300  focus:outline-none sm:text-sm" placeholder="Mot de passe actuel">
          </div>
          <div class="flex flex-wrap -mx-2">
            <div class="w-full lg:w-1/2 px-2 mb-4">
              <label for="new-pwd" class="block text-sm font-medium text-gray-700 required">Nouveau mot de passe <label class="text-red-600 text-l">*</label></label>
              <input type="password" id="new-pwd" class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300  focus:outline-none sm:text-sm" placeholder="Nouveau mot de passe">
            </div>
            <div class="w-full lg:w-1/2 px-2 mb-4">
              <label for="confirm-pwd" class="block text-sm font-medium text-gray-700 required">Confirmation du mot de passe <label class="text-red-600 text-l">*</label></label>
              <input type="password" id="confirm-pwd" class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300  focus:outline-none sm:text-sm" placeholder="Confirmation du mot de passe">
            </div>
          </div>
        <div class="mt-4">
          <button class="bg-red-600 text-white py-2 px-4 hover:bg-red-700">Sauvegarder </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
</script>
