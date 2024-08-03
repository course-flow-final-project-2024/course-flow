import Button from "@/utils/button";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { supabase } from "../../../lib/supabase";
// import { v4 as uuidv4 } from "uuid";

async function uploadImage(file) {
  const bucket = "userProfile";
  const foleder = "userImage";
  const fileName = `${file.name}`;
  const filePath = `${foleder}/${fileName}`;

  const{ data, error } = await supabase
  .storage
  .from(bucket)
  .upload(filePath, file);

  if (error) {
    console.error("Error uploading image:", error);
    return null;
  }
  return filePath
}

async function getImageUrl(filePath) {
  const { publicUrl, error} = supabase
  .storage
  .from("userProfile")
  .getPublicUrl(filePath);

  if(error) {
    console.error("Error getting image Url:", error);
    return null;
  }
  return publicUrl;
}



function updateProfile() {
  const router = useRouter();
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
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("token"));
    if (!userInfo) {
      router.push("/login");
    }

    const fetchUser = async () => {
      const token = await JSON.parse(localStorage.getItem("token"));

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

        const { name, email, birthday, education, image } = response.data.user;
        setFormData({
          name: name || "",
          email: email || "",
          birthday: birthday || "",
          education_bg: education || "",
        });


        setUserData({
          name,
          email,
          birthday,
          education,
          profileImage: image || "/default-profile.jpg",
        });


        setProfileImage(image || "/default-profile.jpg");
        setImagePreview(image || []);
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
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = JSON.parse(localStorage.getItem("token"));
    const { name, email, education_bg, birthday } = formData;

    if (!token) {
      setMessage("Not authoriized");
      setLoading(false);
      return;
    }

    try {
      let imageUrl = userData.profileImage;
      
      if(profileImage && typeof profileImage === "object") {
        const filePath = await uploadImage(profileImage);
        if(filePath) {
          imageUrl = await getImageUrl(filePath);
        }
      }

      const data = {
        name,
        email,
        education_bg,
        birthday,
        image: imageUrl,
      };
      
      const token = req.headers.authorization;
        const response = await axios.patch("/api/user-profile/update", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        setMessage(response.data.message || "Profile updated successfully");
      } catch (error) {
        console.log("update profile error", error);
        setMessage(error.response?.data?.error || "Failed to update");
      } finally {
        setLoading(false);
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
            <input
              id="profile-image"
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
            <label
              className="relative inline-block min-[453px]:w-[358px] w-[343px] h-[358px] rounded-lg"
              htmlFor="profile-image"
            >
              <div className="absolute right-[6px] top-[6px] w-[32px] h-[32px] bg-[#9B2FAC] flex justify-center items-center rounded-full text-white">
                X
              </div>
              <img
                 src={imagePreview || userData.profileImage}
                objectFit="cover"
                alt=""
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
                    e.target.placeholder = "";
                  }}
                  className={`border rounded-lg min-[453px]:w-[453px] w-[343px] h-[48px] p-[12px_16px_12px_12px] outline-none ${
                    formData.birthday ? "" : "text-transparent"
                  }`}
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
        {message && <div className="mt-4 text-red-500">{message}</div>}
      </div>
    </div>
  );
}
export default updateProfile;
