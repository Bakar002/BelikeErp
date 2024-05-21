import React, { useState, useEffect } from "react";
import { handleShowFailureToast } from "../../ToastMessages/ToastMessage";
import axios from "axios";

export default function TeacherMonthlyAttendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [allStudents, setAllStudents] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://belikeerp.onrender.com/view-grade-attendance"
        );
        setAttendanceData(response.data.gradeStudentsAttendance);
      } catch (error) {
        handleShowFailureToast(error.response.data.message);
        console.log(error.response.data.message);
      }
    };

    fetchData();
    const loadAllGradeStudents = async () => {
      try {
        const response = await axios.get(
          "https://belikeerp.onrender.com/load-all-students-same-grade"
        );
        setAllStudents(response.data.studentsSameGrade);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    loadAllGradeStudents();
  }, []);

  const customGetMonth = (date) => {
    return new Date(date).getMonth() + 1;
  };
  console.log(attendanceData);
  return (
    <div>
      <div className="grid grid-cols-6 h-full"></div>
      <div className="col-span-5 ">
        <div className="flex flex-col overflow-x-auto">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm font-light text-black">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr className="">
                      <th scope="col" className="px-6 py-4 text-white">
                        Student Id
                      </th>
                      <th scope="col" className="px-6 py-4 text-white">
                        Student Name
                      </th>
                      {attendanceData && Array.isArray(attendanceData)
                        ? attendanceData?.map((attendance, index) => (
                            <th
                              key={index}
                              scope="col"
                              className="px-6 py-4 text-white"
                            >
                              {new Date(attendance.attendanceDate).getDay()}
                            </th>
                          ))
                        : ""}
                    </tr>
                  </thead>
                  <tbody>
                    {allStudents && Array.isArray(allStudents)
                      ? allStudents.map((student, studentIndex) => (
                          <tr
                            key={student._id}
                            className={`border-b dark:border-neutral-500 ${
                              studentIndex % 2 === 0 ? "bg-gray-100" : ""
                            }`}
                          >
                            <td className="whitespace-nowrap px-6 py-4">
                              {student.studentId}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {student.studentName}
                            </td>
                            {attendanceData &&
                              Array.isArray(attendanceData) &&
                              attendanceData.map((attendance, index) => (
                                <td key={index} className="pl-6">
                                  {attendance.attendanceStudents.find(
                                    (s) => s.studentId?._id === student._id
                                  )?.present
                                    ? "P"
                                    : "A"}
                                </td>
                              ))}
                          </tr>
                        ))
                      : ""}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
