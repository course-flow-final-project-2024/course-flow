export const validateLessonInput = (lesson) => {
  const lessonErrors = {};
  if (!lesson) {
    lessonErrors.name = "Please enter lesson name.";
  } else if (lesson.length > 60) {
    lessonErrors.name = "Lesson name should be at most 60 characters.";
  }
  return lessonErrors;
};

export const validateSubLessons = (subLessons) => {
  let subLessonErrors = [];
  subLessons.map((subLesson, index) => {
    subLessonErrors[index] = { name: "", video: "" };
    if (!subLesson.name) {
      subLessonErrors[index].name = "Please enter sub-lesson name.";
    } else if (subLesson.name.length > 60) {
      subLessonErrors[index].name =
        "Sub-lesson name should be at most 60 characters.";
    } else {
      subLessonErrors[index].name = "";
    }

    if (subLesson.video) {
      const sublessonType = subLesson.video.type;
      const sublessonSize = subLesson.video.size / 1024 / 1024;
      if (!["video/mp4", "video/mov", "video/avi"].includes(sublessonType)) {
        subLessonErrors[index].video =
          "Video trailer must be a .mp4, .mov, or .avi file.";
      }
      if (sublessonSize > 20) {
        subLessonErrors[index].video =
          "Sub-lesson video must be less than 20 MB.";
      }
    } else {
      subLessonErrors[index].video = "Sub-lesson video is required.";
    }
  });
  return subLessonErrors;
};
