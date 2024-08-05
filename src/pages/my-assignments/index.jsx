import Navbar from "@/components/navbar/navbar";
import CommonFooter from "@/components/footer/common-footer";
import AssignmentTabs from "@/components/assignment/tabs";
import { createContext, useState, useEffect } from "react";
import AssignmentCard from "@/components/assignment/card";
import { useRouter } from "next/router";
import axios from "axios";

export const AssignmentContext = createContext();

function UserAssignment() {
  const router = useRouter();
  const [assingmentData, setAssingmentData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);

  async function getUserAssignment() {
    setErrorStatus(false);
    const hasToken = Boolean(localStorage.getItem("token"));
    if (!hasToken) {
      router.push("/login");
      return;
    }

    try {
      setLoadingStatus(true);
      const result = await axios.get("/api/assignment/get_user_assignments");
      setAssingmentData(result.data);
      setOriginalData(result.data);
      setLoadingStatus(false);
      return;
    } catch (err) {
      setLoadingStatus(false);
      setErrorStatus(true);
      return;
    }
  }

  const valueInContext = {
    assingmentData,
    setAssingmentData,
    originalData,
  };
  useEffect(() => {
    getUserAssignment();
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
            {loadingStatus ? (
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
            ) : errorStatus ? (
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
