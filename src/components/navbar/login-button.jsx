import Link from "next/link";

export default function LoginButton() {
  return (
    <Link
      href="/login"
      className="w-[75px] h-[37px] flex justify-center items-center font-bold bg-blueButton text-sm text-white rounded-xl lg:h-[60px] lg:w-[112px] lg:text-base hover:bg-white hover:text-blueButton hover:outline hover:outline-1 hover:hover-blueButton ease-in-out duration-300 "
    >
      Log in
    </Link>
  );
}
