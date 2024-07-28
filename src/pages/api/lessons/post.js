import { supabase } from "../../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const lessons = req.body.lessons;
    const course_id = req.body.course_id;

    const results = await Promise.all(
      lessons.map(async (item) => {
        const { data, error } = await supabase
          .from("lessons")
          .insert([
            {
              lesson_title: item.lesson_name,
              created_at: new Date(),
              updated_at: new Date(),
              user_id: 1,
              course_id: course_id,
            },
          ])
          .select();

        if (error) {
          //   return res.status(500).json({
          //     message:
          //       "Server could not create course due to database connection",
          //   });
          console.error(error);
        }
        return data;
      })
    );
    return res.status(200).json({
      message: "Lessons have been created successfully",
      data: results,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not create lessons due to database connection",
      error: error.message,
    });
  }
}
