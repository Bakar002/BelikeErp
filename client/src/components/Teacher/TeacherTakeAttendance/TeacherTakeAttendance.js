import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import loadCurrentTeacherAction from "../../Redux/Teacher/Actions/loadCurrentTeacherAction.Teacher";
import axios from "axios";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../ToastMessages/ToastMessage";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import TeacherDashboard from "../TeacherDashboard";
const TeacherTakeAttendance = () => {
  const dispatch = useDispatch();
  const [attendance, setAttendance] = useState([]);
  const [allStudents, setAllStudents] = useState(null);
  const [viewGradeAttendance, setViewGradeAttendance] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(loadCurrentTeacherAction());
    const loadAllGradeStudents = async () => {
      try {
        const response = await axios.get(
          "/api/v1/teacher/load-all-students-same-grade"
        );
        setAllStudents(response.data.studentsSameGrade);
        setAttendance(
          response.data.studentsSameGrade.map((student) => ({
            studentId: student._id,
            present: true,
          }))
        );
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    loadAllGradeStudents();
  }, [dispatch]);
  const { currentTeacherData } = useSelector(
    (state) => state.currentTeacherData
  );

  useEffect(() => {
    if (currentTeacherData) {
      const loadViewGradeAttendance = async () => {
        try {
          const response = await axios.get(
            "/api/v1/teacher/view-grade-attendance"
          );
          setViewGradeAttendance(response.data.gradeStudentsAttendance);
        } catch (error) {
          console.log(error.response.data.message);
        }
      };
      loadViewGradeAttendance();
    }
  }, [currentTeacherData]);
  const sendDataToAttendanceApi = async () => {
    if (attendance) {
      const data = {
        attendanceStudents: attendance,
      };
      try {
        const response = await axios.post(
          `/api/v1/teacher/take-attendance/${currentTeacherData?.teacher?.teacherGradeIncharge?._id}`,
          data
        );
        console.log(response.data.message);
        handleShowSuccessToast(response.data.message);
        navigate("/teacher-view-attendance");
      } catch (error) {
        console.log(error.response.data.message);
      }
    } else {
      handleShowFailureToast("Lecture Number input is missing");
    }
  };
  const handleCheckBoxChange = (studentId) => {
    setAttendance((prevAttendance) =>
      prevAttendance.map((student) =>
        student.studentId === studentId
          ? { ...student, present: !student.present }
          : student
      )
    );
  };
  const customGetMonth = (date) => {
    return new Date(date).getMonth() + 1;
  };
  console.log(currentTeacherData);
  return (
    <div className="h-[100vh] xl:mx-8">
      <div className="grid grid-cols-6 h-full">
        <Toaster />
        <div className="col-span-5 ">
          <div className="flex flex-col overflow-x-auto">
            <div className="sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="flex gap-8 m-10 items-center">
                  <h1 className="text-2xl font-bold">
                    Grade{" "}
                    {
                      currentTeacherData?.teacher?.teacherGradeIncharge
                        ?.gradeCategory
                    }
                  </h1>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm font-light text-black ">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr className="text-white">
                        <th scope="col" className="px-6 py-4">
                          #
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Student Id
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Student Name
                        </th>
                        <th>Today's Attendance</th>
                        {viewGradeAttendance &&
                        Array.isArray(viewGradeAttendance)
                          ? viewGradeAttendance.map((attendance) => (
                              <th>
                                L#{attendance.attendanceLecture} <br />{" "}
                                {new Date(attendance.attendanceDate).getDate() +
                                  "-" +
                                  customGetMonth(attendance.attendanceDate) +
                                  "-" +
                                  new Date(
                                    attendance.attendanceDate
                                  ).getFullYear()}
                              </th>
                            ))
                          : ""}
                      </tr>
                    </thead>
                    <tbody>
                      {allStudents &&
                        allStudents.map((student, studentIndex) => (
                          <tr
                            key={student?._id}
                            className={`border-b dark:border-neutral-500 ${
                              studentIndex % 2 === 0 ? "bg-gray-100" : ""
                            }`}
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {studentIndex + 1}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {student?.studentId}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {student?.studentName}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <input
                                type="checkbox"
                                className="w-10 h-4"
                                onChange={() =>
                                  handleCheckBoxChange(student?._id)
                                }
                                checked={
                                  attendance.find(
                                    (att) => att.studentId === student._id
                                  )?.present
                                }
                              />
                            </td>
                            {viewGradeAttendance &&
                              Array.isArray(viewGradeAttendance) &&
                              viewGradeAttendance.map((attendance, index) => (
                                <td key={index}>
                                  {attendance.attendanceStudents.find(
                                    (s) => s.studentId?._id === student._id
                                  )?.present
                                    ? "P"
                                    : "A"}
                                </td>
                              ))}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <button
              className="bg-blue-500 px-8 py-2 rounded-md font-bold text-xl  text-white hover:bg-blue-400 m-4"
              onClick={sendDataToAttendanceApi}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherTakeAttendance;
