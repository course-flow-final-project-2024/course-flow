import Image from "next/image";

export default function AdminSubLessonForm({
  index,
  subLesson,
  subLessons,
  setSubLessons,
}) {
  const handleDeleteSubLesson = (index) => {
    setSubLessons(subLessons.filter((_, i) => i !== index));
  };

  const handleSubLessonChange = (index, field, value) => {
    const newSubLessons = [...subLessons];
    newSubLessons[index][field] = value;
    setSubLessons(newSubLessons);
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
              <p>Sub-lesson name *</p>
              <input
                type="text"
                className="w-full h-12 p-3 border rounded-lg outline-none"
                value={subLesson.name}
                onChange={(e) =>
                  handleSubLessonChange(index, "name", e.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <p>Video *</p>
              <label
                className="flex flex-col justify-center items-center w-[160px] h-[160px] p-3 border rounded-lg bg-[#F1F2F6] cursor-pointer outline-none"
                htmlFor={`subLessonVideo${index}`}
              >
                {subLesson.video ? (
                  subLesson.video.name
                ) : (
                  <div className="flex flex-col items-center text-[#5483D0] font-medium text-sm">
                    <span className="text-xl">+</span>
                    <span>Upload Video</span>
                  </div>
                )}
              </label>
              <input
                id={`subLessonVideo${index}`}
                type="file"
                className="hidden"
                onChange={(e) =>
                  handleSubLessonChange(index, "video", e.target.files[0])
                }
              />
            </div>
          </div>
        </div>
        <button
          className="font-bold text-[#C8CCDB]"
          onClick={() => handleDeleteSubLesson(index)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
