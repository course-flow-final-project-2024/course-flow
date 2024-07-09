import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Image,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminCoursesList = () => {
  const [courseList, setCourseList] = useState([]);

  async function getCourseList() {
    try {
      const result = await axios.get("/api/course");

      setCourseList(result.data.courses);
    } catch (error) {
      console.error("Error fetching course list:", error);
    }
  }

  useEffect(() => {
    getCourseList();
  }, []);
  return (
    <Box>
      <div>
        <TableContainer borderRadius="lg">
          <Table variant="simple">
            <Thead>
              <Tr bg="gray.200" color="gray.800" borderRadius="md">
                <Th></Th>
                <Th>Image</Th>
                <Th>Course Name</Th>
                <Th>Lesson</Th>
                <Th>Price</Th>
                <Th>Created date</Th>
                <Th>Updated date</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {courseList.map((item, index) => {
                const recordNumber = index + 1;
                return (
                  <Tr
                    bg="white"
                    color="black"
                    height="88px"
                    borderbuttom="1px"
                    borderColor="gray.200"
                    key={item.course_id}
                  >
                    <Td>{recordNumber}</Td>
                    <Td>
                      <Image
                        src={item.course_image}
                        alt="course-image"
                        boxSize={47}
                      />
                    </Td>
                    <Td>{item.course_name}</Td>
                    <Td>x Lessons</Td>
                    <Td>{item.price}</Td>
                    <Td>{item.created_at}</Td>
                    <Td>{item.updated_at}</Td>
                    <Td>
                      <Flex gap={2}>
                        <Image src="/icons/delete.svg" alt="delete icon" />
                        <Image src="/icons/edit.svg" alt="edit icon" />
                      </Flex>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </Box>
  );
};

export default AdminCoursesList;
