import Image from "next/image";
import Link from "next/link";
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

export function AdminLessonList({ lesson }) {
  const handleDelete = () => {
    return "Deleted";
  };

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
        {lesson.map((item, index) => {
          return (
            <Tbody
              fontSize={16}
              textColor={"#000"}
              backgroundColor={"#fff"}
              key={index + item.lesson_title}
            >
              <Tr height={"88px"} borderBottom={"1px"} borderColor={"#F1F2F6"}>
                <Td>
                  <Flex justifyContent={"center"} gap={0.5} align={"center"}>
                    <Image
                      src="/icons/drag.svg"
                      alt="drag Icon"
                      width={5}
                      height={5}
                    />
                    <Image
                      src="/icons/drag.svg"
                      alt="drag Icon"
                      width={5}
                      height={5}
                    />
                  </Flex>
                </Td>
                <Td textAlign={"center"}>{index + 1}</Td>
                <Td paddingX={3}>{item.lesson_title}</Td>
                <Td isNumeric paddingX={3}>
                  {item.sub_lessons[0].count}
                </Td>
                <Td>
                  <Flex
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={17}
                  >
                    <Image
                      src="/icons/delete.svg"
                      alt="delete Icon"
                      width={24}
                      height={24}
                      onClick={() => {
                        handleDelete();
                      }}
                      className=" cursor-pointer"
                    />
                    <Link href="/">
                      <Image
                        src="/icons/edit.svg"
                        alt="edit Icon"
                        width={24}
                        height={24}
                      />
                    </Link>
                  </Flex>
                </Td>
              </Tr>
            </Tbody>
          );
        })}
      </Table>
    </TableContainer>
  );
}
