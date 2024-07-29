import { useContext, useState } from "react";
import Button from "@/utils/button";
import AdminSubLessonForm from "@/components/admin/add-lesson/sub-lesson-form";
import { AddCourseContext } from "@/pages/_app";
import { useRouter } from "next/router";
import { validateLessonInput, validateSubLessons } from "./form-validate";

export default function AdminLessonForm() {
  const { course, setCourse } = useContext(AddCourseContext);
  const [subLessons, setSubLessons] = useState([{ name: "", video: null }]);
  const [lesson, setLesson] = useState({
    lesson_name: "",
    subLessons: [],
  });
  const [validatedLesson, setValidatedLesson] = useState({});

  const router = useRouter();

  const handleLessonNameChange = (e) => {
    const input = e.target.value;
    const validateInput = validateLessonInput(input);
    setValidatedLesson(validateInput);

    const updatedLesson = { ...lesson, lesson_name: input };
    setLesson(updatedLesson);
  };

  const handleAddSubLesson = (e) => {
    e.preventDefault();
    setSubLessons([...subLessons, { name: "", video: null }]);
  };

  const handleLessonSubmit = (e) => {
    e.preventDefault();

    const validateLessonName = validateLessonInput(lesson.lesson_name);
    setValidatedLesson(validateLessonName);

    const validatedSubLessons = validateSubLessons(subLessons);

    const hasInvalidSubLesson = validatedSubLessons.some(
      (item) => item.name !== "" || item.video !== ""
    );

    if (Object.keys(validateLessonName).length > 0 || hasInvalidSubLesson) {
      alert("Please complete all required fields before creating the lesson.");
      return;
    }

    const updatedLesson = { ...lesson, subLessons: subLessons };
    const updatedLessons = course.lessons.push(updatedLesson);
    const updatedCourse = { ...course, lesson: updatedLessons };
    setCourse(updatedCourse);
    router.push("/admin/add-course");
  };

  return (
    <div className="m-[40px_40px_70px_40px] p-[40px_100px_60px_100px] rounded-2xl bg-white">
      <form id="add-lesson" onSubmit={handleLessonSubmit}>
        <div className="flex flex-col gap-1 mb-10">
          <div className="flex gap-2">
            <p>Lesson Name *</p>
            {validatedLesson && (
              <p className="text-red-500"> {validatedLesson.name}</p>
            )}
          </div>

          <input
            name="lesson_name"
            type="text"
            className="w-full h-12 p-3 border rounded-lg outline-none"
            placeholder="please enter lesson name"
            onChange={(e) => {
              handleLessonNameChange(e);
            }}
          />
        </div>
        <div className="border-t border-[#D6D9E4]"></div>
        <div className="flex flex-col gap-6 mt-10">
          <p className="mb-4 font-semibold text-xl text-[#646D89]">
            Sub-Lesson
          </p>
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
      </form>
    </div>
  );
}
