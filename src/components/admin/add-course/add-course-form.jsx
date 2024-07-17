import axios from "axios";
import React, { useState, useContext } from "react";
import { supabase } from "../../../../lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { validateFormInput } from "./form-validation";
import { LessonDataContext } from "@/pages/admin/add-course";
import { CourseDataForm } from "./course-form";

const AdminAddCourseForm = () => {
  const { lesson, formInput } = useContext(LessonDataContext);

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
        alert("Error uploading file.");
        return;
      }

      const url = supabase.storage
        .from("course")
        .getPublicUrl(`${folder}/${uniqueFileName}`);
      return url.data.publicUrl;
    } catch (error) {
      alert("Error uploading file.");
    }
  };

  const onSubmit = async () => {
    const validateError = validateFormInput(formInput, files);

    if (Object.keys(validateError).length > 0) {
      setErrors(validateError);
      return;
    }

    if (lesson.length < 1) {
      alert("Please create at least one lesson before creating the course.");
      return;
    }

    try {
      const coverImageUrl = await uploadFile(files.coverImage, "cover_images");
      const trailerUrl = await uploadFile(files.trailer, "trailers");
      const attachmentUrl = files.attachment
        ? await uploadFile(files.attachment, "attachments")
        : null;

      const finalFormInput = {
        ...formInput,
        course_image: coverImageUrl,
        video_trailer: trailerUrl,
        attach_file: attachmentUrl || null,
      };

      const result = await axios.post(`/api/courses/post`, finalFormInput);
    } catch (error) {
      console.error(
        "Server could not create course due to database connection",
        error
      );
    }
  };

  return (
    <div className="p-10">
      <div className="bg-white min-w-[1120px] w-full rounded-2xl px-[100px] pt-10 pb-[60px]">
        <CourseDataForm errors={errors} setFiles={setFiles} />
      </div>
    </div>
  );
};

export default AdminAddCourseForm;
