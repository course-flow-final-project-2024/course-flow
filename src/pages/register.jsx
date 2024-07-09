import Link from "next/link";
import RegistrationForm from "@/components/registration-form.jsx";
function RegisterPage() {
  return (
    <div className="container mx-auto">
      {/* NavBar */}
      <h1>Register to start learning!</h1>
      <RegistrationForm />
      <div>
        Already have an account? {"\t"}
        <Link href="/login" className="text-blue-700 hover:underline">
          Log in
        </Link>
      </div>
    </div>
  );
}
export default RegisterPage;
