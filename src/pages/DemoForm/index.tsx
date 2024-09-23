import React, { useState, useEffect } from "react";
import Topbar from "components/Topbar";
import { DataTable } from "./d-table";
import { columns } from "./columns";
import { useAuthContext } from "hooks/useAuthContext";
import axios from "helper/axios";
import Swal from "sweetalert2";
import Loader from "components/Loader";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AddVideoData {
  course_name: any;
  subject_name: any;
  standard_name: any;
  name: any;
  video_file: any;
}

const Enquiry = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user }: any = useAuthContext();

  useEffect(() => {
    fetchEnquiry();
  }, [user]);

  const fetchEnquiry = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/demoformfill/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      // console.error("Error fetching enquiry data", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.detail || "Failed to fetch enquiry data",
        showConfirmButton: true,
        confirmButtonColor: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto p-5 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Enquiry List</h2>
          <DataTable columns={columns} data={data} />
        </div>
      )}
    </>
  );
};

const Courses = () => {
  const { user }: any = useAuthContext();
  const [courseData, setCourseData] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [addVideo, setAddVideo] = useState<AddVideoData>({
    course_name: "",
    subject_name: "",
    standard_name: "",
    name: "",
    video_file: "",
  });
  const [loading, setLoading] = useState(false);
  const [isDialogue, setIsDialogue] = useState(false);

  const fetchVideoData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/videos", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setVideoData(response.data);
    } catch (error) {
      // console.error("Error fetching video data", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Failed to fetch video data",
        showConfirmButton: true,
        confirmButtonColor: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (fieldName: any, e: any) => {
    const value =
      fieldName === "video_file" ? e.target.files[0] : e.target.value;
    setAddVideo((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/videos/", addVideo, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });
      Swal.fire({
        icon: "success",
        title: `Video Uploaded Successfully`,
        showConfirmButton: false,
        timer: 1500,
      });
      setIsDialogue(false);
      fetchVideoData(); // Refresh video list after upload
    } catch (error) {
      // console.error("Error uploading video", error);

      let errorMessage =
        "An unexpected error occurred. Please try again later.";

      if (error.response) {
        // console.error("Error response:", error.response.data);

        if (error.response.status === 422 && error.response.data.detail) {
          // Detailed validation errors
          const validationErrors = error.response.data.detail;
          // console.error("Validation errors:", validationErrors);

          if (Array.isArray(validationErrors)) {
            errorMessage = validationErrors
              .map((err: any) => {
                if (err.loc && err.msg) {
                  // Format the error message
                  return `${err.loc.join(".")} : ${err.msg}`;
                }
                return "Unknown validation error.";
              })
              .join("<br>"); // Join errors with line breaks for HTML display
          } else {
            errorMessage =
              "Validation error occurred. Please check your input.";
          }
        } else {
          // Fallback for other types of errors
          errorMessage =
            error.response.data.message ||
            error.response.data.detail ||
            errorMessage;
        }
      }

      Swal.fire({
        icon: "error",
        title: "Error uploading video",
        html: errorMessage, // Use HTML format to handle line breaks
        showConfirmButton: true,
        confirmButtonColor: "red",
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
      setCourseData(response?.data?.unique_courses || []);
    } catch (error) {
      // console.error("Error fetching course data", error);
    }
  };

  useEffect(() => {
    getCourseData();
    fetchVideoData();
  }, [user]);

  return (
    <div className="container mx-auto p-5 bg-white shadow-lg rounded-lg">
      {/* <h2 className="text-2xl font-semibold mb-4">Upload New Video</h2> */}
      <Dialog open={isDialogue} onOpenChange={setIsDialogue}>
        <div className="flex justify-end">
          <DialogTrigger asChild>
            <Button className="bg-teal-900 hover:!bg-blue-900 text-[white]">
              Upload Video
            </Button>
          </DialogTrigger>
        </div>
        <DialogContent>
          <DialogHeader>Upload Video</DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="course_name" className="text-right">
                Course Name
              </Label>
              <Input
                id="course_name"
                name="course_name"
                required
                type="text"
                className="col-span-3 border-gray-300"
                onChange={(e) => handleChange("course_name", e)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject_name" className="text-right">
                Subject Name
              </Label>
              <Input
                id="subject_name"
                name="subject_name"
                required
                type="text"
                className="col-span-3 border-gray-300"
                onChange={(e) => handleChange("subject_name", e)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="standard_name" className="text-right">
                Standard Name
              </Label>
              <Input
                id="standard_name"
                name="standard_name"
                required
                type="text"
                className="col-span-3 border-gray-300"
                onChange={(e) => handleChange("standard_name", e)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Video Name
              </Label>
              <Input
                id="name"
                name="name"
                required
                type="text"
                className="col-span-3 border-gray-300"
                onChange={(e) => handleChange("name", e)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="video_file" className="text-right">
                Video File
              </Label>
              <Input
                id="video_file"
                name="video_file"
                required
                type="file"
                className="col-span-3 border-gray-300"
                onChange={(e) => handleChange("video_file", e)}
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="bg-teal-900 hover:!bg-blue-900 text-[white]"
              >
                Upload
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Video List</h2>
        {loading ? (
          <Loader />
        ) : (
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Name</TableHead>
                <TableHead className="w-1/3">Course</TableHead>
                <TableHead className="w-1/3">Subject</TableHead>
                <TableHead className="w-1/3">Std</TableHead>
                <TableHead className="w-1/3">URL</TableHead>
                {/* <TableHead className="w-1/3">Actions</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {videoData.map((video) => (
                <TableRow key={video.id}>
                  <TableCell>{video.name}</TableCell>
                  <TableCell>{video.course_name}</TableCell>
                  <TableCell>{video.subject_name}</TableCell>
                  <TableCell>{video.standard_name}</TableCell>
                  <TableCell>
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600"
                    >
                      {video.url}
                    </a>
                  </TableCell>
                  {/* <TableCell>
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      Delete
                    </Button>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

const TabsDemo = () => {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState("enquiry");

  return (
    <>
      <Helmet>
        <title>Demo page</title>
      </Helmet>
      <Topbar heading={"Demo"} />
      <Tabs defaultValue={activeTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mt-8">
          <TabsTrigger
            value="enquiry"
            onClick={() => setActiveTab("enquiry")}
            className={`py-2 px-4 rounded-t-lg text-gray-700 border-b-2 border-transparent hover:bg-gray-200 focus:bg-teal-900 focus:text-[white] ${
              activeTab === "enquiry" ? "bg-teal-900 text-[white]" : ""
            }`}
          >
            Enquiry
          </TabsTrigger>
          <TabsTrigger
            value="demo-video"
            onClick={() => setActiveTab("demo-video")}
            className={`py-2 px-4 rounded-t-lg text-gray-700 border-b-2 border-transparent hover:bg-gray-200 focus:bg-teal-900 focus:text-[white] ${
              activeTab === "demo-video" ? "bg-teal-900 text-[white]" : ""
            }`}
          >
            Demo Video
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="enquiry"
          className="p-4 bg-white shadow-md rounded-b-lg mt-4"
        >
          <Enquiry />
        </TabsContent>
        <TabsContent
          value="demo-video"
          className="p-4 bg-white shadow-md rounded-b-lg mt-4"
        >
          <Courses />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default TabsDemo;
