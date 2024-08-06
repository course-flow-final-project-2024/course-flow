import Navbar from "@/components/navbar/navbar.jsx";
import MainDetail from "../../../components/course-detail-section/main/detail-section";
import OtherCourses from "../../../components/course-detail-section/other-courses/other-course-container";
import CommonBottomSection from "@/components/bottom-section/common-bottom-section";
import CommonFooter from "@/components/footer/common-footer";
import BottomCourseCard from "../../../components/course-detail-section/bottom-course-card/bottom-course-card";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import commaNumber from "comma-number";
import CourseDetailModal from "@/components/course-detail-section/buttons-and-modal/modal";

export const CourseDetailContext = React.createContext();

function CourseDetail() {
  const router = useRouter();
  const { courseId } = router.query;
  const [loginStatus, setLoginStatus] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [allCourseData, setAllCourseData] = useState([]);
  const [userCourseStatus, setUserCourseStatus] = useState(null);
  const [openCourseModal, setOpenCourseModal] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [buttonAction, setButtonAction] = useState(null);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [formattedPrice, setFormattedPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  async function checkLoginStatus() {
    const hasToken = Boolean(localStorage.getItem("token"));
    if (hasToken) {
      try {
        const result = await axios.get("/api/user-profile/get");
        const verification = result.data.user.id;
        if (verification) {
          setLoginStatus(true);
          return true;
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }
  }

  const getallCoursesData = async () => {
    try {
      const result = await axios.get(`/api/courses_detail/get_all`);
      setAllCourseData(result.data.coursesDetail);

      const filteredResult = result.data.coursesDetail.filter(
        (item) => item.course_id === Number(courseId)
      );
      if (filteredResult.length === 0) {
        throw new Error("Course not found");
      }

      setCourseData(filteredResult);
      setFormattedPrice(commaNumber(filteredResult[0].price));
      setOriginalPrice(filteredResult[0].price);
    } catch (error) {
      console.error("Error fetching courses data", error);
    }
  };

  const getUserCourseDetail = async () => {
    if (courseId) {
      const result = await axios.get("/api/courses_detail/get_user_courses", {
        params: { courseId },
      });
      const userCourseDetail = result.data.userCourseData;
      console.log(userCourseDetail);

      if (userCourseDetail.length > 0) {
        if (userCourseDetail[0].payment_status_id === 1) {
          setUserCourseStatus("bought");
        } else if (userCourseDetail[0].payment_status_id === 2) {
          setUserCourseStatus("added");
        }
      } else {
        setUserCourseStatus("none");
      }
    }
  };

  const handleAddDesiredCourse = async () => {
    setIsLoading(true);
    setOpenCourseModal(false);
    await axios.post("/api/courses_detail/post", {
      courseId,
    });
    getUserCourseDetail();
    setIsLoading(false);
  };

  const handleRemoveDesiredCourse = async () => {
    setIsLoading(true);
    setOpenCourseModal(false);
    await axios.delete("/api/courses_detail/delete", {
      params: { courseId },
    });
    getUserCourseDetail();
    setIsLoading(false);
  };

  const handleSubscribeCourse = async () => {
    setOpenCourseModal(false);
    setOpenPaymentModal(true);
  };

  useEffect(() => {
    const initFetch = async () => {
      const isLoggedIn = await checkLoginStatus();
      if (courseId) {
        await getallCoursesData();
        if (isLoggedIn) {
          await getUserCourseDetail();
        } else {
          setUserCourseStatus("guest");
        }
      }
    };

    initFetch();
  }, [courseId]);

  console.log(userCourseStatus);
  console.log(loginStatus);

  return (
    <div className="w-full h-max">
      <CourseDetailContext.Provider
        value={{
          allCourseData,
          formattedPrice,
          courseData,
          courseId,
          loginStatus,
          userCourseStatus,
          openCourseModal,
          setOpenCourseModal,
          openCourseModal,
          setButtonAction,
          buttonAction,
          setOpenPaymentModal,
          openPaymentModal,
          handleAddDesiredCourse,
          handleRemoveDesiredCourse,
          handleSubscribeCourse,
          originalPrice,
          isLoading,
        }}
      >
        <Navbar />
        <div className="w-full">
          {courseData.length === 0 ? (
            <div className="w-full min-h-[1000px] flex flex-col justify-center items-center gap-2">
              <span className="text-xl">Loading</span>
              <span className="loading loading-dots loading-lg"></span>
            </div>
          ) : (
            <>
              <MainDetail />
              <OtherCourses />
            </>
          )}
        </div>
        <CommonBottomSection />
        <CommonFooter />
        <BottomCourseCard />
        <CourseDetailModal />
      </CourseDetailContext.Provider>
    </div>
  );
}

export default CourseDetail;
