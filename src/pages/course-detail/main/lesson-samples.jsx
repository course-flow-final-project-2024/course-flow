import Link from "next/link";
import Image from "next/image";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

function LessonSamples() {
  return (
    <div className="w-full h-max flex flex-col gap-2">
      <h3 className="w-full h-max text-left font-medium text-2xl ">
        Lesson Samples
      </h3>
      <div className="w-full h-max">
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton px="0">
                <Box as="span" flex="1" textAlign="left" fontSize="xl">
                  <span className="mr-4 text-[#646D89]">01</span>
                  <span>Introduction</span>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} px={5}>
              Lorem ipsum dolor sit amet,
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default LessonSamples;
