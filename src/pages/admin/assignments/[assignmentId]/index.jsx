import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/sidebar";
import AdminEditAssignmentHeader from "@/components/admin/header/edit-assignment-page";
import { useToast } from "@chakra-ui/react";
import AdminEditAssignmentForm from "@/components/admin/edit-assignment/edit-assignment-form";
import AdminDeleteAssignment from "@/components/admin/edit-assignment/delete-assignment";

export default function EditAssignment() {
  const router = useRouter();
  const assignmentId = router.query.assignmentId;
  const [assignmentFromDb, setAssignmentFromDb] = useState({});
  const [isClient, setIsClient] = useState(false);
  const toastId = "fetch-assignment";
  const toast = useToast({
    id: toastId,
    position: "top",
    isClosable: true,
  });

  const getAssignmentData = async () => {
    const getAssignment = axios.get(
      `/api/assignment/get_by_id?assignmentId=${assignmentId}`
    );
    if (!toast.isActive(toastId)) {
      toast.promise(getAssignment, {
        toastId,
        success: { title: "Assignment loaded :)", description: "Let's go!" },
        error: { title: "Oops.. :(", description: "Something wrong." },
        loading: {
          title: "Downloading assignment",
          description: "Please wait.",
        },
      });
    }

    try {
      const result = await getAssignment;
      setAssignmentFromDb(result.data.assignment[0]);
    } catch (error) {
      console.error("Failed to read assignment data", error.message);
    }
  };

  async function checkLoginStatus() {
    const hasToken = Boolean(localStorage.getItem("token"));
    if (hasToken) {
      try {
        const result = await axios.get("/api/user-profile/get");
        if (result.data.user.role !== 1) {
          router.push("/");
          return;
        }
        if (result.data.user.role === 1) {
          if (assignmentId) {
            getAssignmentData();
          }
        }
      } catch (error) {
        router.push("/admin/login");
      }
    }
    if (!hasToken) {
      router.push("/admin/login");
      return;
    }
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      checkLoginStatus();
    }
  }, [isClient, router, assignmentId]);

  return (
    <>
      <div className="min-h-screen flex flex-grow w-full relative">
        <AdminSidebar section="assignment" />
        <div className="flex flex-col w-full bg-[#F6F7FC]">
          <AdminEditAssignmentHeader assignment={assignmentFromDb} />
          <div className="w-full pt-10 px-10">
            <AdminEditAssignmentForm
              assignmentFromDb={assignmentFromDb}
              assignmentId={assignmentId}
            />
          </div>
          <AdminDeleteAssignment />
        </div>
      </div>
    </>
  );
}
