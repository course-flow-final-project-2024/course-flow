import { AddCourseContext } from "@/pages/_app";
import { useContext } from "react";

export default function AddCourseInput({ errors }) {
  const { course, setCourse } = useContext(AddCourseContext);
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
          value={course.course_name}
          onChange={(e) => {
            const input = e.target.value;
            setCourse({ ...course, course_name: input });
          }}
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
            value={course.price}
            onChange={(e) => {
              const input = Number(e.target.value);
              setCourse({ ...course, price: input });
            }}
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
            value={course.duration}
            onChange={(e) => {
              const input = Number(e.target.value);
              setCourse({ ...course, duration: input });
            }}
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
          value={course.summary}
          onChange={(e) => {
            const input = e.target.value;
            setCourse({ ...course, summary: input });
          }}
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
          value={course.detail}
          onChange={(e) => {
            const input = e.target.value;
            setCourse({ ...course, detail: input });
          }}
        />
      </div>
    </>
  );
}
