import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../ToastMessages/ToastMessage";
import ThreeDotLoader from "../../../components/Loaders/ThreeDotLoader";
import { Toaster } from "react-hot-toast";
export const AddCourse = () => {
  const {
    register,
    formState: { errors },
  } = useForm();
  const [teachers, setAllTeachers] = useState(null);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseTimeTable, setCousreTimeTable] = useState("");
  const [courseTeacher, setCourseTeacher] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchAllTeachers = async () => {
      try {
        const response = await axios.get("https://belikeerp.onrender.com/load-all-teachers");
        setAllTeachers(response?.data?.teachers);
      } catch (error) {
        console.log(error?.response?.data?.message);
      }
    };
    fetchAllTeachers();
  }, []);
  const sendCourseDataHandler = (e) => {
    e.preventDefault();
    if (courseTitle && courseTeacher && courseTimeTable) {
      const data = {
        courseTitle,
        courseTimeTable,
      };
      const sendCourseData = async () => {
        try {
          setLoading(true);
          const response = await axios.post(
            `https://belikeerp.onrender.com/add-course/${courseTeacher}`,
            data
          );
          handleShowSuccessToast(response.data.message);
          console.log(response.data.message);
          setCourseTitle("");
          setCousreTimeTable("");
          setLoading(false);
        } catch (error) {
          handleShowFailureToast(error.response.data.message);
          console.log(error.response.data.message);
          setLoading(false);
        }
      };
      sendCourseData();
    }
  };

  return (
    <div className="md:px-8 mt-4">
      <Toaster />
      <form
        onSubmit={sendCourseDataHandler}
        className="text-gray-600 body-font relative"
      >
        <div className="">
          <div className="flex flex-col text-center w-full mb-2">
            <h1 className="sm:text-3xl text-2xl font-medium title-font  text-gray-900">
              Add Course
            </h1>
          </div>
          <div className=" ">
            <div className=" ">
              <div className="md:flex justify-between">
                <div className="md:w-[45%]">
                  <label
                    htmlFor="courseTitle"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Course Title
                  </label>
                  <input
                    type="text"
                    id="courseTitle"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    placeholder="Enter unique course title"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {errors.courseTitle && (
                    <p className="text-red-500 text-xs mt-1">
                      Title is required
                    </p>
                  )}
                </div>
              </div>
              <div className="md:flex justify-between items-center  ">
                <div className="md:w-[45%]">
                  <label
                    htmlFor="courseTeacher"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Course Teacher
                  </label>
                  <select
                    name="courseTeacher"
                    id="courseTeacher"
                    {...register("courseTeacher", { required: true })}
                    onChange={(e) => setCourseTeacher(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  >
                    <option value="">Teacher</option>
                    {teachers && Array.isArray(teachers)
                      ? teachers.map((teacher) => (
                          <option value={teacher?._id}>
                            {teacher?.teacherName}
                          </option>
                        ))
                      : ""}
                  </select>
                  {errors.courseTeacher && (
                    <p className="text-red-500 text-xs mt-1">
                      Course Teacher is required
                    </p>
                  )}
                </div>
                <div className="md:w-[45%]">
                  <label
                    htmlFor="courseTimetable"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Course Timetable
                  </label>
                  <input
                    type="courseTimetable"
                    placeholder="Monday and Friday 9:00AM to 10:00AM"
                    id="courseTimetable"
                    value={courseTimeTable}
                    onChange={(e) => setCousreTimeTable(e.target.value)}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {errors.courseTimetable && (
                    <p className="text-red-500 text-xs mt-1">
                      Course Timetable is required
                    </p>
                  )}
                </div>
              </div>
              <div className="p-2 mt-4 w-full">
                <button
                  className="w-1/3 justify-centerflex mx-auto text-white bg-[#40b08c] border-0 py-1 px-4 focus:outline-none hover:bg-[#75dbbb] rounded text-lg flex justify-center items-center"
                  type="submit"
                >
                  {loading ? <ThreeDotLoader /> : "Add Course"}
                </button>
              </div>
              <div className="p-2 w-full text-center"></div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
