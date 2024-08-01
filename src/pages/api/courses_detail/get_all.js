import { supabase } from "../../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { data: coursesData, error: coursesError } = await supabase
      .from("courses")
      .select(`*, lessons (*, sub_lessons(*))`);

    if (coursesError) {
      console.error("Error fetching course data from supabase", coursesError);
      return res.status(500).json({
        error: "Failed to fetch course data from supabase",
      });
    }

    return res.status(200).json({ courses: coursesData });
  } catch (error) {
    console.error("Unexpected error occurred", error.message, error.stack);
    return res.status(500).json({
      error: "An unexpected error occurred: " + error.message,
    });
  }
}
