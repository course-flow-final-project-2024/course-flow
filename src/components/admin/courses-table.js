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
  Button,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminCoursesList = () => {
  const [courseList, setCourseList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(8);

  useEffect(() => {
    getCourseList();
  }, [currentPage]);

  async function getCourseList() {
    try {
      const result = await axios.get(
        "/api/course?page=${currentPage}&perPage=${perPage}"
      );

      setCourseList(result.data.courses);
    } catch (error) {
      console.error("Error fetching course list:", error);
    }
  }

  const totalPages = Math.ceil(courseList.length / perPage);

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, courseList.length);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const dateFormat = (key) => {
    const year = key.slice(0, 4);
    const month = key.slice(5, 7);
    const date = key.slice(8, 10);
    const hh = Number(key.slice(11, 13)) + 7;
    const mm = Number(key.slice(14, 16));
    const result = `${year}/${month}/${date} ${hh}:${mm}`;
    return result;
  };

  return (
    <Box>
      <div>
        <TableContainer borderRadius="lg">
          <Table variant="simple" className="table-fixed">
            <Thead>
              <Tr bg="gray.200" color="gray.800" borderRadius="md">
                <Th width="30px"></Th>
                <Th width="96px">Image</Th>
                <Th width="300px">Course Name</Th>
                <Th width="100px">Lesson</Th>
                <Th width="100px">Price</Th>
                <Th width="188px">Created date</Th>
                <Th width="188px">Updated date</Th>
                <Th width="120px">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {courseList.slice(startIndex, endIndex).map((item, index) => {
                const recordNumber = startIndex + index + 1;

                return (
                  <Tr
                    bg="white"
                    color="black"
                    height="88px"
                    borderbuttom="1px"
                    borderColor="gray.200"
                    key={index}
                  >
                    <Td>{recordNumber}</Td>
                    <Td>
                      <Image
                        // src={item.course_image}
                        src="/logo/CourseFlow-logo.svg"
                        alt="course-image"
                        boxSize={47}
                      />
                    </Td>
                    <Td>{item.course_name}</Td>
                    <Td>{item.lessons[0].count} Lessons</Td>
                    <Td>{item.price}</Td>
                    {/* <Td>{item.created_at}</Td> */}
                    <Td>{dateFormat(item.created_at)}</Td>
                    <Td>{dateFormat(item.updated_at)}</Td>
                    <Td>
                      <Flex gap={2} align="center" justify="center">
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
        <Flex justify="center" mt={4}>
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={handlePrevPage}
            mr={2}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
          >
            Next
          </Button>
        </Flex>
      </div>
    </Box>
  );
};

export default AdminCoursesList;
