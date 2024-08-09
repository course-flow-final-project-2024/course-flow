import Button from "@/utils/button";
import { CourseDetailContext } from "@/pages/courses/[courseId]";
import { useContext } from "react";
import { useRouter } from "next/router";

function CourseCardAddAndRemove(props) {
  const router = useRouter();
  const context = useContext(CourseDetailContext);
  const isLoading = context.isLoading;
  const redirectId = context.courseId;

  const handleStartLearning = () => {
    router.push(`/courses/${context.courseId}/learning`);
  };

  return (
    <>
      {context.userCourseStatus === "none" ? (
        <>
          {!isLoading ? (
            <Button
              style="secondary"
              text="Get in Desired Course"
              onClick={() => {
                if (context.loginStatus) {
                  context.setOpenCourseModal(true);
                  context.setButtonAction("add");
                }
              }}
              customStyle={props.customStyle}
            />
          ) : (
            <Button
              style="secondary"
              text={<span className="loading loading-dots loading-md"></span>}
              customStyle={props.customStyle}
            />
          )}

          <Button
            style="primary"
            text="Subscribe This Course"
            onClick={() => {
              if (context.loginStatus) {
                context.setOpenCourseModal(true);
                context.setButtonAction("subscribe");
              }
            }}
            customStyle={props.customStyle}
          />
        </>
      ) : context.userCourseStatus === "added" ? (
        <>
          {!isLoading ? (
            <Button
              style="secondary"
              text="Remove from Desired Course"
              onClick={() => {
                if (context.loginStatus) {
                  context.setOpenCourseModal(true);
                  context.setButtonAction("delete");
                }
              }}
              customStyle={props.customStyle}
            />
          ) : (
            <Button
              style="secondary"
              text={<span className="loading loading-dots loading-md"></span>}
              customStyle={props.customStyle}
            />
          )}

          <Button
            style="primary"
            text="Subscribe This Course"
            onClick={() => {
              if (context.loginStatus) {
                context.setOpenCourseModal(true);
                context.setButtonAction("subscribe");
              }
            }}
            customStyle={props.customStyle}
          />
        </>
      ) : context.userCourseStatus === "bought" ? (
        <Button
          style="primary"
          text="Start Learning"
          customStyle={props.customStyle}
          onClick={handleStartLearning}
        />
      ) : context.userCourseStatus === "guest" ? (
        <>
          <Button
            style="secondary"
            text="Get in Desired Course"
            onClick={() => {
              router.push(`/login/?redirectC=${redirectId}`);
            }}
            customStyle={props.customStyle}
          />
          <Button
            style="primary"
            text="Subscribe This Course"
            onClick={() => {
              router.push(`/login/?redirectC=${redirectId}`);
            }}
            customStyle={props.customStyle}
          />
        </>
      ) : null}
    </>
  );
}

export default CourseCardAddAndRemove;
