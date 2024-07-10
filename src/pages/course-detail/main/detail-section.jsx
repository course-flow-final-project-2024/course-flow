import Link from "next/link";
import Image from "next/image";
import LessonSamples from "./lesson-samples";

function TopContent() {
  return (
    <div className="w-full h-max flex flex-col gap-4">
      <Link href="/" className="w-max flex flex-row gap-2 py-1 px-2">
        <Image src="course-detail/left-arrow.svg" width={16} height={16} />
        <span className="w-max h-max font-bold text-[#2F5FAC]">Back</span>
      </Link>
      <div className="w-full h-max">
        <Image src="course-detail/mock-video.svg" width={343} height={214} />
      </div>
    </div>
  );
}

function CourseDetail() {
  return (
    <div className="w-full h-max flex flex-col gap-4">
      <h3 className="w-full h-max text-left font-medium text-2xl ">
        Course Detail
      </h3>
      <div className="w-full h-max text-sm text-[#646D89]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum
        aenean fermentum, velit vel, scelerisque morbi accumsan. Nec, tellus leo
        id leo id felis egestas. Quam sit lorem quis vitae ut mus imperdiet.
        Volutpat placerat dignissim dolor faucibus elit ornare fringilla.
        Vivamus amet risus ullamcorper auctor nibh. Maecenas morbi nec
        vestibulum ac tempus vehicula. Vel, sit magna nisl cras non cursus. Sed
        sed sit ullamcorper neque. Dictum sapien amet, dictumst maecenas. Mattis
        nulla tellus ut neque euismod cras amet, volutpat purus. Semper purus
        viverra turpis in tempus ac nunc. Morbi ullamcorper sed elit enim
        turpis. Scelerisque rhoncus morbi pulvinar donec at sed fermentum. Duis
        non urna lacus, sit amet. Accumsan orci elementum nisl tellus sit quis.
        Integer turpis lectus eu blandit sit. At at cras viverra odio neque nisl
        consectetur. Arcu senectus aliquet vulputate urna, ornare. Mi sem tellus
        elementum at commodo blandit nunc. Viverra elit adipiscing ut dui,
        tellus viverra nec. Lectus pharetra eget curabitur lobortis gravida
        gravida eget ut. Nullam velit morbi quam a at. Sed eu orci, sociis nulla
        at sit. Nunc quam integer metus vitae elementum pulvinar mattis nulla
        molestie. Quis eget vestibulum, faucibus malesuada eu. Et lectus
        molestie egestas faucibus auctor auctor.
      </div>
    </div>
  );
}

function MainDetail() {
  return (
    <div className="w-full h-max p-4 flex flex-col gap-8">
      <TopContent />
      <CourseDetail />
      <LessonSamples />
    </div>
  );
}

export default MainDetail;
