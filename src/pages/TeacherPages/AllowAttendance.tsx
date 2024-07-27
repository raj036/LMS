import Topbar from 'components/Topbar';
import React, { useEffect, useState } from 'react'

const AllowAttendance = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
      const [newRecord, setNewRecord] = useState({
        rollNumber: "",
        studentName: "",
        attendanceStatus: "Present",
        attendanceDate: new Date().toISOString().split("T")[0],
      });
      const [editingAll, setEditingAll] = useState(false);
      const [editedRecords, setEditedRecords] = useState([]);
    
      useEffect(() => {
        // Load initial data or fetch from an API
        const initialData = [
          {
            id: 1,
            rollNumber: 1,
            studentName: "Ankit Yadav",
            attendanceStatus: "Present",
            attendanceDate: "2020-09-01",
          },
          {
            id: 2,
            rollNumber: 2,
            studentName: "Sagar Garg",
            attendanceStatus: "Present",
            attendanceDate: "2020-09-01",
          },
          {
            id: 3,
            rollNumber: 3,
            studentName: "Ojasvi Tayagi",
            attendanceStatus: "Present",
            attendanceDate: "2020-09-01",
          },
          {
            id: 4,
            rollNumber: 4,
            studentName: "Ritwik Garg",
            attendanceStatus: "Absent",
            attendanceDate: "2020-09-01",
          },
          {
            id: 5,
            rollNumber: 5,
            studentName: "Abhishek Sethi",
            attendanceStatus: "Absent",
            attendanceDate: "2020-09-01",
          },
        ];
        setAttendanceRecords(initialData);
        setEditedRecords(initialData);
      }, []);
    
      const handleInputChange = (e, id) => {
        const { name, value } = e.target;
        setEditedRecords((prevRecords) =>
          prevRecords.map((record) =>
            record.id === id ? { ...record, [name]: value } : record
          )
        );
      };
    
      const handleEditAll = () => {
        setEditingAll(true);
      };
    
      const handleSubmitAll = () => {
        setAttendanceRecords(editedRecords);
        setEditingAll(false);
      };
    
      return (
        <>
          <div className="container mx-auto px-4 py-8 max-w-6xl">
            <table className="w-full border-collapse mb-8">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Roll Number</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Student Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Attendance Status</th>
                </tr>
              </thead>
              <tbody>
                {editedRecords.map((record) => (
                  <tr key={record.id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {editingAll ? (
                        <input
                          type="number"
                          name="rollNumber"
                          value={record.rollNumber}
                          onChange={(e) => handleInputChange(e, record.id)}
                          className="w-full px-2 py-1 border rounded"
                        />
                      ) : (
                        record.rollNumber
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {editingAll ? (
                        <input
                          type="text"
                          name="studentName"
                          value={record.studentName}
                          onChange={(e) => handleInputChange(e, record.id)}
                          className="w-full px-2 py-1 border rounded"
                        />
                      ) : (
                        record.studentName
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {editingAll ? (
                        <select
                          name="attendanceStatus"
                          value={record.attendanceStatus}
                          onChange={(e) => handleInputChange(e, record.id)}
                          className="w-full px-2 py-1 border rounded"
                        >
                          <option value="Present">Present</option>
                          <option value="Absent">Absent</option>
                        </select>
                      ) : (
                        <span
                          className={`px-2 py-1 rounded ${
                            record.attendanceStatus === "Present"
                              ? "bg-green-500 text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {record.attendanceStatus}
                        </span>
                      )}
                    </td>
                    
                    
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              {editingAll ? (
                <button
                  onClick={handleSubmitAll}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Submit All Changes
                </button>
              ) : (
                <button
                  onClick={handleEditAll}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit All
                </button>
              )}
            </div>
          </div>
        </>
      );
    };


export default AllowAttendance