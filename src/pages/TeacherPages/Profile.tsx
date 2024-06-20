import Topbar from "components/Topbar";
import axios from "helper/axios";
import { useAuthContext } from "hooks/useAuthContext";
import React, { useEffect, useState } from "react";

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
        <div className="p-5 w-[40%] lg:w-[90%] ">
          <div className="font-semibold	text-[16px] mb-4 ml-1">
            Contact Details
          </div>
          <div className="h-full rounded-[10px] shadow-lg -w-[35%] p-4 text-[14px]">
            {/* <div className="flex justify-end p-2 cursor-pointer">
                <Pencil />
              </div> */}
            <div className="flex justify-between border-b-2 pb-2">
              <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                Name :
              </span>
              <input
                className="w-[60%]"
                type="text"
                value={userData?.name}
                name="first_name"
              />
            </div>
            <div className="flex justify-between border-b-2 py-2">
              <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                Primary Email :
              </span>
              <input
                className="w-[60%]"
                type="text"
                value={userData?.contact_info?.primary_email_id}
                name="primary_email"
              />
            </div>
            <div className="flex justify-between border-b-2 py-2">
              <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                Secondary Email :
              </span>
              <input
                className="w-[60%]"
                value={userData?.contact_info?.secondary_email_id || "-"}
                type="text"
                name="secondary_email"
              />
            </div>
            <div className="flex justify-between border-b-2 py-2">
              <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                Address :
              </span>
              <input
                className="w-[60%]"
                value={userData?.contact_info?.current_address}
                type="text"
                name="current_address"
              />
            </div>
            <div className="flex justify-between border-b-2 py-2">
              <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                Primary No :
              </span>
              <input
                className="w-[60%]"
                value={userData?.contact_info?.primary_number}
                type="text"
                name="contact_information.primary_no"
              />
            </div>
            <div className="flex justify-between border-b-2 py-2">
              <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                Secondary No :
              </span>
              <input
                className="w-[60%]"
                value={userData?.contact_info?.secondary_number || "-"}
                type="text"
                name="secondary_no"
              />
            </div>
            <div className="flex justify-between border-b-2 py-2">
              <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                Date of birth :
              </span>
              <input
                className="w-[60%]"
                value={userData?.dependent?.date_of_birth || "-"}
                type="text"
                name="secondary_no"
              />
            </div>
            <div className="flex justify-between border-b-2 py-2">
              <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                Dependant name :
              </span>
              <input
                className="w-[60%]"
                value={userData?.dependent?.dependent_name || "-"}
                type="text"
                name="secondary_no"
              />
            </div>
            <div className="flex justify-between border-b-2 py-2">
              <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                Language :
              </span>
              <input
                className="w-[60%]"
                value={userData?.languages_spoken?.languages || "-"}
                type="text"
                name="secondary_no"
              />
            </div>
          </div>
        </div>

        {/* Parents Information */}

        <div className="w-[40%] lg:w-[90%] ">
          <div className="p-5">
            <div className="font-semibold	text-[16px] mb-4 ml-1">
              Education Details
            </div>
            <div className=" rounded-[10px] shadow-lg -w-[35%] p-4 text-[14px]">
              {/* <div className="flex justify-end p-2 cursor-pointer">
                <Pencil />
              </div> */}
              <div className="flex justify-between border-b-2 pb-2">
                <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                  Education :
                </span>
                <input
                  className="w-[60%]"
                  type="text"
                  value={userData?.education?.education_level}
                  name="first_name"
                />
              </div>
              <div className="flex justify-between border-b-2 py-2">
                <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                  Study :
                </span>
                <input
                  className="w-[60%]"
                  type="text"
                  value={userData?.education?.field_of_study}
                  name="primary_email"
                />
              </div>
              <div className="flex justify-between border-b-2 py-2">
                <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                  Institution :
                </span>
                <input
                  className="w-[60%]"
                  value={userData?.education?.institution || "-"}
                  type="text"
                  name="secondary_email"
                />
              </div>
              <div className="flex justify-between border-b-2 py-2">
                <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                  Specialization :
                </span>
                <input
                  className="w-[60%]"
                  value={userData?.education?.specialization}
                  type="text"
                  name="current_address"
                />
              </div>
              <div className="flex justify-between border-b-2 py-2">
                <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                  Percentage :
                </span>
                <input
                  className="w-[60%]"
                  value={userData?.education?.percentage}
                  type="text"
                  name="contact_information.primary_no"
                />
              </div>
              <div className="flex justify-between border-b-2 py-2">
                <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                  Passing year :
                </span>
                <input
                  className="w-[60%]"
                  value={userData?.education?.year_of_passing || "-"}
                  type="text"
                  name="secondary_no"
                />
              </div>
            </div>
          </div>

          {/* Education Details */}

          <div className="p-5 ">
            <div className="font-semibold	text-[16px] mb-4 ml-1">
              Skills
            </div>
            <div className=" rounded-[10px] shadow-lg -w-[35%] p-4 text-[14px]">
              {/* <div className="flex justify-end p-2 cursor-pointer">
                    <Pencil />
                  </div> */}
              <div className="flex justify-between border-b-2 pb-2 text-[14px]">
                <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                Certification :
                </span>
                <input
                  className="w-[60%]"
                  value={userData?.skill
                    ?.certification}
                  type="text"
                  name="school"
                />
              </div>
              <div className="flex justify-between border-b-2 py-2 text-[14px]">
                <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                License :
                </span>
                <input
                  className="w-[60%]"
                  value={userData?.skill?.license}
                  type="text"
                  name="student_class"
                />
              </div>
              
            </div>
          </div>
        </div>
        {/* <button type="submit">Update</button> */}
      </div>
    </>
  );
};

export default TeacherProfile;
