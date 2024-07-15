import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

function BottomCourseCard({ courseData }) {
  const [isClient, setIsClient] = useState(false);
  const calculatePriceWithComma = (price) => {
    const priceStr = (price * 36).toString();
    if (priceStr.length > 2) {
      return priceStr.slice(0, 1) + "," + priceStr.slice(1);
    }
    return priceStr;
  };

  const calculatedPrice =
    courseData.length > 0 && calculatePriceWithComma(courseData[0].price);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

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
                    <span className="block text-[#646D89] sm:text-lg">
                      THB {calculatedPrice}
                    </span>
                  </div>
                  <div className="w-full h-10 flex flex-row gap-2">
                    <button className="grow h-max p-2 rounded-xl bg-white text-orange-500 border-[1.5px] border-orange-500 active:bg-gray-100 hover:text-[#FBAA1C] hover:border-[#FBAA1C] focus:ring-2 ring-violet-300 text-sm font-bold ease-in-out duration-200 ">
                      Get in Desire Course
                    </button>
                    <button className="grow h-max p-2 rounded-xl bg-[#2F5FAC] text-white  active:bg-[#183056] hover:bg-[#5483D0] focus:ring-2 ring-violet-300 text-sm font-bold ease-in-out duration-200">
                      Subscribe This Course
                    </button>
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
