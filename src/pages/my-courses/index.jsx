import Navbar from "@/components/navbar/navbar";
import CommonFooter from "@/components/footer/common-footer";
import PageDecoration from "@/components/courses/page-decoration";
import GetMyCourse from "@/components/my-course/mycourse.jsx";
import { useRouter } from "next/router";
import { useEffect } from "react";

function MyCourses() {
  const router = useRouter();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("token"));
    if (!userInfo) {
      sessionStorage.removeItem("user");
      router.push("/login");
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-full absolute pt-[100px]">
        <PageDecoration />
      </div>
      <GetMyCourse />
      <CommonFooter />
      <div className="w-full h-[150px] bg-[#183056] relative bottom-0 z-0 min-[1070px]:hidden"></div>
    </>
  );
}
export default MyCourses;
