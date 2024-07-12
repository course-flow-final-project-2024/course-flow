const AddCourseForm = () => {
  const inputStyle =
    "border border-[#D6D9E4] p-3 pr-4 rounded-[8px] outline-none";
  return (
    <div className=" bg-white min-w-[1120px] w-full  rounded-2xl px-[100px] pt-10 pb-[60px]">
      <form className="flex flex-col gap-10">
        <div className="flex flex-col gap-1 w-full">
          <label>Course name *</label>
          <input
            name="courseName"
            type="text"
            placeholder="Place Holder"
            className={inputStyle}
          />
        </div>
        <div className="flex gap-10">
          <div className="flex flex-col gap-1 w-full">
            <label>Price *</label>
            <input
              name="price"
              type="number"
              placeholder="Place Holder"
              className={inputStyle}
            />
          </div>
          <div className="flex grow flex-col gap-1 w-full">
            <label>Total learning time *</label>
            <input
              name="duration"
              type="number"
              placeholder="Place Holder"
              className={inputStyle}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label>Course summary *</label>
          <textarea
            name="summary"
            type="text"
            placeholder="Place Holder"
            rows={2}
            className={inputStyle}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label>Course detail *</label>
          <textarea
            name="detail"
            type="text"
            placeholder="Place Holder"
            rows={7}
            className={inputStyle}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label>Course detail *</label>
          <input
            name="coverImage"
            type="file"
            placeholder="Place Holder"
            rows={7}
            className={inputStyle}
            hidden
          />
          <div className="flex flex-col justify-center bg-[#F6F7FC] w-60 h-60 ">
            <p className="text-[#5483D0] text-center">+</p>
            <p className="text-[#5483D0] text-center">Upload Image</p>
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label>Video Trailer *</label>
          <input
            name="trailer"
            type="file"
            placeholder="Place Holder"
            rows={7}
            className={inputStyle}
            hidden
          />
          <div className="flex flex-col justify-center bg-[#F6F7FC] w-60 h-60 ">
            <p className="text-[#5483D0] text-center">+</p>
            <p className="text-[#5483D0] text-center">Upload Video</p>
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label>Attach file (Optional) *</label>
          <input
            name="trailer"
            type="file"
            placeholder="Place Holder"
            rows={7}
            className={inputStyle}
            hidden
          />
          <div className="flex flex-col justify-center bg-[#F6F7FC] w-40 h-40 ">
            <p className="text-[#5483D0] text-center">+</p>
            <p className="text-[#5483D0] text-center">Upload Video</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCourseForm;
