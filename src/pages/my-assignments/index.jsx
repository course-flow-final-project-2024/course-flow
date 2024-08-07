import Navbar from "@/components/navbar/navbar";
import CommonFooter from "@/components/footer/common-footer";
import AssignmentTabs from "@/components/assignment/tabs";
import { createContext, useState, useEffect } from "react";
import AssignmentCard from "@/components/assignment/card";
import { useRouter } from "next/router";
import getUserAssignment from "./getUserAssignment";

export const AssignmentContext = createContext();

function UserAssignment() {
  const router = useRouter();
  const [assingmentData, setAssingmentData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const valueInContext = {
    assingmentData,
    setAssingmentData,
    originalData,
    setOriginalData,
    setIsLoading,
    setIsError,
  };
  useEffect(() => {
    setIsError(false);
    const hasToken = Boolean(localStorage.getItem("token"));
    if (!hasToken) {
      router.push("/login");
      return;
    } else {
      getUserAssignment(
        setAssingmentData,
        setOriginalData,
        setIsLoading,
        setIsError
      );
    }
  }, []);
  return (
    <AssignmentContext.Provider value={valueInContext}>
      <div>
        <Navbar />
        <div className="w-full flex flex-col items-center gap-6 px-[8%] py-[5%]">
          <div className="header flex flex-col items-center gap-14">
            <h1 className="text-4xl font-medium">My Assignments</h1>
            <div className=" max-[400px]:w-[85vw] max-[400px]:overflow-x-scroll">
              <AssignmentTabs />
            </div>
          </div>
          <div className="w-full max-w-[1120px]">
            {isLoading ? (
              <div className="w-full min-h-[350px] flex flex-col gap-4 items-center justify-center">
                <span className="text-3xl">Loading</span>
                <span className="loading loading-dots loading-lg"></span>
              </div>
            ) : assingmentData.length === 0 ? (
              <div className="w-full min-h-[350px] flex flex-col gap-2 items-center justify-center">
                <span className="text-lg font-medium sm:text-xl md:text-2xl xl:text-3xl">
                  There are currently no assignment in your assignment list.
                </span>
              </div>
            ) : isError ? (
              <div className="w-full min-h-[350px] flex flex-col gap-2 items-center justify-center">
                <span className="text-lg font-medium sm:text-xl md:text-2xl xl:text-3xl">
                  Something went wrong. Please try again later.
                </span>
              </div>
            ) : (
              <AssignmentCard />
            )}
          </div>
        </div>
        <CommonFooter />
      </div>
    </AssignmentContext.Provider>
  );
}

export default UserAssignment;
