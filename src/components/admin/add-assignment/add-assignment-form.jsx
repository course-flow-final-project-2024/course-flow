import { useState } from "react";
import AdminAddAssignmentDetail from "./assignment-detail";
import CourseSelect from "./select-course";
import LessonSelect from "./select-lesson";
import SubLessonSelect from "./select-sub-lesson";
import axios from "axios";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";

const AdminAddAssignmentForm = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [lessons, setLessons] = useState([]);
  const [selectedLessonId, setSelectedLessonId] = useState("");
  const [subLessons, setSubLessons] = useState([]);
  const [selectedSubLessonId, setSelectedSubLessonId] = useState("");
  const [assignment, setAssignment] = useState("");
  const [isCourseLoading, setCourseIsLoading] = useState(false);
  const [isLessonLoading, setLessonIsLoading] = useState(false);
  const [isSubLessonLoading, setSubLessonIsLoading] = useState(false);

  const router = useRouter();
  const toastId = "add-assignment";
  const toast = useToast({
    id: toastId,
    position: "top",
    isClosable: true,
  });

  const handleAssignmentSubmit = async (e) => {
    e.preventDefault();
    if (
      !selectedCourseId ||
      !selectedLessonId ||
      !selectedSubLessonId ||
      !assignment
    ) {
      toast({
        title: "Oops...",
        description:
          "Please complete all required field before creating assignment.",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
      return;
    }

    if (selectedCourseId && selectedLessonId && selectedSubLessonId) {
      const creatAssignment = axios.post(`/api/assignment/post`, {
        assignment_title: assignment,
        lesson_id: Number(selectedLessonId),
        sub_lesson_id: Number(selectedSubLessonId),
      });
      if (!toast.isActive(toastId)) {
        toast.promise(creatAssignment, {
          success: {
            title: "Good to go :)",
            description: "Assignment has been created succesfully.",
          },
          error: {
            title: "Oops.. :(",
            description: "Something wrong.",
          },
          loading: {
            title: "Creating Assignment",
            description: "Please wait ~",
          },
        });
      }
      try {
        const result = await creatAssignment;

        if (result.status === 200) {
          router.push("/admin/assignments");
        }
      } catch (error) {
        console.error("Error creating assignment", error);
      }
    }
  };

  return (
    <div className="bg-white border border-[#E6E7EB] rounded-[16px] w-full h-full px-[100px] pt-10 pb-[60px] flex flex-col gap-[10px]">
      <form id="add-assignment" onSubmit={handleAssignmentSubmit}>
        <div className="flex flex-col gap-5">
          <CourseSelect
            selectedCourseId={selectedCourseId}
            setSelectedCourseId={setSelectedCourseId}
            courses={courses}
            setCourses={setCourses}
            isCourseLoading={isCourseLoading}
            setCourseIsLoading={setCourseIsLoading}
          />

          <div className="flex gap-10">
            <LessonSelect
              selectedCourseId={selectedCourseId}
              setSelectedLessonId={setSelectedLessonId}
              selectedLessonId={selectedLessonId}
              lessons={lessons}
              setLessons={setLessons}
              isLessonLoading={isLessonLoading}
              setLessonIsLoading={setLessonIsLoading}
            />

            <SubLessonSelect
              selectedLessonId={selectedLessonId}
              setSelectedSubLessonId={setSelectedSubLessonId}
              subLessons={subLessons}
              setSubLessons={setSubLessons}
              isSubLessonLoading={isSubLessonLoading}
              setSubLessonIsLoading={setSubLessonIsLoading}
            />
          </div>
          <div className="border-b border-b-[#D6D9E4] w-full pt-5"></div>
        </div>
        <AdminAddAssignmentDetail setAssignment={setAssignment} />
      </form>
    </div>
  );
};
export default AdminAddAssignmentForm;
