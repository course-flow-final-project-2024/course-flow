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
import { useToast } from "@chakra-ui/react";
import isNumber from "@/utils/numberChecking";

export const CourseDetailContext = React.createContext();

function CourseDetail() {
  const router = useRouter();
  const toast = useToast();
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
  const [buttonErrorMessage, setButtonErrorMessage] = useState(null);

  const showToast = (message) => {
    if (message !== "Course not found") {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

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
        setErrorMessage(
          "There was a problem retrieving user information. Please try logging in again."
        );
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
        console.error("Course not found");
        setErrorMessage("Course not found");
      } else {
        setCourseData(filteredResult);
        setFormattedPrice(commaNumber(filteredResult[0].price));
        setOriginalPrice(filteredResult[0].price);
      }
    } catch (error) {
      console.error("Error fetching courses data", error);
      setErrorMessage(
        "There was a problem retrieving course detail. Please try again later"
      );
    }
  };

  const getUserCourseDetail = async () => {
    if (courseId) {
      try {
        setIsLoading(true);
        const result = await axios.get("/api/courses_detail/get_user_courses", {
          params: { courseId },
        });
        const userCourseDetail = result.data.userCourseData;

        if (userCourseDetail.length > 0) {
          if (userCourseDetail[0].payment_status_id === 1) {
            setUserCourseStatus("bought");
          } else if (userCourseDetail[0].payment_status_id === 2) {
            setUserCourseStatus("added");
          }
        } else {
          setUserCourseStatus("none");
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching user's course detail", error);
        setErrorMessage(
          "There was a problem retrieving user's course detail. Please try again later"
        );
      }
    }
  };

  const handleAddDesiredCourse = async () => {
    setButtonErrorMessage(false);
    setOpenCourseModal(false);
    try {
      await axios.post("/api/courses_detail/post", {
        courseId,
      });
      getUserCourseDetail();
    } catch (error) {
      console.error("Error adding to desired course");
      setButtonErrorMessage(
        "There was a problem adding course to desired course list. Please try again later"
      );
    }
  };

  const handleRemoveDesiredCourse = async () => {
    setButtonErrorMessage(false);
    setOpenCourseModal(false);
    try {
      await axios.delete("/api/courses_detail/delete", {
        params: { courseId },
      });
      getUserCourseDetail();
    } catch (error) {
      console.error("Error removing from desired course", error);
      setButtonErrorMessage(
        "There was a problem removing course from desired course list. Please try again later"
      );
    }
  };

  const handleSubscribeCourse = async () => {
    setOpenCourseModal(false);
    setOpenPaymentModal(true);
  };

  useEffect(() => {
    const initFetch = async () => {
      if (courseId) {
        const isLoggedIn = await checkLoginStatus();
        if (isNumber(courseId)) {
          await getallCoursesData();
          if (isLoggedIn) {
            await getUserCourseDetail();
          } else {
            setUserCourseStatus("guest");
          }
        } else {
          setErrorMessage("Course not found");
        }
      }
    };

    initFetch();
  }, [courseId]);

  useEffect(() => {
    if (errorMessage) {
      showToast(errorMessage);
    }
  }, [errorMessage]);

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
          buttonErrorMessage,
        }}
      >
        <Navbar />
        <div className="w-full">
          {courseData.length === 0 && errorMessage === "Course not found" ? (
            <div className="w-full min-h-[1000px] pb-36 max-sm:min-h-[800px] flex flex-col justify-center items-center gap-8 p-4">
              <span className="text-9xl font-bold text-center">Oops</span>
              <span className="text-4xl font-semibold text-center">
                404 - Page not found
              </span>
              <span className="text-xl text-center">
                The page you are looking for might have been moved, removed, or
                is temporarily unavaliable.
              </span>
            </div>
          ) : courseData.length === 0 ||
            (errorMessage && errorMessage !== "Course not found") ? (
            <div className="w-full min-h-[1000px] max-sm:min-h-[800px] flex flex-col justify-center items-center gap-4">
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
        {!errorMessage && courseData.length > 0 && <BottomCourseCard />}
        <CourseDetailModal />
      </CourseDetailContext.Provider>
    </div>
  );
}

export default CourseDetail;
