import Navbar from "@/components/navbar";
import MainDetail from "./main/detail-section";
import OtherCourses from "./other-courses/other-course-container";

function CourseDetail() {
  return (
    <div className="w-full h-max">
      <Navbar />
      <MainDetail />
      <OtherCourses />
    </div>
  );
}

export default CourseDetail;
