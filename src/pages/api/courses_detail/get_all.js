import { supabase } from "../../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { data: coursesData, error: coursesError } = await supabase
      .from("courses")
      .select(`*, lessons (*, sub_lessons(*))`)
      .order(`index`, { referencedTable: `lessons`, ascending: true });
    // .order("index", { foreignTable: "lessons", ascending: true })
    // .order("index", { foreignTable: "lessons.sub_lessons", ascending: true });
    // worked but deprecated, could be potential problem in the future version

    if (coursesError) {
      console.error("Error fetching course data from server", coursesError);
      return res.status(500).json({
        error: "Failed to fetch course data from server",
      });
    }

    const sortedCourses = coursesData.map((course) => {
      if (course.lessons.length > 0) {
        course.lessons.map((lesson) => {
          if (lesson.sub_lessons.length > 0) {
            lesson.sub_lessons.sort((a, b) => a.index - b.index);
          }
        });
      }
      return course;
    });

    return res.status(200).json({ coursesDetail: sortedCourses });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch data from server" });
  }
}
