export const calculateProgress = (lessons, progress) => {
  let totalSubLessons = 0;

  lessons.forEach((lesson) => {
    totalSubLessons += lesson.sub_lessons.length;
  });

  let result = (1 / totalSubLessons) * 100;

  return result + progress;
};
