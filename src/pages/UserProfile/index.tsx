import Topbar from "components/Topbar";
import axios from "helper/axios";
import { useAuthContext } from "hooks/useAuthContext";
import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { Input } from "components";

const UserProfile = () => {
  const { user }: any = useAuthContext();
  const [userData, setUserData] = useState<any>({
    contact_information: {
      primary_no: 'dsvd',
      secondary_no: 'dsds',
      primary_email: 'sdsd',
      secondary_email: null,
      current_address: 'dsdsv',
      // ... other properties
    },
    parent_information: {
      p_first_name: 'vvdsd',
      p_middle_name: null,
      p_last_name: 'dsd',
      guardian: 'dvsd',
      primary_no: 'fdffsd',
      // ... other properties
    },
    pre_education: {
      student_class: 'dsvdv',
      school: 'dvs',
      year_of_passing: 2022,
      percentage: 77,
    },
    student: {
      address_proof: null,
      date_of_birth: '2022-02-02',
      date_of_completion: null,
      date_of_joining: '2022-02-02',
      first_name: '',
      gender: 'dsvvsd',
      id_proof: 'static/uploads/ab506cdd-ee22-4adb-b2f3-7b99de0039ed_office_images.jpg',
      last_name: 'dsvvs',
      middle_name: 'ergeegergereg',
      nationality: 'dvsdssd',
      referral: null,
    },
    // ... other properties
  });
  const [studentId, setStudentId] = useState<any>();

  const handleData = (e: any) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    console.log(e.target.value)
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
      const response = await axios.put(`api/admission/${studentId}`,userData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(response.data, "data");
      setUserData(response)
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
                />
              </div>
              <div className="flex justify-between border-b-2 py-2">
                <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                  Secondary Email :
                </span>
                <input
                  className="w-[60%]"
                  value={userData?.contact_info?.secondary_email || "-"}
                />
              </div>
              <div className="flex justify-between border-b-2 py-2">
                <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                  Address :
                </span>
                <input
                  className="w-[60%]"
                  value={userData?.contact_info?.current_address}
                />
              </div>
              <div className="flex justify-between border-b-2 py-2">
                <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                  Primary No :
                </span>
                <input
                  className="w-[60%]"
                  value={userData?.contact_info?.primary_no}
                />
              </div>
              <div className="flex justify-between border-b-2 py-2">
                <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                  Secondary No :
                </span>
                <input
                  className="w-[60%]"
                  value={userData?.contact_info?.secondary_no || "-"}
                />
              </div>
              <div className="flex justify-between border-b-2 py-2">
                <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                  Date of birth :
                </span>
                <input className="w-[60%]" value={userData?.date_of_birth} />
              </div>
              <div className="flex justify-between border-b-2 py-2">
                <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                  Nationality :
                </span>
                <input className="w-[60%]" value={userData?.nationality} />
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                  Gender :
                </span>
                <input className="w-[60%]" value={userData?.gender} />
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
                    />
                  </div>
                  <div className="flex justify-between border-b-2 py-2 text-[14px]">
                    <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                      Parent first name :
                    </span>
                    <input
                      className="w-[60%]"
                      value={userData?.parent_info?.p_first_name}
                    />
                  </div>
                  <div className="flex justify-between border-b-2 py-2">
                    <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                      Parent last name :
                    </span>
                    <input
                      className="w-[60%]"
                      value={userData?.parent_info?.p_last_name}
                    />
                  </div>
                  <div className="flex justify-between border-b-2 py-2">
                    <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                      Parent Email :
                    </span>
                    <input
                      className="w-[60%]"
                      value={userData?.parent_info?.primary_email}
                    />
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                      Primary No :
                    </span>
                    <input
                      className="w-[60%]"
                      value={userData?.parent_info?.primary_no}
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
                    />
                  </div>
                  <div className="flex justify-between border-b-2 py-2 text-[14px]">
                    <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                      Standard :
                    </span>
                    <input
                      className="w-[60%]"
                      value={userData?.pre_education?.student_class}
                    />
                  </div>
                  <div className="flex justify-between border-b-2 py-2">
                    <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                      Year of passing :
                    </span>
                    <input
                      className="w-[60%]"
                      value={userData?.pre_education?.year_of_passing}
                    />
                  </div>
                  <div className="flex justify-between  py-2">
                    <span className="font-semibold w-[30%] text-indigo-500 text-[18px]">
                      Percentage :
                    </span>
                    <input
                      className="w-[60%]"
                      value={userData?.pre_education?.percentage}
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
