import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
} from "@chakra-ui/react";
import Image from "next/image";

export function LessonTable() {
  return (
    <TableContainer rounded={"8px"}>
      <Table variant={"simple"} width={"full"}>
        <Thead background={"#E4E6ED"} textColor={"#424C6B"} fontSize={14}>
          <Tr height={"41px"}>
            <Th width={"56px"}></Th>
            <Th width={"48px"}></Th>
            <Th
              width={"500px"}
              textAlign={"start"}
              paddingX={3}
              fontWeight={400}
            >
              Lesson name
            </Th>
            <Th
              isNumeric
              width={"396px"}
              textAlign={"start"}
              paddingX={3}
              fontWeight={400}
            >
              Sub-lesson
            </Th>
            <Th width={"120px"} fontWeight={400}>
              Action
            </Th>
          </Tr>
        </Thead>
        <Tbody fontSize={16} textColor={"#000"} backgroundColor={"#fff"}>
          <Tr height={"88px"} borderBottom={"1px"} borderColor={"#F1F2F6"}>
            <Td>
              <Flex justifyContent={"center"} gap={0.5} align={"center"}>
                <Image
                  src="/icons/drag.svg"
                  alt="drag Icon"
                  width={7}
                  height={7}
                />
                <Image
                  src="/icons/drag.svg"
                  alt="drag Icon"
                  width={7}
                  height={7}
                />
              </Flex>
            </Td>
            <Td textAlign={"center"}>1</Td>
            <Td paddingX={3}>Introduction</Td>
            <Td isNumeric paddingX={3}>
              10
            </Td>
            <Td>
              <Flex justifyContent={"center"} alignItems={"center"} gap={17}>
                <Image
                  src="/icons/delete.svg"
                  alt="delete Icon"
                  width={24}
                  height={24}
                />
                <Image
                  src="/icons/edit.svg"
                  alt="edit Icon"
                  width={24}
                  height={24}
                />
              </Flex>
            </Td>
          </Tr>
          <Tr height={"88px"} borderBottom={"1px"} borderColor={"#F1F2F6"}>
            <Td>
              <Flex justifyContent={"center"} gap={0.5} align={"center"}>
                <Image
                  src="/icons/drag.svg"
                  alt="drag Icon"
                  width={7}
                  height={7}
                />
                <Image
                  src="/icons/drag.svg"
                  alt="drag Icon"
                  width={7}
                  height={7}
                />
              </Flex>
            </Td>
            <Td textAlign={"center"}>1</Td>
            <Td paddingX={3}>Introduction</Td>
            <Td isNumeric paddingX={3}>
              10
            </Td>
            <Td>
              <Flex justifyContent={"center"} alignItems={"center"} gap={17}>
                <Image
                  src="/icons/delete.svg"
                  alt="delete Icon"
                  width={24}
                  height={24}
                />
                <Image
                  src="/icons/edit.svg"
                  alt="edit Icon"
                  width={24}
                  height={24}
                />
              </Flex>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}
