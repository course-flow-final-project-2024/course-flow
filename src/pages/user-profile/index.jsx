import UpdateProfile from "./../../components/user-profile/updateprofile-form";
import Navbar from "@/components/navbar/navbar";
import CommonFooter from "@/components/footer/common-footer";
import PageDecoration from "@/components/courses/page-decoration";

function UserProfile() {
  return (
    <div className="w-full relative ">
      <Navbar />
      <div className="w-full absolute pt-[100px]">
        <PageDecoration />
      </div>
      <UpdateProfile />
      <CommonFooter />
    </div>
  );
}
export default UserProfile;
