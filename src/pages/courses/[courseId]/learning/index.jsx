import Navbar from "@/components/navbar/navbar.jsx";
import ActionBar from "@/components/course-learning-section/action-bar";
import CommonFooter from "@/components/footer/common-footer";
import CoursesContent from "@/components/course-learning-section/content";
import CoursesProgress from "@/components/course-learning-section/progress";

function CourseLearning() {
  return (
    <div className="w-full h-max">
      <Navbar />
      <div className="w-full h-full flex flex-col sm:flex-row sm:justify-center max-[640px]:items-center ">
        <CoursesProgress />
        <CoursesContent />
      </div>
      <ActionBar />
      <CommonFooter />
    </div>
  );
}

export default CourseLearning;
