import axios from "helper/axios";
import { useAuthContext } from "hooks/useAuthContext";
import React, { useEffect, useState } from "react";
import qs from "qs";
import Swal from "sweetalert2";

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
      console.log(response.data);
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
      console.log(error);
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
      console.log("Submission response:", response);
      Swal.fire({
        icon: "success",
        title: `Attendance Updated`,
        showConfirmButton: false,
        timer: 2500,
      });
    } catch (error) {
      console.error("Submission error:", error);
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
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Submit All Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AllowAttendance;
