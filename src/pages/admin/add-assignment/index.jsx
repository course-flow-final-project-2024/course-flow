import AdminSidebar from "@/components/admin/sidebar";
import AdminCreatingHeader from "@/components/admin/header/creating-page";
import AdminAddAssignmentForm from "@/components/admin/add-assignment/add-assignment-form";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AddNewAssignment() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  async function checkLoginStatus() {
    const hasToken = Boolean(localStorage.getItem("token"));

    if (hasToken) {
      try {
        const result = await axios.get("/api/user-profile/get");
        if (result.data.user.role !== 1) {
          router.push("/");
          return;
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
  }, [isClient, router]);

  return (
    <>
      <div className="min-h-screen flex flex-grow w-full relative">
        <AdminSidebar section="assignment" />
        <div className="flex flex-col w-full bg-[#F6F7FC]">
          <AdminCreatingHeader
            section="Add Assignment"
            formId={"add-assignment"}
          />
          <div className="w-full pt-10 px-10">
            <AdminAddAssignmentForm />
          </div>
        </div>
      </div>
    </>
  );
}
