import Button from "@/utils/button";
import { CourseDetailContext } from "@/pages/courses/[courseId]";
import { useContext } from "react";
import { useRouter } from "next/router";

function CourseCardAddAndRemove(props) {
  const router = useRouter();
  const context = useContext(CourseDetailContext);

  return (
    <>
      {context.userCourseStatus === "none" ? (
        <>
          <Button
            style="secondary"
            text="Get in Desire Course"
            onClick={() => {
              if (context.loginStatus) {
                context.setOpenCourseModal(true);
                context.setButtonAction("add");
              }
            }}
            customStyle={props.customStyle}
          />
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
          <Button
            style="secondary"
            text="Remove from Desire Course"
            onClick={() => {
              if (context.loginStatus) {
                context.setOpenCourseModal(true);
                context.setButtonAction("delete");
              }
            }}
            customStyle={props.customStyle}
          />
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
        />
      ) : context.userCourseStatus === "guest" ? (
        <>
          <Button
            style="secondary"
            text="Get in Desire Course"
            onClick={() => {
              router.push("/login");
            }}
            customStyle={props.customStyle}
          />
          <Button
            style="primary"
            text="Subscribe This Course"
            onClick={() => {
              router.push("/login");
            }}
            customStyle={props.customStyle}
          />
        </>
      ) : null}
    </>
  );
}

export default CourseCardAddAndRemove;
