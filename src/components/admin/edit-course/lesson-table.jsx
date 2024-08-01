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
import { useContext, useState } from "react";
import { AddCourseContext } from "@/pages/_app";
import CommonModalBox from "@/utils/admin-common-modal";

export function AdminEditLessonList() {
  const { course, setCourse } = useContext(AddCourseContext);
  const [open, setOpen] = useState(false);
  const lessons = course.lessons;

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (index) => {
    const updatedCourse = { ...course };
    updatedCourse.lessons.splice(index, 1);
    updatedCourse.lessons.map((lesson, index) => (lesson.index = index));
    setCourse(updatedCourse);
    handleClose();
  };

  return (
    <TableContainer rounded={"8px"} marginBottom={"30px"}>
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
        {lessons.map((item, index) => {
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
                <Td isNumeric paddingX={10}>
                  {item.sub_lessons.length}
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
                        handleOpen();
                      }}
                      className=" cursor-pointer"
                    />
                    <CommonModalBox
                      open={open}
                      AlertMessage="Are you sure you want to delete this lesson?"
                      leftText="Yes, I want to delete this lesson"
                      rightText="No, keep it"
                      leftOnClick={() => {
                        handleDelete(index);
                      }}
                      rightOnClick={handleClose}
                      crossClick={handleClose}
                    />
                    <Link
                      href={`/admin/courses/${course.course_id}/lesson/${item.index}`}
                    >
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
