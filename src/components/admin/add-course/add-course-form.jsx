import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { supabase } from "../../../../lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { validateFormInput } from "./form-validation";
import AddCourseInput from "./add-course-input";
import FileUpload from "./file-upload";
import { useRouter } from "next/router";
import { AddCourseContext } from "@/pages/_app";
import { useToast } from "@chakra-ui/react";

const AdminAddCourseForm = ({ setIsLoading }) => {
  const { course, setCourse } = useContext(AddCourseContext);
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const toast = useToast();

  const displayToast = (
    title,
    description,
    status,
    position,
    duration,
    isClosable
  ) => {
    toast({
      title: `${title}`,
      description: `${description}`,
      status: `${status}`,
      position: `${position}`,
      duration: duration,
      isClosable: isClosable,
    });
  };

  const uploadFile = async (file, folder) => {
    const uniqueFileName = `${uuidv4()}_${file.name}`;
    try {
      const { data, error } = await supabase.storage
        .from("course")
        .upload(`${folder}/${uniqueFileName}`, file);

      if (error) {
        displayToast(
          "Oops...",
          "Error uploading file, please try agian.",
          "error",
          "top",
          9000,
          true
        );
        return;
      }

      const url = supabase.storage
        .from("course")
        .getPublicUrl(`${folder}/${uniqueFileName}`);
      return url.data.publicUrl;
    } catch (error) {
      displayToast(
        "Oops...",
        "Error uploading file, please try agian.",
        "error",
        "top",
        9000,
        true
      );
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const validateError = validateFormInput(course);

    if (Object.keys(validateError).length > 0) {
      setErrors(validateError);
      setIsLoading(false);
      displayToast(
        "Oops...",
        "Please complete all required fields before updating the course.",
        "error",
        "top",
        9000,
        true
      );
      return;
    } else {
      setErrors({});
    }

    if (course.lessons.length < 1) {
      setIsLoading(false);
      displayToast(
        "Oops...",
        "Please create at least one lesson before creating the course.",
        "error",
        "top",
        9000,
        true
      );
      return;
    }

    try {
      setIsLoading(true);
      const coverImageUrl = await uploadFile(
        course.course_image,
        "cover_images"
      );
      const trailerUrl = await uploadFile(course.video_trailer, "trailers");
      const attachmentUrl = course.attach_file
        ? await uploadFile(course.attach_file, "attachments")
        : null;
      const updatedWithUrl = {
        ...course,
        course_image: coverImageUrl,
        video_trailer: trailerUrl,
        attach_file: attachmentUrl,
      };
      setCourse(updatedWithUrl);

      const courseUplaodedResult = await axios.post(
        `/api/courses/post`,
        updatedWithUrl
      );

      if (courseUplaodedResult.status === 200) {
        const courseId = courseUplaodedResult.data.data.course_id;
        const lessons = { ...course, course_id: courseId };

        const lessonsUplodedResult = await axios.post(
          `/api/lessons/post`,
          lessons
        );

        if (lessonsUplodedResult.status === 200) {
          const uploadedLesson = lessonsUplodedResult.data.data.reduce(
            (acc, item) => {
              const lessonTitle = item[0].lesson_title;
              acc[lessonTitle] = item[0].lesson_id;
              return acc;
            },
            {}
          );

          const subLessonUploadedResults = await Promise.all(
            course.lessons.map(async (item) => {
              console.log("1", item);
              const lessonId = uploadedLesson[item.lesson_title];
              const subLessonsWithUrls = await Promise.all(
                item.sub_lessons.map(async (item) => {
                  console.log("2", item);
                  const subLessonUrl = await uploadFile(
                    item.sub_lesson_video,
                    "sub_lessons"
                  );
                  return {
                    ...item,
                    sub_lesson_video: subLessonUrl,
                    lesson_id: lessonId,
                  };
                })
              );

              const subLessonUploadedResult = await axios.post(
                `/api/sub-lesson/post`,
                subLessonsWithUrls
              );
              return subLessonUploadedResult;
            })
          );

          const allSuccessful = subLessonUploadedResults.every(
            (result) => result.status === 200
          );

          if (allSuccessful) {
            router.push("/admin/courses");
            setIsLoading(false);
          } else {
            toast({
              title: "Oops...",
              description: "Fail to uploaded sub-lessons, please try again",
              status: "error",
              position: "top",
              duration: 9000,
              isClosable: true,
            });
          }
        }
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
      <div className=" bg-white  w-full  rounded-2xl px-[100px] pt-10 pb-[60px]">
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
