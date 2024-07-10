import Image from "next/image";
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const AdminListingHeader = ({ section, action, href }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("title", term);
    } else {
      params.delete("title");
    }
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <div className="flex items-center gap-4 h-[92px] px-10 py-4 border-b border-gray-400 bg-white">
      <h3 className="w-full font-medium text-[24px] text-gray-900 ">
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
          <button className=" bg-blue-600 w-[172px] h-[60px] rounded-xl hover:bg-blue-800 active:bg-blue-600 focus:bg-blue-800 cursor-pointer">
            {action}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdminListingHeader;
