import Button from "@/utils/button";
import React, { useState, useEffect } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Center, TabIndicator } from '@chakra-ui/react'
import InprogressCard from "./my-inprogress-card";
import CompletedCard from "./CompletedCard";
import Allcourses from "./allcourses";

export default function GetMyCourse ( ) {

    return (

    <div className="w-full h-max px-[160px] py-[100px]">
        <div className="w-full h-[1990px] border-2"><h1 className="text-center">MY COURSES</h1>
        <div ><Tabs>
  <TabList gap={"16px"} display="flex" justifyContent="center" marginTop="60px" >
    <Tab>All courses</Tab>
    <Tab>Inprogress</Tab>
    <Tab>completed</Tab>
  </TabList>
  <TabIndicator mt='-1.5px' height='2px' bg='blue.500' borderRadius='1px' />
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
</Tabs></div>
        </div>
    </div>
    )
} 
