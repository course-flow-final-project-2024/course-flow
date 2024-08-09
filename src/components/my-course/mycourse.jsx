import Button from "@/utils/button";
import React, { useState, useEffect } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Center,
  TabIndicator,
} from "@chakra-ui/react";
import InprogressCard from "./my-inprogress-card";
import CompletedCard from "./completed-card";
import Allcourses from "./allcourses";

export default function GetMyCourse() {
  return (
    <div className="w-full h-max px-4 sm:px-16 lg:px-40 min-[1800px]:px-80 min-[1850px]:px-[350px] min-[1900px]:px-96 py-[100px]">
      <div className="w-full min-h-[700px] h-max ">
        <h1 className="text-center text-4xl font-medium">MY COURSES</h1>
        <div className="">
          <Tabs>
            <div className="w-full h-max flex justify-center">
              <div className="w-max relative ">
                <TabList
                  gap={"16px"}
                  display="flex"
                  justifyContent="center"
                  marginTop="60px"
                  fontSize={16}
                  marginBottom="5px"
                >
                  <Tab>All Courses</Tab>
                  <Tab>Inprogress</Tab>
                  <Tab>Completed</Tab>
                </TabList>

                <TabIndicator
                  mt="-1.5px"
                  height="2px"
                  bg="gray.400"
                  borderRadius="1px"
                />
              </div>
            </div>
            <TabPanels>
              <TabPanel>
                <Allcourses />
              </TabPanel>
              <TabPanel>
                <InprogressCard />
              </TabPanel>
              <TabPanel>
                <CompletedCard />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
