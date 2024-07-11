import Button from "@/utils/button";

const AdminCreatingHeader = ({ section }) => {
  return (
    <div className="flex items-center gap-4 h-[92px] px-10 py-4 border-b border-gray-400 bg-white">
      <h3 className="grow font-medium text-[24px] text-gray-900 ">{section}</h3>
      <div className="flex w-[252px] gap-[16px] ">
        <Button text="Cancle" style="secondary" height="60px" />
        <Button text="Create" style="primary" height="60px" />
      </div>
    </div>
  );
};

export default AdminCreatingHeader;
