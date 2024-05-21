import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import loadCurrentStudentAction from "../../Redux/Student/Actions/loadCurrentStudentAction.Student";
import loadCurrentTeacherAction from "../../Redux/Teacher/Actions/loadCurrentTeacherAction.Teacher";
const TeacherCourseTimetable = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCurrentStudentAction());
    dispatch(loadCurrentTeacherAction());
  }, []);
  const { currentStudentData } = useSelector(
    (state) => state.currentStudentData
  );
  const { currentTeacherData } = useSelector(
    (state) => state.currentTeacherData
  );
  console.log(
    currentTeacherData.teacher.teacherCourses[0].courseId.courseTitle
  );
  return (
    <>
      <div className="container course-timetable-container">
        <h1 className="text-center fw-bold text-2xl">School Timetable</h1>
        <hr />
        <div className="student-details mt-2">
          {currentTeacherData &&
          currentTeacherData &&
          currentTeacherData.teacher.teacherAvatar ? (
            <img
              src={
                currentTeacherData && currentTeacherData.teacher.teacherAvatar
              }
              alt=""
              className="w-20 h-20"
            />
          ) : (
            ""
          )}
          <h1 className="text-2xl">
            Teacher Name:{" "}
            <span className="font-bold">
              {currentTeacherData &&
              currentTeacherData &&
              currentTeacherData.teacher.teacherName
                ? currentTeacherData && currentTeacherData.teacher.teacherName
                : ""}
            </span>
          </h1>
          <h1 className="text-2xl">
            Teacher Email:{" "}
            <span className="font-bold">
              {currentTeacherData && currentTeacherData.teacher.teacherEmail
                ? currentTeacherData && currentTeacherData.teacher.teacherEmail
                : ""}
            </span>
          </h1>
        </div>
        <div className="timetable text-center my-4">
          <h3 className="assembly text-2xl font-bold">Class assembly</h3>
          <h3 className="assembly mt-4">7:30am to 8:00am</h3>
          <table className="table table-bordered">
            {/* Table structure similar to Class 1 */}
          </table>
        </div>
        {/* Timetable for Class 1 */}
        <div className=" text-center fw-bold">
          <table className="table table-bordered text-white">
            <thead>
              <tr className="text">
                <th colSpan={4} className="assembly text-b">
                  Subject
                </th>
                <th colSpan={3} className="assembly">
                  Monday to Saturday
                </th>
              </tr>
            </thead>
            <tbody>
              {currentTeacherData &&
              Array.isArray(currentTeacherData.teacher.teacherCourses)
                ? currentTeacherData.teacher.teacherCourses.map((course) => (
                    <tr>
                      <td className="subject-cell" colSpan={4}>
                        {course?.courseId?.courseTitle}
                      </td>
                      <td className="time-cell" colSpan={3}>
                        {course?.courseId?.courseTimeTable}
                      </td>
                    </tr>
                  ))
                : ""}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TeacherCourseTimetable;
