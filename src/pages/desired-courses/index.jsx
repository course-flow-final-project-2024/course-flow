import Navbar from "@/components/navbar/navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import React from "react";
import CommonFooter from "@/components/footer/common-footer";
import DesiredCourseContainer from "@/components/desired-courses/courses-container";
import PageDecoration from "@/components/courses/page-decoration";

export const DesiredCoursesContext = React.createContext();

function DesiredCourses() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [userDesiredCourses, setUserDesiredCourses] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(null);
  const [errorStatus, setErrorStatus] = useState(null);

  const fetchUserId = async () => {
    setErrorStatus(false);
    try {
      setLoadingStatus(true);
      const token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        const response = await axios.get(
          `/api/user-profile/get?token=${token}`
        );
        setUserId(response.data.user.id);
        return true;
      } else {
        router.push("/login");
      }
      setLoadingStatus(false);
    } catch (error) {
      setErrorStatus(true);
      console.error(error);
    }
  };

  const fetchUserDesiredCourses = async () => {
    setErrorStatus(false);
    try {
      setLoadingStatus(true);
      const result = await axios.get("/api/desired-courses/get", {
        params: { userId },
      });
      setUserDesiredCourses(result.data.data);
      setLoadingStatus(false);
    } catch (error) {
      setErrorStatus(true);
      console.error(error);
    }
  };

  useEffect(() => {
    const initFetch = async () => {
      const isLoggedIn = fetchUserId();
      if (isLoggedIn && userId) {
        await fetchUserDesiredCourses();
      }
    };

    initFetch();
  }, [userId]);

  return (
    <div className="w-full h-max">
      <DesiredCoursesContext.Provider
        value={{
          userDesiredCourses,
          loadingStatus,
          errorStatus,
        }}
      >
        <Navbar />
        <PageDecoration />
        <DesiredCourseContainer />
        <CommonFooter />
      </DesiredCoursesContext.Provider>
    </div>
  );
}

export default DesiredCourses;
