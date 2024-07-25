import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import commaNumber from "comma-number";
import CommonModalBox from "@/utils/common-modal";
import Button from "@/utils/button";
import { useRouter } from "next/router";

function BottomCourseCard({ courseData }) {
  const [isClient, setIsClient] = useState(false);
  const [openDesireCourseModal, setOpenDesireCourseModal] = useState(false);
  const [openSubscribeModal, setOpenSubscribeModal] = useState(false);

  const formattedPrice =
    courseData.length > 0 && commaNumber(courseData[0].price);

  const router = useRouter();

  function loginStatusCheck() {
    const userInfo = JSON.parse(localStorage.getItem("token"));
    if (userInfo) {
      return true;
    } else {
      router.push("/login");
      return false;
    }
  }

  function handleGetInDesireCourseClick() {
    if (loginStatusCheck()) {
      setOpenDesireCourseModal(true);
    }
  }

  function handleSubscribeClick() {
    if (loginStatusCheck()) {
      setOpenSubscribeModal(true);
    }
  }

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
                      THB {formattedPrice}
                    </span>
                  </div>
                  <div className="w-full h-10 flex flex-row gap-2 ">
                    <Button
                      style="secondary"
                      text="Get in Desire Course"
                      customStyle="h-max grow-1"
                      onClick={handleGetInDesireCourseClick}
                    />

                    <Button
                      style="primary"
                      text="Subscribe This Course"
                      customStyle="h-max grow-1"
                      onClick={handleSubscribeClick}
                    />
                    <CommonModalBox
                      open={openDesireCourseModal}
                      setOpen={setOpenDesireCourseModal}
                      text="Get in Desire Course"
                      AlertMessage={`Do you want to add ${
                        courseData.length > 0 && courseData[0].course_name
                      } to your desire course?`}
                      leftText="No, I don't"
                      rightText="Yes, Add it"
                      leftOnClick={() => setOpenDesireCourseModal(false)}
                      rightOnClick={() => {
                        setOpenDesireCourseModal(false);
                      }}
                      style="secondary"
                    />
                    <CommonModalBox
                      open={openSubscribeModal}
                      setOpen={setOpenSubscribeModal}
                      text="Subscribe This Course"
                      AlertMessage={`Do you want to subscribe to ${
                        courseData.length > 0 && courseData[0].course_name
                      } Course?`}
                      leftText="No, I don't"
                      rightText="Yes, I want to subscribe"
                      leftOnClick={() => setOpenSubscribeModal(false)}
                      rightOnClick={() => {
                        setOpenSubscribeModal(false);
                      }}
                      style="primary"
                    />
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
