import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { supabase } from "../../../../lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { validateFormInput } from "./form-validation";
import AddCourseInput from "./add-course-input";
import FileUpload from "./file-upload";
import { useRouter } from "next/router";
import { AddCourseContext } from "@/pages/_app";
import { Flashlight } from "lucide-react";

const AdminAddCourseForm = ({ setIsLoading }) => {
  const { course, setCourse } = useContext(AddCourseContext);
  const [errors, setErrors] = useState({});
  const router = useRouter();
  console.log("after create clicked", course);

  const uploadFile = async (file, folder) => {
    const uniqueFileName = `${uuidv4()}_${file.name}`;
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

  const onSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    const formData = new FormData(event.target);
    const updatedCourse = {
      ...course,
      course_name: formData.get("course_name"),
      price: parseFloat(formData.get("price")),
      duration: parseFloat(formData.get("duration")),
      summary: formData.get("summary"),
      detail: formData.get("detail"),
    };
    setCourse(updatedCourse);

    const validateError = validateFormInput(updatedCourse);

    if (Object.keys(validateError).length > 0) {
      setErrors(validateError);
      setIsLoading(false);
      alert("Please complete all required fields before creating the course.");
      return;
    } else {
      setErrors({});
    }

    if (course.lessons.length < 1) {
      setIsLoading(false);
      alert("Please create at least one lesson before creating the course.");
      return;
    }

    try {
      setIsLoading(true);
      const coverImageUrl = await uploadFile(
        updatedCourse.course_image,
        "cover_images"
      );
      const trailerUrl = await uploadFile(
        updatedCourse.video_trailer,
        "trailers"
      );
      const attachmentUrl = updatedCourse.attach_file
        ? await uploadFile(updatedCourse.attach_file, "attachments")
        : null;
      const updatedWithUrl = {
        ...updatedCourse,
        course_image: coverImageUrl,
        video_trailer: trailerUrl,
        attach_file: attachmentUrl,
      };
      setCourse(updatedWithUrl);

      const result = await axios.post(`/api/courses/post`, updatedWithUrl);

      if (result.status === 200) {
        router.push("/admin/courses");
        setIsLoading(false);
      }
    } catch (error) {
      console.error(
        "Server could not create course due to database connection",
        error
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="p-10">
      <div className=" bg-white min-w-[1120px] w-full  rounded-2xl px-[100px] pt-10 pb-[60px]">
        <form
          id="add-course"
          onSubmit={onSubmit}
          className="flex flex-col gap-10"
        >
          <AddCourseInput errors={errors} />
          <FileUpload errors={errors} />
        </form>
      </div>
    </div>
  );
};

export default AdminAddCourseForm;
