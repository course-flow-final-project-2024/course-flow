import { useState, useContext, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import { CoursesDataContext } from "@/pages/courses/[courseId]/learning";
import StatusImage from "./select-status-image";
import { useRouter } from "next/router";

function LessonAccordion({ onRendered, titleRef }) {
  const {
    courseData,
    lessonData,
    subLessonData,
    currentLessonIndex,
    currentSubLessonId,
    setCurrentLessonIndex,
    setCurrentSubLessonIndex,
    subLessonStatus,
  } = useContext(CoursesDataContext);

  const [expandedIndex, setExpandedIndex] = useState([currentLessonIndex]);
  const router = useRouter();

  const handleOnClick = async (id) => {
    const newIndex = subLessonData.findIndex(
      (subLesson) => subLesson.sub_lesson_id === id
    );
    const lessonIndex = lessonData.findIndex((lesson) =>
      lesson.sub_lessons.some((subLesson) => subLesson.sub_lesson_id === id)
    );
    setCurrentLessonIndex(lessonIndex);
    setCurrentSubLessonIndex(newIndex);

    if (titleRef.current) {
      titleRef.current.scrollIntoView({ behavior: "smooth" });
    }

    if (!expandedIndex.includes(lessonIndex)) {
      setExpandedIndex([...expandedIndex, lessonIndex]);
    }

    const courseId = router.query.courseId;
    router.push(`/courses/${courseId}/learning?subLessonId=${id}`);
  };

  useEffect(() => {
    if (courseData && courseData.length > 0) {
      onRendered();
    }
  }, [courseData, onRendered]);

  useEffect(() => {
    if (!expandedIndex.includes(currentLessonIndex)) {
      setExpandedIndex([...expandedIndex, currentLessonIndex]);
    }
  }, [currentLessonIndex]);

  useEffect(() => {
    if (subLessonData.length > 0) {
      const subLessonIndex = subLessonData.findIndex(
        (subLesson) => subLesson.sub_lesson_id == currentSubLessonId
      );
      const lessonIndex = lessonData.findIndex((lesson) =>
        lesson.sub_lessons.some(
          (subLesson) => subLesson.sub_lesson_id == currentSubLessonId
        )
      );

      if (subLessonIndex !== -1 && lessonIndex !== -1) {
        setCurrentLessonIndex(lessonIndex);
        setCurrentSubLessonIndex(subLessonIndex);
        setExpandedIndex([lessonIndex]);
      }
    }
  }, [currentSubLessonId, subLessonData, lessonData]);

  if (!courseData || courseData.length === 0) {
    return <div></div>;
  }

  const handleAccordionChange = (index) => {
    setExpandedIndex(index);
  };

  return (
    <div className="w-full h-max sm:max-h-[900px] sm:overflow-y-scroll flex flex-col gap-2 ">
      <Accordion
        index={expandedIndex}
        allowMultiple
        onChange={handleAccordionChange}
      >
        {lessonData.map((lesson, index) => (
          <AccordionItem key={lesson.lesson_id}>
            <h2>
              <AccordionButton px="0">
                <Box
                  as="span"
                  flex="1"
                  textAlign="left"
                  fontSize="xl"
                  borderBottom="1px"
                  borderColor="#D6D9E4"
                  paddingY={3}
                >
                  <div className="w-full flex flex-row items-center gap-6">
                    <span className="text-base text-[#646D89]">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="w-full text-base">
                      <span>{lesson.lesson_title}</span>
                    </span>
                    <AccordionIcon />
                  </div>
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pt={3}>
              {lesson.sub_lessons.map((subLesson) => {
                const { isPlaying, isEnded } =
                  subLessonStatus[subLesson.sub_lesson_id] || {};
                const defaultStatusImage = StatusImage(
                  subLesson.user_lessons[0].sub_lesson_status_id
                );

                let statusImage;

                if (isEnded) {
                  statusImage = StatusImage(1);
                } else if (isPlaying) {
                  statusImage = StatusImage(2);
                } else {
                  statusImage = defaultStatusImage;
                }
                return (
                  <li
                    className="list-none "
                    key={subLesson.sub_lesson_id}
                    role="button"
                    onClick={() => handleOnClick(subLesson.sub_lesson_id)}
                  >
                    <div
                      className={
                        subLesson.sub_lesson_id === Number(currentSubLessonId)
                          ? "w-full h-12 px-2 py-3  flex flex-row gap-4 items-center bg-[#F6F7FC]"
                          : "w-full h-12 px-2 py-3  flex flex-row gap-4 items-center hover:bg-[#F6F7FC]"
                      }
                    >
                      <span>{statusImage}</span>
                      <div className="text-base font-normal text-[#646D89] flex items-center">
                        {subLesson.sub_lesson_title}
                      </div>
                    </div>
                  </li>
                );
              })}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default LessonAccordion;
