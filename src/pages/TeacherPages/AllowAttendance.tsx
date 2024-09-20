import axios from "helper/axios";
import { useAuthContext } from "hooks/useAuthContext";
import React, { useEffect, useState } from "react";
import qs from "qs";
import Swal from "sweetalert2";
import { Button } from "components";
import { useNavigate } from "react-router-dom";

interface StudentRecord {
  id: string;
  first_name: string;
  last_name: string;
}

interface AttendanceStatus {
  [key: string]: string;
}

const AllowAttendance = () => {
  const [studentRecords, setStudentRecords] = useState<StudentRecord[]>([]);
  const [attendanceStatuses, setAttendanceStatuses] =
    useState<AttendanceStatus>({});
  const [detailID, setDetailID] = useState<string | null>(null);
  const { user }: any = useAuthContext();

  const getStudentData = async () => {
    try {
      const response = await axios.get(`/api/attendance_students/`);
      setStudentRecords(response.data);

      // Initialize all statuses to 'present'
      const initialStatuses = response.data.reduce(
        (acc: AttendanceStatus, student: StudentRecord) => {
          acc[student.id] = "present";
          return acc;
        },
        {}
      );
      setAttendanceStatuses(initialStatuses);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getStudentData();
    const queryParams = new URLSearchParams(window.location.search);
    const detailId = queryParams.get("detailId");
    setDetailID(detailId);
  }, []);

  const handleStatusChange = (studentId: string, status: string) => {
    setAttendanceStatuses((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const navigate = useNavigate();

  const handleSubmitAll = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const student_ids = studentRecords.map((student) => student.id).join(",");
      const course_content_id = detailID;
      const status = studentRecords
        .map((student) => attendanceStatuses[student.id])
        .join(",");

      const payload = {
        student_ids,
        course_content_id,
        status,
      };

      const urlEncodedData = qs.stringify(payload);

      const response = await axios.post(`/api/attendance/`, urlEncodedData, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      Swal.fire({
        icon: "success",
        title: `Attendance Updated`,
        showConfirmButton: true,
      }).then((result)=> {
        if(result.isConfirmed){
          navigate("/dashboard/myattendance")
        }
      })
      // console.log(response.data);
      
    } catch (error) {
      // console.error("Submission error:", error);
      Swal.fire({
        icon: "error",
        title: "Error updating attendance.",
        text: error?.response?.data?.message || "Please try again later.",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="my-9 text-center text-[30px]">
          <h3>Students Attendance</h3>
        </div>
        <form onSubmit={handleSubmitAll}>
          <table className="w-full border-collapse mb-8">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left hidden">
                  Content ID
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Roll Number
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Student Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Attendance Status
                </th>
              </tr>
            </thead>
            <tbody>
              {studentRecords.map((student) => (
                <tr key={student.id}>
                  <td className="border border-gray-300 px-4 py-2 hidden">
                    <input
                      type="text"
                      name="course_content_id"
                      value={detailID || ""}
                      className="w-full px-2 py-1 border rounded"
                      readOnly
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      name="student_ids"
                      value={student.id}
                      className="w-full px-2 py-1 border rounded"
                      readOnly
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      name="studentName"
                      value={`${student.first_name} ${student.last_name}`}
                      className="w-full px-2 py-1 border rounded"
                      readOnly
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <select
                      name="status"
                      value={attendanceStatuses[student.id]}
                      className="w-full px-2 py-1 border rounded"
                      onChange={(e) =>
                        handleStatusChange(student.id, e.target.value)
                      }
                    >
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <Button
              type="submit"
              size="lg"
              className=" flex my-5 mx-auto xs:h-[40px] sm:w-full   font-bold max-w-[250px] bg-deep_orange-500 z-10 transition hover:bg-white-A700 border hover:text-deep_orange-500 border-deep_orange-500"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AllowAttendance;
