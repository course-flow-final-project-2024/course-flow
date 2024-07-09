import Link from "next/link";
import LogInForm from "@/components/login-form.jsx";
function AdminLogInPage() {
  return (
    <div className="bg">
      <div className="container mx-auto">
        <h1>CourseFlow</h1>
        <p>Admin Panel Control</p>
        <LogInForm />
      </div>
    </div>
  );
}
export default AdminLogInPage;
