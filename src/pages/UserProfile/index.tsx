import Topbar from "components/Topbar";
import axios from "helper/axios";
import { useAuthContext } from "hooks/useAuthContext";
import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { Input } from "components";

const UserProfile = () => {
  const { user }: any = useAuthContext();
  const [userData, setUserData] = useState<any>({
    student: {
      first_name: "",
      middle_name: "",
      last_name: "",
      date_of_birth: "",
      gender: "",
      nationality: "",
      referral: "null",
      date_of_joining: "",
      date_of_completion: "null",
      id_proof: "",
      address_proof: "null",
    },
    contact_information: {
      primary_no: "",
      secondary_no: "null",
      primary_email: "",
      secondary_email: "null",
      current_address: "",
      permanent_address: "",
    },
    pre_education: {
      student_class: "",
      school: "",
      year_of_passing: 2022,
      percentage: 88,
    },
    parent_information: {
      p_first_name: "",
      p_middle_name: "",
      p_last_name: "",
      guardian: "",
      primary_no: "",
      secondary_no: "null",
      primary_email: "",
      secondary_email: "null",
    },
  });
  const [student_id, setStudentId] = useState<any>();

  const handleData = (e: any) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    console.log(userData, "userdata");
  };

  const getMyData = async () => {
    try {
      const response = await axios.get(`api/admission/${user.user_id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(response.data, "data");
      setUserData(response?.data);
      setStudentId(response?.data?.student_id);
    } catch (error) {
      console.error("Error getting Profile", error);
    }
  };

  useEffect(() => {
    getMyData();
  }, []);

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `api/admission/${student_id}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data",
            // 'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data, "data infor");
      setUserData({ userData });
    } catch (error) {
      console.error("Error getting Profile", error);
    }
  };

  return (
    <>
      <Topbar heading={"Profile"} />
      <form onSubmit={handleUpdate}>
        <div className="flex lg:flex-col">
          <div className="p-5 w-[40%] lg:w-[90%] ">
            <div className="font-semibold	text-[16px] mb-4 ml-1">
              Contact Details
            </div>
            <div className="h-full rounded-[10px] shadow-lg -w-[35%] p-4 text-[14px]">
              <div className="flex justify-end p-2 cursor-pointer">
                <Pencil />
              </div>
              <div className="flex justify-between border-b-2 pb-2">
                <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                  Name :
                </span>
                <input
                  className="w-[60%]"
                  type="text"
                  value={userData.first_name}
                  name="first_name"
                  onChange={handleData}
                />
              </div>
              <div className="flex justify-between border-b-2 py-2">
                <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                  Primary Email :
                </span>
                <input
                  className="w-[60%]"
                  value={userData?.contact_info?.primary_email}
                  onChange={handleData}
                />
              </div>
              <div className="flex justify-between border-b-2 py-2">
                <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                  Secondary Email :
                </span>
                <input
                  className="w-[60%]"
                  value={userData?.contact_info?.secondary_email || "-"}
                  onChange={handleData}
                />
              </div>
              <div className="flex justify-between border-b-2 py-2">
                <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                  Address :
                </span>
                <input
                  className="w-[60%]"
                  value={userData?.contact_info?.current_address}
                  onChange={handleData}
                />
              </div>
              <div className="flex justify-between border-b-2 py-2">
                <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                  Primary No :
                </span>
                <input
                  className="w-[60%]"
                  value={userData?.contact_info?.primary_no}
                  onChange={handleData}
                />
              </div>
              <div className="flex justify-between border-b-2 py-2">
                <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                  Secondary No :
                </span>
                <input
                  className="w-[60%]"
                  value={userData?.contact_info?.secondary_no || "-"}
                  onChange={handleData}
                />
              </div>
              <div className="flex justify-between border-b-2 py-2">
                <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                  Date of birth :
                </span>
                <input
                  className="w-[60%]"
                  value={userData?.date_of_birth}
                  onChange={handleData}
                />
              </div>
              <div className="flex justify-between border-b-2 py-2">
                <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                  Nationality :
                </span>
                <input
                  className="w-[60%]"
                  value={userData?.nationality}
                  onChange={handleData}
                />
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                  Gender :
                </span>
                <input
                  className="w-[60%]"
                  value={userData?.gender}
                  onChange={handleData}
                />
              </div>
            </div>
          </div>

          {/* Parents Information */}

          {user && user.user_type === "student" && (
            <div className="w-[40%] lg:w-[90%] ">
              <div className="p-5 ">
                <div className="font-semibold	text-[16px] mb-4 ml-1">
                  Parent Details
                </div>
                <div className=" rounded-[10px] shadow-lg -w-[35%] p-4  text-[14px]">
                  <div className="flex justify-end p-2 cursor-pointer">
                    <Pencil />
                  </div>
                  <div className="flex justify-between border-b-2 pb-2 text-[14px]">
                    <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                      Guardian :
                    </span>
                    <input
                      className="w-[60%]"
                      value={userData?.parent_info?.guardian}
                      onChange={handleData}
                    />
                  </div>
                  <div className="flex justify-between border-b-2 py-2 text-[14px]">
                    <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                      Parent first name :
                    </span>
                    <input
                      className="w-[60%]"
                      value={userData?.parent_info?.p_first_name}
                      onChange={handleData}
                    />
                  </div>
                  <div className="flex justify-between border-b-2 py-2">
                    <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                      Parent last name :
                    </span>
                    <input
                      className="w-[60%]"
                      value={userData?.parent_info?.p_last_name}
                      onChange={handleData}
                    />
                  </div>
                  <div className="flex justify-between border-b-2 py-2">
                    <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                      Parent Email :
                    </span>
                    <input
                      className="w-[60%]"
                      value={userData?.parent_info?.primary_email}
                      onChange={handleData}
                    />
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                      Primary No :
                    </span>
                    <input
                      className="w-[60%]"
                      value={userData?.parent_info?.primary_no}
                      onChange={handleData}
                    />
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
                    <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                      School Name :
                    </span>
                    <input
                      className="w-[60%]"
                      value={userData?.pre_education?.school}
                      onChange={handleData}
                    />
                  </div>
                  <div className="flex justify-between border-b-2 py-2 text-[14px]">
                    <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                      Standard :
                    </span>
                    <input
                      className="w-[60%]"
                      value={userData?.pre_education?.student_class}
                      onChange={handleData}
                    />
                  </div>
                  <div className="flex justify-between border-b-2 py-2">
                    <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                      Year of passing :
                    </span>
                    <input
                      className="w-[60%]"
                      value={userData?.pre_education?.year_of_passing}
                      onChange={handleData}
                    />
                  </div>
                  <div className="flex justify-between  py-2">
                    <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                      Percentage :
                    </span>
                    <input
                      className="w-[60%]"
                      value={userData?.pre_education?.percentage}
                      onChange={handleData}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          <button type="submit">Update</button>
        </div>
      </form>
    </>
  );
};

export default UserProfile;
