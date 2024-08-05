import axios from "axios";
import Navbar from "@/components/navbar/navbar";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import SearchCourse from "@/components/courses/search-course";
import CourseCard from "../../components/courses/course-card";
import { Pagination, Box } from "@mui/material";
import CommonFooter from "@/components/footer/common-footer";
import CommonBottomSection from "@/components/bottom-section/common-bottom-section";

export default function Course() {
  const [course, setCourse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    allItem: 0,
    page: 0,
    limit: 0,
  });
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  const limitCardPerPage = 12;

  const title = searchParams.get("title") || "";
  const courseTitleRef = useRef(null);

  useEffect(() => {
    async function getCourseData() {
      try {
        const result = await axios.get(`/api/courses/get`, {
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
        setLoading(false);
      } catch (error) {
        return {
          message: "Server could not read courses due to database connection",
        };
      }
    }

    getCourseData();
  }, [title, currentPage]);

  return (
    <>
      <Navbar />
      <div className="sm:px-[160px] px-4">
        <SearchCourse
          searchParams={searchParams}
          courseTitleRef={courseTitleRef}
        />
        {loading ? (
          <div className="flex flex-col justify-center items-center h-80">
            <h1 className="text-2xl font-medium">Loading</h1>
            <span className="loading loading-dots loading-lg"></span>
          </div>
        ) : (
          <div className="grid sm:grid-cols-[repeat(auto-fit,minmax(360px,1fr))] sm:mt-[100px] gap-6 ">
            {course.map((item, index) => (
              <div className="grid justify-center" key={index}>
                <CourseCard
                  course_id={item.course_id}
                  course_image={item.course_image}
                  course_name={item.course_name}
                  summary={item.summary}
                  lessons={item.lessons}
                  duration={item.duration}
                  index={index}
                  key={index + item.course_name}
                />
              </div>
            ))}
          </div>
        )}
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
              courseTitleRef.current.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </Box>
      </div>
      <CommonBottomSection />
      <CommonFooter />
    </>
  );
}
