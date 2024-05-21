import React, { useEffect } from "react";
import "./StudentCourseTimetable.css";
import { useSelector, useDispatch } from "react-redux";
import loadCurrentStudentAction from "../../Redux/Student/Actions/loadCurrentStudentAction.Student";
const StudentCourseTimeTable = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCurrentStudentAction());
  }, []);
  const { currentStudentData } = useSelector(
    (state) => state.currentStudentData
  );
  return (
    <>
      <div className="container course-timetable-container">
        <h1 className="text-center fw-bold">School Timetable</h1>
        <h2 className="class-heading mb-4 assembly text-center">
          Student Grade{" "}
          {currentStudentData &&
          currentStudentData.currentStudent.studentGrade.gradeCategory
            ? currentStudentData.currentStudent.studentGrade.gradeCategory
            : ""}
        </h2>
        <hr />
        <div className="student-details mt-2">
          {currentStudentData &&
          currentStudentData.currentStudent.studentName ? (
            <img
              src={currentStudentData.currentStudent.studentAvatar}
              alt=""
              className="w-20 h-20"
            />
          ) : (
            ""
          )}
          <h1 className="text-2xl">
            Student Name:{" "}
            <span className="font-bold">
              {currentStudentData &&
              currentStudentData.currentStudent.studentName
                ? currentStudentData.currentStudent.studentName
                : ""}
            </span>
          </h1>
          <h1 className="text-2xl">
            Student Id:{" "}
            <span className="font-bold">
              {currentStudentData && currentStudentData.currentStudent.studentId
                ? currentStudentData.currentStudent.studentId
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
              {currentStudentData &&
              Array.isArray(currentStudentData.currentStudent.studentCourses)
                ? currentStudentData.currentStudent.studentCourses.map(
                    (course) => (
                      <tr>
                        <td className="subject-cell" colSpan={4}>
                          {course.courseId.courseTitle}
                        </td>
                        <td className="time-cell" colSpan={3}>
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
    </>
  );
};

export default StudentCourseTimeTable;
