<template>
  <div class="flex justify-center min-h-screen">
    <div class="w-2/3">
      <div class="mt-5">
        <h2 class="text-2xl text-center font-bold mb-6">Contact Us</h2>
        <form
          id="contact-form"
          action="https://whizthemes.com/mail-php/genger/mail.php"
          method="post"
          class="contact-form grid grid-cols-1 gap-4"
          @submit.prevent="submitForm"
        >
          <input
            v-model="form.name"
            name="name"
            type="text"
            placeholder="Name *"
            required
            class="p-2 bg-gray-200 border-b-2 border-transparent focus:outline-none focus:border-gray-400"
          />
          <input
            v-model="form.email_address"
            name="email_address"
            type="text"
            placeholder="Email *"
            required
            class="p-2 bg-gray-200 border-b-2 border-transparent focus:outline-none focus:border-gray-400"
          />
          <select
            v-model="form.contact_reason"
            name="contact_reason"
            required
            class="p-2 bg-gray-200 border-b-2 border-transparent focus:outline-none focus:border-gray-400"
          >
            <option disabled value="">Select a reason *</option>
            <option value="order_inquiry">Order Inquiry</option>
            <option value="shipping_info">Shipping Information</option>
            <option value="product_info">Product Information</option>
            <option value="gdpr">Exercise of Data Privacy Rights (GDPR)</option>
            <option value="other">Other</option>
          </select>
          <textarea
            v-model="form.message"
            name="message"
            placeholder="Message *"
            required
            class="p-2 bg-gray-200 border-b-2 border-transparent focus:outline-none focus:border-gray-400"
          ></textarea>
          <div class="col-span-1">
            <div class="contact-btn flex justify-center">
              <button
                type="submit"
                class="btn bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Send Message
              </button>
            </div>
            <div class="col-span-1 flex justify-center">
              <p class="form-messege"></p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const form = ref({
  name: "",
  email_address: "",
  contact_reason: "",
  message: "",
});

const submitForm = () => {
  // Handle form submission logic here
  console.log("Form submitted:", form.value);
  // You can add your form submission logic here
  // Reset form fields after submission
  form.value.name = "";
  form.value.email_address = "";
  form.value.contact_reason = "";
  form.value.message = "";
};
</script>
