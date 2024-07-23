import CommonModalBox from "@/utils/common-modal";
import commaNumber from "comma-number";
import { useRouter } from "next/router";
import Button from "@/utils/button";
import { useState } from "react";

function SideCourseCard({ courseData }) {
  const [openDesireCourseModal, setOpenDesireCourseModal] = useState(false);
  const [openSubscribeModal, setOpenSubscribeModal] = useState(false);

  const formattedPrice =
    courseData.length > 0 && commaNumber(courseData[0].price);

  const router = useRouter();

  function loginStatusCheck() {
    const userInfo = JSON.parse(localStorage.getItem("token"));
    if (userInfo) {
      return true;
    } else {
      router.push("/login");
      return false;
    }
  }

  function handleGetInDesireCourseClick() {
    if (loginStatusCheck()) {
      setOpenDesireCourseModal(true);
    }
  }

  function handleSubscribeClick() {
    if (loginStatusCheck()) {
      setOpenSubscribeModal(true);
    }
  }

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
        THB {formattedPrice}
      </h3>
      <div className="border-t-[1px] flex flex-col gap-4 pt-8">
        <Button
          style="secondary"
          text="Get in Desire Course"
          onClick={handleGetInDesireCourseClick}
        />
        <Button
          style="primary"
          text="Subscribe This Course"
          onClick={handleSubscribeClick}
        />
        <CommonModalBox
          open={openDesireCourseModal}
          setOpen={setOpenDesireCourseModal}
          text="Get in Desire Course"
          AlertMessage={`Do you want to add ${
            courseData.length > 0 && courseData[0].course_name
          } to your desire course?`}
          leftText="No, I don't"
          rightText="Yes, Add it"
          leftOnClick={() => setOpenDesireCourseModal(false)}
          rightOnClick={() => {
            setOpenDesireCourseModal(false);
          }}
          style="secondary"
        />
        <CommonModalBox
          open={openSubscribeModal}
          setOpen={setOpenSubscribeModal}
          text="Subscribe This Course"
          AlertMessage={`Do you want to subscribe to ${
            courseData.length > 0 && courseData[0].course_name
          } Course?`}
          leftText="No, I don't"
          rightText="Yes, I want to subscribe"
          leftOnClick={() => setOpenSubscribeModal(false)}
          rightOnClick={() => {
            setOpenSubscribeModal(false);
          }}
          style="primary"
        />
      </div>
    </div>
  );
}

export default SideCourseCard;
