import CommonModalBox from "@/utils/common-modal";
import commaNumber from "comma-number";
import { useRouter } from "next/router";
import Button from "@/utils/button";
import { useEffect, useState } from "react";
import axios from "axios";

function SideCourseCard({ courseData }) {
  const router = useRouter();
  const { courseId } = router.query;
  const [openCourseModal, setOpenCourseModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userCourseStatus, setUserCourseStatus] = useState(null);
  const [buttonAction, setButtonAction] = useState(null);

  const formattedPrice =
    courseData.length > 0 && commaNumber(courseData[0].price);

  function loginStatusCheck() {
    const userInfo = JSON.parse(localStorage.getItem("token"));
    if (userInfo) {
      return true;
    } else {
      router.push("/login");
      return false;
    }
  }

  const handleAddDesiredCourse = async () => {
    setOpenCourseModal(false);
    await axios.post("/api/courses_detail/post", {
      userId,
      courseId,
    });
    getUserCourseDetail();
  };

  const handleRemoveDesiredCourse = async () => {
    setOpenCourseModal(false);
    await axios.delete("/api/courses_detail/delete", {
      params: { userId, courseId },
    });
    getUserCourseDetail();
  };

  const fetchData = async () => {
    if (router.isReady) {
      const token = JSON.parse(localStorage.getItem("token"));
      const fetchedData = await axios.get(
        `/api/user-profile/get?token=${token}`
      );
      setUserId(fetchedData.data.user.id);
    }
  };

  const getUserCourseDetail = async () => {
    if (userId) {
      const fetchedCourseDetail = await axios.get(
        "/api/courses_detail/get_user_courses",
        { params: { userId, courseId } }
      );
      if (fetchedCourseDetail.data.data.length > 0) {
        if (fetchedCourseDetail.data.data[0].payment_status_id === 1) {
          setUserCourseStatus("bought");
        } else if (fetchedCourseDetail.data.data[0].payment_status_id === 2) {
          setUserCourseStatus("added");
        }
      } else {
        setUserCourseStatus("none");
      }
    }
  };

  useEffect(() => {
    fetchData().then(() => {
      getUserCourseDetail();
    });
  }, [router.isReady, courseId, userId, userCourseStatus]);

  return (
    <div className="w-full h-max shadow-lg py-8 px-6 flex flex-col gap-6 rounded-lg sticky top-10 ">
      <div className="w-full text-sm text-[#F47E20]">Course</div>
      <div className="w-full flex flex-col gap-2">
        <h3 className="font-medium md:text-xl xl:text-2xl text-black">
          {courseData.length > 0 && courseData[0].course_name}
        </h3>
        <span className="text-[#646D89] md:text-sm xl:text-base ">
          {courseData.length > 0 && courseData[0].summary}
        </span>
      </div>
      <h3 className="w-full h-max font-medium md:text-xl xl:text-2xl text-[#646D89]">
        {userCourseStatus === "bought" ? null : `THB ${formattedPrice}`}
      </h3>
      {userCourseStatus === "none" ? (
        <>
          <Button
            style="secondary"
            text="Get in Desire Course"
            onClick={() => {
              if (loginStatusCheck()) {
                setOpenCourseModal(true);
                setButtonAction("add");
              }
            }}
          />
          <Button
            style="primary"
            text="Subscribe This Course"
            onClick={() => {
              if (loginStatusCheck()) {
                setOpenCourseModal(true);
                setButtonAction("subscribe");
              }
            }}
          />
        </>
      ) : userCourseStatus === "added" ? (
        <>
          <Button
            style="secondary"
            text="Remove from Desire Course"
            onClick={() => {
              if (loginStatusCheck()) {
                setOpenCourseModal(true);
                setButtonAction("delete");
              }
            }}
          />
          <Button
            style="primary"
            text="Subscribe This Course"
            onClick={() => {
              if (loginStatusCheck()) {
                setOpenCourseModal(true);
                setButtonAction("subscribe");
              }
            }}
          />
        </>
      ) : userCourseStatus === "bought" ? (
        <Button style="primary" text="Start Learning" />
      ) : null}

      <CommonModalBox
        open={openCourseModal}
        setOpen={setOpenCourseModal}
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
        leftOnClick={() => setOpenCourseModal(false)}
        rightOnClick={
          buttonAction === "add"
            ? () => {
                handleAddDesiredCourse();
              }
            : buttonAction === "delete"
            ? () => {
                handleRemoveDesiredCourse();
              }
            : null
        }
      />

      <div className="border-t-[1px] flex flex-col gap-4 pt-8"></div>
    </div>
  );
}

export default SideCourseCard;
