import Image from "next/image";

function CommonModalBox(props) {
  return (
    <div className="w-[528px] h-[212px] flex flex-col shadow-[2px_2px_12px_0_rgba(64,50,133,0.12)] ">
      <div className="w-full h-[56px] bg-white px-6 py-2 flex flex-row border-b-[1px] border-[#E4E6ED] ">
        <span className="font-normal text-xl w-full">Confirmation</span>
        <button onClick={props.closeBox}>
          <Image
            src="icons/grey-cross.svg"
            height={10}
            width={10}
            alt="cross"
            className="active:scale-[0.5] ease-in-out duration-100 hover:scale-[1.2] "
          />
        </button>
      </div>
      <div className="w-full h-full bg-white p-6 gap-6 flex flex-col">
        <div className="w-full h-max text-[#646D89] text-left text-base font-normal ">
          {props.AlertMessage}
        </div>
        <div className="w-full h-max flex flex-row gap-6">
          <button
            onClick={props.leftOnClick}
            className="w-max h-full px-8 py-[18px] border-[1px] border-[#F47E20] rounded-lg bg-white text-[#F47E20] text-base font-bold hover:border-[#FBAA1C] hover:text-[#FBAA1C] active:border-[#F47E20] active:text-[#F47E20] ease-in-out duration-100"
          >
            {props.leftText}
          </button>
          <button
            onClick={props.rightOnClick}
            className="w-max h-full px-8 py-[18px] rounded-lg bg-[#2F5FAC] text-white text-base font-bold hover:bg-[#5483D0]  active:bg-[#183056] ease-in-out duration-100 "
          >
            {props.rightText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommonModalBox;

// <CommonModalBox closeBox="" AlertMessage="" leftOnClick="" leftText="" rightOnClick="" rightText="" />

// props.closeBox = onClick event ที่เอาไว้กดปิด modal ทิ้ง (เขียนเอง)

// props.AlertMessage = คำถามบนกล่อง modal ("Are you sure to.... ?")

// props.leftOnClick = onClick event ของปุ่มซ้าย (สีส้ม)
// props.leftText    = text ของปุ่มซ้าย

// props.rightOnClick = onClick event ของปุ่มขวา (สีน้ำเงิน)
// props.rightText    = text ของปุ่มขวา
