const AdminCreatingHeader = ({ section }) => {
  return (
    <div className="flex items-center gap-4 h-[92px] px-10 py-4 border-b border-gray-400 bg-white">
      <h3 className="w-full font-medium text-[24px] text-gray-900 ">
        {section}
      </h3>
      <div className="flex h-[60px] gap-[16px] "></div>
    </div>
  );
};

export default AdminCreatingHeader;
