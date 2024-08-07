import CommonModalBox from "@/utils/admin-common-modal";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { AddCourseContext } from "@/pages/_app";

const AdminDeleteLesson = ({ courseId }) => {
  const router = useRouter();
  const lessonIndex = router.query.lessonIndex;
  const [open, setOpen] = useState(false);
  const { course, setCourse } = useContext(AddCourseContext);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    const updatedCourse = { ...course };
    updatedCourse.lessons.splice(lessonIndex, 1);
    updatedCourse.lessons.map((lesson, index) => (lesson.index = index));
    handleClose();
    setCourse(updatedCourse);
    router.push(`/admin/courses/${courseId}`);
  };

  return (
    <>
      <div>
        <p
          className="text-[#2F5FAC] font-[700] text-end bg-[#F6F7FC] pb-20 pr-10 w-full h-full"
          role="button"
          onClick={() => {
            handleOpen();
          }}
        >
          Delete Lesson
        </p>
        <CommonModalBox
          open={open}
          AlertMessage="Are you sure you want to delete this lesson?"
          leftText="Yes, I want to delete this lesson"
          rightText="No, keep it"
          leftOnClick={() => {
            handleDelete();
          }}
          rightOnClick={handleClose}
          crossClick={handleClose}
        />
      </div>
    </>
  );
};

export default AdminDeleteLesson;
