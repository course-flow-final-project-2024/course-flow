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
import { Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/router";

const AdminAssignmentList = () => {
  const [assignment, setAssignment] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    allItem: 0,
    page: 0,
    limit: 0,
  });
  const [open, setOpen] = useState(false);
  const [selectedAssignmentId, setSelectedASsignmentId] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  const toastFetch = useToast({
    id: "fetch",
    position: "top",
    isClosable: true,
  });

  const toastDelete = useToast({
    id: "delete",
    position: "top",
    isClosable: true,
  });

  const searchParams = useSearchParams();
  const limitCardPerPage = 8;
  const title = searchParams.get("title") || "";

  async function getAssignmentData() {
    const getAssignmentData = axios.get(`/api/assignment/get_all`, {
      params: {
        search: title,
        currentPage: currentPage,
        limit: limitCardPerPage,
      },
    });
    if (!toastFetch.isActive("fetch")) {
      toastFetch.promise(getAssignmentData, {
        success: {
          title: "Completed download :)",
          description: "Let's go!",
        },
        error: {
          title: "Oops.. :(",
          description: "Something wrong.",
        },
        loading: {
          title: "Loading assignment",
          description: "Please wait.",
        },
      });
    }
    try {
      const result = await getAssignmentData;

      if (result.data.totalItems === 0) {
        setAssignment([]);
        setPagination({
          currentPage: 1,
          allItem: 0,
          page: 0,
          limit: limitCardPerPage,
        });
        setCurrentPage(1);
      } else {
        setAssignment(result.data.assignments);
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
        message: "Server could not read assignments due to database connection",
      };
    }
  }

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
        getAssignmentData();
      }
    }
  }, [isClient, router, title, currentPage]);

  const handleOpen = (assignmentId) => {
    setSelectedASsignmentId(assignmentId);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (assignmentId) => {
    const deleteAssignment = axios.delete(`/api/assignment/delete`, {
      data: { assignment_id: assignmentId },
    });
    if (!toastDelete.isActive("delete")) {
      toastDelete.promise(deleteAssignment, {
        success: {
          title: "Good to go :)",
          description: "Assignment has been deleted succesfully.",
        },
        error: {
          title: "Oops... :(",
          description: "Something wrong.",
        },
        loading: {
          title: "Deleting Assignment...",
          description: "Please wait.",
        },
      });
    }
    try {
      let result = await deleteAssignment;
      if (result.status === 200) {
        getAssignmentData();
        handleClose();
      }
    } catch (error) {
      return {
        message:
          "Server could not delete assignment due to database connection",
      };
    }
  };

  const dateFormat = (key) => {
    const result = `${key.slice(0, 4)}/${key.slice(5, 7)}/${key.slice(8, 10)} ${
      Number(key.slice(11, 13)) + 7
    }:${key.slice(14, 16)}`;

    return result;
  };

  const ShortenTitle = ({ title }) => {
    const shortenTitle = title.length > 17 ? `${title.slice(0, 17)}...` : title;
    const isToolTipDisable = title.length <= 17;
    return (
      <Tooltip
        bg="gray.100"
        color="gray.500"
        label={title}
        isDisabled={isToolTipDisable}
        paddingX={3}
        paddingY={1}
        maxW={500}
      >
        {shortenTitle}
      </Tooltip>
    );
  };

  return (
    <Box>
      <TableContainer borderRadius="lg">
        <Table
          variant="simple"
          width="100%"
          minwidth="1120px"
          className="table-fixed"
        >
          <Thead>
            <Tr bg="gray.200" color="#424C6B" height="41px">
              <Th width="200px" align="start" pl="16px" fontWeight="normal">
                Assignment detail
              </Th>
              <Th width="200px" align="start" pl="16px" fontWeight="normal">
                Course
              </Th>
              <Th width="200px" align="start" pl="16px" fontWeight="normal">
                Lesson
              </Th>
              <Th width="200px" align="start" pl="16px" fontWeight="normal">
                Sub-lesson
              </Th>
              <Th width="200px" align="start" pl="16px" fontWeight="normal">
                Created date
              </Th>
              <Th width="120px" align="center" fontWeight="normal">
                Action
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {assignment.length > 0 ? (
              assignment.map((item, index) => (
                <Tr
                  bg="white"
                  color="black"
                  height="88px"
                  align="start"
                  key={index}
                  className="border-b border-[#F1F2F6]"
                >
                  <Td pl="16px" pr="16px">
                    <ShortenTitle title={item.assignment_title} />
                  </Td>

                  <Td pl="16px">
                    <ShortenTitle
                      title={item.sub_lessons.lessons.courses.course_name}
                    />
                  </Td>
                  <Td pl="16px">
                    <ShortenTitle
                      title={item.sub_lessons.lessons.lesson_title}
                    />
                  </Td>
                  <Td pl="16px">
                    <ShortenTitle title={item.sub_lessons.sub_lesson_title} />
                  </Td>
                  <Td pl="16px">{dateFormat(item.created_at)}</Td>
                  <Td>
                    <Flex gap={2} align="start" justify="center">
                      <Image
                        src="/icons/delete.svg"
                        alt="delete icon"
                        onClick={() => {
                          handleOpen(item.assignment_id);
                        }}
                        role="button"
                      />
                      <AdminCommonModalBox
                        open={open}
                        AlertMessage="Do you want to delete this assignment?"
                        leftText="Yes, I want to delete this assignment"
                        rightText="No, keep it"
                        leftOnClick={() => {
                          handleDelete(selectedAssignmentId);
                        }}
                        rightOnClick={handleClose}
                        crossClick={handleClose}
                      />
                      <Link href={`/admin/assignments/${item.assignment_id}`}>
                        <Image src="/icons/edit.svg" alt="edit icon" />
                      </Link>
                    </Flex>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan="8" align="center">
                  No assignments found.
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

export default AdminAssignmentList;
