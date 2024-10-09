import Topbar from "components/Topbar";
import React, { useEffect, useState } from "react";
import { BookOpenTextIcon, EllipsisVertical, EyeIcon } from "lucide-react";
import { useAuthContext } from "hooks/useAuthContext";
import axios from "helper/axios";
import { format } from "date-fns";

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
      setCourseData(response.data);
      console.log(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getCourseData();
  }, []);

  return (
    <>
      <Topbar heading="Dashboard" />
      <div className="p-4 sm:p-7 flex flex-wrap">
        {courseData.map((course: any, index: any) => (
          <div key={index} className="w-full mb-6">
            <div
              className={`flex items-center justify-between md:h-20 m-4 p-4 w-[300px] sm:w-full bg-white rounded-lg shadow-md cursor-pointer ${
                index === activeTab ? "border-2 border-gray-300" : "border"
              }`}
              onClick={() => setActiveTab(index === activeTab ? null : index)}
            >
              <div className="flex items-center">
                <BookOpenTextIcon className="w-10 h-10 text-gray-600 p-2 rounded-[5px] bg-[#BCBCBC]" />
                <div className="ml-5">
                  <span className="block font-semibold text-gray-800">
                    {course.course_info.course_name}
                  </span>
                  <span className="block text-gray-600 text-sm">
                    {course.course_info.subject_name} -{" "}
                    {course.course_info.standard_name}
                    <h3 className="font-semibold mb-2">
                      Module: {course.course_info.module_name}
                    </h3>
                  </span>
                </div>
              </div>
              <div className="text-gray-400">
                <EllipsisVertical />
              </div>
            </div>
            {index === activeTab && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                {/* <h4 className="font-medium mb-2">Lessons:</h4> */}
                {course.lessons.map((lesson: any, lessonIndex: any) => (
                  <div
                    key={lessonIndex}
                    className="mb-4 p-3 bg-white rounded shadow flex place-items-end justify-between"
                  >
                    <div className="">
                      <h5 className="font-medium my-3">{lesson.title}</h5>

                      {lesson.content_info.content_path ? (
                        <>
                          {lesson.content_info.content_path.map(
                            (path: any, pathIndex: any) => (
                              <a
                                target="_blank"
                                className="text-[#3f5de4ce] flex items-center  gap-2"
                                key={pathIndex}
                                href={path}
                              >
                                <EyeIcon /> {lesson.content_info.description}
                              </a>
                            )
                          )}
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    <p className="mb-[4px] text-[14px]">
                      {format(lesson.content_info.created_on, "dd-MM-yy")}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default UserDashboard;
