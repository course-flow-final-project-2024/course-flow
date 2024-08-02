import { AssignmentContext } from "@/pages/assignment";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";
import { useContext } from "react";

export default function AssignmentTabs(prop) {
  const { setAssignmentStatus } = useContext(AssignmentContext);
  return (
    <Tabs position="relative" variant="unstyled" className="">
      <TabList className="h-10 flex flex-row gap-2 whitespace-nowrap ">
        {["All", "Pending", "Submitted"].map((status) => (
          <Tab
            _selected={{ color: "black" }}
            className="p-2 text-base font-normal text-[#9AA1B9]"
            onClick={() => {
              setAssignmentStatus(status);
            }}
          >
            {status}
          </Tab>
        ))}
      </TabList>
      <TabIndicator mt="-1.5px" height="1.5px" bg="#000" borderRadius="1px" />
    </Tabs>
  );
}
