import express from "express";

const app = express();
const port = 3000; //add your port here
const PUBLISHABLE_KEY = "pk_test_51L5CS4CcmpWj8khH1uUBW1nRg6VAz2MXCSG7Wvy9uHmjPrf1NWufHeiitjR8JcqRdsOhtp5njFtnY4B2MR3bBlb7000bPD1vkk";
const SECRET_KEY = "sk_test_51L5CS4CcmpWj8khH4x2VBa9kkGWn1Oc1QCroUBlaSICrGooxQIhhJF6ugDNpign61NA3PIYVfb9Y6BSxAXSTkjjr00dJ9Oso9V";
import Stripe from "stripe";

//Confirm the API version from your stripe dashboard
const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

app.listen(port, () => {
  console.log(`Example app listening at http://10.107.7.40:${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 700, //lowest denomination of particular currency
      currency: "GBP",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});