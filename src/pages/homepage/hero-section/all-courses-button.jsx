import Link from "next/link";

function AllCoursesButton() {
  return (
    <Link
      href="/"
      className="h-16 broder-2 border-black bg-blueButton px-8 py-4 rounded-2xl text-white font-bold flex items-center "
    >
      Explore Courses
    </Link>
  );
}

export default AllCoursesButton;
