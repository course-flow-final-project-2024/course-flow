import Navbar from "@/components/navbar/navbar.jsx";
import MainDetail from "./main/detail-section";
import OtherCourses from "./other-courses/other-course-container";
import CommonBottomSection from "@/components/bottom-section/common-bottom-section";
import CommonFooter from "@/components/footer/common-footer";

function CourseDetail() {
  return (
    <div className="w-full h-max">
      <Navbar />
      <MainDetail />
      <OtherCourses />
      <CommonBottomSection />
      <CommonFooter />
    </div>
  );
}

export default CourseDetail;
