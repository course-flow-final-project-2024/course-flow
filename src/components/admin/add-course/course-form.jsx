import { LessonDataContext } from "@/pages/admin/add-course";
import FileUpload from "./file-upload";
import { useContext } from "react";

export function CourseDataForm({ errors, setFiles }) {
  const { formInput, setFormInput } = useContext(LessonDataContext);
  const inputStyle =
    "border border-[#D6D9E4] p-3 pr-4 rounded-[8px] outline-none";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  return (
    <div className="flex flex-col gap-10">
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
          placeholder="Place Holder"
          className={inputStyle}
          value={formInput.course_name}
          onChange={handleInputChange}
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
            placeholder="Place Holder"
            className={inputStyle}
            step="0.01"
            value={formInput.price}
            onChange={handleInputChange}
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
            placeholder="Place Holder"
            className={inputStyle}
            value={formInput.duration}
            onChange={handleInputChange}
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
          placeholder="Place Holder"
          rows={2}
          className={inputStyle}
          value={formInput.summary}
          onChange={handleInputChange}
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
          placeholder="Place Holder"
          rows={7}
          className={inputStyle}
          value={formInput.detail}
          onChange={handleInputChange}
        />
      </div>
      <FileUpload onFilesChange={setFiles} errors={errors} />
    </div>
  );
}
