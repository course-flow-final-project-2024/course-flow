import dynamic from 'next/dynamic';
import Link from 'next/link';

const LogInForm = dynamic(() => import('@/components/login-form.jsx'), {
  ssr: false
});

function LogInPage() {
  return (
    <div className="container mx-auto">
      <h1>Welcome back!</h1>
      <LogInForm />
      <div>
        Don't have an account?{' '}
        <Link href="/register" className="text-blue-700 hover:underline">
          Register
        </Link>
      </div>
    </div>
  );
}

export default LogInPage;

