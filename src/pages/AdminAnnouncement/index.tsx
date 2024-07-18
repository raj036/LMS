import Topbar from "components/Topbar";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "hooks/useAuthContext";
import axios from "helper/axios";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";

const AdminAnnouncements = () => {
  const { user }: any = useAuthContext();
  const [announcementData, setAnnouncementData] = useState([]);
  const [createAnnData, setCreateAnnData] = useState({
    announcement_images: "",
    title: "",
    announcement_text: "   ",
  });

  const getAnnouncementData = async () => {
    try {
      const response = await axios.get(`/api/announcements`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(response.data);
      setAnnouncementData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value =
      fieldName === "announcement_images"
        ? event.target.files[0]
        : event.target.value;
    setCreateAnnData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", createAnnData.title);
      formData.append("announcement_text", createAnnData.announcement_text);
      if (createAnnData.announcement_images) {
        formData.append(
          "announcement_images",
          createAnnData.announcement_images
        );
      }

      const response = await axios.post(`/api/announcement`, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setCreateAnnData(response.data);
      console.log(response.data);
      // Swal.fire({
      //   title: "Announcement added",
      //   // text: "You have already completed the form submission and payment. Check Dashboard for more information",
      //   icon: "success",
      //   confirmButtonColor: "#7066E0",
      //   confirmButtonText: "OK",
      // });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAnnouncementData();
  }, []);

  return (
    <>
      <Topbar heading={"Announcements"} />
      <div className="container py-5">
        <Dialog>
          <div className="flex justify-end">
            <DialogTrigger asChild>
              <Button className="bg-teal-900 hover:!bg-blue-900">
                Create Announcement
              </Button>
            </DialogTrigger>
          </div>
          <DialogContent>
            <DialogHeader>Add courses here</DialogHeader>
            <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="user_name" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  className="col-span-3"
                  onChange={(e) => handleChange("title", e)}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="standard_name" className="text-right">
                  Description
                </Label>
                <Input
                  id="announcement_text"
                  name="announcement_text"
                  type="text"
                  className="col-span-3"
                  onChange={(e) => handleChange("announcement_text", e)}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subject_name" className="text-right">
                  Upload Images
                </Label>
                <Input
                  id="announcement_images"
                  name="announcement_images"
                  type="file"
                  className="col-span-3"
                  onChange={(e) => handleChange("announcement_images", e)}
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit">Add</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="sm:w-[190%]">
        {announcementData.map((ele, index) => {
          return (
            <div className="flex flex-row p-6 " key={index}>
              <div className="text-lg pl-[5px]">
                <h1>{format(ele.created_on, "yyyy-MM-dd")}</h1>
              </div>
              <div className="border-solid border-[#FF7008] border-2 mx-4"></div>
              <div className="flex justify-between w-[80%] gap-2">
                <div>
                  <h1 className="text-[30px] text-[#002D51] font-semibold mb-2">
                    {ele.title}!{" "}
                  </h1>
                  <p className="text-[17px]">{ele.announcement_text || "-"}</p>
                </div>
                <div className="   w-56 justify-items-end md:w-96 md:ml-[10px]">
                  <img
                    loading="lazy"
                    src={ele.announcement_images}
                    alt=""
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AdminAnnouncements;
