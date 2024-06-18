<template>
  <div>
    <div class="w-3/4 mx-auto mt-5 mb-3">
      <h3
        class="bg-gray-100 border-t-4 border-red-600 text-gray-900 text-sm font-medium uppercase py-3 pl-3"
      >
        Vous êtes de retour ?
        <span
          class="text-red-600 cursor-pointer transition duration-400 ml-2"
          @click="toggleLoginAccordion"
          >Cliquez ici pour vous connecter</span
        >
      </h3>
      <div
        id="logInaccordion"
        v-show="showLoginAccordion"
        class="border-t border-gray-300 p-4"
      >
        <div>
          <p class="mb-4">
            Si vous avez déjà fait des achats chez nous, veuillez entrer vos détails dans
            les cases ci-dessous. Si vous êtes un nouveau client, veuillez vous rendre à la
            section Facturation &amp; Expédition.
          </p>
          <div class="mt-5">
            <div class="flex justify-center">
              <div class="w-full max-w-lg">
                <form action="#" method="post">
                  <div class="space-y-4">
                    <div class="">
                      <input
                        type="email"
                        class="w-full p-3 bg-gray-200 border border-gray-300 rounded"
                        placeholder="Entrez votre email"
                        required
                      />
                    </div>
                    <div class="">
                      <input
                        type="password"
                        class="w-full p-3 bg-gray-200 border border-gray-300 rounded"
                        placeholder="Entrez votre mot de passe"
                        required
                      />
                    </div>
                  </div>

                  <div class="mt-4">
                    <div class="flex justify-between items-center">
                      <div>
                        <label class="inline-flex items-center">
                          <input
                            type="checkbox"
                            id="rememberMe"
                            class="border-gray-300"
                          />
                          <span class="ml-2">Se souvenir de moi</span>
                        </label>
                      </div>
                      <a href="#" class="text-red-600 text-xs"
                        >Mot de passe oublié ?</a
                      >
                    </div>
                  </div>

                  <div class="mt-4">
                    <button class="bg-red-600 text-white py-2 px-4 rounded">
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-3/4 mx-auto">
      <h3
        class="bg-gray-100 border-t-4 border-red-600 text-gray-900 text-sm font-medium uppercase py-3 pl-3"
      >
        Vous avez un code promo ?
        <span
          class="text-red-600 cursor-pointer transition duration-400 ml-2"
          @click="toggleCouponAccordion"
          >Cliquez ici pour entrer votre code</span
        >
      </h3>
      <div
        id="couponaccordion"
        v-show="showCouponAccordion"
        class="border-t border-gray-300 p-4"
      >
        <div class="">
          <div>
            <div>
              <form action="#" method="post" class="block md:flex">
                <input
                  type="text"
                  class="p-3 bg-gray-200 border border-gray-300 rounded w-full md:w-auto mb-3 md:mb-0 md:mr-4 text-sm"
                  placeholder="Entrez votre code promo"
                  required
                />
                <button class="bg-red-600 text-white rounded px-3 h-14">
                  Valider
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const showLoginAccordion = ref(false);
const showCouponAccordion = ref(false);
const showDropdown = ref(false);

function toggleLoginAccordion() {
  showLoginAccordion.value = !showLoginAccordion.value;
}

function toggleCouponAccordion() {
  showCouponAccordion.value = !showCouponAccordion.value;
}
</script>
