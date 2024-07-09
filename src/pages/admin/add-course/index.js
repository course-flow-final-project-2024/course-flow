import { useEffect, useState } from "react";
import axios from "axios";

export default function ADdNewCourse() {
  // const [courseList, setCourseList] = useState([]);
  // async function getCourseList() {
  //   try {
  //     console.log("AAA");
  //     let result = await axios.get("/api/courses");
  //     console.log("BBB");
  //     console.log(result);
  //     setCourseList(result.data.courses);
  //   } catch (error) {
  //     console.error("Error fetching the course list: ", error);
  //   }
  // }
  // useEffect(() => {
  //   getCourseList();
  // }, []);

  return (
    <>
      {/* <div>
        {courseList.map((item, index) => {
          return (
            <div key={index}>
              <p>{index}</p>
              <p>{item.course_name}</p>
            </div>
          );
        })}
      </div> */}
      <div>
        <h1 className="text-[100px]">ADD COURSE</h1>
      </div>
    </>
  );
}
