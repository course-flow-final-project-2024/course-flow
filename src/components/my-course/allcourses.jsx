import CourseCard from "../courses/course-card";
import axios from "axios";
import { useEffect, useState } from "react";

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
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex gap-6 mt-10  ">
      <div className="flex flex-col items-center gap-6 py-8 px-6 rounded-lg shadow-lg sticky top-0 max-h-[396px]">
        <img
          src={user.image}
          alt="Profile Image"
          width={120}
          height={120}
          className="rounded-full object-cover bg-gray-200"
        />
        <div className="text-xl font-bold">{user.name}</div>
        <div className="flex flex-row gap-6 w-[309px]">
          <div className="flex flex-col gap-6 p-4 bg-[#F1F2F6] rounded-[8px] w-full">
            <p className="text-gray-600 text-xl font-thin">
              Courses <br /> Inprogress
            </p>
            <p className="text-xl font-semibold">{inprogressCount}</p>
          </div>
          <div className="flex flex-col gap-6 p-4 bg-[#F1F2F6] rounded-[8px] w-full">
            <p className="text-gray-600 text-xl font-thin">
              Courses <br /> completed
            </p>
            <p className="text-xl font-semibold">{completedCount}</p>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row flex-wrap gap-4 shadow-lg">
        {courses.map((item, index) => {
          return (
            <div className="grid justify-center" key={index}>
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
          );
        })}
      </div>
    </div>
  );
}
