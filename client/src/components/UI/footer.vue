<template>
  <footer class="w-full border-t border-gray-200 bg-white bottom-0 text-[14px]">
    <div class="container mx-auto my-20">
      <div class="flex w-full">
        <!-- My Account -->
        <div class="pl-6 w-1/3">
          <h3 class="text-lg font-semibold mb-4">Mon compte</h3>
          <ul class="">
            <li class="mb-4">
              <span class="inline-block text-gray-600">
                <i class="bi bi-geo-alt"></i> &nbsp; 75013 Paris
              </span>
            </li>
            <li class="mb-4">
              <a
                href="mailto:yourmail@gmail.com"
                class="inline-block text-gray-600"
              >
                <i class="bi bi-envelope"></i> &nbsp; Notre email:
                terra-flora@gmail.com
              </a>
            </li>
            <li class="mb-4">
              <a href="tel:012800456789987" class="inline-block text-gray-600">
                <i class="bi bi-telephone"></i> &nbsp; Téléphone : 01 02 03 04
                05
              </a>
            </li>
          </ul>
          <div class="mt-4 items-start">
            <div class="flex text-center w-1/2 items-center justify-between">
              <img
                src="../../assets/homePage/american-express-svgrepo-com.svg"
                alt="American Express"
                class="h-8"
              />
              <i class="bi bi-paypal"></i>
              <img
                src="../../assets/homePage/mastercard-svgrepo-com.svg"
                alt="Mastercard"
                class="h-8"
              />
              <img
                src="../../assets/homePage/visa-svgrepo-com.svg"
                alt="Visa"
                class="h-8"
              />
            </div>
          </div>
        </div>
        <!-- Categories -->
        <div class="flex w-2/3 justify-evenly">
          <!-- Information -->
          <div>
            <h5 class="text-lg font-semibold mb-4">Informations</h5>
            <ul class="text-gray-600">
              <li class="mb-4">
                <RouterLink to="/contact">Nous contacter</RouterLink>
              </li>
              <li class="mb-4">
                <RouterLink to="/cgu">Conditions Générales de Vente</RouterLink>
              </li>
              <li class="mb-4">
                <RouterLink to="/mentions">Mentions légales</RouterLink>
              </li>
              <li class="mb-4">
                <RouterLink to="/confidentialite"
                  >Politique de confidentialité</RouterLink
                >
              </li>
            </ul>
          </div>
          <!-- Quick Links -->
          <!-- <div>
            <h5 class="text-lg font-semibold mb-4">Liens rapides</h5>
            <ul class="text-gray-600">
              <li class="mb-4">Notre boutique</li>
              <li class="mb-4">Mon compte</li>
              <li class="mb-4">Suivre mes commandes</li>
              <li class="mb-4">Guide des tailles</li>
            </ul>
          </div> -->
        </div>
      </div>
    </div>
    <div class="bg-[#E1E1E1]">
      <div
        class="container mx-auto flex items-center justify-between py-6 px-4 h-10 border-t leading-loose border-gray-200"
      >
        <p class="text-sm text-gray-600">
          © 2024 <span class="font-semibold">Terra Flora</span> Made with ❤️ by
          <span class="text-red-500">LlamasScripters</span>
        </p>
        <div class="flex space-x-4">
          <a href="#" class="text-gray-600 hover:text-gray-900">
            <i class="bi bi-twitter-x"></i>
          </a>
          <a href="#" class="text-gray-600 hover:text-gray-900">
            <i class="bi bi-facebook"></i>
          </a>
          <a href="#" class="text-gray-600 hover:text-gray-900">
            <i class="bi bi-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
