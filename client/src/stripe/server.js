// This is your test secret API key.
const stripe = require("stripe")(
  "pk_test_51PT1o1RvflFVG7kRTxwFUX1OYaloXE98AQYjAAi1Ij6u5u0nldTu18K8cYjd0o6Ca8Shk4xRh51Ei3ApltZxvE6P0060u2VL4H"
);
const express = require("express");
const app = express();
app.use(express.static("public"));

const YOUR_DOMAIN = "http://localhost:5173";

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1PT2tQRvflFVG7kRF05WOAum",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.redirect(303, session.url);
});

app.listen(8000, () => console.log("Running on port 8000"));
