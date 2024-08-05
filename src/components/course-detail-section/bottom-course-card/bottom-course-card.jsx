import { useContext } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import { CourseDetailContext } from "@/pages/courses/[courseId]";
import CourseCardAddAndRemove from "../buttons-and-modal/buttons";

function BottomCourseCard() {
  const context = useContext(CourseDetailContext);
  const courseData = context.courseData;

  return (
    <div className="w-full h-28 relative bg-[#183056] lg:hidden">
      <div className="w-full h-max fixed bottom-0 bg-white rounded-t-xl shadow-[rgba(60,64,67,0.3)_0px_1px_2px_0px,rgba(60,64,67,0.15)_0px_2px_6px_2px] lg:hidden sm:px-10 ease-in-out duration-200  ">
        <Accordion allowToggle border="none">
          <AccordionItem border="none" p={3} pt={2}>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <div className="flex flex-col gap-2  ">
                  <AccordionPanel p={0}>
                    <span className="text-sm text-orange-500 font-normal block leading-4 mt-2 ">
                      Course
                    </span>
                  </AccordionPanel>
                  <div className="w-full h-max font-normal text-base">
                    <div className="flex flex-row justify-between items-center ">
                      <span className="block sm:text-lg ">
                        {courseData.length > 0 && courseData[0].course_name}
                      </span>
                      <AccordionIcon />
                    </div>
                    <AccordionPanel p={0}>
                      <span className="text-[#646D89] font-normal text-sm leading-4 block my-1 sm:text-base ">
                        {courseData.length > 0 && courseData[0].summary}
                      </span>
                    </AccordionPanel>
                    <span
                      className={
                        context.userCourseStatus === "bought"
                          ? "hidden"
                          : "block text-[#646D89] sm:text-lg"
                      }
                    >
                      THB ${context.formattedPrice}
                    </span>
                  </div>
                  <div className="w-full h-10 flex flex-row gap-2 ">
                    <CourseCardAddAndRemove customStyle="h-max grow-1 max-[400px]:text-[13px] max-[475px]:text-sm max-[375px]:py-[4px] max-[375px]:leading-[18px] leading-5" />
                  </div>
                </div>
              </Box>
            </AccordionButton>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default BottomCourseCard;
