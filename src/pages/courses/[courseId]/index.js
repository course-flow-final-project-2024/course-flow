import Navbar from "@/components/navbar/navbar.jsx";
import MainDetail from "../../../components/course-detail-section/main/detail-section";
import OtherCourses from "../../../components/course-detail-section/other-courses/other-course-container";
import CommonBottomSection from "@/components/bottom-section/common-bottom-section";
import CommonFooter from "@/components/footer/common-footer";
import BottomCourseCard from "../../../components/course-detail-section/bottom-course-card/bottom-course-card";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function CourseDetail() {
  const [courseData, setCourseData] = useState([]);

  const router = useRouter();
  const { courseId } = router.query;

  const getData = async () => {
    const result = await axios.get(
      `/api/courses_detail/get_by_id?courseId=${courseId}`
    );
    setCourseData(result.data.courses);
  };

  useEffect(() => {
    if (courseId) {
      getData();
    }
  }, [courseId]);

  console.log(courseData);

  return (
    <div className="w-full h-max">
      <Navbar />
      <MainDetail courseData={courseData} />
      <OtherCourses courseData={courseData} />
      <CommonBottomSection />
      <CommonFooter />
      <BottomCourseCard courseData={courseData} />
    </div>
  );
}

export default CourseDetail;
