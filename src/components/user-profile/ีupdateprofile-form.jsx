import Button from "@/utils/button";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { uploadProfilePicture } from "./ีupdate-user-image";
import Image from 'next/image';


function  updateProfile () {

  const router = useRouter();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("token"));
    if (!userInfo) {
      router.push("/login");
    }
  }, [])

  const [formData, setFormData] = useState({
    name: "",
    birthday: "",
    education_bg: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [userData, setUserData] = useState({});
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await JSON.parse(localStorage.getItem('token'));

      if (!token) {
        setMessage("Not authorized");
        return;
      }

      try {
       const response = await axios.get("/api/user-profile/get", {
          headers: {
            Authorization: token,
          },
        });
        // setUserData(response.data);
        // setFormData(response.data);
        
        console.log("here", response.data)
        const { name, email, birthday, education, image } = response.data.user;
        setUserData({
          name: name || "",
          email: email || "",
          birthday: birthday || "",
          education: education || "",
          profile_Image: image || "",
        });
      } catch (error) {
        setMessage(error.message || "Failed to fetch user data");
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(!profileImage) {
      return;
    }
    const publicURL = await uploadProfilePicture(profileImage);
    console.log("here1", publicURL)

    const token = JSON.parse(localStorage.getItem("token"));
    const{ name, email, education_bg, birthday, image } = formData;

    if (!token) {
      setMessage("Not authoriized");
      setLoading(false);
      return;
    }

    try {

      const response = await axios.patch("/api/user-profile/update", {
        name,
        birthday,
        education_bg,
        email,
        image,
        }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
      });


    //   if (email && email === session.user_email) {
    //   const { user: updatedAuthUser, error: authError } = await supabase.auth.updateUser({
    //     email: "email"
    //   });

    //   if (authError) {
    //     throw new Error(authError.message);
    //   }
    // }

      setMessage(response.data.message || "Profile updated successfully");
    } catch (error) {
      setMessage(error.response?.data?.error || "Failed to update");
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePictureUpload = async () => {
    if(!profileImage) {
      return;
    }

    const token = json.parse(localStorage.getitem("token"));

    try {
      const user = supabase.auth.user();
      if (!user) {
        throw new Error("User not authenticated");
      }
      const userId = user.user_id;
      const publicURL = await uploadProfilePicture(profileImage, userId);
      console.log("here1", publicURL)
      await axios.patch("/api/user-profile/update", {
        profile_image: publicURL,
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      setMessage("profile image updated successfully");
      setUserData((prevData) => ({ ...prevData, profile_Image: publicURL }));
    } catch (error) {
      setMessage(error.message || "Failed to upload profile picture");
    }
  };

  
  return (
    <div className="w-full h-max flex justify-center overflow-hidden">
      <div className="flex flex-col justify-center items-center gap-[72px] pt-[100px] pb-[217px]">
        <div className="text-4xl font-medium text-center">Profile</div>
        <form
          className="flex lg:flex-row flex-col gap-[120px] "
          onSubmit={handleSubmit}
        >
          <div>
            <input id="profile-image" 
            type="file" 
            accept="image/*" 
            hidden
            onChange={handleFileChange}
             />
            <label
              className="relative inline-block min-[453px]:w-[358px] w-[343px] h-[358px] bg-black rounded-lg"
              htmlFor="profile-image"
            >
              <div className="absolute right-[6px] top-[6px] w-[32px] h-[32px] bg-[#9B2FAC] flex justify-center items-center rounded-full text-white">
                X
              </div>
              <Image
                src={profileImage ? URL.createObjectURL(profileImage) : userData.profile_image || "/default-profile.jpg"}
                alt="Profile Image"
                width={358}
                height={358}
                className="rounded-lg"
              />
            </label>
          </div>
          <div className="flex flex-col gap-[37px] min-[453px]:w-[453px] w-[343px]">
            <label>
              <span className="block">Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={userData?.name || "Name"}
                className="border rounded-lg min-[453px]:w-[453px] w-[343px] h-[48px] p-[12px_16px_12px_12px] outline-none "
              />
            </label>
            <label className="relative w-[453px] h-[76px]">
      <span className="block">Date of Birth</span>
      <div className="relative">
        {!formData.birthday && (
          <span className="absolute top-0 left-0 h-full flex items-center pl-3 text-gray-400 pointer-events-none">
            {userData?.birthday || "YYYY-MM-DD"}
          </span>
        )}
        <input
          type="date"
          name="birthday"
          value={formData.birthday}
          onChange={handleChange}
          onFocus={(e) => {
            e.target.placeholder = '';
          }}
          className={`border rounded-lg min-[453px]:w-[453px] w-[343px] h-[48px] p-[12px_16px_12px_12px] outline-none ${formData.birthday ? '' : 'text-transparent'}`}
        />
      </div>
    </label>
            <label className="w-[453px] h-[76px]">
              <span className="block">Education Background</span>
              <input
                type="text"
                name="education_bg"
                value={formData.education_bg}
                onChange={handleChange}
                placeholder={userData?.education || "Name"}
                className="border rounded-lg min-[453px]:w-[453px] w-[343px] h-[48px] p-[12px_16px_12px_12px] outline-none"
              />
            </label>
            <label className="w-[453px] h-[76px]">
              <span className="block">Email</span>
              <input
                type="email"
                id="email"
                name={"email"}
                value={formData.email}
                onChange={handleChange}
                placeholder={userData?.email || "email"}
                className="border rounded-lg min-[453px]:w-[453px] w-[343px] h-[48px] p-[12px_16px_12px_12px] outline-none"
              />
            </label>

            <Button
              style="primary"
              type="submit"
              text="Update Profile"
              disabled={loading}
            />
          </div>
        </form>
        {/* {message && <div className="mt-4 text-red-500">{message}</div>} */}
      </div>
    </div>
  );
}
export default updateProfile;
