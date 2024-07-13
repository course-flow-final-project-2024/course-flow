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
      <h3 className="w-full h-max text-left font-medium text-2xl lg:text-3xl ">
        Lesson Samples
      </h3>
      <div className="w-full h-max">
        <Accordion defaultIndex={[0]} allowMultiple>
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
                    <span className=" text-[#646D89]">01</span>
                    <span className="w-full lg:text-2xl">Introduction</span>
                    <AccordionIcon />
                  </div>
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pt={3} pl={9}>
              <li className="text-base font-normal text-[#646D89]">
                Lorem ipsum dolor sit amet
              </li>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default LessonSamples;
