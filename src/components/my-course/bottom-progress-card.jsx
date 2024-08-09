function BottomProgressCard(props) {
  return (
    <div className="w-full h-max min-h-[120px] fixed z-20 bottom-0 left-0 bg-white rounded-t-xl shadow-[rgba(60,64,67,0.3)_0px_1px_2px_0px,rgba(60,64,67,0.15)_0px_2px_6px_2px] min-[1070px]:hidden sm:px-16 px-4 ease-in-out duration-200 py-4 flex flex-col gap-4">
      <div className="w-full h-max flex justify-start items-center gap-6 overflow-scroll ">
        <img
          src={props.userImage}
          alt="user image"
          width={70}
          height={70}
          className="rounded-full object-cover bg-teal-600"
        />
        <h3 className="w-full h-max text-lg sm:text-xl text-[#424C6B]">
          {props.userName}
        </h3>
      </div>
      <div className="w-full h-max flex justify-around gap-6 max-[440px]:gap-3">
        <div className="w-full h-max px-4 py-2 flex gap-2 bg-[#F1F2F6] rounded-lg justify-center items-center ">
          <span className="text-base sm:text-xl text-[#646D89]">
            Courses Inprogress
          </span>
          <span className="text-lg sm:text-xl font-medium">
            {props.inProgressCount}
          </span>
        </div>
        <div className="w-full h-max px-4 py-2 flex gap-2 bg-[#F1F2F6] rounded-lg justify-center items-center ">
          <span className="text-base sm:text-xl text-[#646D89]">
            Courses Completed
          </span>
          <span className="text-lg sm:text-xl font-medium">
            {props.completedCount}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BottomProgressCard;
