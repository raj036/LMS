import Topbar from "components/Topbar";
import React, { useEffect, useState } from "react";
import { BookOpenText, BookOpenTextIcon, EllipsisVertical } from "lucide-react";
import { useAuthContext } from "hooks/useAuthContext";
import axios from "helper/axios";

const UserDashboard = () => {
  const { user }: any = useAuthContext();
  const [activeTab, setActiveTab] = useState(0);
  const [courseData, setCourseData] = useState([]);

  const getCourseData = async () => {
    try {
      const response = await axios.get("api/course_active/enlrolled_course", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setCourseData(response?.data);
      console.log(response.data[0].course_info);
    } catch (error) {
      // console.error(error);
    }
  };

  useEffect(() => {
    getCourseData();
  }, []);

  return (
    <>
      <Topbar heading={"Dashboard"} />
      <div className="ruby-disp">
        {courseData.map((tab, index) => (
          <div 
          key={index}
          className="m-4 cursor-pointer rounded-lg"
          >
          <div
            key={index}
            className={`flex rounded-[10px] items-center mb-2 bg-gray-100 p-3 w-[250px] border-[1px] ${
              index === tab.id ? "bg-blue-200" : "bg-white"
            }`}
            onClick={() => setActiveTab(index)}
          >
            <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                <BookOpenText className="h-5 w-5 text-gray-600" />
              </div>
              <div className="m-5">
                <span className="block font-semibold text-gray-800">{tab.course_info.course_name}</span>
              </div>
            </div>
          </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserDashboard;
