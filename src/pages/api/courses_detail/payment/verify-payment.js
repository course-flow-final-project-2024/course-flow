import { supabase } from "../../../../../lib/supabase";
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

    const { userId, courseId } = paymentIntent.metadata;
    if (
      paymentIntent.status === "succeeded" &&
      paymentIntent.amount_received === amount
    ) {
      const { data: fetchedData, error: fetchDataError } = await supabase
        .from("user_courses")
        .select("*, courses(*, lessons(*, sub_lessons(*)))")
        .eq("user_id", userId)
        .eq("course_id", courseId);

      if (fetchDataError) {
        return res.status(500).json({
          error: "Error fetching user courses detail from server",
        });
      }

      if (fetchedData.length > 0 && fetchedData[0].payment_status_id === 1) {
        return res.status(200).json({
          success: true,
          message: "User has already owned this course",
          status: "owned",
        });
      }

      const { data: allCourseData, error: allCourseDataError } = await supabase
        .from("courses")
        .select("*, lessons(*, sub_lessons(*, assignments (*)))")
        .eq("course_id", courseId);

      if (allCourseDataError) {
        return res.status(500).json({
          error: "Error fetching courses detail from server",
        });
      }

      const combinedLessons = allCourseData[0].lessons.flatMap((lesson) =>
        lesson.sub_lessons.map((sub_lesson) => ({
          user_id: userId,
          lesson_id: lesson.lesson_id,
          sub_lesson_id: sub_lesson.sub_lesson_id,
          sub_lesson_status_id: 3,
        }))
      );

      const combinedAssignments = allCourseData[0].lessons.flatMap((lesson) =>
        lesson.sub_lessons.flatMap((sub_lesson) =>
          sub_lesson.assignments.map((assignment) => ({
            assignment_id: assignment.assignment_id,
            user_id: userId,
            assignment_status_id: 2,
          }))
        )
      );

      if (fetchedData.length === 0) {
        const { error: insertError } = await supabase
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

        const { error: insertLessonsError } = await supabase
          .from("user_lessons")
          .insert(combinedLessons);

        if (insertLessonsError) {
          return res
            .status(500)
            .json({ error: "Failed to insert lessons data" });
        }

        const { error: insertAssignmentError } = await supabase
          .from("user_assignments")
          .insert(combinedAssignments);

        if (insertAssignmentError) {
          return res
            .status(500)
            .json({ error: "Failed to insert assignments data" });
        }

        return res.status(201).json({
          success: true,
          message: "Successfully inserted data",
          status: "added",
        });
      } else if (
        fetchedData.length > 0 &&
        fetchedData[0].payment_status_id === 2
      ) {
        const { error: updateError } = await supabase
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

        const { error: insertLessonsError } = await supabase
          .from("user_lessons")
          .insert(combinedLessons);

        if (insertLessonsError) {
          return res
            .status(500)
            .json({ error: "Failed to insert lessons data" });
        }

        const { error: insertAssignmentError } = await supabase
          .from("user_assignments")
          .insert(combinedAssignments);

        if (insertAssignmentError) {
          return res
            .status(500)
            .json({ error: "Failed to insert assignments data" });
        }

        return res.status(200).json({
          success: true,
          message: "Successfully updated data",
          status: "updated",
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
