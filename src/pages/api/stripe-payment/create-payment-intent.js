const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { validationToken } from "../validation-token";
import { supabase } from "../../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { amount, courseId } = await req.body;

  if (!amount || !courseId) {
    return res
      .status(400)
      .json({ error: "amount and course ID are required!" });
  }

  try {
    const payload = await validationToken(req, res);
    const userEmail = payload.email;

    const { data: userDetail, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("email", userEmail)
      .single();

    if (userError || !userDetail) {
      return res.status(401).json({ error: "User not found" });
    }

    const userId = userDetail.user_id;

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
