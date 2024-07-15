import { AdminLessonList } from "@/components/admin/add-course/lesson-table";
import Button from "@/utils/button";
import Link from "next/link";
import { useEffect } from "react";
import axios from "axios";

export function AdminLessonSection({ lesson, setLesson }) {
  const getLessonData = async () => {
    try {
      const result = await axios.get(`/api/lessons/get`);
      setLesson(result.data.lessons);
    } catch (error) {
      return {
        message: "Server could not read lessons due to database connection",
      };
    }
  };

  useEffect(() => {
    getLessonData();
  }, []);

  return (
    <div className=" px-10 pt-[30px]">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-medium">Lesson</h3>
        <Link href="/admin/add-lesson">
          <Button
            text="+ Add Lesson"
            style="primary"
            height="60px"
            customStyle="w-[171px]"
          />
        </Link>
      </div>
      <div className="mt-[43px]">
        <AdminLessonList lesson={lesson} />
      </div>
    </div>
  );
}
