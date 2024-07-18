import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

function LessonSamples({ courseData }) {
  return (
    <div className="w-full h-max flex flex-col gap-2">
      <h3 className="w-full h-max text-left font-medium text-2xl lg:text-3xl ">
        Lesson Samples
      </h3>
      <div className="w-full h-max">
        <Accordion defaultIndex={[0]} allowMultiple>
          {courseData.length > 0 && courseData[0].lessons.length > 0 ? (
            courseData[0].lessons.map((lesson, index) => (
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
                          <span>{lesson.lesson_title}</span>
                        </span>
                        <AccordionIcon />
                      </div>
                    </Box>
                  </AccordionButton>
                </h2>
                <AccordionPanel pt={3} pl={12}>
                  {lesson.sub_lessons.map((subLesson) => (
                    <li className="list-disc" key={subLesson.sub_lesson_id}>
                      {subLesson.sub_lesson_title}
                    </li>
                  ))}
                </AccordionPanel>
              </AccordionItem>
            ))
          ) : (
            <div>No lessons available</div>
          )}
        </Accordion>
      </div>
    </div>
  );
}

export default LessonSamples;
