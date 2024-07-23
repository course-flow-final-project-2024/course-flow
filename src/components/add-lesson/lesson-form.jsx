import { useState } from "react";
import Button from "@/utils/button";
import AdminSubLessonForm from "@/components/add-lesson/sub-lesson-form";

export default function AdminLessonForm() {
  const [subLessons, setSubLessons] = useState([{ name: "", video: null }]);

  const handleAddSubLesson = () => {
    setSubLessons([...subLessons, { name: "", video: null }]);
  };
  return (
    <div className="m-[40px_40px_70px_40px] p-[40px_100px_60px_100px] rounded-2xl bg-white">
      <div className="flex flex-col gap-1 mb-10">
        <p>Lesson Name *</p>
        <input
          type="text"
          className="w-full h-12 p-3 border rounded-lg outline-none"
        />
      </div>
      <div className="border-t border-[#D6D9E4]"></div>
      <div className="flex flex-col gap-6 mt-10">
        <p className="mb-4 font-semibold text-xl text-[#646D89]">Sub-Lesson</p>
        {subLessons.map((subLesson, index) => {
          return (
            <AdminSubLessonForm
              key={index}
              index={index}
              subLesson={subLesson}
              subLessons={subLessons}
              setSubLessons={setSubLessons}
            />
          );
        })}
        <div className="flex w-[208px]">
          <Button
            style="secondary"
            text="+ Add Sub-lesson"
            onClick={handleAddSubLesson}
          />
        </div>
      </div>
    </div>
  );
}
