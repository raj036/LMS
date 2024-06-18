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
import { BookOpenTextIcon, EllipsisVertical } from "lucide-react";
import { useAuthContext } from "hooks/useAuthContext";
import axios from "helper/axios";

const Courses = () => {
  const { user }: any = useAuthContext();
  const [activeTab, setActiveTab] = useState(0);
  const [courseData, setCourseData] = useState([]);

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    phone_no: "",
    user_type: "",
    user_password: "",
    repassword: "",
  });

  const handleInputChange = (fieldName: any, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.user_password === formData.repassword) {
      try {
        const response = await axios.post("api/insert/lms_user", formData);
        if (response.data.status_code === 500) {
          throw new Error("Email Already in Use");
        }
        if (response.data.status_code === 400) {
          throw new Error(response.data.detail);
        }
        Swal.fire({
          icon: "success",
          title: `User Created Successfully`,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => window.location.reload());
      } catch (error) {
        console.error("Error Creating User", error);
        Swal.fire({
          icon: "error",
          title: "Error creating user.",
          text:
            error?.message ||
            "Please check your internet connection or try again later.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match!",
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
      <div className="container py-5">
        <Dialog>
          <div className="flex justify-end">
            <DialogTrigger asChild>
              <Button className="bg-teal-900 hover:!bg-blue-900">
                Create Course
              </Button>
            </DialogTrigger>
          </div>
          <DialogContent>
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
                  value={formData.user_name}
                  onChange={(e) =>
                    handleInputChange("user_name", e.target.value)
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="user_email" className="text-right">
                  Standard
                </Label>
                <Input
                  id="user_email"
                  type="email"
                  name="user_email"
                  className="col-span-3"
                  value={formData.user_email}
                  onChange={(e) =>
                    handleInputChange("user_email", e.target.value)
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone_no" className="text-right">
                  Subject
                </Label>
                <Input
                  id="phone_no"
                  type="text"
                  name="phone_no"
                  className="col-span-3"
                  value={formData.phone_no}
                  onChange={(e) =>
                    handleInputChange("phone_no", e.target.value)
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="user_password" className="text-right">
                  Module
                </Label>
                <Input
                  id="user_password"
                  type="text"
                  name="text"
                  className="col-span-3"
                  autoComplete="on"
                  value={formData.user_password}
                  onChange={(e) =>
                    handleInputChange("user_password", e.target.value)
                  }
                />
              </div>
              <DialogFooter>
                <Button type="submit">Add</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <h1 className="text-2xl font-bold">Courses</h1>
      </div>
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

export default Courses;
