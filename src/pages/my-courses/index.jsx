import Navbar from "@/components/navbar/navbar";
import CommonFooter from "@/components/footer/common-footer";
import PageDecoration from "@/components/courses/page-decoration";
import GetMyCourse from "@/components/my-course/mycourse.jsx";
import BottomProgressCard from "@/components/user-profile/bottom-progress-card";

function MyCourses() {
  return (
    <>
      <Navbar />
      <GetMyCourse />
      <PageDecoration />
      <CommonFooter />
      <BottomProgressCard />
    </>
  );
}
export default MyCourses;
