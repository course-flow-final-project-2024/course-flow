const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { amount, userId, courseId } = await req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "thb",
      automatic_payment_methods: { enabled: true },
      metadata: { userId, courseId },
    });

    return res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Internal Error", error);
    return res.status(500).json({
      error: `Internal server error ${error}`,
    });
  }
}
