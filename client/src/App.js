import { BrowserRouter, Route, Routes } from "react-router-dom";

// import Landingpage from "./components/Landing/Landing";

// import SchoolPortalHome from "./components/SchoolPortal/SchoolPortalHome/SchoolPortalHome";
import AdminDashboard from "./components/Admin/AdminDashboard";
// import TeacherDashboard from "./components/Teacher/TeacherDashboard.js";
import AdminLogin from "./components/Admin/AdminLogin/AdminLogin";
import AdminSignup from "./components/Admin/AdminLogin/AdminSignup";
import StudentLogin from "./components/Student/StudentLogin/Login.Student";
import Login from './components/Login/Login.js';
import Signup from "./components/Login/signUp.js";
import TeacherLogin from "./components/Teacher/TeacherLogin/TeacherLogin";
import StudentViewAtttendance from "./components/Student/StudentViewAttendance/StudentViewAtttendance";

import TeacherTakeAttendance from "./components/Teacher/TeacherTakeAttendance/TeacherTakeAttendance.js";
import TeacherViewAttendance from "./components/Teacher/TeacherViewAttendance/TeacherViewAttendance.js";

import { AddCourse } from "./components/Admin/AdminAddCourse/AdminAddCourse";
import StudentDashboard from "./components/Student/StudentDashboard";
import StudentViewProfile from "./components/Student/StudentViewSubjects/StudentViewProfile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import loadCurrentStudentAction from "./components/Redux/Student/Actions/loadCurrentStudentAction.Student";
import RingLoader from "./components/Loaders/RingLoader";
import loadCurrentAdminAction from "./components/Redux/Admin/Actions/loadCurrentAdminAction.Admin";
import Landingpage from "./components/Landing/Landing";
import SchoolPortalHome from "./components/School/SchoolPortal/SchoolPortal.js";
import One from "./components/School/Grades/One/One.js";
import Two from "./components/School/Grades/Two/Two.js";
import Three from "./components/School/Grades/Three/Three.js";
import Four from "./components/School/Grades/Four/Four.js";
import Five from "./components/School/Grades/Five/Five.js";
import Six from "./components/School/Grades/Six/Six.js";
import Seven from "./components/School/Grades/Seven/Seven.js";
import Eight from "./components/School/Grades/Eight/Eight.js";
import Nine from "./components/School/Grades/Nine/Nine.js";
import Ten from "./components/School/Grades/Ten/Ten.js";
import StudentCourseTimetable from "./components/Student/StudentCourseTimetable/StudentCourseTimeTable.js";
import StudentAttendance from "./components/Student/StudentAttendance/StudentAttendance.js";
import StudentWeeklyAtttendance from "./components/Student/StudentWeeklyAttendance/StudentWeeklyAttendance.js";
import StudentMonthlyAtttendance from "./components/Student/StudentMonthlyAttendance/StudentMonthlyAttendance.js";
import StudentYearlyAtttendance from "./components/Student/StudentYearlyAttendance/StudentYearlyAttendance.js";
import loadCurrentTeacherAction from "./components/Redux/Teacher/Actions/loadCurrentTeacherAction.Teacher.js";
import TeacherCourseTimetable from "./components/Teacher/TeacherCourseTimetable/TeacherCourseTimetable.js";
import TeacherWeeklyAttendance from "./components/Teacher/TeacherWeeklyAttendance/TeacherWeeklyAttendance.js";
import TeacherYearlyAttendance from "./components/Teacher/TeacherYearlyAttendance/TeacherYearlyAttendance.js";
import TeacherMonthlyAttendance from "./components/Teacher/TeacherMonthlyAttendance/TeacherMonthlyAttendance.js";
import StudentAddFeedback from "./components/Student/StudentAddFeedback/StudentAddFeedback.js";
import AdminFeedback from "./components/Admin/AdminFeedback/AdminFeedback.js";
import { TeacherAddResult } from "./components/Teacher/TeacherAddResult/TeacherAddResult.js";
import AddResult from "./components/Student/StudentResult/StudentResult.js";
function App() {
  const dispatch = useDispatch();
  const [studentLoading, setStudentLoading] = useState(true);
  const [adminLoading, setAdminLoading] = useState(true);
  const [teacherLoading, setTeacherLoading] = useState(true);
  useEffect(() => {
    dispatch(loadCurrentStudentAction())
      .then(() => setStudentLoading(false))
      .catch((error) => {
        setStudentLoading(false);
      });
    dispatch(loadCurrentAdminAction())
      .then(() => setAdminLoading(false))
      .catch((error) => setAdminLoading(false));
    dispatch(loadCurrentTeacherAction())
      .then(() => setTeacherLoading(false))
      .catch((error) => setTeacherLoading(false));
  }, []);
  const { isStudentAuthenticated } = useSelector(
    (state) => state.currentStudentData
  );
  const { isAdminAuthenticated } = useSelector(
    (state) => state.currentAdminData
  );
  const { isTeacherAuthenticated } = useSelector(
    (state) => state.currentTeacherData
  );

  if (studentLoading || adminLoading || teacherLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <RingLoader />
      </div>
    );
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-signup" element={<AdminSignup />} />
          <Route path="/teacher-login" element={<TeacherLogin />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/admin-add-course" element={<AddCourse />} />
          <Route path="/school-portal-home" element={<SchoolPortalHome />} />
          <Route
            path="/admin-dashboard"
            element={isAdminAuthenticated ? <AdminDashboard /> : <AdminLogin />}
          />
          <Route
            path="/admin-feedback"
            element={isAdminAuthenticated ? <AdminFeedback /> : <AdminLogin />}
          />
          <Route
            path="/student-dashboard"
            element={isStudentAuthenticated ? <StudentDashboard /> : <Login />}
          />
          <Route
            path="/student-view-profile"
            element={
              isStudentAuthenticated ? <StudentViewProfile /> : <Login />
            }
          />
          <Route
            path="/student-view-attendance"
            element={<StudentViewAtttendance />}
          />

          {/* Grades  Routes*/}
          <Route path="/school/grade-one" element={<One />} />
          <Route path="/school/grade-two" element={<Two />} />
          <Route path="/school/grade-three" element={<Three />} />
          <Route path="/school/grade-four" element={<Four />} />
          <Route path="/school/grade-five" element={<Five />} />
          <Route path="/school/grade-six" element={<Six />} />
          <Route path="/school/grade-seven" element={<Seven />} />
          <Route path="/school/grade-eight" element={<Eight />} />
          <Route path="/school/grade-nine" element={<Nine />} />
          <Route path="/school/grade-ten" element={<Ten />} />

          {/* Student Routes  */}
          <Route
            path="/student-time-table"
            element={
              isStudentAuthenticated ? <StudentCourseTimetable /> : <Login />
            }
          />
          <Route
            path="/student-attendance"
            element={isStudentAuthenticated ? <StudentAttendance /> : <Login />}
          />
          <Route
            path="/student-weekly-attendance"
            element={
              isStudentAuthenticated ? <StudentWeeklyAtttendance /> : <Login />
            }
          />
          <Route
            path="/student-monthly-attendance"
            element={
              isStudentAuthenticated ? <StudentMonthlyAtttendance /> : <Login />
            }
          />
          <Route
            path="/student-yearly-attendance"
            element={
              isStudentAuthenticated ? <StudentYearlyAtttendance /> : <Login />
            }
          />
          <Route
            path="/student-add-feedback"
            element={
              isStudentAuthenticated ? <StudentAddFeedback /> : <Login />
            }
          />
          <Route
            path="/student-result"
            element={isStudentAuthenticated ? <AddResult /> : <Login />}
          />
          {/* Teacher Routes  */}
          <Route
            path="/teacher-take-attendance"
            element={
              isTeacherAuthenticated ? (
                <TeacherTakeAttendance />
              ) : (
                <TeacherLogin />
              )
            }
          />

          <Route
            path="/teacher-view-attendance"
            element={
              isTeacherAuthenticated ? (
                <TeacherViewAttendance />
              ) : (
                <TeacherLogin />
              )
            }
          />
          <Route
            path="/teacher-time-table"
            element={
              isTeacherAuthenticated ? (
                <TeacherCourseTimetable />
              ) : (
                <TeacherLogin />
              )
            }
          />
          <Route
            path="/teacher-weekly-attendance"
            element={
              isTeacherAuthenticated ? (
                <TeacherWeeklyAttendance />
              ) : (
                <TeacherLogin />
              )
            }
          />
          <Route
            path="/teacher-monthly-attendance"
            element={
              isTeacherAuthenticated ? (
                <TeacherMonthlyAttendance />
              ) : (
                <TeacherLogin />
              )
            }
          />
          <Route
            path="/teacher-yearly-attendance"
            element={
              isTeacherAuthenticated ? (
                <TeacherYearlyAttendance />
              ) : (
                <TeacherLogin />
              )
            }
          />

          <Route
            path="/teacher-add-result"
            element={
              isTeacherAuthenticated ? <TeacherAddResult /> : <TeacherLogin />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
