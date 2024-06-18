import Topbar from "components/Topbar";
import axios from "helper/axios";
import { useAuthContext } from "hooks/useAuthContext";
import { BookOpenTextIcon, EllipsisVertical } from "lucide-react";
import React, { useEffect, useState } from "react";

const MyCourses = () => {
  const { user }: any = useAuthContext();
  const [activeTab, setActiveTab] = useState(0);
  const [courseData, setCourseData] = useState([]);

  const getCourseData = async () => {
    try {
      const response = await axios.get("api/courses/unique", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log("resp", response.data.unique_courses);
      setCourseData(response?.data?.unique_courses);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCourseData();
  }, []);

  return (
    <>
      <Topbar heading={"Courses"} />
      <div className="container py-5 sm:text-left sm:m-[-12px]">Courses</div>
      <div className="flex space-x-4 p-4  sm:flex-col sm:p-7 ">
        {courseData.map((tab, index) => (
          <div
            key={index}
            className={`flex items-center justify-between md:h-20 sm:ml-4 p-4 w-1/3 sm:w-full sm:mb-5 bg-white rounded-lg shadow-md cursor-pointer ${
              index === activeTab ? "border-2 border-gray-300" : "border"
            }`}
            onClick={() => setActiveTab(index)}
          >
            <div className="flex items-center">
              <BookOpenTextIcon className="w-10 h-10 text-gray-600 p-2 rounded-[5px] bg-[#BCBCBC]" />
              <div className="ml-4">
                {/* <span className="block text-gray-600 text-[15px]">
                  {tab}
                </span> */}
                <span className="block font-semibold text-gray-800">{tab}</span>
              </div>
            </div>
            <div className="text-gray-400">
              <EllipsisVertical />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyCourses;

{
  /* <div className="flex sm:flex-col border-2 border-[black] p-5 mx-10 md:mx-6 md:mt-6 mt-10 gap-5 sm:mb-8 sm:ml-4 sm:gap-0 justify-between rounded-[20px] sm:w-[90%] sm:p-3 sm:mx-5">
        <div className="w-[30%]">
          <div>
            <h1 className="text-start font-semibold mb-3">Courses</h1>
            <input
              type="text"
              className="flex mb-12 sm:mb-4 h-12 !bg-[#002D51] sm:w-[330%]  text-white-A700 !rounded-md border !border-slate-200 bg-white !px-3 !py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
            />
          </div>
          <div>
            <h1 className="text-start font-semibold mb-3">Subject</h1>
            <input
              type="text"
              className="flex h-12 sm:mb-4 !bg-[#002D51] sm:w-[330%] text-white-A700 !rounded-md border !border-slate-200 bg-white !px-3 !py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
            />
          </div>
        </div>
        <div className="w-[30%]">
          <div>
            <h1 className="text-start font-semibold mb-3">Standard</h1>
            <input
              type="text"
              className="flex  mb-12 h-12 sm:mb-4 !bg-[#002D51] sm:w-[330%]  text-white-A700 !rounded-md border !border-slate-200 bg-white !px-3 !py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
            />
          </div>
          <div>
            <h1 className="text-start font-semibold mb-3">Module</h1>
            <input
              type="text"
              className="flex h-12 sm:mb-4 !bg-[#002D51] sm:w-[330%]  text-white-A700 !rounded-md border !border-slate-200 bg-white !px-3 !py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
            />
          </div>
        </div>
        <div className="w-[30%]">
          <div>
            <h1 className="text-start font-semibold mb-3">Description</h1>
            <TextArea
              name="Description"
              placeholder=""
              className="w-full sm:w-[330%] rounded-[0.375rem] font-medium h-[175px]"
            />
          </div>
        </div>
      </div> */
}
