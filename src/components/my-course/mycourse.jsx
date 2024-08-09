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
    <div className="w-full h-max px-4 sm:px-16 lg:px-40 min-[1800px]:px-96 py-[100px] overflow-hidden">
      <div className="w-full min-h-[700px] h-max border-2">
        <h1 className="text-center">MY COURSES</h1>
        <div className="">
          <Tabs>
            <div className="w-full h-max flex  justify-center">
              <div className="w-[300px] relative ">
                <TabList
                  gap={"16px"}
                  display="flex"
                  justifyContent="center"
                  marginTop="60px"
                >
                  <Tab>All courses</Tab>
                  <Tab>Inprogress</Tab>
                  <Tab>completed</Tab>
                </TabList>

                <TabIndicator
                  mt="-1.5px"
                  height="2px"
                  bg="blue.500"
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
