import React from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

const AdminSidebar = () => {
  const router = useRouter();

  const handleLogOut = async () => {
    console.log("logout");
    try {
      const token = await JSON.parse(localStorage.getItem("token"))
      const response = await axios.post("/api/auth/logout", {token});
      localStorage.removeItem("token");
      router.push("/admin/login")
      return;
    } catch (err) {
      console.log("logout err", err)
      return {
        message: "Server could not logout",
      };
    }
  };
  return (
    <>
      <div
        id="sidebar"
        className="flex flex-col gap-10 min-w-60 h-full border-r border-gray-400 bg-white"
      >
        <div
          id="sidebar-header"
          className="flex flex-col gap-6 h-[131px] p-6 pt-10  items-center justify-center"
        >
          <Image
            src="/logo/CourseFlowLogo.svg"
            alt="course flow logo"
            width={174}
            height={19}
          />
          <p className="text-[16px] text-gray-700">Admin Panel Control</p>
        </div>
        <div id="sidebar-menu" className="flex flex-col h-[540px] ">
          <Link href="/admin/courses">
            <div
              id="course"
              className="flex gap-4 px-6 py-4 hover:bg-gray-200 active:bg-gray-300 focus:bg-gray-200"
            >
              <Image
                src="/icons/book.svg"
                alt="Course Icon"
                width={24}
                height={24}
              />
              <h3 className="text-gray-800 text-[16px] ">Course</h3>
            </div>
          </Link>
          <Link href="/admin/assignments">
            <div
              id="assignment"
              className="flex gap-4 px-6 py-4 hover:bg-gray-200 active:bg-gray-300 focus:bg-gray-200"
            >
              <Image
                src="/icons/copy.svg"
                alt="Assignment Icon"
                width={24}
                height={24}
              />
              <h3 className="text-gray-800 text-[16px] w-full ">Assignment</h3>
            </div>
          </Link>
        </div>
        <div>
          <div className="flex gap-4 px-6 py-4 hover:bg-gray-200 active:bg-gray-300 focus:bg-gray-200">
            <Image
              src="/icons/logout.svg"
              alt="Assignment Icon"
              width={24}
              height={24}
            />
            <h3 role="button" onClick={handleLogOut}>
              Log out
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminSidebar;
