import { useRouter } from "next/router";

export default function EditAssignment(params) {
  const router = useRouter();
  const assignmentId = router.query.assignmentId;
  return <h1>{assignmentId}</h1>;
}
