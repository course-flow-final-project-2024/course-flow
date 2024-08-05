const AdminAddAssignmentDetail = () => {
  return (
    <div className="flex flex-col gap-10 pt-10">
      <h3 className="text-[#646D89] font-[600] text-xl">Assignment detail</h3>
      <div className="flex flex-col gap-1">
        <label>Assignment *</label>
        <input
          className="border border-[#D6D9E4] rounded-[8px] h-12 py-3 pl-3 pr-4"
          placeholder="please enter assignment"
        />
      </div>
    </div>
  );
};

export default AdminAddAssignmentDetail;
