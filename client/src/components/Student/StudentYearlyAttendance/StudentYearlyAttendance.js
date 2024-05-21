import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import loadCurrentStudentAction from "../../Redux/Student/Actions/loadCurrentStudentAction.Student";
import axios from "axios";
const StudentYearlyAtttendance = () => {
  const dispatch = useDispatch();
  const [attendanceStudents, setAttendanceStudents] = useState(null);
  const [attendance, setAttendance] = useState(null);
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
          "/api/v1/student/view-attendance/yearly"
        );
        console.log(response.data);
        setAttendance(response.data.attendanceData);
        setAttendanceStudents(response.data.studentAttendance);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    loadCurrentStudentAttendance();
  }, []);
  const months = [[], [], [], [], [], [], [], [], [], [], [], []];
  if (attendanceStudents) {
    attendanceStudents.map((attendance) => {
      months[attendance.currentMonth - 1].push(attendance.attendanceStudents);
    });
  }
  console.log(months);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "November",
    "December",
  ];
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
              </div>
            </div>
          </div>
          <h1 className="text-center text-2xl font-bold">YEARLY ATTENDANCE</h1>
          {months &&
            months.map((month, index) =>
              month.length > 0 ? (
                <div>
                  <h1 className="text-center text-xl font-bold mb-5">
                    {monthNames[index]}
                  </h1>
                  <div className="table w-full">
                    <div class="relative overflow-x-auto w-full">
                      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        {/* <thead class="text-xs  uppercase bg-black text-white">
                          <tr>
                            <th scope="col" class="px-6 py-3">
                              January
                            </th>
                          </tr>
                        </thead> */}
                        <tbody>
                          {
                            <tr class=" bg-[#d5d5d5] text-black">
                              {month.map((item) =>
                                item.map((i) => (
                                  <td className="px-6 py-4 pl-10">
                                    {i?.studentId ===
                                    currentStudentData?.currentStudent?._id
                                      ? i.present
                                        ? "P"
                                        : "A"
                                      : ""}
                                  </td>
                                ))
                              )}
                            </tr>
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )
            )}
        </div>
      </div>
    </>
  );
};

export default StudentYearlyAtttendance;
