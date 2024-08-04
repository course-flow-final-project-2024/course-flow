import CommonModalBox from "@/utils/common-modal";
import { CourseDetailContext } from "@/pages/courses/[courseId]";
import { useContext } from "react";

function CourseDetailModal() {
  const context = useContext(CourseDetailContext);
  const courseData = context.courseData;
  const buttonAction = context.buttonAction;

  return (
    <>
      <CommonModalBox
        open={context.openCourseModal}
        setOpen={context.setOpenCourseModal}
        AlertMessage={
          buttonAction === "add"
            ? `Do you want to add ${
                courseData.length > 0 && courseData[0].course_name
              } to your desired courses?`
            : buttonAction === "subscribe"
            ? `Do you want to subscribe to the ${
                courseData.length > 0 && courseData[0].course_name
              } Course?`
            : buttonAction === "delete"
            ? `Do you want to remove ${
                courseData.length > 0 && courseData[0].course_name
              } from you desire courses? `
            : null
        }
        leftText="No, I don't"
        rightText={
          buttonAction === "add"
            ? "Yes, add it"
            : buttonAction === "subscribe"
            ? "Yes, subscribe"
            : buttonAction === "delete"
            ? "Yes, remove it"
            : null
        }
        leftOnClick={() => context.setOpenCourseModal(false)}
        rightOnClick={
          buttonAction === "add"
            ? () => {
                context.handleAddDesiredCourse();
              }
            : buttonAction === "delete"
            ? () => {
                context.handleRemoveDesiredCourse();
              }
            : buttonAction === "subscribe"
            ? () => {
                context.handleSubscribeCourse();
              }
            : null
        }
      />
    </>
  );
}

export default CourseDetailModal;
