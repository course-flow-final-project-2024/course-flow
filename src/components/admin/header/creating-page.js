import Button from "@/utils/button";
import { useRouter } from "next/router";

const AdminCreatingHeader = ({ section, onClick }) => {
  const router = useRouter();

  const handleButtonClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleCancelClick = () => {
    router.push("/admin/courses");
  };

  return (
    <div className="flex items-center gap-4 h-[92px] px-10 py-4 border-b border-gray-400 bg-white">
      <h3 className="grow font-medium text-[24px] text-gray-900 ">{section}</h3>
      <div className="flex w-[252px] gap-[16px] ">
        <Button
          text="Cancel"
          style="secondary"
          height="60px"
          onClick={handleCancelClick}
        />
        <Button
          text="Create"
          style="primary"
          height="60px"
          onClick={handleButtonClick}
        />
      </div>
    </div>
  );
};

export default AdminCreatingHeader;
