import Image from "next/image";
import Link from "next/link";

const AdminListingHeader = (prop) => {
  return (
    <div className="flex items-center gap-4 w-full h-[92px] px-10 py-4 border-b border-gray-400 bg-white">
      <h3 className="w-full font-medium text-[24px] text-gray-900 ">
        {prop.title}
      </h3>
      <div className="flex w-[508px] h-[60px] gap-[16px] ">
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
            className="w-[254px] border-none"
          />
        </div>

        <button className="bg-blue-600 w-[172px] h-[60px] rounded-xl">
          <Link href="/admin/add-course" className="text-white font-extrabold">
            {prop.button}
          </Link>
        </button>
      </div>
    </div>
  );
};

export default AdminListingHeader;
