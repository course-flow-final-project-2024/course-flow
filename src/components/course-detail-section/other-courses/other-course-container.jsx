import CourseCard from "@/components/courses/course-card";
import axios from "axios";
import { useState, useEffect } from "react";

function OtherCourses() {
  const [allCourseData, setAllCourseData] = useState([]);
  const [errorStatus, setErrorStatus] = useState(null);
  const [randomCourses, setRandomCourses] = useState([]);

  let fetchCoursesData = async () => {
    try {
      setErrorStatus(null);
      let result = await axios.get("/api/courses_detail/get");
      setAllCourseData(result.data.courses);
    } catch {
      setErrorStatus("Failed to fetch courses");
      console.log(errorStatus);
    }
  };

  useEffect(() => {
    fetchCoursesData();
  }, []);

  const getRandomCourses = () => {
    if (allCourseData.length > 0) {
      let randomIndices = [];
      while (randomIndices.length < 3) {
        let randomIndex = Math.floor(Math.random() * allCourseData.length);
        if (!randomIndices.includes(randomIndex)) {
          randomIndices.push(randomIndex);
        }
      }
      setRandomCourses(randomIndices);
    }
  };

  useEffect(() => {
    getRandomCourses();
  }, [allCourseData]);

  return (
    <div className="w-full h-max px-4 py-10 bg-[#F6F7FC] lg:px-69">
      <div className="w-full h-max flex flex-col gap-4 items-center">
        <span className="font-medium text-2xl text-center">
          Other Interesting Course
        </span>
        <div className="w-full h-max flex flex-col items-center lg:flex-row lg:justify-center lg:gap-6 overflow-scroll ">
          {randomCourses.length > 0 ? (
            randomCourses.map((index) => {
              const course = allCourseData[index];
              return (
                <div
                  className="grid justify-center max-[375px]:scale-[0.8]"
                  key={course.course_id}
                >
                  <CourseCard
                    course_id={course.course_id}
                    course_image={course.course_image}
                    course_name={course.course_name}
                    summary={course.summary}
                    lessons={course.lessons}
                    duration={course.duration}
                    index={index}
                    key={index + course.course_name}
                  />
                </div>
              );
            })
          ) : (
            <span className="loading loading-dots loading-lg"></span>
          )}
        </div>
      </div>
    </div>
  );
}

export default OtherCourses;
