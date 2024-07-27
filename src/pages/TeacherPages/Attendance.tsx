import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog } from "@radix-ui/react-dialog";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import Topbar from "components/Topbar";
import axios from "helper/axios";
import { useAuthContext } from "hooks/useAuthContext";
import { BookOpenTextIcon, EllipsisVertical } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const TeacherAttendance = () => {
  const { user }: any = useAuthContext();
  const [activeTab, setActiveTab] = useState(0);
  const [courseData, setCourseData] = useState([]);
  const [courseDetails, setCourseDetails] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedCourseDetailId, setSelectedCourseDetailId] = useState(null);

  const getCourseData = async () => {
    try {
      const response = await axios.get("/api/assigned_courses", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setCourseData(response?.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCourseDetails = async (courseId: any) => {
    try {
      const response = await axios.get(`/api/course/${courseId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(response.data.related_course_details, "data");
      setCourseDetails(response.data.related_course_details);
      setSelectedCourseDetailId(response.data.related_course_details);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    getCourseData();
  }, []);

  useEffect(() => {
    if (selectedCourseId) {
      getCourseDetails(selectedCourseId);
    }
  }, [selectedCourseId]);

  const handleCourseClick = (courseId: any) => {
    setSelectedCourseId(courseId);
  };

  const handleAttendancePage = (detailId: any) => {
    navigate(
      `/takeattendance?detailId=${detailId}&selectedCourseId=${selectedCourseId}`
    );
  };


  return (
    <>
     
      <div className="ruby-disp">
        {courseData.map((tab, index) => (
          <div
            className=" m-4 cursor-pointer rounded-lg"
            key={index}
            onClick={() => handleCourseClick(tab.id)}
          >
            <div
              className={`flex items-center mb-2 bg-gray-100 p-3 ${
                selectedCourseId === tab.id ? "bg-blue-200" : "bg-white"
              }`}
            >
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <span className="text-gray-700 font-semibold  ">{tab.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* course details */}
      <div className="mt-20 px-11 ">
        {courseDetails.length > 0 ? (
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] bg-teal-900 text-white-A700">
                <select
                          name="attendanceStatus"
                          
                          className="w-full px-2 py-1 border rounded"
                        >
                          <option value="Present">7th</option>
                          <option value="Absent">8th</option>
                          <option value="Present">9th</option>
                          <option value="Absent">10th</option>
                        </select>
                </TableHead>
                <TableHead className="text-center bg-teal-900 text-white-A700">
                  Subject
                </TableHead>
                <TableHead className="text-center bg-teal-900 text-white-A700">
                  Module
                </TableHead>
                <TableHead className="text-right bg-teal-900 text-white-A700">
                  Attendance
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courseDetails.map((ele, index) => (
                <TableRow key={index}>
                  <TableCell className="w-[100px]">
                    {ele.standard_name}
                  </TableCell>
                  <TableCell className="text-center">
                    {ele.subject_name}
                  </TableCell>
                  <TableCell className="text-center">
                    {ele.module_name}
                  </TableCell>
                  <TableCell className="text-right">
                    <button onClick={() => handleAttendancePage(ele.id)}>
                      Attendance
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex justify-center h-[350px] text-[20px] font-bold text-indigo-500 items-center shadow-lg border-gray-600">
            Please select any course
          </div>
        )}
      </div>
    </>
  );
};

export default TeacherAttendance;




// import React, { useState, useEffect } from "react";
// import Topbar from "components/Topbar";

// const TeacherAttendance = () => {
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [newRecord, setNewRecord] = useState({
//     rollNumber: "",
//     studentName: "",
//     attendanceStatus: "Present",
//     attendanceDate: new Date().toISOString().split("T")[0],
//   });
//   const [editingAll, setEditingAll] = useState(false);
//   const [editedRecords, setEditedRecords] = useState([]);

//   useEffect(() => {
//     // Load initial data or fetch from an API
//     const initialData = [
//       {
//         id: 1,
//         rollNumber: 1,
//         studentName: "Ankit Yadav",
//         attendanceStatus: "Present",
//         attendanceDate: "2020-09-01",
//       },
//       {
//         id: 2,
//         rollNumber: 2,
//         studentName: "Sagar Garg",
//         attendanceStatus: "Present",
//         attendanceDate: "2020-09-01",
//       },
//       {
//         id: 3,
//         rollNumber: 3,
//         studentName: "Ojasvi Tayagi",
//         attendanceStatus: "Present",
//         attendanceDate: "2020-09-01",
//       },
//       {
//         id: 4,
//         rollNumber: 4,
//         studentName: "Ritwik Garg",
//         attendanceStatus: "Absent",
//         attendanceDate: "2020-09-01",
//       },
//       {
//         id: 5,
//         rollNumber: 5,
//         studentName: "Abhishek Sethi",
//         attendanceStatus: "Absent",
//         attendanceDate: "2020-09-01",
//       },
//     ];
//     setAttendanceRecords(initialData);
//     setEditedRecords(initialData);
//   }, []);

//   const handleInputChange = (e, id) => {
//     const { name, value } = e.target;
//     setEditedRecords((prevRecords) =>
//       prevRecords.map((record) =>
//         record.id === id ? { ...record, [name]: value } : record
//       )
//     );
//   };

//   const handleEditAll = () => {
//     setEditingAll(true);
//   };

//   const handleSubmitAll = () => {
//     setAttendanceRecords(editedRecords);
//     setEditingAll(false);
//   };

//   return (
//     <>
//       <Topbar heading="Attendance" />
//       <div className="container mx-auto px-4 py-8 max-w-6xl">
//         <table className="w-full border-collapse mb-8">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border border-gray-300 px-4 py-2 text-left">Roll Number</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">Student Name</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">Attendance Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {editedRecords.map((record) => (
//               <tr key={record.id}>
//                 <td className="border border-gray-300 px-4 py-2">
//                   {editingAll ? (
//                     <input
//                       type="number"
//                       name="rollNumber"
//                       value={record.rollNumber}
//                       onChange={(e) => handleInputChange(e, record.id)}
//                       className="w-full px-2 py-1 border rounded"
//                     />
//                   ) : (
//                     record.rollNumber
//                   )}
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2">
//                   {editingAll ? (
//                     <input
//                       type="text"
//                       name="studentName"
//                       value={record.studentName}
//                       onChange={(e) => handleInputChange(e, record.id)}
//                       className="w-full px-2 py-1 border rounded"
//                     />
//                   ) : (
//                     record.studentName
//                   )}
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2">
//                   {editingAll ? (
//                     <select
//                       name="attendanceStatus"
//                       value={record.attendanceStatus}
//                       onChange={(e) => handleInputChange(e, record.id)}
//                       className="w-full px-2 py-1 border rounded"
//                     >
//                       <option value="Present">Present</option>
//                       <option value="Absent">Absent</option>
//                     </select>
//                   ) : (
//                     <span
//                       className={`px-2 py-1 rounded ${
//                         record.attendanceStatus === "Present"
//                           ? "bg-green-500 text-white"
//                           : "bg-red-500 text-white"
//                       }`}
//                     >
//                       {record.attendanceStatus}
//                     </span>
//                   )}
//                 </td>
                
                
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div>
//           {editingAll ? (
//             <button
//               onClick={handleSubmitAll}
//               className="bg-green-500 text-white px-4 py-2 rounded"
//             >
//               Submit All Changes
//             </button>
//           ) : (
//             <button
//               onClick={handleEditAll}
//               className="bg-blue-500 text-white px-4 py-2 rounded"
//             >
//               Edit All
//             </button>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default TeacherAttendance;