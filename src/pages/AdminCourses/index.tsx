import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Topbar from "components/Topbar";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import Swal from "sweetalert2";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BookOpenText } from "lucide-react";
import { useAuthContext } from "hooks/useAuthContext";
import axios from "helper/axios";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const { user }: any = useAuthContext();
  const [activeTab, setActiveTab] = useState(0);
  const [courseData, setCourseData] = useState([]);
  const [isDialogue, setIsDialogue] = useState(false);
  const [courseDetails, setCourseDetails] = useState([]);
  const [selectedCourseDetailId, setSelectedCourseDetailId] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [formData, setFormData] = useState({
    course_name: "",
    description: "",
    standards: [
      {
        standard_name: "",
        subjects: [
          {
            subject_name: "",
            modules: [
              {
                module_name: "",
              },
            ],
          },
        ],
      },
    ],
  });

  
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

  useEffect(() => {
    if (selectedCourseId) {
      getCourseDetails(selectedCourseId);
    }
  }, [selectedCourseId]);

  const handleInputChange = (fieldName: any, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleStandardChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      standards: [{ ...prevData.standards[0], standard_name: value }],
    }));
  };

  const handleSubjectChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      standards: [
        {
          ...prevData.standards[0],
          subjects: [
            { ...prevData.standards[0].subjects[0], subject_name: value },
          ],
        },
      ],
    }));
  };

  const handleModuleChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      standards: [
        {
          ...prevData.standards[0],
          subjects: [
            {
              ...prevData.standards[0].subjects[0],
              modules: [
                {
                  ...prevData.standards[0].subjects[0].modules[0],
                  module_name: value,
                },
              ],
            },
          ],
        },
      ],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/courses_create/", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      Swal.fire({
        icon: "success",
        title: `Course Created Successfully`,
        showConfirmButton: false,
        timer: 1500,
      });
      // Optionally, reset form or fetch updated course data
      getCourseData();
      setIsDialogue(false);
    } catch (error) {
      // console.error("Error Creating User", error);
      Swal.fire({
        icon: "error",
        title: "Error creating course.",
        text: error?.response?.data?.message || "Please try again later.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const getCourseData = async () => {
    try {
      const response = await axios.get("api/courses/unique", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(response.data)
      setCourseData(response?.data);
    } catch (error) {
      // console.error(error);
    }
  };
  const navigate = useNavigate();

  const handleViewContentLink = async (detailId: any) => {
    try {
      const response = await axios.get(`/api/course_contents/${detailId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response?.data?.lessons?.length > 0) {
        navigate(`/adminview?detailId=${detailId}`);
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
        text: "Please add content.",
        icon: "info",
        confirmButtonText: "OK",
        confirmButtonColor: "#7066E0",
      });
    }
  };
  const handleCourseClick = (courseId: any) => {
    setSelectedCourseId(courseId);
  };

  useEffect(() => {
    getCourseData();
  }, []);

  return (
    <>
      <Topbar heading={"Courses"} />
      <div className="container py-5">
        <Dialog open={isDialogue} onOpenChange={setIsDialogue}>
          <div className="flex justify-end">
            <DialogTrigger asChild>
              <Button className="bg-teal-900 hover:!bg-blue-900">
                Create Course
              </Button>
            </DialogTrigger>
          </div>
          <DialogContent className="overflow-scroll">
            <DialogHeader>Add courses here</DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="user_name" className="text-right">
                  Course
                </Label>
                <Input
                  id="user_name"
                  name="user_name"
                  type="text"
                  className="col-span-3"
                  value={formData.course_name}
                  onChange={(e) =>
                    handleInputChange("course_name", e.target.value)
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="standard_name" className="text-right">
                  Standard
                </Label>
                <Input
                  id="standard_name"
                  name="standard_name"
                  type="text"
                  className="col-span-3"
                  value={formData.standards[0].standard_name}
                  onChange={(e) => handleStandardChange(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subject_name" className="text-right">
                  Subject
                </Label>
                <Input
                  id="subject_name"
                  name="subject_name"
                  type="text"
                  className="col-span-3"
                  value={formData.standards[0].subjects[0].subject_name}
                  onChange={(e) => handleSubjectChange(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="module_name" className="text-right">
                  Module
                </Label>
                <Input
                  id="module_name"
                  name="module_name"
                  type="text"
                  className="col-span-3"
                  value={
                    formData.standards[0].subjects[0].modules[0].module_name
                  }
                  onChange={(e) => handleModuleChange(e.target.value)}
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit">Add</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        {/* <h1 className="text-2xl font-bold">Courses</h1> */}
      </div>

      
      <div className="ruby-disp">
        {courseData.map((tab, index) => (
          <div key={index}
           className="m-4 cursor-pointer rounded-lg" 
          onClick={() => handleCourseClick(tab.id)}>
            <div
              className={`flex rounded-[10px] items-center mb-2 bg-gray-100 p-3 w-[250px] border-[1px] ${
                index === activeTab ? "bg-blue-200" : "bg-white"
              }`}
              onClick={() => setActiveTab(index)}
            >
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                {/* <svg
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
                </svg> */}
                <BookOpenText className="h-5 w-5 text-gray-600" />
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
                {/* <TableHead className="text-right bg-teal-900 text-white-A700">
                  Create
                </TableHead> */}
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
                  {/* <TableCell className="text-right">
                    <button
                      onClick={() => handleCreateContentLink(ele.id)}
                      className="border p-[6px] text-[white] z-10 transition hover:bg-white-A700 hover:text-deep_orange-500 border-deep_orange-500 bg-deep_orange-500"
                    >
                      Create Content
                    </button>
                  </TableCell> */}
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
          ""
        )}
      </div>
    </>
  );
};

export default Courses;
