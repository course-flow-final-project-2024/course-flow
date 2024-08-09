import Link from "next/link";
import Image from "next/image";
import LessonSamples from "./lesson-samples";
import SideCourseCard from "./side-course-card";
import { CourseDetailContext } from "@/pages/courses/[courseId]";
import { useContext, useState, useEffect, useRef } from "react";

function TopContent({ courseData, courseId }) {
  const [videoUrl, setVideoUrl] = useState("");
  const videoRef = useRef(null);

  useEffect(() => {
    const cleanupVideo = () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    };

    if (courseData.length > 0) {
      setVideoUrl(courseData[0].video_trailer);
    } else {
      setVideoUrl("");
    }

    cleanupVideo();

    return cleanupVideo;
  }, [courseData, courseId]);

  return (
    <div className="w-full h-max flex flex-col gap-4 ">
      <Link href="/courses" className="w-max flex flex-row gap-2 py-1 px-2 ">
        <Image
          src="/course-detail/left-arrow.svg"
          width={16}
          height={16}
          alt="back-arrow"
        />
        <span className="w-max h-max font-bold text-[#2F5FAC]">Back</span>
      </Link>
      <div className="w-full h-max overflow-hidden rounded-xl ">
        {videoUrl ? (
          <video
            ref={videoRef}
            className="w-full max-h-[600px] bg-black "
            width={1000}
            height={300}
            controls
            preload="auto"
            key={videoUrl}
            alt="video-trailer"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          <div className="text-center text-gray-500 w-full max-h-[600px] content-center text-xl bg-slate-100">
            <video
              className="w-full max-h-[600px] bg-black object-cover"
              width={1000}
              height={300}
              controls
              preload="none"
              poster="https://techcult.com/wp-content/uploads/2021/05/Fix-No-Video-with-Supported-Format-and-MIME-type-found.jpg"
              alt="video-not-avaliable"
            ></video>
          </div>
        )}
      </div>
    </div>
  );
}
function CourseDetail({ courseData }) {
  return (
    <div className="w-full h-max flex flex-col gap-4">
      <h3 className="w-full h-max text-left font-medium text-2xl lg:text-3xl ">
        Course Detail
      </h3>
      <div className="w-full h-max text-sm text-[#646D89] lg:text-sm xl:text-base">
        {courseData.length > 0 && courseData[0].detail}
      </div>
    </div>
  );
}

function MainDetail() {
  const context = useContext(CourseDetailContext);
  return (
    <div className="lg:flex h-max min-h-max lg:flex-row p-4 pb-10 flex flex-col gap-8 sm:px-12 ease-in-out duration-200 lg:px-40 min-[1800px]:px-96 ">
      <div className="w-full h-max flex flex-col gap-8 ">
        <TopContent
          courseData={context.courseData}
          courseId={context.courseId}
        />
        <CourseDetail courseData={context.courseData} />
        <LessonSamples courseData={context.courseData} />
      </div>
      <div className="max-lg:hidden w-[50%] flex-grow t-12 relative pt-12">
        <SideCourseCard courseData={context.courseData} />
      </div>
    </div>
  );
}

export default MainDetail;
