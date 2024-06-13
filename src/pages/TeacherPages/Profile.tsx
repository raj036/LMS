import Topbar from "components/Topbar";
import axios from "helper/axios";
import { useAuthContext } from "hooks/useAuthContext";
import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";

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
      <div className="flex lg:flex-col">
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

        {/* Parents Information */}

        {user && user.user_type === "student" && (
          <div className="w-[40%] lg:w-[90%]">
            <div className="p-5 ">
              <div className="font-semibold	text-[16px] mb-4 ml-1">
                Parent Details
              </div>
              <div className=" rounded-[10px] shadow-lg -w-[35%] p-4  text-[14px]">
                <div className="flex justify-end p-2 cursor-pointer">
                  <Pencil />
                </div>
                <div className="flex justify-between border-b-2 pb-2 text-[14px]">
                  <span className="font-semibold w-[30%]">Guardian :</span>
                  <span className="w-[60%]">
                    {userData?.parent_info?.guardian}
                  </span>
                </div>
                <div className="flex justify-between border-b-2 py-2 text-[14px]">
                  <span className="font-semibold w-[30%]">
                    Parent first name :
                  </span>
                  <span className="w-[60%]">
                    {userData?.parent_info?.p_first_name}
                  </span>
                </div>
                <div className="flex justify-between border-b-2 py-2">
                  <span className="font-semibold w-[30%]">
                    Parent last name :
                  </span>
                  <span className="w-[60%]">
                    {userData?.parent_info?.p_last_name}
                  </span>
                </div>
                <div className="flex justify-between border-b-2 py-2">
                  <span className="font-semibold w-[30%]">Parent Email :</span>
                  <span className="w-[60%]">
                    {userData?.parent_info?.primary_email}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-semibold w-[30%]">Primary No :</span>
                  <span className="w-[60%]">
                    {userData?.parent_info?.primary_no}
                  </span>
                </div>
              </div>
            </div>

            {/* Education Details */}

            <div className="p-5 ">
              <div className="font-semibold	text-[16px] mb-4 ml-1">
                Education Details
              </div>
              <div className=" rounded-[10px] shadow-lg -w-[35%] p-4 text-[14px]">
                <div className="flex justify-end p-2 cursor-pointer">
                  <Pencil />
                </div>
                <div className="flex justify-between border-b-2 pb-2 text-[14px]">
                  <span className="font-semibold w-[30%]">School Name :</span>
                  <span className="w-[60%]">
                    {userData?.pre_education?.school}
                  </span>
                </div>
                <div className="flex justify-between border-b-2 py-2 text-[14px]">
                  <span className="font-semibold w-[30%]">Standard :</span>
                  <span className="w-[60%]">
                    {userData?.pre_education?.student_class}
                  </span>
                </div>
                <div className="flex justify-between border-b-2 py-2">
                  <span className="font-semibold w-[30%]">
                    Year of passing :
                  </span>
                  <span className="w-[60%]">
                    {userData?.pre_education?.year_of_passing}
                  </span>
                </div>
                <div className="flex justify-between  py-2">
                  <span className="font-semibold w-[30%]">Percentage :</span>
                  <span className="w-[60%]">
                    {userData?.pre_education?.percentage}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TeacherProfile;
