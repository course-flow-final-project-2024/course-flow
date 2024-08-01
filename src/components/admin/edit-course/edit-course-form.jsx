import React, { useState, useContext } from "react";
import { supabase } from "../../../../lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { validateFormInput } from "../add-course/form-validation";
import EditCourseInput from "./edit-course-input";
import FileUpload from "./file-upload";
import { useRouter } from "next/router";
import { AddCourseContext } from "@/pages/_app";
import axios from "axios";

const AdminEditCourseForm = ({ setIsLoading }) => {
  const { course, setCourse } = useContext(AddCourseContext);
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const courseId = router.query.courseId;

  const uploadFile = async (file, folder) => {
    if (typeof file !== "string") {
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
    }
  };

  const handleEditCourse = async (event) => {
    event.preventDefault();
    // setIsLoading(true);

    const validateError = validateFormInput(course);

    if (Object.keys(validateError).length > 0) {
      setErrors(validateError);
      // setIsLoading(false);
      alert("Please complete all required fields before creating the course.");
      return;
    } else {
      setErrors({});
    }

    if (course.lessons.length < 1) {
      // setIsLoading(false);
      alert("Please create at least one lesson before creating the course.");
      return;
    }

    try {
      // setIsLoading(true);

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
        course_image: coverImageUrl ? coverImageUrl : course.course_image,
        video_trailer: trailerUrl ? trailerUrl : course.video_trailer,
        attach_file: attachmentUrl ? attachmentUrl : course.attach_file,
      };
      setCourse(updatedWithUrl);

      const courseUpdateResult = await axios.put(
        `/api/courses/put?courseId=${courseId}`,
        updatedWithUrl
      );

      if (courseUpdateResult.status === 200) {
        const lessonsUpdateResult = await axios.patch(
          `/api/lessons/patch?courseId=${courseId}`,
          course.lessons
        );

        if (lessonsUpdateResult.status === 200) {
          const updatedLesson = lessonsUpdateResult.data.data.reduce(
            (acc, item) => {
              const lessonTitle = item[0].lesson_title;
              acc[lessonTitle] = item[0].lesson_id;
              return acc;
            },
            {}
          );

          const subLessonUpdateResults = await Promise.all(
            course.lessons.map(async (item) => {
              const lessonId = updatedLesson[item.lesson_title];

              const subLessonsWithUrls = await Promise.all(
                item.sub_lessons.map(async (item) => {
                  const subLessonUrl = await uploadFile(
                    item.sub_lesson_video,
                    "sub-lessons"
                  );
                  return {
                    ...item,
                    sub_lesson_video: subLessonUrl
                      ? subLessonUrl
                      : item.sub_lesson_video,
                  };
                })
              );

              const subLessonUpdateResult = await axios.patch(
                `/api/sub-lesson/patch?lessonId=${lessonId}`,
                subLessonsWithUrls
              );
              return subLessonUpdateResult;
            })
          );

          const allSuccessful = subLessonUpdateResults.every(
            (result) => result.status === 200
          );
          if (allSuccessful) {
            router.push("/admin/courses");
            //setIsLoading(false);
          }
        }
      }
    } catch (error) {
      console.error(
        "Server could not create course due to database connection",
        error
      );
      // setIsLoading(false);
    }
  };

  return (
    <div className=" bg-white  w-full  rounded-2xl px-[100px] pt-10 pb-[60px]">
      <form
        id="edit-course"
        onSubmit={handleEditCourse}
        className="flex flex-col gap-10"
      >
        <EditCourseInput errors={errors} />
        <FileUpload errors={errors} />
      </form>
    </div>
  );
};

export default AdminEditCourseForm;
