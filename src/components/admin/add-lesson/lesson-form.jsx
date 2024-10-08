import { useContext, useState } from "react";
import Button from "@/utils/button";
import AdminSubLessonForm from "@/components/admin/add-lesson/sub-lesson-form";
import { AddCourseContext } from "@/pages/_app";
import { useRouter } from "next/router";
import { validateLessonInput, validateSubLessons } from "./form-validate";
import { useToast } from "@chakra-ui/react";

export default function AdminLessonForm({ formId }) {
  const { course, setCourse } = useContext(AddCourseContext);
  const [subLessons, setSubLessons] = useState([
    { sub_lesson_title: "", sub_lesson_video: null, index: null },
  ]);
  const [lesson, setLesson] = useState({
    lesson_title: "",
    index: null,
    sub_lessons: [],
  });
  const [validatedLesson, setValidatedLesson] = useState({});

  const router = useRouter();
  const toast = useToast();

  const handleLessonNameChange = (e) => {
    const input = e.target.value;
    const validateInput = validateLessonInput(input);
    setValidatedLesson(validateInput);

    const updatedLesson = {
      ...lesson,
      lesson_title: input,
      index: course.lessons.length,
    };
    setLesson(updatedLesson);
  };

  const handleAddSubLesson = (e) => {
    e.preventDefault();
    setSubLessons([
      ...subLessons,
      { sub_lesson_title: "", sub_lesson_video: null, index: null },
    ]);
  };

  const handleLessonSubmit = (e) => {
    e.preventDefault();

    const validateLessonName = validateLessonInput(lesson.lesson_title);
    setValidatedLesson(validateLessonName);

    const validatedSubLessons = validateSubLessons(subLessons);

    const hasInvalidSubLesson = validatedSubLessons.some(
      (item) => item.name !== "" || item.video !== ""
    );

    if (Object.keys(validateLessonName).length > 0 || hasInvalidSubLesson) {
      toast({
        title: "Oops...",
        description:
          "Please complete all reqiured data before creatind a lesson.",
        status: "error",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    const updatedLesson = { ...lesson, sub_lessons: subLessons };
    const updatedLessons = [...course.lessons, updatedLesson];

    const updatedCourse = { ...course, lessons: updatedLessons };
    setCourse(updatedCourse);
    router.push("/admin/add-course");
  };

  return (
    <div className="m-[40px_40px_70px_40px] p-[40px_100px_60px_100px] rounded-2xl bg-white">
      <form id={formId} onSubmit={handleLessonSubmit}>
        <div className="flex flex-col gap-1 mb-10">
          <div className="flex gap-2">
            <p>Lesson Name *</p>
            {validatedLesson && (
              <p className="text-red-500"> {validatedLesson.name}</p>
            )}
          </div>

          <input
            name="lesson_title"
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
