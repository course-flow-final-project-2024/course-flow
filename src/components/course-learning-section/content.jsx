import Image from "next/image";
function CoursesContent(prop) {
  return (
    <main className="w-full max-w-3xl h-full px-4 py-4 mt-[4%] flex flex-col gap-8">
      <h3 className="Course_Title text-2xl font-medium">Course Title</h3>
      <div className="video_trailer w-full">
        <Image
          src="/course-detail/mock-video.svg"
          width={343}
          height={214}
          alt="mock"
          className="object-cover w-full"
        />
      </div>
      <div className="Assgiment_past h-[260px] border-[1px] border-black"></div>
    </main>
  );
}
export default CoursesContent;
