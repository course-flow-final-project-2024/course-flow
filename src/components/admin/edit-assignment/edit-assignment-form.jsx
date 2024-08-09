import { useState } from "react";
import AdminEditAssignmentDetail from "./edit-assignment-detail";
import EditCourseSelect from "./edit-select-course";
import EditLessonSelect from "./edit-select-lesson";
import EditSubLessonSelect from "./edit-select-sub-lesson";
import axios from "axios";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";

const AdminEditAssignmentForm = ({ assignmentFromDb, assignmentId }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [lessons, setLessons] = useState([]);
  const [selectedLessonId, setSelectedLessonId] = useState("");
  const [subLessons, setSubLessons] = useState([]);
  const [selectedSubLessonId, setSelectedSubLessonId] = useState("");
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [isCourseLoading, setCourseIsLoading] = useState(false);
  const [isLessonLoading, setLessonIsLoading] = useState(false);
  const [isSubLessonLoading, setSubLessonIsLoading] = useState(false);

  const router = useRouter();
  const toastId = "edit-assignment";
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
      !assignmentTitle
    ) {
      toast({
        title: "Oops...",
        description:
          "Please complete all required field before updating assignment.",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
      return;
    }

    if (selectedCourseId && selectedLessonId && selectedSubLessonId) {
      const updateAssignment = axios.put(
        `/api/assignment/put?assignmentId=${assignmentId}`,
        {
          assignment_title: assignmentTitle,
          lesson_id: Number(selectedLessonId),
          sub_lesson_id: Number(selectedSubLessonId),
        }
      );

      if (!toast.isActive(toastId)) {
        toast.promise(updateAssignment, {
          success: {
            title: "Good to go :)",
            description: "Assignment has been updated succesfully.",
          },
          error: {
            title: "Oops.. :(",
            description: "Something wrong.",
          },
          loading: {
            title: "Updating Assignment",
            description: "Please wait.",
          },
        });
      }
      try {
        const result = await updateAssignment;
        if (result.status === 200) {
          router.push("/admin/assignments");
        }
      } catch (error) {
        console.log(error);
        console.error("Error creating assignment", error);
      }
    }
  };

  return (
    <div className="bg-white border border-[#E6E7EB] rounded-[16px] w-full h-full px-[100px] pt-10 pb-[60px] flex flex-col gap-[10px]">
      <form id="edit-assignment" onSubmit={handleAssignmentSubmit}>
        <div className="flex flex-col gap-5">
          <EditCourseSelect
            assignmentFromDb={assignmentFromDb}
            selectedCourseId={selectedCourseId}
            setSelectedCourseId={setSelectedCourseId}
            courses={courses}
            setCourses={setCourses}
            isCourseLoading={isCourseLoading}
            setCourseIsLoading={setCourseIsLoading}
          />

          <div className="flex gap-10">
            <EditLessonSelect
              assignmentFromDb={assignmentFromDb}
              selectedCourseId={selectedCourseId}
              setSelectedLessonId={setSelectedLessonId}
              selectedLessonId={selectedLessonId}
              lessons={lessons}
              setLessons={setLessons}
              isLessonLoading={isLessonLoading}
              setLessonIsLoading={setLessonIsLoading}
            />

            <EditSubLessonSelect
              assignmentFromDb={assignmentFromDb}
              selectedLessonId={selectedLessonId}
              setSelectedSubLessonId={setSelectedSubLessonId}
              subLessons={subLessons}
              setSubLessons={setSubLessons}
              isSubLessonLoading={isSubLessonLoading}
              setSubLessonIsLoading={setSubLessonIsLoading}
              selectedCourseId={selectedCourseId}
            />
          </div>
          <div className="border-b border-b-[#D6D9E4] w-full pt-5"></div>
        </div>
        <AdminEditAssignmentDetail
          assignmentFromDb={assignmentFromDb}
          assignmentTitle={assignmentTitle}
          setAssignmentTitle={setAssignmentTitle}
        />
      </form>
    </div>
  );
};
export default AdminEditAssignmentForm;
