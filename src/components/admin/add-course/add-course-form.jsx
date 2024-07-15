import axios from "axios";
import React, { useState } from "react";
import FileUpload from "./file-upload";
import { supabase } from "../../../../lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { validateFormInput } from "./form-validation";

const AdminAddCourseForm = () => {
  const inputStyle =
    "border border-[#D6D9E4] p-3 pr-4 rounded-[8px] outline-none";

  const [files, setFiles] = useState({
    coverImage: null,
    trailer: null,
    attachment: null,
  });

  const [errors, setErrors] = useState({});

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

    const formData = new FormData(event.target);
    const formInput = {
      course_name: formData.get("course_name"),
      price: parseFloat(formData.get("price")),
      duration: parseFloat(formData.get("duration")),
      summary: formData.get("summary"),
      detail: formData.get("detail"),
      course_image: null,
      video_trailer: null,
      attach_file: null,
    };

    const validateError = validateFormInput(formInput, files);

    if (Object.keys(validateError).length > 0) {
      setErrors(validateError);
      return;
    }

    try {
      const coverImageUrl = await uploadFile(files.coverImage, "cover_images");
      const trailerUrl = await uploadFile(files.trailer, "trailers");
      const attachmentUrl = files.attachment
        ? await uploadFile(files.attachment, "attachments")
        : null;

      formInput.course_image = coverImageUrl;
      formInput.video_trailer = trailerUrl;
      formInput.attach_file = attachmentUrl || null;

      console.log("forminput", formInput);

      const result = await axios.post(`/api/courses/post`, formInput);
      console.log("result", result.data);
    } catch (error) {
      console.error(
        "Server could not create course due to database connection",
        error
      );
    }
  };

  return (
    <div className="p-10">
      <div className=" bg-white min-w-[1120px] w-full  rounded-2xl px-[100px] pt-10 pb-[60px]">
        <form onSubmit={onSubmit} className="flex flex-col gap-10">
          <div className="flex flex-col gap-1 w-full">
            <div className="flex gap-2">
              <label>Course name *</label>
              {errors.course_name && (
                <span className="text-red-500">{errors.course_name}</span>
              )}
            </div>
            <input
              name="course_name"
              //required
              type="text"
              placeholder="Place Holder"
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
                //required
                type="number"
                placeholder="Place Holder"
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
                //required
                type="number"
                placeholder="Place Holder"
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
              //required
              type="text"
              placeholder="Place Holder"
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
              //required
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

          <FileUpload onFilesChange={setFiles} errors={errors} />
        </form>
      </div>
    </div>
  );
};

export default AdminAddCourseForm;
