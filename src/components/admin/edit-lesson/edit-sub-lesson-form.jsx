import Image from "next/image";
import { useState } from "react";
import { validateSubLessons } from "../add-lesson/form-validate";

export default function AdminEditSubLessonForm({
  index,
  subLesson,
  subLessons,
  setSubLessons,
}) {
  const [localValidate, setLocalValidate] = useState([{ name: "" }]);

  const handleDeleteSubLesson = (event, index) => {
    event.preventDefault();
    if (subLessons.length > 1) {
      setSubLessons(subLessons.filter((_, i) => i !== index));
    }
  };

  const handleSubLessonChange = (index, field, value) => {
    const newSubLessons = [...subLessons];
    newSubLessons[index][field] = value;
    setSubLessons(newSubLessons);
    validateInput(newSubLessons);
  };

  const handleFileChange = (event, index) => {
    const updatedSubLessons = [...subLessons];
    updatedSubLessons[index].sub_lesson_video = event.target.files[0];
    setSubLessons(updatedSubLessons);
    event.target.value = "";
    validateInput(updatedSubLessons);
  };

  const handleRemoveFile = (index) => {
    const updatedSubLessons = [...subLessons];
    updatedSubLessons[index].sub_lesson_video = null;
    setSubLessons(updatedSubLessons);
    validateInput(updatedSubLessons);
  };

  let subLessonDeleteButton;
  if (subLessons.length > 1) {
    subLessonDeleteButton = "font-bold text-[#2F5FAC]";
  } else {
    subLessonDeleteButton = "font-bold text-[#C8CCDB] cursor-not-allowed";
  }

  const validateInput = (subLesson) => {
    const validatedSubLessons = validateSubLessons(subLesson);
    setLocalValidate(validatedSubLessons);
  };

  return (
    <div className="rounded-lg p-[24px_16px_24px_16px] bg-[#F6F7FC] border border-[#E4E6ED]">
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-row w-full gap-4">
          <div className="flex flex-row justify-center items-start mt-[30px] w-[26px] gap-[1px]">
            <Image src="/icons/drag.svg" alt="drag Icon" width={5} height={5} />
            <Image src="/icons/drag.svg" alt="drag Icon" width={5} height={5} />
          </div>
          <div className="flex flex-col w-[60%] gap-6">
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 flex-wrap">
                <p>Sub-lesson name *</p>
                {localValidate[index] && (
                  <p className="text-red-500">{localValidate[index].name}</p>
                )}
              </div>
              <input
                name="sub_lesson_title"
                type="text"
                className="w-full h-12 p-3 border rounded-lg outline-none"
                placeholder="Please enter sub-lesson"
                value={subLesson.sub_lesson_title}
                onChange={(e) =>
                  handleSubLessonChange(
                    index,
                    "sub_lesson_title",
                    e.target.value
                  )
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 flex-wrap">
                <p>Video *</p>
                {localValidate[index] && (
                  <p className="text-red-500">{localValidate[index].video}</p>
                )}
              </div>
              {subLessons[index].sub_lesson_video !== null ? (
                <div className="sublesson-vdo-preview w-[160px] h-[160px] relative border rounded-lg bg-[#F1F2F6] flex justify-center items-center">
                  <video
                    controls
                    src={
                      typeof subLesson.sub_lesson_video === "string"
                        ? subLesson.sub_lesson_video
                        : URL.createObjectURL(subLesson.sub_lesson_video)
                    }
                    type="video/mp4"
                    className="h-full w-full rounded-2xl"
                  >
                    Your browser does not support video display.
                  </video>
                  <button
                    className="rounded-full bg-[#9B2FAC] w-4 h-4 text-center text-white text-[8px]  top-[6px] right-[6px] absolute"
                    onClick={() => {
                      handleRemoveFile(index);
                    }}
                    aria-label="Remove cover image"
                  >
                    X
                  </button>
                </div>
              ) : (
                <label
                  className="flex flex-col justify-center items-center w-[160px] h-[160px] p-3 border rounded-lg bg-[#F1F2F6] cursor-pointer outline-none"
                  htmlFor={`subLessonVideo${index}`}
                >
                  <div className="flex flex-col items-center text-[#5483D0] font-medium text-sm">
                    <span className="text-xl">+</span>
                    <span>Upload Video</span>
                  </div>
                </label>
              )}
              <input
                id={`subLessonVideo${index}`}
                type="file"
                accept="video/*"
                hidden
                onChange={(e) => handleFileChange(e, index)}
              />
            </div>
          </div>
        </div>
        <button
          className={subLessonDeleteButton}
          onClick={(e) => {
            handleDeleteSubLesson(e, index);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
