import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import { lesson_info } from "./mock-data";
import { useContext } from "react";
import { CoursesDataContext } from "@/pages/courses/[courseId]/learning";

function LessonAccordion() {
  const { courseData } = useContext(CoursesDataContext);

  return (
    <div className="w-full h-max sm:max-h-[900px] sm:overflow-y-scroll flex flex-col gap-2 ">
      {lesson_info.map((lesson, index) => (
        <Accordion defaultIndex={[0]} allowMultiple key={index}>
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
                    <span className="text-[#646D89]">0{index + 1}</span>
                    <span className="w-full lg:text-2xl">
                      <span>lesson_title</span>
                    </span>
                    <AccordionIcon />
                  </div>
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pt={3} pl={12}>
              <li className="list-none">sub_lesson_title</li>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}

export default LessonAccordion;
