import Button from "@/utils/button";

function UpdateProfile() {
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
