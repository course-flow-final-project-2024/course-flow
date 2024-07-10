import Button from "@/utils/button.jsx";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

function BottomCourseCard() {
  return (
    <div className="w-full min-h-[104px] relative bg-white">
      <div className="w-full min-h-[112px] fixed bottom-0 bg-white rounded-t-xl shadow-[rgba(60,64,67,0.3)_0px_1px_2px_0px,rgba(60,64,67,0.15)_0px_2px_6px_2px]">
        <Accordion allowToggle border="none">
          <AccordionItem border="none">
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <div className="flex flex-col gap-2 ">
                  <AccordionPanel p={0}>
                    <span className="text-sm text-orange-500 font-normal block leading-4 mt-2">
                      Course
                    </span>
                  </AccordionPanel>
                  <div className="w-full h-max font-normal text-base">
                    <span className="block">Service Design Essentials</span>
                    <AccordionPanel p={0}>
                      <span className="text-[#646D89] font-normal text-sm leading-4 block my-1">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        In, animi!
                      </span>
                    </AccordionPanel>
                    <span className="block text-[#646D89]">THB 3,559.00</span>
                  </div>
                  <div className="w-full h-10 flex">
                    <Button
                      style="primary"
                      text="Start Learning"
                      customStyle="flex flex-row justify-center items-center"
                    />
                  </div>
                </div>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default BottomCourseCard;
