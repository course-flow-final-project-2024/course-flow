import AdminCommonModalBox from "@/utils/admin-common-modal";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { AddCourseContext } from "@/pages/_app";
import { useToast } from "@chakra-ui/react";

const AdminDeleteCourse = () => {
  const router = useRouter();
  const courseId = router.query.courseId;
  const [open, setOpen] = useState(false);
  const { setCourse } = useContext(AddCourseContext);
  const toast = useToast({
    id: "delete",
    position: "top",
    isClosable: true,
  });

  const courseInitialValue = {
    course_name: "",
    price: "",
    duration: "",
    summary: "",
    detail: "",
    course_image: null,
    video_trailer: null,
    attach_file: null,
    lessons: [],
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    const deleteCourse = axios.delete(`/api/courses/delete`, {
      data: { course_id: courseId },
    });
    if (!toast.isActive("delete")) {
      toast.promise(deleteCourse, {
        success: {
          title: "Good to go :)",
          description: "Course has been deleted succesfully.",
        },
        error: {
          title: "Oops... :(",
          description: "Something wrong.",
        },
        loading: {
          title: "Deleting Course...",
          description: "Please wait.",
        },
      });
    }
    try {
      await deleteCourse;
      setCourse(courseInitialValue);
      handleClose();
      router.push(`/admin/courses`);
    } catch (error) {
      return {
        message: "Server could not delete courses due to database connection",
      };
    }
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
          Delete Course
        </p>
        <AdminCommonModalBox
          open={open}
          AlertMessage="Do you want to delete this course?"
          leftText="Yes, I want to delete this course"
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

export default AdminDeleteCourse;
