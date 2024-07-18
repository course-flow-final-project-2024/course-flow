export default function AddCourseInput({ errors }) {
  const inputStyle =
    "border border-[#D6D9E4] p-3 pr-4 rounded-[8px] outline-none h-auto";
  return (
    <>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex gap-2">
          <label>Course name *</label>
          {errors.course_name && (
            <span className="text-red-500">{errors.course_name}</span>
          )}
        </div>
        <input
          name="course_name"
          type="text"
          placeholder="Please enter course name"
          className={inputStyle}
        />
      </div>
      <div className="flex gap-10">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex gap-2">
            <label>Price *</label>
            {errors.price && (
              <span className="text-red-500">{errors.price}</span>
            )}
          </div>
          <input
            name="price"
            type="number"
            placeholder="Please enter course price"
            className={inputStyle}
            step="0.01"
          />
        </div>
        <div className="flex grow flex-col gap-1 w-full">
          <div className="flex gap-2">
            <label>Total learning time *</label>
            {errors.duration && (
              <span className="text-red-500">{errors.duration}</span>
            )}
          </div>
          <input
            name="duration"
            type="number"
            placeholder="Please enter total learning time"
            className={inputStyle}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex gap-2">
          <label>Course summary *</label>
          {errors.summary && (
            <span className="text-red-500">{errors.summary}</span>
          )}
        </div>
        <textarea
          name="summary"
          type="text"
          placeholder="Please enter course summary"
          rows={2}
          className={inputStyle}
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex gap-2">
          <label>Course detail *</label>
          {errors.detail && (
            <span className="text-red-500">{errors.detail}</span>
          )}
        </div>
        <textarea
          name="detail"
          type="text"
          placeholder="Please enter course detail"
          rows={7}
          className={inputStyle}
        />
      </div>
    </>
  );
}
