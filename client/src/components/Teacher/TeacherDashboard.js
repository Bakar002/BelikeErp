import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function TeacherDashboard() {
  const navigate = useNavigate();

  const TeacherTakeAttendance = () => {
    navigate("/teacher-take-attendance");
  };
  const TeacherViewAttendance = () => {
    navigate("/teacher-view-attendance");
  };

  return (
    <>
      <div className="">
        <div
          className={`   md:block col-span-1 } h-full  p-2 bg-[#033e71] text-white text-[0.7rem] md:text-[1rem] font-light md:font-semibold overflow-hidden bg-white`}
        >
          <ul className="md:p-2">
            <li>
              <h1 className="font-extrabold xl md:text-2xl text-black">
                Quick as
              </h1>
            </li>
            <li className="mt-4 cursor-pointer text-black">
              <h5 href={""} onClick={TeacherTakeAttendance}>
                Take Attendence
              </h5>
            </li>
            <li className="mt-4 cursor-pointer text-black">
              <h5 href={""} onClick={TeacherViewAttendance}>
                View Attendence
              </h5>
            </li>
          </ul>
          <div>
            <button>Signout</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeacherDashboard;
