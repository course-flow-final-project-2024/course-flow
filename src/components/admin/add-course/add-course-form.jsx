import axios from "axios";
import React, { useState } from "react";
import FileUpload2 from "./file-upload-test";
import { supabase } from "../../../../lib/supabase";
import { v4 as uuidv4 } from "uuid";

const AddCourseForm = () => {
  const inputStyle =
    "border border-[#D6D9E4] p-3 pr-4 rounded-[8px] outline-none";

  const [files, setFiles] = useState({
    coverImage: null,
    trailer: null,
    attachment: null,
  });
  console.log(files);

  const uploadFile = async (file, folder) => {
    const uniqueFileName = `${uuidv4()}_${file.name}`;
    console.log(`Uploading file: ${uniqueFileName} to ${folder}`);
    try {
      const { data, error } = await supabase.storage
        .from("course")
        .upload(`${folder}/${uniqueFileName}`, file);

      if (error) {
        console.error("Error uploading file:", error.message);
        alert("Error uploading file.");
        return;
      }
      console.log("File details:", data);
      const url = supabase.storage
        .from("course")
        .getPublicUrl(`${folder}/${uniqueFileName}`);
      return url.data.publicUrl;
    } catch (error) {
      console.error(`Error uploading ${folder}:`, error.message);
      alert("Error uploading file.");
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const coverImageUrl = await uploadFile(files.coverImage, "cover_images");
      const trailerUrl = await uploadFile(files.trailer, "trailers");
      const attachmentUrl = files.attachment
        ? await uploadFile(files.attachment, "attachments")
        : null;

      const formData = new FormData(event.target);
      const formInput = {
        course_name: formData.get("course_name"),
        price: parseFloat(formData.get("price")),
        duration: parseFloat(formData.get("duration")),
        summary: formData.get("summary"),
        detail: formData.get("detail"),
        course_image: coverImageUrl,
        video_trailer: trailerUrl,
        attach_file: attachmentUrl || null,
      };

      console.log("forminput", formInput);

      const result = await axios.post(
        `/api/courses/post`,
        formInput,
        {
          headers: {
            "Content-Type": "application/json", // Ensure JSON content type
          },
        }
        // {
        //   headers: { "Content-Type": "multipart/form-data" },
        // }
      );

      console.log("result", result.data);
    } catch (error) {
      console.error(
        "Server could not create course due to database connection",
        error
      );
    }
  };

  return (
    <div className=" bg-white min-w-[1120px] w-full  rounded-2xl px-[100px] pt-10 pb-[60px]">
      <form onSubmit={onSubmit} className="flex flex-col gap-10">
        <div className="flex flex-col gap-1 w-full">
          <label>Course name *</label>
          <input
            name="course_name"
            required
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
              required
              type="number"
              placeholder="Place Holder"
              className={inputStyle}
              step="0.01"
            />
          </div>
          <div className="flex grow flex-col gap-1 w-full">
            <label>Total learning time *</label>
            <input
              name="duration"
              required
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
            required
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
            required
            type="text"
            placeholder="Place Holder"
            rows={7}
            className={inputStyle}
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          Submit
        </button>

        <FileUpload2 onFilesChange={setFiles} />
      </form>
    </div>
  );
};

export default AddCourseForm;
