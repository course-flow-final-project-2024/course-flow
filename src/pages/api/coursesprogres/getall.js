import { supabase } from "./../../../../lib/supabase";
import { validationToken } from "./../validation-token";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const payload = await validationToken(req, res);

  if (!payload) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("email", payload.email)
      .single();

    if (userError) {
      console.error("User Error:", userError);
      throw new Error(userError.message);
    }

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const user_id = user.user_id; 


    const { data, error } = await supabase
      .from("user_courses")
      .select("*, courses (*, lessons(*))")
      .eq("user_id", user_id)
      .in("course_progress_id", [1, 2])
      .eq("payment_status_id", 1);
      

    if (error) {
      throw error;
    }

const completedCount = data.filter(course => course.course_progress_id === 1).length;
const inprogressCount = data.filter(course => course.course_progress_id === 2).length;


    return res.status(200).json({ data, completedCount, inprogressCount });
  } catch (error) {
    return res
      .status(500)
      .json({
        message:
          "Server could not read the data due to server connection problem",
      });
  }
}
