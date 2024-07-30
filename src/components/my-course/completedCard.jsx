// / import CourseCard from "../courses/course-card"
import axios from "axios"
import Image from "next/image"


export default function CompletedCard () {
    // const response = await axios.get("/api/courses/get")

    // setCourse(response.data.courses);

    return (
        <div className="w-full h-[1000px] flex gap-6 mt-10 relative ">
            <div className="flex flex-col items-center gap-6 py-8 px-6 rounded-[8px] shadow-lg sticky top-0 h-[396px]">
                <div className="rounded-full object-cover bg-black w-[120px] h-[120px]"></div>
                <div>YEAH</div>
                <div className="flex flex-row gap-6 w-[309px]">
                    <div className="flex flex-col gap-6 p-4 bg-[#F1F2F6] rounded-[8px] w-full"><p>Courses <br/> Inprogress</p><p>3</p></div>
                    <div className="flex flex-col gap-6 p-4 bg-[#F1F2F6] rounded-[8px] w-full"><p>Courses <br/> completed</p><p>2</p></div>
                </div>
            </div>
            <div className="w-full bg-stone-500 ">
               <h1>MyCoursesCard</h1> 
            </div>
        </div>
    )
}