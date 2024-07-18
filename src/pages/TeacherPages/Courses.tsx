import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog } from "@radix-ui/react-dialog";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import Topbar from "components/Topbar";
import axios from "helper/axios";
import { useAuthContext } from "hooks/useAuthContext";
import { BookOpenTextIcon, EllipsisVertical } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const MyCourses = () => {
  const { user }: any = useAuthContext();
  const [activeTab, setActiveTab] = useState(0);
  const [courseData, setCourseData] = useState([]);
  const [courseDetails, setCourseDetails] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedCourseDetailId, setSelectedCourseDetailId] = useState(null);

  const getCourseData = async () => {
    try {
      const response = await axios.get("/api/assigned_courses", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setCourseData(response?.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCourseDetails = async (courseId: any) => {
    try {
      const response = await axios.get(`/api/course/${courseId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(response.data.related_course_details, "data");
      setCourseDetails(response.data.related_course_details);
      setSelectedCourseDetailId(response.data.related_course_details);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    getCourseData();
  }, []);

  useEffect(() => {
    if (selectedCourseId) {
      getCourseDetails(selectedCourseId);
    }
  }, [selectedCourseId]);

  const handleCourseClick = (courseId: any) => {
    setSelectedCourseId(courseId);
  };

  const handleCreateContentLink = (detailId: any ) => {
    navigate(`/uploadcontent?detailId=${detailId}&selectedCourseId=${selectedCourseId}`);
  };

  const handleViewContentLink = (detailId: any) => {
    navigate(`/content?detailId=${detailId}`);
  };

  return (
    <>
      <Topbar heading={"Courses"} />

      <div className="ruby-disp">
        {courseData.map((tab, index) => (
          <div
            className=" m-4 cursor-pointer rounded-lg"
            key={index}
            onClick={() => handleCourseClick(tab.id)}
          >
            <div
              className={`flex items-center mb-2 bg-gray-100 p-3 ${
                selectedCourseId === tab.id ? "bg-blue-200" : "bg-white"
              }`}
            >
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <span className="text-gray-700 font-semibold  ">{tab.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* course details */}
      <div className="mt-20 px-11 ">
        {courseDetails.length > 0 ? (
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] bg-teal-900 text-white-A700">
                  Standard
                </TableHead>
                <TableHead className="text-center bg-teal-900 text-white-A700">
                  Subject
                </TableHead>
                <TableHead className="text-center bg-teal-900 text-white-A700">
                  Module
                </TableHead>
                <TableHead className="text-right bg-teal-900 text-white-A700">
                  Create
                </TableHead>
                <TableHead className="text-right bg-teal-900 text-white-A700">
                  View
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courseDetails.map((ele, index) => (
                <TableRow key={index}>
                  <TableCell className="w-[100px]">
                    {ele.standard_name}
                  </TableCell>
                  <TableCell className="text-center">
                    {ele.subject_name}
                  </TableCell>
                  <TableCell className="text-center">
                    {ele.module_name}
                  </TableCell>
                  <TableCell className="text-right">
                    <button onClick={() => handleCreateContentLink(ele.id)}>
                      Create Content
                    </button>
                  </TableCell>
                  <TableCell className="text-right">
                    <button onClick={() => handleViewContentLink(ele.id)}>
                      View Content
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex justify-center h-[350px] text-[20px] font-bold text-indigo-500 items-center shadow-lg border-gray-600">
            Please select any course
          </div>
        )}
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

{
  /* <ul className="">
<li className="m-0" >
  <Link
   to="/uploadcontent"
    className="block text-gray-600 bg-[#FFFFFF] hover:bg-gray-200 rounded pl-[15px] py-[15px] border-b-[1px]"
  >
    Create content
  </Link>
</li>
<li className="m-0">
  <Link
    to="/content"
    className="block text-gray-600 bg-[#FFFFFF] hover:bg-gray-200 rounded pl-[15px] py-[15px] border-b-[1px]"
  >
    View content
  </Link>
</li>
</ul> */
}
