import Link from "next/link";
import LogInForm from "@/components/login-form.jsx";
function LogInPage() {
  return (
    <div className="container mx-auto">
      {/* NavBar */}
      <h1>Welcome back!</h1>
      <LogInForm />
      <div>
        Don't have an account?{" "}
        <Link href="/register" className="text-blue-700 hover:underline">
          Register
        </Link>
      </div>
    </div>
  );
}
export default LogInPage;
