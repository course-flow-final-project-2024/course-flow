import { AddCourseContext } from "@/pages/_app";
import { useContext, useEffect } from "react";

export default function FileUpload({ errors }) {
  const { course, setCourse } = useContext(AddCourseContext);

  useEffect(() => {
    if (!course.files) {
      setCourse({
        ...course,
        files: { course_image: null, video_trailer: null, attach_file: null },
      });
    }
  }, []);

  const handleFileChange = (event, fileType) => {
    const file = event.target.files[0];
    const updatedCourse = {
      ...course,
      [fileType]: file,
      files: { ...course.files, [fileType]: file },
    };
    setCourse(updatedCourse);
    event.target.value = "";
  };

  const handleRemoveFile = (fileType) => {
    const updatedCourse = {
      ...course,
    };
    delete updatedCourse[fileType];
    delete updatedCourse.files[fileType];
    setCourse(updatedCourse);
  };

  return (
    <>
      <div className="flex flex-col gap-1 w-full">
        <div className="cover-image flex gap-2">
          <label htmlFor="img-upload">Cover image *</label>
          {errors.coverImage && (
            <span className="text-red-500">{errors.coverImage}</span>
          )}
        </div>
        <input
          id="img-upload"
          name="coverImage"
          type="file"
          accept="image/*"
          hidden
          onChange={(event) => handleFileChange(event, "course_image")}
        />
        {course.files?.course_image ? (
          <div
            className="image-preview w-60
              h-60 relative flex justify-center items-center rounded-[8px] bg-[#F6F7FC] overflow-hidden"
          >
            <img
              src={URL.createObjectURL(course.files.course_image)}
              alt={course.files.course_image.name}
            />
            <button
              className="rounded-full bg-[#9B2FAC] w-4 h-4 text-center text-white text-[8px]  top-[6px] right-[6px] absolute"
              onClick={() => {
                handleRemoveFile("course_image");
              }}
              aria-label="Remove cover image"
            >
              X
            </button>
          </div>
        ) : (
          <label
            htmlFor="img-upload"
            className="flex flex-col justify-center bg-[#F6F7FC] w-60 h-60"
          >
            <p className="text-[#5483D0] text-center">+</p>
            <p className="text-[#5483D0] text-center">Upload Image</p>
          </label>
        )}
      </div>

      <div className="trailer flex flex-col gap-1 w-full">
        <div className="flex gap-2">
          <label htmlFor="trailer-upload">Video Trailer *</label>
          {errors?.trailer && (
            <span className="text-red-500">{errors.trailer}</span>
          )}
        </div>
        <input
          id="trailer-upload"
          name="trailer"
          type="file"
          accept="video/*"
          hidden
          onChange={(event) => handleFileChange(event, "video_trailer")}
        />
        {course.files?.video_trailer ? (
          <div
            className="trailer-preview w-60
                h-60 relative bg-[#F6F7FC] flex justify-center items-center rounded-[8px]"
          >
            <video
              controls
              src={URL.createObjectURL(course.files.video_trailer)}
              type="video/mp4"
              className="h-full w-full rounded-2xl"
            >
              Your browser does not support video display.
            </video>
            <button
              className="rounded-full bg-[#9B2FAC] w-4 h-4 text-center text-white text-[8px]  top-[6px] right-[6px] absolute"
              onClick={() => {
                handleRemoveFile("video_trailer");
              }}
              aria-label="Remove cover image"
            >
              X
            </button>
          </div>
        ) : (
          <label
            htmlFor="trailer-upload"
            className="flex flex-col justify-center bg-[#F6F7FC] w-60 h-60 rounded-[8px]"
          >
            <p className="text-[#5483D0] text-center">+</p>
            <p className="text-[#5483D0] text-center">Upload Video</p>
          </label>
        )}
      </div>

      <div className="attachment flex flex-col gap-1 w-full">
        <label>Attach file (Optional)</label>
        <input
          id="attchment-upload"
          name="attachment"
          type="file"
          accept="*/*"
          onChange={(event) => handleFileChange(event, "attach_file")}
          hidden
        />
        {course.files?.attach_file ? (
          <div className="ttachment-preview w-fit h-10 relative bg-[#F6F7FC] flex justify-center items-center rounded-[8px] px-3 pr-10">
            <p className="text-xs">{course.files.attach_file.name}</p>
            <button
              className="rounded-full bg-[#9B2FAC] w-4 h-4 text-center text-white text-[8px]  top-[6px] right-[6px] absolute"
              onClick={() => {
                handleRemoveFile("attach_file");
              }}
              aria-label="Remove attachments"
            >
              X
            </button>
          </div>
        ) : (
          <label
            htmlFor="attchment-upload"
            className="flex flex-col justify-center bg-[#F6F7FC] w-40 h-40"
          >
            <p className="text-[#5483D0] text-center">+</p>
            <p className="text-[#5483D0] text-center">Upload file</p>
          </label>
        )}
      </div>
    </>
  );
}
