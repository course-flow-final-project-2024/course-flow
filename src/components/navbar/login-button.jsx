import Link from "next/link";

export default function LoginButton() {
  return (
    <Link
      href="/"
      className="w-[75px] h-[37px] flex justify-center items-center font-bold bg-blueButton text-sm text-white rounded-xl "
    >
      Log in
    </Link>
  );
}
