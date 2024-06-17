import Topbar from "components/Topbar";
import axios from "helper/axios";
import { useAuthContext } from "hooks/useAuthContext";
import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TeacherProfile = () => {
  const { user }: any = useAuthContext();
  const [userData, setUserData] = useState<any>([]);

  const getMyData = async () => {
    try {
      const response = await axios.get(`api/teachers/${user.user_id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(response.data, "data");
      setUserData(response?.data);
    } catch (error) {
      console.error("Error getting Profile", error);
    }
  };
  
  useEffect(() => {
    getMyData();
  }, []);

  return (
    <>
      <Topbar heading={"Profile"} />
      {/* <div className="flex lg:flex-col">
        <div className="p-5 w-[40%] lg:w-[90%]">
          <div className="font-semibold	text-[16px] mb-4 ml-1">
            Contact Details
          </div>
          <div className=" rounded-[10px] shadow-lg -w-[35%] p-4 text-[14px]">
            <div className="flex justify-end p-2 cursor-pointer">
              <Pencil />
            </div>
            <div className="flex justify-between border-b-2 pb-2">
              <span className="font-semibold w-[30%]">Name :</span>
              <span className="w-[60%]">{userData?.name}</span>
            </div>
            <div className="flex justify-between border-b-2 py-2">
              <span className="font-semibold w-[30%]">Primary Email :</span>
              <span className="w-[60%]">
                {userData?.contact_info?.primary_email_id}
              </span>
            </div>
            <div className="flex justify-between border-b-2 py-2">
              <span className="font-semibold w-[30%]">Secondary Email :</span>
              <span className="w-[60%]">
                {userData?.contact_info?.secondary_email || "-"}
              </span>
            </div>
            <div className="flex justify-between border-b-2 py-2">
              <span className="font-semibold w-[30%]">Address :</span>
              <span className="w-[60%]">
                {userData?.contact_info?.current_address}
              </span>
            </div>
            <div className="flex justify-between border-b-2 py-2">
              <span className="font-semibold w-[30%]">Primary No :</span>
              <span className="w-[60%]">
                {userData?.contact_info?.primary_no}
              </span>
            </div>
            <div className="flex justify-between border-b-2 py-2">
              <span className="font-semibold w-[30%]">Secondary No :</span>
              <span className="w-[60%]">
                {userData?.contact_info?.secondary_no || "-"}
              </span>
            </div>
            <div className="flex justify-between border-b-2 py-2">
              <span className="font-semibold w-[30%]">Date of birth :</span>
              <span className="w-[60%]">{userData?.date_of_birth}</span>
            </div>
            <div className="flex justify-between border-b-2 py-2">
              <span className="font-semibold w-[30%]">Nationality :</span>
              <span className="w-[60%]">{userData?.nationality}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-semibold w-[30%]">Gender :</span>
              <span className="w-[60%]">{userData?.gender}</span>
            </div>
          </div>
        </div>

      </div> */}


      <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="info">Info</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="info">
        <Card>
          <CardHeader>
            <CardTitle>Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
          <div className=" rounded-[10px] shadow-lg -w-[35%] p-4 text-[14px]">
            <div className="flex justify-end p-2 cursor-pointer">
              <Pencil />
            </div>
            <div className="flex justify-between border-b-2 pb-2">
              <span className="font-semibold w-[30%]">Name :</span>
              <span className="w-[60%]">{userData?.name}</span>
            </div>
            <div className="flex justify-between border-b-2 py-2">
              <span className="font-semibold w-[30%]">Primary Email :</span>
              <span className="w-[60%]">
                {userData?.contact_info?.primary_email_id}
              </span>
            </div>
            <div className="flex justify-between border-b-2 py-2">
              <span className="font-semibold w-[30%]">Secondary Email :</span>
              <span className="w-[60%]">
                {userData?.contact_info?.secondary_email || "-"}
              </span>
            </div>
            <div className="flex justify-between border-b-2 py-2">
              <span className="font-semibold w-[30%]">Address :</span>
              <span className="w-[60%]">
                {userData?.contact_info?.current_address}
              </span>
            </div>
            <div className="flex justify-between border-b-2 py-2">
              <span className="font-semibold w-[30%]">Primary No :</span>
              <span className="w-[60%]">
                {userData?.contact_info?.primary_no}
              </span>
            </div>
            <div className="flex justify-between border-b-2 py-2">
              <span className="font-semibold w-[30%]">Secondary No :</span>
              <span className="w-[60%]">
                {userData?.contact_info?.secondary_no || "-"}
              </span>
            </div>
            <div className="flex justify-between border-b-2 py-2">
              <span className="font-semibold w-[30%]">Date of birth :</span>
              <span className="w-[60%]">{userData?.date_of_birth}</span>
            </div>
            <div className="flex justify-between border-b-2 py-2">
              <span className="font-semibold w-[30%]">Nationality :</span>
              <span className="w-[60%]">{userData?.nationality}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-semibold w-[30%]">Gender :</span>
              <span className="w-[60%]">{userData?.gender}</span>
            </div>
          </div>
          </CardContent>
          <CardFooter>
            <Button>Update</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    </>
  );
};

export default TeacherProfile;
