import Image from "next/image";
import Link from "next/link";
import LoginButton from "./login-button.jsx";
import axios from "axios";
import { useState, useEffect } from "react";
import NavbarDropdown from "./dropdown.jsx";
import { useRouter } from "next/router.js";
import { useRouter } from 'next/router';

function Navbar() {
  const router = useRouter();
  const [username, setUsername] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const router = useRouter();

  const getUserProfile = async (email, auth) => {
    const hasToken = Boolean(localStorage.getItem("token"));
    const hasUserInfo = Boolean(sessionStorage.getItem("user"));
    if (!hasToken) {
      return;
    } else if (hasUserInfo) {
      const userInfo = JSON.parse(sessionStorage.getItem("user"));
      setUsername(userInfo.name);
      setUserImage(userInfo.image);
      return;
    }
    try {
      const result = await axios.get("/api/user-profile/get");
      const name = result.data.user.name;
      const UrlImage = result.data.user.image;
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          name: name,
          image: UrlImage,
        })
      );
      setUsername(name);
      setUserImage(UrlImage);
      return;
    } catch (err) {
      return {
        message: "Server could not get user information",
      };
    }
  };
  const handleLogOut = async () => {
    try {
      const response = await axios.post("/api/auth/logout");
      localStorage.removeItem("token");
      sessionStorage.removeItem("user");
      setUsername(null);
      setUserImage(null);
      router.push("/");
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
  }, []);
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
