import React from "react";
import Image from "next/image";

const AdminSidebar = () => {
  return (
    <>
      <div
        id="sidebar"
        className="flex flex-col gap-10 w-[320px] h-full border-r border-gray-400 bg-white"
      >
        <div
          id="sidebar-header"
          className="flex flex-col gap-6 h-fit p-6 pt-10 items-center justify-center"
        >
          <Image
            src="/logo/CourseFlowLogo.svg"
            width={174}
            height={19}
            alt="course-flox-logo"
          />
          <p className=" text-gray-700 text-center w-[154px]">
            Admin Panel Control
          </p>
        </div>
        <div
          id="sidebar-menu"
          className="flex flex-col justify-between h-full pb-[30vh]"
        >
          <div>
            <div
              id="course"
              className="flex gap-4 px-6 py-4 hover:bg-gray-200 active:bg-gray-300 focus:bg-gray-200 cursor-pointer"
            >
              <Image
                src="/icons/book.svg"
                alt="Course Icon"
                width={24}
                height={24}
              />
              <h3 className="text-gray-800 text-[16px] ">Course</h3>
            </div>
            <div
              id="assignment"
              className="flex gap-4 px-6 py-4 hover:bg-gray-200 active:bg-gray-300 focus:bg-gray-200 cursor-pointer"
            >
              <Image
                src="/icons/copy.svg"
                alt="Assignment Icon"
                width={24}
                height={24}
              />
              <h3 className="text-gray-800 text-[16px] w-full ">Assignment</h3>
            </div>
          </div>
          <div className="flex gap-4 px-6 py-4 hover:bg-gray-200 active:bg-gray-300 focus:bg-gray-200 cursor-pointer">
            <Image
              src="/icons/logout.svg"
              alt="Logout Icon"
              width={24}
              height={24}
            />
            <h3>Log out</h3>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminSidebar;
