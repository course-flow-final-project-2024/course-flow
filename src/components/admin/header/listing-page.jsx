import { AddCourseContext } from "@/pages/_app";
import Button from "@/utils/button";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useContext } from "react";

const AdminListingHeader = ({ section, action, href }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { course, setCourse } = useContext(AddCourseContext);

  const handleSearch = (text) => {
    const params = new URLSearchParams(searchParams);

    if (text) {
      params.set("title", text);
    } else {
      params.delete("title");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleCreateClick = () => {
    const initialCourseState = {
      course_name: "",
      price: "",
      duration: "",
      summary: "",
      detail: "",
      course_image: null,
      video_trailer: null,
      attach_file: null,
      lessons: [],
    };
    setCourse(initialCourseState);
  };
  return (
    <div className="flex items-center gap-4 h-[92px] px-10 py-4 border-b border-[#D6D9E4] bg-white">
      <h3 className="w-full font-medium text-[24px] text-[#2A2E3F] ">
        {section}
      </h3>
      <div className="flex h-[60px] gap-[16px] ">
        <div className="flex gap-[10px] w-[320px] border border-gray-300 rounded-lg px-3 py-4">
          <Image
            src="/icons/search.svg"
            alt="Search Icon"
            width={24}
            height={24}
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full border-none outline-none"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            defaultValue={searchParams.get("title")?.toString()}
          />
        </div>

        <Link href={href} className="text-white font-extrabold text-center">
          <div className="flex w-[172px]">
            <Button
              style="primary"
              height="60px"
              text={action}
              onClick={handleCreateClick}
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminListingHeader;
