import { useEffect, useState } from "react";
import axios from "axios";

export default function ADdNewCourse() {
  const [courseList, setCourseList] = useState([]);
  async function getCourseList() {
    try {
      const result = await axios.get("/api/course");

      setCourseList(result.data.courses);
    } catch (error) {
      console.error("Error fetching course list:", error);
    }
  }

  useEffect(() => {
    getCourseList();
  }, []);

  return (
    <>
      <div>
        {courseList.map((item, index) => {
          return <li key={index}>{index}</li>;
        })}
        <h1>Good</h1>
      </div>
    </>
  );
}
