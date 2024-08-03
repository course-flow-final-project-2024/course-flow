import Button from "@/utils/button";
import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";


function UpdateProfile() {

    const [user, setUser] = useState(null);
    const[profileData, setProfileData] = useState({
      name: "",
      email: "",
      birthday: "",
      education_bg: "",
    });

    const [profileImage, setProfileImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    useInsertionEffect(() => {
      const getProfile = async () => {
        const { data, error } = await supabase
        .from("user")
        .select("name, email, birthday, education_bg, image_user")
        .eq("id", user.id)
        .single();
        if (data) {
          setProfileData(data);
          setImageUrl(data.image_user);
        }
      };
      if (user) {
        getProfile();
      }
    }, [user]);

    const handlechange = (e) => {
      const { name, value } = e.target;
      setProfileData((prevState) => ({ ...prevState, [name]: value }));
    };
    
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file && (file.type === "image/jpeg" || file.type === "image/png") && file.size <= 2 * 1024 * 1024) {
        setProfileImage(file);
      } else {
        alert("Please upload image file (.jpg, .jpeg, .png) under 2mb");
      }
    };

    const handleImageUpload = async () => {
      if (profileImage) {
        const { success, imageUrl, error } = await uploadProfileImage(user.id, profileImage);
        if (success) {
          setImageUrl(imageUrl);
          console.log("Profile image updated successfully");
        }
      } else {
        console.error("error uploading :", error);
      }
    }
  };

  const handleDeleteImage = async () => {
    if (imageUrl) {
      const { success, error } = await deleteProfileImage(user.id, imageUrl);
    if (success) {
      setImageUrl(null);
      console.log("Profile image deleted successfully");
    } else { 
      console.error("error deleting :", error);
    }
  }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
    .from("users")
    .update(profileData)
    .eq("id", user.id);
  if (error) {
    console.error("Error updating Profile:", error);
  } else {
    console.log("update success");
  }
  };

  return (
    <div className="w-full h-max flex justify-center overflow-hidden">
    <div className="flex flex-col justify-center items-center gap-[72px] pt-[100px] pb-[217px]">
        <div className="text-4xl font-medium text-center">Profile</div>
        <form className="flex lg:flex-row flex-col gap-[120px] ">
      <div>
        <input id="profile-image" type="file" accept="image/*" hidden />
        <label
          className="relative inline-block min-[453px]:w-[358px] w-[343px] h-[358px] bg-orange-200 rounded-lg"
          htmlFor="profile-image"
        >
          <div className="absolute right-[6px] top-[6px] w-[32px] h-[32px] bg-[#9B2FAC] flex justify-center items-center rounded-full text-white">
            X
          </div>
        </label>
      </div>
      <div className="flex flex-col gap-[37px] min-[453px]:w-[453px] w-[343px]">
        <label>
          <span className="block">Name</span>
          <input
            placeholder="name"
            className="border rounded-lg min-[453px]:w-[453px] w-[343px] h-[48px] p-[12px_16px_12px_12px] outline-none "
          />
        </label>
        <label className="w-[453px] h-[76px]">
          <span className="block">birthday</span>
          <input
            type="date"
            placeholder="DD/MM/YY"
            className="border rounded-lg min-[453px]:w-[453px] w-[343px] h-[48px] p-[12px_16px_12px_12px] outline-none"
          />
        </label>
        <label className="w-[453px] h-[76px]">
          <span className="block">education background</span>
          <input
            placeholder="edg"
            className="border rounded-lg min-[453px]:w-[453px] w-[343px] h-[48px] p-[12px_16px_12px_12px] outline-none"
          />
        </label>
        <label className="w-[453px] h-[76px]">
          <span className="block">email</span>
          <input
            placeholder="email"
            className="border rounded-lg min-[453px]:w-[453px] w-[343px] h-[48px] p-[12px_16px_12px_12px] outline-none"
          />
        </label>

        <Button
          style="primary"
          onClick={null}
          type="submit"
          text="Update Profile"
        
        />
      </div>
    </form></div></div>
  );
}
export default UpdateProfile;
