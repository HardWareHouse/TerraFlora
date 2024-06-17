<template>
  <div class="flex flex-col lg:flex-row lg:space-x-12 p-4">
    <div class="lg:w-1/2 p-4">
      <!-- Billing Details Form -->
      <h2 class="text-lg font-medium border-b pb-4 mb-6">Billing Details</h2>
      <form @submit.prevent="placeOrder">
        <div class="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label for="f_name" class="block text-sm font-medium"
              >First Name <span class="text-red-600">*</span></label
            >
            <input
              type="text"
              id="f_name"
              v-model="form.firstName"
              placeholder="First Name"
              class="mt-1 p-2 border rounded-md w-full bg-gray-100"
              required
            />
          </div>
          <div>
            <label for="l_name" class="block text-sm font-medium"
              >Last Name <span class="text-red-600">*</span></label
            >
            <input
              type="text"
              id="l_name"
              v-model="form.lastName"
              placeholder="Last Name"
              class="mt-1 p-2 border rounded-md w-full bg-gray-100"
              required
            />
          </div>
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium"
            >Email Address <span class="text-red-600">*</span></label
          >
          <input
            type="email"
            id="email"
            v-model="form.email"
            placeholder="Email Address"
            class="mt-1 p-2 border rounded-md w-full bg-gray-100"
            required
          />
        </div>
        <div class="mb-4">
          <label for="com-name" class="block text-sm font-medium"
            >Company Name</label
          >
          <input
            type="text"
            id="com-name"
            v-model="form.companyName"
            placeholder="Company Name"
            class="mt-1 p-2 border rounded-md w-full bg-gray-100"
          />
        </div>
        <div class="mb-4">
          <label for="country" class="block text-sm font-medium"
            >Country <span class="text-red-600">*</span></label
          >
          <select
            id="country"
            v-model="form.country"
            class="mt-1 p-2 border rounded-md w-full bg-gray-100"
            required
          >
            <option
              v-for="country in countries"
              :key="country.code"
              :value="country.name"
            >
              {{ country.name }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <label for="street-address" class="block text-sm font-medium"
            >Street address <span class="text-red-600">*</span></label
          >
          <input
            type="text"
            id="street-address"
            v-model="form.streetAddress1"
            placeholder="Street address Line 1"
            class="mt-1 p-2 border rounded-md w-full bg-gray-100"
            required
          />
        </div>
        <div class="mb-4">
          <input
            type="text"
            v-model="form.streetAddress2"
            placeholder="Street address Line 2 (Optional)"
            class="mt-1 p-2 border rounded-md w-full bg-gray-100"
          />
        </div>
        <div class="mb-4">
          <label for="town" class="block text-sm font-medium"
            >Town / City <span class="text-red-600">*</span></label
          >
          <input
            type="text"
            id="town"
            v-model="form.city"
            placeholder="Town / City"
            class="mt-1 p-2 border rounded-md w-full bg-gray-100"
            required
          />
        </div>
        <div class="mb-4">
          <label for="state" class="block text-sm font-medium"
            >State / Division <span class="text-red-600">*</span></label
          >
          <input
            type="text"
            id="state"
            v-model="form.state"
            placeholder="State / Division"
            class="mt-1 p-2 border rounded-md w-full bg-gray-100"
          />
        </div>
        <div class="mb-4">
          <label for="postcode" class="block text-sm font-medium"
            >Postcode / ZIP <span class="text-red-600">*</span></label
          >
          <input
            type="text"
            id="postcode"
            v-model="form.postcode"
            placeholder="Postcode / ZIP"
            class="mt-1 p-2 border rounded-md w-full bg-gray-100"
            required
          />
        </div>
        <div class="mb-4">
          <label for="phone" class="block text-sm font-medium">Phone</label>
          <input
            type="text"
            id="phone"
            v-model="form.phone"
            placeholder="Phone"
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
              >Create an account?</label
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
              >Ship to a different address?</label
            >
          </div>
        </div>
        <div class="mb-4">
          <label for="ordernote" class="block text-sm font-medium"
            >Order Note</label
          >
          <textarea
            id="ordernote"
            v-model="form.orderNote"
            cols="30"
            rows="3"
            placeholder="Notes about your order, e.g. special notes for delivery."
            class="w-full mt-1 p-2 border rounded-md bg-gray-100"
          ></textarea>
        </div>
      </form>
    </div>
    <div class="lg:w-1/2 p-4">
      <!-- Order Summary and Payment Section -->
      <h2 class="text-lg font-medium border-b pb-4 mb-6">Your Order Summary</h2>
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
              <td class="font-medium border p-4">Subtotal</td>
              <td class="font-medium border p-4">$400.00</td>
            </tr>
            <tr>
              <td class="font-medium border p-4">Shipping</td>
              <td class="font-medium border p-4">
                <div>
                  <label class="flex items-center mb-2">
                    <input
                      type="radio"
                      name="shipping"
                      v-model="shipping"
                      value="Flat Rate: $70.00"
                      class="mr-2 text-red-600"
                      checked
                    />
                    <span>Flat Rate: $70.00</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      type="radio"
                      name="shipping"
                      v-model="shipping"
                      value="Free Shipping"
                      class="mr-2 text-red-600"
                    />
                    <span>Free Shipping</span>
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <td class="font-medium border p-4">Total Amount</td>
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
              >I have read and agree to the website terms and conditions.</span
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
            Place Order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getData } from "country-list";

export default {
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        companyName: "",
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
      },
      countries: [],
      shipping: "Flat Rate: $70.00",
      payment: "Cash On Delivery",
      agreeTerms: false,
      paymentMethods: [
        {
          label: "Cash On Delivery",
          value: "Cash On Delivery",
          description: "Pay with cash upon delivery.",
        },
        {
          label: "Direct Bank Transfer",
          value: "Direct Bank Transfer",
          description:
            "Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.",
        },
        {
          label: "Pay with Check",
          value: "Pay with Check",
          description:
            "Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.",
        },
        {
          label: "Paypal",
          value: "Paypal",
          description:
            "Pay via PayPal; you can pay with your credit card if you don’t have a PayPal account.",
        },
      ],
    };
  },
  created() {
    this.countries = getData().map((country) => ({
      code: country.code,
      name: country.name,
    }));
  },
  methods: {
    placeOrder() {
      if (!this.agreeTerms) {
        alert("You must agree to the terms and conditions to place the order.");
        return;
      }
      const orderDetails = {
        billingDetails: this.form,
        shipping: this.shipping,
        payment: this.payment,
      };
      console.log("Order details:", orderDetails);
    },
  },
};
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>
