<template>
  <div class="p-4 bg-white rounded-lg shadow-md">
    <h3 class="text-xl font-medium border-b border-gray-200 pb-2">Account Details</h3>
    <div class="mt-4">
      <form action="#">
        <div class="flex flex-wrap -mx-2">
          <div class="w-full lg:w-1/2 px-2 mb-4">
            <label for="first-name" class="block text-sm font-medium text-gray-700 required">First Name <label class="text-red-600 text-l"><label class="text-red-600 text-l">*</label></label></label>
            <input type="text" id="first-name" class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300  focus:outline-none sm:text-sm" placeholder="First Name">
          </div>
          <div class="w-full lg:w-1/2 px-2 mb-4">
            <label for="last-name" class="block text-sm font-medium text-gray-700 required">Last Name <label class="text-red-600 text-l">*</label></label>
            <input type="text" id="last-name" class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300  focus:outline-none sm:text-sm" placeholder="Last Name">
          </div>
        </div>
        <div class="mb-4">
          <label for="display-name" class="block text-sm font-medium text-gray-700 required">Display Name <label class="text-red-600 text-l">*</label></label>
          <input type="text" id="display-name" class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300  focus:outline-none sm:text-sm" placeholder="Display Name">
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700 required">Email Address <label class="text-red-600 text-l">*</label></label>
          <input type="email" id="email" class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300  focus:outline-none sm:text-sm" placeholder="Email Address">
        </div>
          <label class="text-xl font-medium border-b border-gray-200 pb-2 w-full">Password Change</label>
          <div class="mb-4 mt-3">
            <label for="current-pwd" class="block text-sm font-medium text-gray-700 required">Current Password <label class="text-red-600 text-l">*</label></label>
            <input type="password" id="current-pwd" class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300  focus:outline-none sm:text-sm" placeholder="Current Password">
          </div>
          <div class="flex flex-wrap -mx-2">
            <div class="w-full lg:w-1/2 px-2 mb-4">
              <label for="new-pwd" class="block text-sm font-medium text-gray-700 required">New Password <label class="text-red-600 text-l">*</label></label>
              <input type="password" id="new-pwd" class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300  focus:outline-none sm:text-sm" placeholder="New Password">
            </div>
            <div class="w-full lg:w-1/2 px-2 mb-4">
              <label for="confirm-pwd" class="block text-sm font-medium text-gray-700 required">Confirm Password <label class="text-red-600 text-l">*</label></label>
              <input type="password" id="confirm-pwd" class="relative block w-full px-3 py-3 text-[14px] bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300  focus:outline-none sm:text-sm" placeholder="Confirm Password">
            </div>
          </div>
        <div class="mt-4">
          <button class="bg-red-600 text-white py-2 px-4 hover:bg-red-700">Save Changes</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
</script>
