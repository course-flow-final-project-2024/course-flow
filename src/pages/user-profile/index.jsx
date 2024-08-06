import UpdateProfile from "./../../components/user-profile/updateprofile-form";
import Navbar from "@/components/navbar/navbar";
import CommonFooter from "@/components/footer/common-footer";
import PageDecoration from "@/components/courses/page-decoration";

function UserProfile (){
    return (
    <>
    <Navbar />
    <UpdateProfile />
    <PageDecoration />
    <CommonFooter />
    </>

    )
}
export default UserProfile;