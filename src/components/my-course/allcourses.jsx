import CourseCard from "../courses/course-card";
import axios from "axios";
import { useEffect, useState } from "react";
import BottomProgressCard from "./bottom-progress-card";

export default function Allcourses() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedCount, setCompletedCount] = useState(0);
  const [inprogressCount, setInprogressCount] = useState(0);

  useEffect(() => {
    const getMyCourses = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        if (!token) {
          throw new Error("No token found");
        }

        const userResponse = await axios.get("/api/user-profile/get", {
          headers: {
            Authorization: token,
          },
        });

        setUser(userResponse.data.user);
        const coursesResponse = await axios.get("/api/coursesprogres/getall", {
          headers: {
            Authorization: token,
          },
        });

        setCompletedCount(coursesResponse.data.completedCount);
        setInprogressCount(coursesResponse.data.inprogressCount);
        setCourses(coursesResponse.data.data);
      } catch (error) {
        console.error("Error get user or courses:", error);
      } finally {
        setLoading(false);
      }
    };
    getMyCourses();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-[1000px] flex flex-col gap-4 justify-center items-center">
        <span className="text-2xl">Loading</span>
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <div className="w-full min-h-[1000px] flex gap-2 mt-10 relative">
        <div className="w-[357px] flex h-max flex-col items-center gap-6 py-8 px-6 rounded-lg shadow-lg sticky top-0 max-[1070px]:hidden">
          <img
            src={user?.image}
            alt="user image"
            width={120}
            height={120}
            className="rounded-full object-cover bg-teal-600"
          />
          <div className="text-2xl font-medium text-center text-[#424C6B]">
            {user?.name}
          </div>
          <div className="flex flex-row gap-6 w-[309px]">
            <div className="flex flex-col gap-6 p-4 bg-[#F1F2F6] rounded-[8px] w-full">
              <p className="text-gray-600 text-xl font-normal">
                Courses <br /> Inprogress
              </p>
              <p className="text-2xl font-semibold">{inprogressCount}</p>
            </div>
            <div className="flex flex-col gap-6 p-4 bg-[#F1F2F6] rounded-[8px] w-full">
              <p className="text-gray-600 text-xl font-normal">
                Courses <br /> Completed
              </p>
              <p className="text-2xl font-semibold">{completedCount}</p>
            </div>
          </div>
        </div>

        <div className="w-full grid justify-items-center min-[2000px]:px-4 grid-cols-[repeat(auto-fill,minmax(360px,1fr))] max-sm:overflow-scroll">
          {courses.map((item, index) => (
            <div className=" w-max h-max" key={index}>
              <CourseCard
                course_id={item.course_id}
                course_image={item.courses.course_image}
                course_name={item.courses.course_name}
                summary={item.courses.summary}
                lessons={item.courses.lessons}
                duration={item.courses.duration}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
      <BottomProgressCard
        userImage={user?.image}
        userName={user?.name}
        inProgressCount={inprogressCount}
        completedCount={completedCount}
      />
    </>
  );
}
