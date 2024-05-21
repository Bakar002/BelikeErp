import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import loadCurrentStudentAction from "../../Redux/Student/Actions/loadCurrentStudentAction.Student";
import axios from "axios";
const StudentMonthlyAtttendance = () => {
  const dispatch = useDispatch();
  const [studentAttendance, setStudentAttendance] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [presents, setPresents] = useState([]);
  useEffect(() => {
    dispatch(loadCurrentStudentAction());
  }, []);
  const { currentStudentData } = useSelector(
    (state) => state.currentStudentData
  );
  useEffect(() => {
    const loadCurrentStudentAttendance = async () => {
      try {
        const response = await axios.get(
          "/api/v1/student/view-attendance/monthly"
        );
        setAttendance(response.data.attendanceData);
        setStudentAttendance(response.data.studentAttendance);
        setPresents(
          response.data.attendanceData.filter((item) => {
            return item.present;
          })
        );
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    loadCurrentStudentAttendance();
  }, []);
  const customMonth = (month) => {
    return month + 1;
  };
  return (
    <>
      <div className="view-attendance-container h-screen w-screen overflow-auto">
        <div className="attendance-container w-full h-full">
          <div className="flex w-full justify-center py-5">
            <h1 className="text-3xl font-bold">Student Attendance Report</h1>
          </div>
          <div className="student-details ml-10 mb-10">
            <img
              src={
                currentStudentData &&
                currentStudentData?.currentStudent?.studentAvatar
              }
              alt=""
              className="w-40 h-40"
            />
            <div>
              <div className="flex items-center gap-5  mt-4">
                <h1 className="text-xl font-semibold">Student Name:</h1>
                <h1>
                  {currentStudentData &&
                    currentStudentData?.currentStudent?.studentName}
                </h1>
              </div>
              <div className="flex gap-5 mt-4 items-center">
                <h1 className="text-xl font-semibold ">Student Id:</h1>
                <h1>
                  {currentStudentData &&
                    currentStudentData?.currentStudent?.studentId}
                </h1>
              </div>
              <div>
                <div className="flex gap-5 mt-4 items-center">
                  <h1 className="text-xl font-semibold">Student Grade:</h1>
                  <h1>
                    {currentStudentData &&
                      currentStudentData?.currentStudent?.studentGrade
                        ?.gradeCategory}
                  </h1>
                </div>
                <div className="font-bold text-xl mt-4">
                  <h1>
                    Student Attendence Percentage{" "}
                    <span
                      className={`${
                        (attendance &&
                          presents &&
                          presents.length / attendance.length) *
                          100 >
                        60
                          ? "bg-green-500 "
                          : "bg-red-500"
                      } text-white p-2 rounded-lg ml-3`}
                    >
                      {attendance &&
                        presents &&
                        (presents.length / attendance.length) * 100 + "%"}
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-center text-2xl font-bold">MONTHLY ATTENDANCE</h1>
          <div className="table w-full">
            <div class="relative overflow-x-auto w-full">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs  uppercase bg-black text-white">
                  <tr>
                    {studentAttendance && Array.isArray(studentAttendance)
                      ? studentAttendance.map((attendance) => (
                          <th scope="col" class="px-6 py-3">
                            {new Date(attendance.attendanceDate).getDay() +
                              "/" +
                              customMonth(
                                new Date(attendance.attendanceDate).getMonth()
                              ) +
                              "/" +
                              new Date(attendance.attendanceDate).getFullYear()}
                          </th>
                        ))
                      : ""}
                  </tr>
                </thead>
                <tbody>
                  <tr class=" bg-[#d5d5d5] text-black">
                    {attendance && Array.isArray(attendance)
                      ? attendance.map((item, index) => (
                          <td className="px-6 py-4 pl-5">
                            {item.present ? "P" : "A"}
                          </td>
                        ))
                      : ""}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentMonthlyAtttendance;
