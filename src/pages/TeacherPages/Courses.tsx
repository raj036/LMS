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
import Swal from "sweetalert2";

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
    } catch (error) {
      // console.error(error);
    }
  };

  const getCourseDetails = async (courseId: any) => {
    try {
      const response = await axios.get(`/api/course/${courseId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setCourseDetails(response.data.related_course_details);
      setSelectedCourseDetailId(response.data.related_course_details);
    } catch (error) {
      // console.log(error);
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

  const handleCreateContentLink = (detailId: any) => {
    navigate(
      `/uploadcontent?detailId=${detailId}&selectedCourseId=${selectedCourseId}`
    );
  };

  const handleViewContentLink = async (detailId: any) => {
    try {
      const response = await axios.get(`/api/course_contents/${detailId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response?.data?.lessons?.length > 0) {
        navigate(`/content?detailId=${detailId}`);
      } else {
        Swal.fire({
          title: "No Content",
          text: "There is no content available for this course detail.",
          icon: "info",
          confirmButtonText: "OK",
          confirmButtonColor: "#7066E0",
        });
      }
    } catch (error) {
      // console.error("Error fetching content:", error.response.data.detail);
      Swal.fire({
        title: "No Content Available For This Course.",
        text: "Please add content first.",
        icon: "info",
        confirmButtonText: "OK",
        confirmButtonColor: "#7066E0",
      });
    }
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
              className={`flex rounded-[10px] items-center mb-2 bg-gray-100 p-3 w-[250px] border-[1px] ${
                selectedCourseId === tab.id ? "bg-blue-200" : "bg-white"
              }`}
            >
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-3">
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
                    <button
                      onClick={() => handleCreateContentLink(ele.id)}
                      className="border p-[6px] text-[white] z-10 transition hover:bg-white-A700 hover:text-deep_orange-500 border-deep_orange-500 bg-deep_orange-500"
                    >
                      Create Content
                    </button>
                  </TableCell>
                  <TableCell className="text-right">
                    <button
                      onClick={() => handleViewContentLink(ele.id)}
                      className="border p-[6px] text-[white] z-10 transition hover:bg-white-A700 hover:text-deep_orange-500 border-deep_orange-500 bg-deep_orange-500"
                    >
                      View Content
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          // <div className="flex justify-center h-[350px] text-[20px] font-bold text-indigo-500 items-center shadow-lg border-gray-600">
          //   Please select any course
          // </div>
          ""
        )}
      </div>
    </>
  );
};

export default MyCourses;
