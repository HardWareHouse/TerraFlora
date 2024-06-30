<template>
  <div class="flex flex-col lg:flex-row lg:space-x-12 p-4">
    <div class="lg:w-1/2 p-4">
      <!-- Billing Details Form -->
      <h2 class="text-lg font-medium border-b pb-4 mb-6">
        Détails de la commande
      </h2>
      <form @submit.prevent="placeOrder">
        <div class="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label for="f_name" class="block text-sm font-medium"
              >Prénom <span class="text-red-600">*</span></label
            >
            <input
              type="text"
              id="f_name"
              v-model="form.firstName"
              placeholder="Prénom"
              class="mt-1 p-2 border rounded-md w-full bg-gray-100"
              required
            />
          </div>
          <div>
            <label for="l_name" class="block text-sm font-medium"
              >Nom <span class="text-red-600">*</span></label
            >
            <input
              type="text"
              id="l_name"
              v-model="form.lastName"
              placeholder="Nom"
              class="mt-1 p-2 border rounded-md w-full bg-gray-100"
              required
            />
          </div>
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium"
            >Adresse email <span class="text-red-600">*</span></label
          >
          <input
            type="email"
            id="email"
            v-model="form.email"
            placeholder="Adresse email"
            class="mt-1 p-2 border rounded-md w-full bg-gray-100"
            required
          />
        </div>
        <div class="mb-4">
          <label for="country" class="block text-sm font-medium"
            >Pays <span class="text-red-600">*</span></label
          >
          <select
            id="country"
            class="mt-1 p-2 border rounded-md w-full bg-gray-100"
            :required="true"
          >
            <option :selected value="France">France</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="street-address" class="block text-sm font-medium"
            >Adresse <span class="text-red-600">*</span></label
          >
          <input
            type="text"
            id="street-address"
            v-model="form.streetAddress1"
            placeholder="Adresse 1"
            class="mt-1 p-2 border rounded-md w-full bg-gray-100"
            required
          />
        </div>
        <div class="mb-4">
          <input
            type="text"
            v-model="form.streetAddress2"
            placeholder="Adresse 2 (Optional)"
            class="mt-1 p-2 border rounded-md w-full bg-gray-100"
          />
        </div>
        <div class="mb-4">
          <label for="town" class="block text-sm font-medium"
            >Ville<span class="text-red-600">*</span></label
          >
          <input
            type="text"
            id="town"
            v-model="form.city"
            placeholder="Ville"
            class="mt-1 p-2 border rounded-md w-full bg-gray-100"
            required
          />
        </div>
        <div class="mb-4">
          <label for="postcode" class="block text-sm font-medium"
            >Code postal<span class="text-red-600">*</span></label
          >
          <input
            type="text"
            id="postcode"
            v-model="form.postcode"
            placeholder="Code postal"
            class="mt-1 p-2 border rounded-md w-full bg-gray-100"
            required
          />
        </div>
        <div class="mb-4">
          <label for="phone" class="block text-sm font-medium">Téléphone</label>
          <input
            type="text"
            id="phone"
            v-model="form.phone"
            placeholder="Téléphone"
            class="mt-1 p-2 border rounded-md w-full bg-gray-100"
          />
        </div>
        <div class="mb-4">
          <div class="flex items-center">
            <input
              type="checkbox"
              id="create_pwd"
              v-model="form.createAccount"
              class="mr-2"
            />
            <label for="create_pwd" class="text-sm font-medium"
              >Créer un compte ?</label
            >
          </div>
        </div>
        <div class="mb-4">
          <div class="flex items-center">
            <input
              type="checkbox"
              id="ship_to_different"
              v-model="form.shipToDifferentAddress"
              class="mr-2"
            />
            <label for="ship_to_different" class="text-sm font-medium"
              >Livrer à une autre adresse ?</label
            >
          </div>
        </div>
        <div class="mb-4">
          <label for="ordernote" class="block text-sm font-medium"
            >Notes de commande</label
          >
          <textarea
            id="ordernote"
            v-model="form.orderNote"
            cols="30"
            rows="3"
            placeholder="Notes sur votre commande, par exemple des instructions spéciales pour la livraison."
            class="w-full mt-1 p-2 border rounded-md bg-gray-100"
          ></textarea>
        </div>
      </form>
    </div>
    <div class="lg:w-1/2 p-4">
      <!-- Order Summary and Payment Section -->
      <h2 class="text-lg font-medium border-b pb-4 mb-6">
        Résumé de votre commande
      </h2>
      <div class="bg-gray-100 rounded-md">
        <table class="w-full text-sm border text-center">
          <thead class="border p-4">
            <tr>
              <th class="border p-4">Products</th>
              <th class="border p-4">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border p-4">Suscipit Vestibulum x 1</td>
              <td class="border p-4">$165.00</td>
            </tr>
            <tr>
              <td class="border p-4">Ami Vestibulum Suscipit x 4</td>
              <td class="border p-4">$165.00</td>
            </tr>
            <tr>
              <td class="border p-4">Vestibulum Suscipit x 2</td>
              <td class="border p-4">$165.00</td>
            </tr>
            <tr>
              <td class="font-medium border p-4">Sous-total</td>
              <td class="font-medium border p-4">$400.00</td>
            </tr>
            <tr>
              <td class="font-medium border p-4">Livrason</td>
              <td class="font-medium border p-4">
                <div>
                  <label class="flex items-center mb-2">
                    <input
                      type="radio"
                      name="shipping"
                      v-model="shipping"
                      value="Flat Rate: $15.00"
                      class="mr-2 text-red-600"
                      checked
                    />
                    <span>Tarif Forfaitaire: $15.00</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      type="radio"
                      name="shipping"
                      v-model="shipping"
                      value="Free Shipping"
                      class="mr-2 text-red-600"
                    />
                    <span>Livraison gratuite (minimum 50€ de commande)</span>
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <td class="font-medium border p-4">Montant total</td>
              <td class="font-medium border p-4">$470.00</td>
            </tr>
          </tbody>
        </table>
        <div class="mt-4 ml-4">
          <h3 class="text-sm font-medium mb-2">Payment Options</h3>
          <div>
            <div v-for="(method, index) in paymentMethods" :key="index">
              <label class="flex items-center mb-2">
                <input
                  type="radio"
                  name="payment"
                  v-model="payment"
                  :value="method.value"
                  class="mr-2 text-red-600"
                />
                <span>{{ method.label }}</span>
              </label>
              <div
                class="payment-method-details"
                v-show="payment === method.value"
                :data-method="method.value"
              >
                <p class="mx-3 my-1 p-2 bg-gray-200 text-sm">
                  {{ method.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4 ml-2">
          <label class="flex items-center">
            <input
              type="checkbox"
              v-model="agreeTerms"
              class="mr-2 text-red-600"
            />
            <span
              >J'ai lu et j'accepte les termes et conditions de Terra
              Flora.</span
            >
          </label>
        </div>
        <div class="mt-4 flex">
          <button
            @click="placeOrder"
            :disabled="!agreeTerms"
            class="w-3/4 mx-auto bg-red-500 text-white py-2 mb-4 rounded-md"
            :class="{ 'opacity-50 cursor-not-allowed': !agreeTerms }"
          >
            Passer au paiement
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";

// Reactive form object
const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  country: "",
  streetAddress1: "",
  streetAddress2: "",
  city: "",
  state: "",
  postcode: "",
  phone: "",
  createAccount: false,
  shipToDifferentAddress: false,
  orderNote: "",
});

// Reactive variables for shipping, payment, and terms agreement
const shipping = ref("Flat Rate: $15.00");
const payment = ref("Cash On Delivery");
const agreeTerms = ref(false);

// Payment methods array
const paymentMethods = [
  {
    label: "Carte bancaire",
    value: "Carte bancaire",
    description: "Paiement via Carte bancaire",
  },
  {
    label: "Carte bleue",
    value: "Carte bleue",
    description: "Paiement via Carte bleue",
  },
  {
    label: "Stripe",
    value: "Stripe",
    description: "Paiement via Stripe.",
  },
  {
    label: "Paypal",
    value: "Paypal",
    description: "Paiement via Paypal",
  },
];

// Method to place order
function placeOrder() {
  if (!agreeTerms.value) {
    alert("You must agree to the terms and conditions to place the order.");
    return;
  }
  const orderDetails = {
    billingDetails: form,
    shipping: shipping.value,
    payment: payment.value,
  };
  console.log("Order details:", orderDetails);
}
</script>
