import { AssignmentContext } from "@/pages/my-assignments";
import { Tabs, TabList, Tab, TabIndicator } from "@chakra-ui/react";
import { useContext } from "react";

export default function AssignmentTabs(prop) {
  const { originalData, setAssingmentData } = useContext(AssignmentContext);

  function filterAssignment(status) {
    if (status === "Pending") {
      const newAssignment = originalData.filter((assignment) => {
        if (assignment.assignment_status_id === 2) {
          return assignment;
        }
      });
      setAssingmentData(newAssignment);
    } else if (status === "Submitted") {
      const newAssignment = originalData.filter((assignment) => {
        if (assignment.assignment_status_id === 1) {
          return assignment;
        }
      });
      setAssingmentData(newAssignment);
    } else {
      setAssingmentData(originalData);
    }
  }
  return (
    <Tabs position="relative" variant="unstyled" className="">
      <TabList className="h-10 flex flex-row gap-2 whitespace-nowrap ">
        {["All", "Pending", "Submitted"].map((status, index) => (
          <Tab
            key={index}
            _selected={{ color: "black" }}
            className="p-2 text-base font-normal text-[#9AA1B9]"
            onClick={() => {
              filterAssignment(status);
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
