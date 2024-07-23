import Image from "next/image";
import Link from "next/link";
import LoginButton from "./login-button.jsx";
import axios from "axios";
import { useState, useEffect } from "react";
import NavbarDropdown from "./dropdown.jsx";

function Navbar() {
  const [username, setUsername] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const getUserProfile = async (email, auth) => {
    const token = JSON.parse(localStorage.getItem("token")) ?? "[]";

    try {
      const result = await axios.get("/api/user-profile/get", {
        params: { token },
      });
      console.log(result);
      setUsername(result.data.user.name);
      setUserImage(result.data.user.image);
      return;
    } catch (err) {
      return {
        message: "Server could not get user information",
      };
    }
  };
  const handleLogOut = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token")) ?? "[]";
      const response = await axios.post("/api/auth/logout", { token });
      localStorage.removeItem("token");
      setUsername(null);
      setUserImage(null);
      return;
    } catch (err) {
      console.log("handle logout err", err);
      return {
        message: "Server could not logout",
      };
    }
  };
  useEffect(() => {
    getUserProfile();
  }, [username, userImage]);
  return (
    <div className="w-full h-14 bg-white items-center flex justify-between shadow-md px-4 ease-in-out duration-200 sm:px-16 lg:px-40 lg:h-[88px] min-[1800px]:px-96">
      <Link
        href="/"
        className="w-max h-max hover:scale-110 ease-in-out duration-200 hover"
      >
        <Image
          src="/logo/CourseFlowLogo.svg"
          width={117}
          height={13.37}
          alt="website-logo"
          className="lg:w-[140px]"
        />
      </Link>
      <div className=" h-full w-3/6 flex items-center justify-end gap-4 lg:gap-8">
        <Link
          href="/courses"
          className="text-[#191C77] font-bold text-sm lg:text-base hover:scale-110 ease-in-out duration-200 "
        >
          Our Courses
        </Link>
        {username ? (
          <NavbarDropdown
            image={userImage}
            name={username}
            handleLogOut={handleLogOut}
          />
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  );
}

export default Navbar;
