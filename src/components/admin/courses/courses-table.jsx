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
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Pagination } from "@mui/material";
import AdminCommonModalBox from "@/utils/admin-common-modal";
import Link from "next/link";
import { useRouter } from "next/router";

const AdminCoursesList = () => {
  const [course, setCourse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    allItem: 0,
    page: 0,
    limit: 0,
  });
  const [open, setOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  const toastId = "fetch-data";
  const toast = useToast({
    id: toastId,
    position: "top",
    isClosable: true,
  });

  const handleOpen = (courseId) => {
    setSelectedCourseId(courseId);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const searchParams = useSearchParams();
  const limitCardPerPage = 8;
  const title = searchParams.get("title") || "";

  async function getCourseData() {
    const getCourseData = axios.get(`/api/courses/get`, {
      params: {
        search: title,
        currentPage: currentPage,
        limit: limitCardPerPage,
      },
    });
    if (!toast.isActive(toastId)) {
      toast.promise(getCourseData, {
        success: {
          title: "Completed download :)",
          description: "Let's go!",
        },
        error: {
          title: "Oops.. :(",
          description: "Something wrong.",
        },
        loading: {
          title: "Downloading course",
          description: "Please wait.",
        },
      });
    }
    try {
      const result = await getCourseData;

      if (result.data.totalItems === 0) {
        setCourse([]);
        setPagination({
          currentPage: 1,
          allItem: 0,
          page: 0,
          limit: limitCardPerPage,
        });
        setCurrentPage(1);
      } else {
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
      }
    } catch (error) {
      return {
        message: "Server could not read courses due to database connection",
      };
    }
  }

  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`/api/courses/delete`, {
        data: { course_id: courseId },
      });
      getCourseData();
      handleClose();
    } catch (error) {
      return {
        message: "Server could not delete courses due to database connection",
      };
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const hasToken = Boolean(localStorage.getItem("token"));
      if (!hasToken) {
        router.push("/admin/login");
        return;
      } else {
        getCourseData();
      }
    }
  }, [isClient, router, title, currentPage]);

  const dateFormat = (key) => {
    const result = `${key.slice(0, 4)}/${key.slice(5, 7)}/${key.slice(8, 10)} ${
      Number(key.slice(11, 13)) + 7
    }:${key.slice(14, 16)}`;

    return result;
  };

  const startIndex = (currentPage - 1) * limitCardPerPage;

  return (
    <Box>
      <TableContainer borderRadius="lg">
        <Table
          variant="simple"
          minwidth="1120px"
          width="100%"
          className="table-fixed"
        >
          <Thead>
            <Tr bg="gray.200" color="#424C6B" height="41px">
              <Th width="48px"></Th>
              <Th width="96px" align="start" pl="16px" fontWeight="normal">
                Image
              </Th>
              <Th width="268px" align="start" pl="16px" fontWeight="normal">
                Course Name
              </Th>
              <Th width="105px" align="start" pl="16px" fontWeight="normal">
                Lesson
              </Th>
              <Th width="105px" align="start" pl="16px" fontWeight="normal">
                Price
              </Th>
              <Th width="188px" align="start" pl="16px" fontWeight="normal">
                Created date
              </Th>
              <Th width="190px" align="start" pl="16px" fontWeight="normal">
                Updated date
              </Th>
              <Th width="120px" align="center" fontWeight="normal">
                Action
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {course.length > 0 ? (
              course.map((item, index) => (
                <Tr
                  bg="white"
                  color="black"
                  height="88px"
                  align="start"
                  key={index}
                  className="border-b border-[#F1F2F6]"
                >
                  <Td align="center">{startIndex + index + 1}</Td>
                  <Td pl="16px">
                    <Image
                      src={
                        item.course_image
                          ? item.course_image
                          : "/logo/CourseFlowLogo.svg"
                      }
                      alt="course-image"
                      width="64px"
                      height="47px"
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </Td>
                  <Td pl="16px" pr="16px" whiteSpace="normal">
                    {item.course_name}
                  </Td>
                  <Td pl="16px">{item.lessons.length} Lessons</Td>
                  <Td pl="16px">
                    {item.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </Td>
                  <Td pl="16px">{dateFormat(item.created_at)}</Td>
                  <Td pl="16px">{dateFormat(item.updated_at)}</Td>
                  <Td>
                    <Flex gap={2} align="start" justify="center">
                      <Image
                        src="/icons/delete.svg"
                        alt="delete icon"
                        onClick={() => {
                          handleOpen(item.course_id);
                        }}
                      />
                      <AdminCommonModalBox
                        open={open}
                        AlertMessage="Do you want to delete this course?"
                        leftText="Yes, I want to delete this course"
                        rightText="No, keep it"
                        leftOnClick={() => {
                          handleDelete(selectedCourseId);
                        }}
                        rightOnClick={handleClose}
                        crossClick={handleClose}
                      />
                      <Link href={`/admin/courses/${item.course_id}`}>
                        <Image src="/icons/edit.svg" alt="edit icon" />
                      </Link>
                    </Flex>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan="8" align="center">
                  No courses found.
                </Td>
              </Tr>
            )}
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
    </Box>
  );
};

export default AdminCoursesList;
