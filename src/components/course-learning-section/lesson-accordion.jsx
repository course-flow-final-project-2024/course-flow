import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import { useContext } from "react";
import { CoursesDataContext } from "@/pages/courses/[courseId]/learning";

function LessonAccordion() {
  const { courseData } = useContext(CoursesDataContext);

  if (!courseData || courseData.length === 0) {
    return <div>Loading...</div>;
  }

  const lessons = courseData[0].courses.lessons;

  return (
    <div className="w-full h-max sm:max-h-[900px] sm:overflow-y-scroll flex flex-col gap-2 ">
      {lessons.map((lesson, index) => (
        <Accordion defaultIndex={[0]} allowMultiple key={index}>
          <AccordionItem>
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
                    <span className="text-[#646D89]">0{index + 1}</span>
                    <span className="w-full lg:text-2xl">
                      <span>{lesson.lesson_title}</span>
                    </span>
                    <AccordionIcon />
                  </div>
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pt={3} pl={12}>
              {lesson.sub_lessons.map((subLesson) => (
                <li className="list-none" key={subLesson.sub_lesson_title}>
                  {subLesson.sub_lesson_title}
                </li>
              ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}

export default LessonAccordion;
