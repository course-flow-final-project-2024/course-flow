import axios from "axios";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SearchCourse from "@/components/courses/search-course";
import CourseCard from "../../components/courses/course-card";
import { Pagination, Box } from "@mui/material";

export default function Course() {
  const [course, setCourse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    allItem: 0,
    page: 0,
    limit: 0,
  });

  const searchParams = useSearchParams();

  const limitCardPerPage = 12;

  const query = searchParams.get("query") || "";

  useEffect(() => {
    async function getCourseData() {
      try {
        const result = await axios.get(`/api/courses/course`, {
          params: {
            search: query,
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
  }, [query, currentPage]);

  return (
    <>
      <Navbar />
      <div className="sm:px-[160px] px-4">
        <SearchCourse searchParams={searchParams} />
        <div className="flex flex-wrap justify-center sm:mt-[100px] gap-6">
          <CourseCard course={course} />
        </div>
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
    </>
  );
}
