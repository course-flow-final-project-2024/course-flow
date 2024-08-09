import Button from "@/utils/button";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { supabase } from "../../../lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@chakra-ui/react";

async function uploadImage(file) {
  const bucket = "userProfile";
  const foleder = "userImage";
  const fileName = `${uuidv4()}_${file.name}`;
  const filePath = `${foleder}/${fileName}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (error) {
    console.error("Error uploading image:", error);
    return null;
  }
  return filePath;
}

async function getImageUrl(filePath) {
  try {
    const { data, error } = supabase.storage
      .from("userProfile")
      .getPublicUrl(filePath);

    if (error) {
      console.error("Error getting image Url:", error);
      return null;
    }

    if (!data || !data.publicUrl) {
      console.error("Public URL is not available in the response.");
      return null;
    }

    console.log("Image URL:", data.publicUrl);
    return data.publicUrl;
  } catch (error) {
    console.error("Error getting image Url:", error.message);
    return null;
  }
}

function UpdateProfile() {
  const router = useRouter();
  const toast = useToast();

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
  const showToast = (message) => {
    toast({
      title: "Success",
      description: message,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  useEffect(() => {
    if (message) {
      showToast(message);
    }
  }, [message]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
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
          profileImage: image,
        });

        setProfileImage(image);
        setImagePreview(image);
      } catch (error) {
        setMessage(error.message || "Failed to fetch user data");
      }
    };

    fetchUser();
  }, [router]);

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

  const handleRemoveImage = async () => {
    if (profileImage && typeof profileImage === "string") {
      try {
        const response = await axios.post("/api/user-profile/delete-image", {
          filePath: profileImage,
          userEmail: userData.email,
        });

        console.log(response.data.message);
        setProfileImage(null);
        setImagePreview("");
      } catch (error) {
        console.error("Error removing image:", error);
      }
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

      if (profileImage && typeof profileImage === "object") {
        const filePath = await uploadImage(profileImage);
        console.log("File Path:", filePath);
        if (filePath) {
          imageUrl = await getImageUrl(filePath);
        }
      }
      console.log("Image URL:", imageUrl);

      const data = {
        name,
        email,
        education_bg,
        birthday,
        image: imageUrl,
      };
      console.log("Data to be sent:", data);

      const response = await axios.patch("/api/user-profile/update", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Response:", response.data.message);

      if (email !== userData.email) {
        setMessage("Please log in again to confirm your email change.");

        setTimeout(() => {
          localStorage.removeItem("token");
          router.push("/login");
        }, 3000);
      } else {
        setMessage(response.data.message || "Profile updated successfully");
        location.reload();
        sessionStorage.removeItem("user")
        // setUserData({ ...userData, ...data });
      }
     
    } catch (error) {
      console.error("update profile error", error);
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
          className="flex lg:flex-row flex-col gap-[120px]"
          onSubmit={handleSubmit}
        >
          <div className="relative inline-block min-[453px]:w-[358px] w-[343px] h-[358px] rounded-lg">
            <input
              id="profile-image"
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
            {imagePreview ? (
              <div className="image-preview w-full h-full relative flex justify-center items-center rounded-[8px] bg-[#F6F7FC] overflow-hidden">
                <img
                  src={imagePreview ? imagePreview : ""}
                  alt=""
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  className="rounded-full bg-[#9B2FAC] w-8 h-8 text-center text-white text-[12px] top-[6px] right-[6px] absolute"
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveImage();
                  }}
                  aria-label="Remove profile image"
                >
                  X
                </button>
              </div>
            ) : (
              <label
                htmlFor="profile-image"
                className="flex flex-col justify-center items-center bg-[#F6F7FC] w-full h-full rounded-[8px] cursor-pointer relative z-10"
              >
                <p className="text-[#5483D0] text-center text-2xl">+</p>
                <p className="text-[#5483D0] text-center">Upload Image</p>
              </label>
            )}
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
      </div>
    </div>
  );
}
export default UpdateProfile;
