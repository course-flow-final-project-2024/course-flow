import { useState } from "react";
import AdminAddAssignmentDetail from "./assignment-detail";
import CourseSelect from "./select-course";
import LessonSelect from "./select-lesson";
import SubLessonSelect from "./select-sub-lesson";

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

  return (
    <div className="bg-white border border-[#E6E7EB] rounded-[16px] w-full h-full px-[100px] pt-10 pb-[60px] flex flex-col gap-[10px]">
      <form id="add-assignment">
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
          <div className="border border-b-[#D6D9E4] w-full"></div>
        </div>
        <AdminAddAssignmentDetail setAssignment={setAssignment} />
      </form>
    </div>
  );
};
export default AdminAddAssignmentForm;
