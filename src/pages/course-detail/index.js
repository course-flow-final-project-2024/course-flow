import Navbar from "@/components/navbar/navbar.jsx";
import MainDetail from "../../components/course-detail-section/main/detail-section";
import OtherCourses from "../../components/course-detail-section/other-courses/other-course-container";
import CommonBottomSection from "@/components/bottom-section/common-bottom-section";
import CommonFooter from "@/components/footer/common-footer";
import BottomCourseCard from "../../components/course-detail-section/bottom-course-card/bottom-course-card";

function CourseDetail() {
  return (
    <div className="w-full h-max">
      <Navbar />
      <MainDetail />
      <OtherCourses />
      <CommonBottomSection />
      <CommonFooter />
      <BottomCourseCard />
    </div>
  );
}

export default CourseDetail;
