import React, { useEffect } from "react";
import StudentDashboard from "../StudentDashboard";
import { useDispatch, useSelector } from "react-redux";
import loadCurrentStudentAction from "../../../components/Redux/Student/Actions/loadCurrentStudentAction.Student";
export default function StudentViewProfile() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCurrentStudentAction());
  }, []);
  const { currentStudentData } = useSelector(
    (state) => state.currentStudentData
  );
  console.log(currentStudentData);
  return (
    <>
      <div className="h-[100vh]">
        <div className="grid grid-cols-6 h-full">
          <StudentDashboard className="h-full" />
          <div className="col-span-5 flex flex-col justify-center items-center">
            <div className="justify-between p-2 bw-[90%] md:w-5/6 h-5/6">
              <div className="md:flex flex-wrap items-center justify-between w-full h-1/5">
                <div className="md:w-[40%] flex flex-col  justify-center items-center md:block ">
                  <div>
                    <img
                      src={currentStudentData?.currentStudent?.studentAvatar}
                      alt="avatar"
                      className="w-20 h-20"
                    />
                  </div>
                </div>
                <div className="md:w-[60%] flex justify-between mt-4 md:mt-0">
                  <div className="shrink-0">
                    <h1 className="text-2xl font-bold">
                      {currentStudentData?.currentStudent?.studentName}
                    </h1>
                  </div>
                  <div className="shrink-0">
                    <h1 className="text-2xl font-bold">
                      {currentStudentData?.currentStudent?.studentId}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="h-[80%] overflow-x-auto mt-4 text-center">
                <table className="table-auto w-full border-collapse border border-gray-500">
                  <thead>
                    <tr className="">
                      <th className="border border-gray-500 px-2 py-1">
                        Subjects
                      </th>
                      {/* <th className="border border-gray-500 px-2 py-1">
                        Teachers
                      </th> */}
                      <th className="border border-gray-500 px-2 py-1">
                        Timetable
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentStudentData &&
                    Array.isArray(
                      currentStudentData.currentStudent.studentCourses
                    )
                      ? currentStudentData.currentStudent.studentCourses.map(
                          (course) => (
                            <tr>
                              <td className="border border-gray-500 px-2 py-1">
                                {course.courseId.courseTitle}
                              </td>
                              <td className="border border-gray-500 px-2 py-1">
                                {course.courseId.courseTimeTable}
                              </td>
                            </tr>
                          )
                        )
                      : ""}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
