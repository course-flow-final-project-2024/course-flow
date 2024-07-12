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
import { useSearchParams } from "next/navigation";
import { Pagination } from "@mui/material";

const AdminCoursesList = () => {
  const [course, setCourse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    allItem: 0,
    page: 0,
    limit: 0,
  });

  const searchParams = useSearchParams();

  const limitCardPerPage = 8;

  const title = searchParams.get("title") || "";

  useEffect(() => {
    async function getCourseData() {
      try {
        const result = await axios.get(`/api/courses/course`, {
          params: {
            search: title,
            currentPage: currentPage,
            limit: limitCardPerPage,
          },
        });

        setCourse(result.data.courses);

        if (currentPage > result.data.totalPages) {
          setCurrentPage(result.data.totalPages);
        } else {
          setPagination({
            currentPage: result.data.currentPage,
            allItem: result.data.totalItems,
            page: result.data.totalPages,
            limit: limitCardPerPage,
          });
        }
      } catch (error) {
        return {
          message: "Server could not read courses due to database connection",
        };
      }
    }

    getCourseData();
  }, [title, currentPage]);

  const dateFormat = (key) => {
    const result = `${key.slice(0, 4)}/${key.slice(5, 7)}/${key.slice(8, 10)} ${
      Number(key.slice(11, 13)) + 7
    }:${key.slice(14, 16)}`;

    return result;
  };

  const startIndex = (currentPage - 1) * limitCardPerPage;

  return (
    <Box>
      <div>
        <TableContainer borderRadius="lg">
          <Table
            variant="simple"
            //tablelayout="fixed"
            minwidth="1120px"
            width="100%"
            className="table-fixed"
          >
            <Thead>
              <Tr bg="gray.200" color="gray.700" height="41px">
                <Th width="30px"></Th>
                <Th width="96px">Image</Th>
                <Th width="300px">Course Name</Th>
                <Th width="100px">Lesson</Th>
                <Th width="100px">Price</Th>
                <Th width="187px">Created date</Th>
                <Th width="187px">Updated date</Th>
                <Th width="120px">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {course.map((item, index) => {
                return (
                  <Tr
                    bg="white"
                    color="black"
                    height="88px"
                    borderbuttom="1px"
                    borderColor="gray.200"
                    align="center"
                    key={index}
                  >
                    <Td>{startIndex + index + 1}</Td>
                    <Td>
                      <Image
                        // src={item.course_image}
                        src="/logo/CourseFlowLogo.svg"
                        alt="course-image"
                        boxSize={47}
                      />
                    </Td>
                    <Td align="start" whiteSpace="normal">
                      {item.course_name}
                    </Td>
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
        <Box
          sx={{
            margin: "10px 0px 30px 0px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pagination
            count={pagination.page}
            variant="outlined"
            shape="rounded"
            color="primary"
            onChange={(_, page) => {
              setCurrentPage(page);
            }}
          />
        </Box>
      </div>
    </Box>
  );
};

export default AdminCoursesList;
