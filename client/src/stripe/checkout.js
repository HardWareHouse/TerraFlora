// This is your test secret API key.
const stripe = Stripe(
  "pk_test_51PT1o1RvflFVG7kRTxwFUX1OYaloXE98AQYjAAi1Ij6u5u0nldTu18K8cYjd0o6Ca8Shk4xRh51Ei3ApltZxvE6P0060u2VL4H"
);

initialize();

// Create a Checkout Session
async function initialize() {
  const fetchClientSecret = async () => {
    const response = await fetch("/create-checkout-session", {
      method: "POST",
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

  // Mount Checkout
  checkout.mount("#checkout");
}

export default {
  initialize,
};
