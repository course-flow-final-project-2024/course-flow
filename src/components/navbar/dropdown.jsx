import Image from "next/image";
function NavbarDropdown(prop) {
  const userImage = prop.image
    ? prop.image
    : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";

  return (
    <>
      <div className="dropdown dropdown-bottom max-[640px]:dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="flex flex-row justify-center items-center gap-3"
        >
          <div className="avatar">
            <div className="w-[40px] h-[40px] rounded-full">
              <img src={userImage} />
            </div>
          </div>
          <div className="max-[520px]:hidden ">
            {" "}
            {prop.name ? prop.name : "Unknow"}
          </div>
          <Image
            src="/navbar/arrow_drop_down_black.svg"
            width={24}
            height={24}
            alt="arrow-drop-down-black"
          />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow text-sm font-medium text-[#646D89]"
        >
          <li>
            <a href="/user-profile">Profile</a>
    
          </li>
          <li>
            <a href="/my-courses">My Courses</a>
          </li>
          <li>
            <a href="/my-assignments">My Assignment</a>
          </li>
          <li>
            <a href="/desired-courses">My Desire Courses</a>
          </li>
          <hr />
          <li>
            <a role="button" onClick={prop.handleLogOut}>
              Log out
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default NavbarDropdown;
