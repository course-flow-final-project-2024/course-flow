import { supabase } from "../../../../../lib/supabase";
import convertToSubcurrency from "@/utils/convertToSubcurrency";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { payment_intent } = req.body;

  if (!payment_intent) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);
    const amount = paymentIntent.amount;

    if (
      paymentIntent.status === "succeeded" &&
      paymentIntent.amount_received === amount
    ) {
      const { userId, courseId } = paymentIntent.metadata;

      const { data: fetchedData, error } = await supabase
        .from("user_courses")
        .select("*")
        .eq("user_id", userId)
        .eq("course_id", courseId);

      if (error) {
        return res.status(500).json({
          message:
            "Server could not read the data due to server connection problem",
        });
      }

      if (fetchedData.length === 0) {
        const { data: insertedData, error: insertError } = await supabase
          .from("user_courses")
          .insert([
            {
              user_id: userId,
              course_id: courseId,
              course_progress_id: 2,
              payment_status_id: 1,
            },
          ]);

        if (insertError) {
          return res.status(500).json({ error: "Failed to insert data" });
        }

        return res.status(201).json({
          success: true,
          message: "Successfully inserted data",
          Data: insertedData,
        });
      } else {
        const { data: updatedData, error: updateError } = await supabase
          .from("user_courses")
          .update([
            {
              user_id: userId,
              course_id: courseId,
              course_progress_id: 2,
              payment_status_id: 1,
            },
          ])
          .eq("user_id", userId)
          .eq("course_id", courseId);

        if (updateError) {
          return res.status(500).json({ error: "Failed to update data" });
        }

        return res.status(200).json({
          success: true,
          message: "Successfully updated data",
          Data: updatedData,
        });
      }
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Error verifying payment", error);
    return res.status(500).json({ error: "Failed to verify payment" });
  }
}
