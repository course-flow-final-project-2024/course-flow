import Navbar from "@/components/navbar/navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import React from "react";
import CommonFooter from "@/components/footer/common-footer";
import DesiredCourseContainer from "@/components/desired-courses/courses-container";

export const DesiredCoursesContext = React.createContext();

function DesiredCourses() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [userDesiredCourses, setUserDesiredCourses] = useState([]);

  const fetchUserId = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      const response = await axios.get(`/api/user-profile/get?token=${token}`);
      setUserId(response.data.user.id);
      return true;
    } else {
      router.push("/login");
    }
  };

  const fetchUserDesiredCourses = async () => {
    try {
      const result = await axios.get("/api/desired-courses/get", {
        params: { userId },
      });
      setUserDesiredCourses(result.data.data);
    } catch (error) {
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
      <DesiredCoursesContext.Provider value={{ userDesiredCourses }}>
        <Navbar />
        <DesiredCourseContainer />
        <CommonFooter />
      </DesiredCoursesContext.Provider>
    </div>
  );
}

export default DesiredCourses;
