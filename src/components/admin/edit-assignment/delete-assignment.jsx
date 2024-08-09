import AdminCommonModalBox from "@/utils/admin-common-modal";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const AdminDeleteAssignment = () => {
  const router = useRouter();
  const assignmentId = router.query.assignmentId;
  const [open, setOpen] = useState(false);
  const toastId = "delete-assignment";
  const toast = useToast({
    id: toastId,
    position: "top",
    isClosable: true,
  });

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    const deleteAssignment = axios.delete(`/api/assignment/delete`, {
      data: { assignment_id: assignmentId },
    });
    if (!toast.isActive(toastId)) {
      toast.promise(deleteAssignment, {
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
      const result = await deleteAssignment;
      if (result.status === 200) {
        handleClose();
        router.push(`/admin/assignments`);
      }
    } catch (error) {
      return {
        message: "Server could not delete courses due to database connection",
      };
    }
  };
  return (
    <>
      <div>
        <p
          className="text-[#2F5FAC] font-[700] text-end bg-[#F6F7FC] py-20 pr-10 w-full h-full"
          role="button"
          onClick={() => {
            handleOpen();
          }}
        >
          Delete Assignment
        </p>
        <AdminCommonModalBox
          open={open}
          AlertMessage="Do you want to delete this assignment?"
          leftText="Yes, I want to delete this assignment"
          rightText="No, keep it"
          leftOnClick={() => {
            handleDelete();
          }}
          rightOnClick={handleClose}
          crossClick={handleClose}
        />
      </div>
    </>
  );
};

export default AdminDeleteAssignment;
