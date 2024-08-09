import Navbar from "@/components/navbar/navbar";
import CommonFooter from "@/components/footer/common-footer";
import PageDecoration from "@/components/courses/page-decoration";
import GetMyCourse from "@/components/my-course/mycourse.jsx";

function MyCourses() {
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
