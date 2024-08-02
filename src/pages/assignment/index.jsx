import Navbar from "@/components/navbar/navbar";
import CommonFooter from "@/components/footer/common-footer";
import AssignmentTabs from "@/components/assignment/tabs";
import { createContext, useState } from "react";
import AssignmentCard from "@/components/assignment/card";

export const AssignmentContext = createContext();

function UserAssignment() {
  //get user-assignment
  //mockup data
  const assingmentData = [
    {
      course_title: "Course Title",
      sub_lesson_title: "Sub Lesson Title",
      assignment_title: "Assignment Title",
      status: "Pending",
    },
    {
      course_title: "Course Title",
      sub_lesson_title: "Sub Lesson Title",
      assignment_title: "Assignment Title",
      status: "In progress",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      course_title: "Course Title",
      sub_lesson_title: "Sub Lesson Title",
      assignment_title: "Assignment Title",
      status: "Submitted",
    },
    {
      course_title: "Course Title",
      sub_lesson_title: "Sub Lesson Title",
      assignment_title: "Assignment Title",
      status: "Overdue",
    },
  ];
  const [assignmentStatus, setAssignmentStatus] = useState(null);
  const valueInContext = {
    assingmentData,
    assignmentStatus,
    setAssignmentStatus,
  };
  return (
    <AssignmentContext.Provider value={valueInContext}>
      <div>
        <Navbar />
        <div className="w-full flex flex-col items-center gap-6 px-[8%] py-[5%]">
          <div className="header flex flex-col items-center gap-14">
            <h1 className="text-4xl font-medium">My Assignments</h1>
            <div className=" max-[400px]:w-[85vw] max-[400px]:overflow-x-scroll">
              <AssignmentTabs />
            </div>
          </div>
          <div className="w-full max-w-[1120px]">
            <AssignmentCard />
          </div>
        </div>
        <CommonFooter />
      </div>
    </AssignmentContext.Provider>
  );
}

export default UserAssignment;
