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
  const [courseData, setCourseData] = useState([]);
  const [allCourseData, setAllCourseData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loginStatus, setLoginStatus] = useState(false);
  const [userCourseStatus, setUserCourseStatus] = useState(null);
  const [openCourseModal, setOpenCourseModal] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [buttonAction, setButtonAction] = useState(null);
  const [formattedPrice, setFormattedPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);

  function checkLoginStatus() {
    const getUserStatus = JSON.parse(localStorage.getItem("token"));
    if (getUserStatus) {
      setLoginStatus(true);
      return true;
    } else {
      setLoginStatus(false);
      return false;
    }
  }
  const getallCoursesData = async () => {
    try {
      const result = await axios.get(`/api/courses_detail/get_all`);
      const filteredResult = result.data.courses.filter(
        (item) => item.course_id === Number(courseId)
      );

      if (filteredResult.length === 0) {
        throw new Error("Course not found");
      }

      setAllCourseData(result.data.courses);
      setCourseData(filteredResult);
      setFormattedPrice(commaNumber(filteredResult[0].price));
      setOriginalPrice(filteredResult[0].price);
    } catch (error) {
      console.error("Error fetching courses data", error);
    }
  };

  const fetchUserId = async () => {
    if (courseId) {
      const token = JSON.parse(localStorage.getItem("token"));
      const fetchedData = await axios.get(
        `/api/user-profile/get?token=${token}`
      );
      setUserId(fetchedData.data.user.id);
    }
  };

  const getUserCourseDetail = async () => {
    if (userId) {
      const fetchedCourseDetail = await axios.get(
        "/api/courses_detail/get_user_courses",
        { params: { userId, courseId } }
      );
      if (fetchedCourseDetail.data.data.length > 0) {
        if (fetchedCourseDetail.data.data[0].payment_status_id === 1) {
          setUserCourseStatus("bought");
        } else if (fetchedCourseDetail.data.data[0].payment_status_id === 2) {
          setUserCourseStatus("added");
        }
      } else {
        setUserCourseStatus("none");
      }
    }
  };

  const handleAddDesiredCourse = async () => {
    setOpenCourseModal(false);
    await axios.post("/api/courses_detail/post", {
      userId,
      courseId,
    });
    getUserCourseDetail();
  };

  const handleRemoveDesiredCourse = async () => {
    setOpenCourseModal(false);
    await axios.delete("/api/courses_detail/delete", {
      params: { userId, courseId },
    });
    getUserCourseDetail();
  };

  const handleSubscribeCourse = async () => {
    setOpenCourseModal(false);
    setOpenPaymentModal(true);
  };

  useEffect(() => {
    const initFetch = async () => {
      const isLoggedIn = checkLoginStatus();
      if (courseId) {
        await getallCoursesData();
        if (isLoggedIn) {
          await fetchUserId();
          if (userId) {
            await getUserCourseDetail();
          }
        } else {
          setUserCourseStatus("guest");
        }
      }
    };

    initFetch();
  }, [courseId, userId, loginStatus]);

  return (
    <div className="w-full h-max">
      <CourseDetailContext.Provider
        value={{
          allCourseData,
          formattedPrice,
          courseData,
          courseId,
          userId,
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
        }}
      >
        <Navbar />
        <MainDetail />
        <OtherCourses />
        <CommonBottomSection />
        <CommonFooter />
        <BottomCourseCard />
        <CourseDetailModal />
      </CourseDetailContext.Provider>
    </div>
  );
}

export default CourseDetail;
