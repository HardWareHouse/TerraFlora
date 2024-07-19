import Stripe from "stripe";
const stripe = Stripe(process.env.VITE_STRIPE_SECRET_KEY);

const YOUR_DOMAIN = "http://localhost:5173";

export const createSession = async (req, res) => {
  try {
    const { lineItems } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["FR"],
      },
      shipping_options: [
        {
          shipping_rate: "shr_1PaL80RvflFVG7kRWebshOPO",
        },
      ],
      consent_collection: {
        terms_of_service: "required",
      },
      custom_text: {
        terms_of_service_acceptance: {
          message: `I agree to the [Terms of Service](${YOUR_DOMAIN}/cgu)`,
        },
      },
      invoice_creation: {
        enabled: true,
      },
      phone_number_collection: {
        enabled: true,
      },
      custom_fields: [
        {
          key: "note",
          label: {
            type: "custom",
            custom: "Notes de commande",
          },
          type: "text",
          optional: true,
        },
      ],
      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/cancel`,
      automatic_tax: { enabled: true },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  const {
    nom,
    description,
    prix,
    stock,
    marque,
    couleur,
    taille,
    isPromotion,
    pourcentagePromotion,
    categorieId,
  } = req.body;
  let product = "";
  if (description) {
    product = await stripe.products.create({
      name: nom,
      description: description || "",
      default_price_data: {
        unit_amount: prix * 100 || 0,
        currency: "eur",
      },
    });
  } else {
    product = await stripe.products.create({
      name: nom,
      default_price_data: {
        unit_amount: prix * 100 || 0,
        currency: "eur",
      },
    });
  }

  res.json({ priceId: product.default_price });
};

export const updatePrice = async (req, res) => {
  const { id, nom, prix, description, priceId } = req.body;
  try {
    // Update the product details
    const products = await stripe.products.search({
      query: `active:'true' AND name:'${nom}'`,
    });

    const productId = products.data[0].id;
    // Create a new price for the product

    const newPrice = await stripe.prices.create({
      unit_amount: prix * 100,
      currency: "eur", // Specify your currency
      product: `${productId}`,
    });

    await stripe.products.update(productId, {
      default_price: `${newPrice.id}`,
      description: description || "",
      name: nom,
    });
    // Optionally, deactivate the old price
    await stripe.prices.update(priceId, {
      active: false,
    });

    const newPriceId = newPrice.id;

    res.status(200).send({ productId, newPriceId });
  } catch (error) {
    console.error("Error updating price:", error);
    res.status(500).send({ error: error.message });
  }
};

export const fulfillCheckout = async (sessionId) => {
  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });
  console.log("checkoutSession", checkoutSession.line_items.data);
};
