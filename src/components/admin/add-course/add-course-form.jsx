import axios from "axios";
import React, { useState, useContext } from "react";
import { supabase } from "../../../../lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { validateFormInput } from "./form-validation";
import { LessonDataContext } from "@/pages/admin/add-course";
import AddCourseInput from "./add-course-input";
import { useRouter } from "next/router";
import { Spinner } from "@chakra-ui/react";

const AdminAddCourseForm = ({ isLoading, setIsLoading }) => {
  const { lesson } = useContext(LessonDataContext);
  const [files, setFiles] = useState({
    coverImage: null,
    trailer: null,
    attachment: null,
  });
  const [errors, setErrors] = useState({});

  const router = useRouter();
  let formInput = {};

  useEffect(() => {
    validateFormInput(formInput, files);
  }, [formInput, files]);

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
    setIsLoading;
    const formData = new FormData(event.target);
    formInput = {
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
      setIsLoading(false);
      return;
    }

    if (lesson.length < 1) {
      alert("Please create at least one lesson before creating the course.");
      return;
    }

    try {
      setIsLoading(true);
      const coverImageUrl = await uploadFile(files.coverImage, "cover_images");
      const trailerUrl = await uploadFile(files.trailer, "trailers");
      const attachmentUrl = files.attachment
        ? await uploadFile(files.attachment, "attachments")
        : null;

      formInput.course_image = coverImageUrl;
      formInput.video_trailer = trailerUrl;
      formInput.attach_file = attachmentUrl || null;

      const result = await axios.post(`/api/courses/post`, formInput);
      console.log("result", result.data, result.status);

      if (result.status === 200) {
        alert("Course created successfully!");
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
          <FileUpload onFilesChange={setFiles} errors={errors} />
        </form>
      </div>
    </div>
  );
};

export default AdminAddCourseForm;
