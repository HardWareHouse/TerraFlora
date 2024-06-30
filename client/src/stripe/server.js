// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51PT1o1RvflFVG7kRUO0KVmN8PqBv2pQ5xMmmQdloHulVfSUFZWxu89mXswT2SaKvQkuHWh4XbXJt4e8QRtJlGzYr004FN4Y8Ry"
);
const express = require("express");
const app = express();
app.use(express.static("public"));

const YOUR_DOMAIN = "http://localhost:5173";

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "{{PRICE_ID}}",
        quantity: 1,
      },
    ],
    mode: "payment",
    return_url: `${YOUR_DOMAIN}/return.html?session_id={CHECKOUT_SESSION_ID}`,
  });

  res.send({ clientSecret: session.client_secret });
});

app.get("/session-status", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email,
  });
});

app.listen(4242, () => console.log("Running on port 5173"));
