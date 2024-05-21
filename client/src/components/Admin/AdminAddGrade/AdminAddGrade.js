import axios from "axios";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../ToastMessages/ToastMessage";
import ThreeDotLoader from "../../Loaders/ThreeDotLoader";

export const AdminAddGrade = () => {
  const [courses, setCourses] = useState(null);
  const [gradeCategory, setGradeCategory] = useState("");
  const [gradeCourses, setGradeCourses] = useState("");
  const [gradeRoomNumber, setGradeRoomNumber] = useState("");
  const [gradeSchoolTiming, setGradeSchoolTiming] = useState("");
  const [gradeIncharge, setGradeIncharge] = useState("");
  const [teachers, setAllTeachers] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const response = await axios.get("https://belikeerp.onrender.com/load-all-courses");
        setCourses(response.data.courses);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchAllCourses();
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

  // Grade Courses options
  const [SelectedCourses, setSelectedCourses] = useState([]);
  const [selectedCoursesNames, setSelectedCoursesNames] = useState([]);

  useEffect(() => {
    setGradeCourses(SelectedCourses);
  }, [SelectedCourses]);

  const handleSelectCourse = (event) => {
    const selectedCourse = JSON.parse(event.target.value).courseId;
    const selectedCourseName = JSON.parse(event.target.value);
    setSelectedCourses((prevCourses) => {
      if (!prevCourses.includes(selectedCourse)) {
        return [...prevCourses, selectedCourse];
      } else {
        return prevCourses;
      }
    });
    setSelectedCoursesNames((prevNames) => {
      if (
        !prevNames.some((item) => item.courseId === selectedCourseName.courseId)
      ) {
        return [...prevNames, selectedCourseName];
      } else {
        return prevNames;
      }
    });
  };

  const removeCourse = (course) => {
    setSelectedCourses(
      SelectedCourses.filter((item) => item !== course.courseId)
    );
    setSelectedCoursesNames(
      selectedCoursesNames.filter((item) => item.courseId !== course.courseId)
    );
  };

  const addGradeDataSendHandler = (e) => {
    e.preventDefault();
    if (
      gradeCategory &&
      gradeCourses &&
      gradeRoomNumber &&
      gradeSchoolTiming &&
      gradeIncharge
    ) {
      const Courses = [];
      gradeCourses.forEach((course) => {
        Courses.push({ courseId: course });
      });
      const data = {
        gradeCategory,
        gradeCourses: Courses,
        gradeRoomNumber,
        gradeSchoolTiming,
        gradeIncharge,
      };
      const sendGradeData = async () => {
        try {
          setLoading(true);
          const response = await axios.post("https://belikeerp.onrender.com/add-grade", data);
          handleShowSuccessToast(response.data.message);
          console.log(response.data.message);
          setGradeCategory("");
          setGradeRoomNumber("");
          setGradeSchoolTiming("");
          setLoading(false);
        } catch (error) {
          handleShowFailureToast(error.response.data.message);
          console.log(error.response.data.message);
          setLoading(false);
        }
      };
      sendGradeData();
    } else {
      handleShowFailureToast("Input parameter is missing");
    }
  };

  return (
    <div className="md:px-8 mt-4">
      <Toaster />
      <form
        className="text-gray-600 body-font relative"
        onSubmit={addGradeDataSendHandler}
      >
        <div className="">
          <div className="flex flex-col text-center w-full mb-2">
            <h1 className="sm:text-3xl text-2xl font-medium text-gray-900">
              Add Grade
            </h1>
          </div>
          <div className=" ">
            <div className=" ">
              <div className="md:flex justify-between   ">
                <div className="md:w-[45%]">
                  <label
                    htmlFor="gradeCategory"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Grade Category
                  </label>
                  <input
                    type="text"
                    id="gradeCategory"
                    name="gradeCategory"
                    value={gradeCategory}
                    placeholder="Enter unique grade category"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e) => setGradeCategory(e.target.value)}
                  />
                </div>
                <div className="md:w-[45%] ">
                  <label
                    htmlFor="gradeCourses"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Grade Courses
                  </label>
                  <div>
                    <select
                      id="gradeCourses"
                      name="gradeCourses"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                      onChange={handleSelectCourse}
                      value=""
                    >
                      <option selected disabled value="">
                        Select
                      </option>
                      {courses && Array.isArray(courses)
                        ? courses.map((course) => (
                            <option
                              key={course._id}
                              value={JSON.stringify({
                                courseId: course?._id,
                                courseName: course?.courseTitle,
                              })}
                            >
                              {course?.courseTitle}
                            </option>
                          ))
                        : ""}
                    </select>
                    <div>
                      {selectedCoursesNames.map((option, index) => (
                        <div
                          key={index}
                          className="inline-block bg-gray-100 text-gray-800 rounded-md px-2 py-1 mr-2 mt-2"
                        >
                          {option.courseName}
                          <button
                            type="button"
                            onClick={() => removeCourse(option)}
                            className="ml-2"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:flex justify-between ">
                <div className="md:w-[45%] ">
                  <label
                    htmlFor="gradeRoomNumber"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Grade Room Number
                  </label>
                  <input
                    type="text"
                    id="gradeRoomNumber"
                    name="gradeRoomNumber"
                    value={gradeRoomNumber}
                    placeholder="Enter unqiue grade room number"
                    className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out `}
                    onChange={(e) => setGradeRoomNumber(e.target.value)}
                  />
                </div>
                <div className="md:w-[45%] ">
                  <label
                    htmlFor="gradeSchholTiming"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Grade School Timing
                  </label>
                  <input
                    type="text"
                    id="gradeSchoolTiming"
                    name="gradeSchoolTiming"
                    value={gradeSchoolTiming}
                    placeholder="Monday-Saturday 8:00AM-2:00PM"
                    className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out `}
                    onChange={(e) => setGradeSchoolTiming(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div className="md:w-[45%]">
                  <label
                    htmlFor="courseTeacher"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Grade Incharge
                  </label>
                  <select
                    name="courseTeacher"
                    id="courseTeacher"
                    {...register("courseTeacher", { required: true })}
                    onChange={(e) => setGradeIncharge(e.target.value)}
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
              </div>
              <div className="md:flex justify-between"></div>
              <div className="p-2 w-full mt-4">
                <button
                  onClick={addGradeDataSendHandler}
                  className="flex justify-center w-1/3 mx-auto text-white bg-[#40b08c] border-0 py-1 px-4 focus:outline-none hover:bg-[#75dbbb] rounded text-lg items-center"
                  type="submit"
                >
                  {loading ? <ThreeDotLoader /> : "Add Grade"}
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
