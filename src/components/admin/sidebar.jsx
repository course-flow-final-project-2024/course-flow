import React from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

const AdminSidebar = ({ section }) => {
  let courseBg = null;
  let assignmentBg = null;
  let logOutBg = null;
  if (section === "course") {
    courseBg = "bg-[#F1F2F6]";
  } else if (section === "assignment") {
    assignmentBg = "bg-[#F1F2F6]";
  } else if (section === "log out") {
    logOutBg = "bg-[#F1F2F6]";
  }
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      const token = await JSON.parse(localStorage.getItem("token"));
      const response = await axios.post("/api/auth/logout", { token });
      localStorage.removeItem("token");
      router.push("/admin/login");
      return;
    } catch (err) {
      return {
        message: "Server could not logout",
      };
    }
  };

  return (
    <>
      <div
        id="sidebar"
        className="flex flex-col gap-10 min-w-60 border-r border-[#D6D9E4] bg-white"
      >
        <div
          id="sidebar-header"
          className="flex flex-col gap-6 p-6 pt-10 items-center justify-center"
        >
          <Image
            src="/logo/CourseFlowLogo.svg"
            alt="CourseFlow logo"
            width={174}
            height={19}
          />
          <p className="text-[16px] text-[#646D89]">Admin Panel Control</p>
        </div>
        <div id="sidebar-menu" className="flex flex-col min-h-[540px] ">
          <Link href="/admin/courses">
            <div
              className={`flex gap-4 px-6 py-4 hover:bg-[#F6F7FC] active:bg-[#F1F2F6] ${courseBg}`}
            >
              <Image
                src="/icons/admin/book.svg"
                alt="Course Icon"
                width={24}
                height={24}
              />
              <h3 className="text-[#424C6B] text-[16px] ">Course</h3>
            </div>
          </Link>
          <Link href="/admin/assignments">
            <div
              className={`flex gap-4 px-6 py-4 hover:bg-[#F6F7FC] active:bg-[#F1F2F6] ${assignmentBg}`}
            >
              <Image
                src="/icons/admin/copy.svg"
                alt="Assignment Icon"
                width={24}
                height={24}
              />
              <h3 className="text-[#424C6B] text-[16px] w-full">Assignment</h3>
            </div>
          </Link>
        </div>
        <div>
          <div
            className={`flex gap-4 px-6 py-4 hover:bg-[#F6F7FC] active:bg-[#F1F2F6] ${logOutBg}`}
          >
            <Image
              src="/icons/admin/logout.svg"
              alt="Assignment Icon"
              width={24}
              height={24}
            />

            <h3
              className="text-[#424C6B] text-[16px] w-full"
              role="button"
              onClick={handleLogOut}
            >
              Log out
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminSidebar;
