<template>
  <section>
    <div class="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div class="description">
        <h3>Stubborn Attachments</h3>
        <h5>$20.00</h5>
      </div>
    </div>
    <button @click="createCheckoutSession" id="checkout-button">
      Checkout
    </button>
  </section>
</template>

<script setup>
import axios from "axios";

const createCheckoutSession = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8000/create-checkout-session"
    );
    window.location.href = response.data.url;
  } catch (error) {
    console.error("Error creating checkout session:", error);
  }
};
</script>
