import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../ToastMessages/ToastMessage";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import ThreeDotLoader from "../../Loaders/ThreeDotLoader";
export const AdminAddStudent = () => {
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentCourses, setStudentCourses] = useState([]);
  const [studentAvatar, setStudentAvatar] = useState(null);
  const [studentPassword, setStudentPassword] = useState("");
  const [studentId, setStudentId] = useState("");
  const [studentIdCardNumber, setStudentIdCardNumber] = useState("");
  const [studentIdCardCopy, setStudentIdCardCopy] = useState(null);
  const [studentGrade, setStudentGrade] = useState("");
  const [courses, setCourses] = useState(null);
  const [grades, setGrades] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchAllGrades = async () => {
      try {
        const response = await axios.get("https://belikeerp.onrender.com/load-all-grades");
        setGrades(response.data.grades);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchAllGrades();
    const fetchAllCourses = async () => {
      try {
        const response = await axios.get("https://belikeerp.onrender.com/load-all-courses");
        setCourses(response.data.courses);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchAllCourses();
  }, []);
  const addStudentDataHandler = async (e) => {
    e.preventDefault();
    if (
      studentAvatar &&
      studentName &&
      studentEmail &&
      studentPassword &&
      studentGrade &&
      studentCourses &&
      studentIdCardNumber &&
      studentIdCardCopy &&
      studentId
    ) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(studentEmail)) {
        // Handle invalid email
        handleShowFailureToast("Invalid email format");

        // Optionally, you can return or throw an error here
        return;
      }
      const Courses = [];
      studentCourses.map((course) => {
        return Courses.push({ courseId: course });
      });
      const data = {
        studentAvatar,
        studentName,
        studentEmail,
        studentPassword,
        studentCourses: Courses,
        studentIdCardNumber,
        studentIdCardCopy,
        studentId,
      };
      const sendStudentDataToDatabase = async () => {
        try {
          setLoading(true);
          const response = await axios.post(
            `https://belikeerp.onrender.com/add-student/${studentGrade}`,
            data,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log(response.data.message);
          handleShowSuccessToast(response.data.message);
          setLoading(false);
          setStudentName("");
          setStudentEmail("");
          setStudentPassword("");
          setStudentId("");
          setStudentIdCardNumber("");
        } catch (error) {
          console.log(error.response.data.message);
          handleShowFailureToast(error.response.data.message);
          setLoading(false);
        }
      };
      sendStudentDataToDatabase();
    } else {
      handleShowFailureToast("Input parameter is missing!");
    }
  };

  const [SelectedCourses, setSelectedCourses] = useState([]);
  const [selectedCoursesNames, setSelectedCoursesNames] = useState([]);
  useEffect(() => {
    setStudentCourses(SelectedCourses);
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

  // ########################### Apply Api request here ############################

  return (
    <div className="md:px-8 mt-4">
      <Toaster />
      <form
        onSubmit={addStudentDataHandler}
        className="text-gray-600 body-font relative"
      >
        <div className="">
          <div className="flex flex-col text-center w-full mb-2">
            <h1 className="sm:text-3xl text-2xl font-medium studentName-font text-gray-900">
              Add Student
            </h1>
          </div>
          <div className=" ">
            <div className=" ">
              <div className="md:flex justify-between">
                <div className="md:w-[45%]">
                  <label
                    htmlFor="studentName"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Student Name
                  </label>
                  <input
                    type="text"
                    id="studentName"
                    name="studentName"
                    value={studentName}
                    placeholder="Enter student name"
                    className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out `}
                    onChange={(e) => setStudentName(e.target.value)}
                  />
                </div>
                <div className="md:w-[45%]">
                  <label
                    htmlFor="studentEmail"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Student Email
                  </label>
                  <input
                    id="studentEmail"
                    name="studentEmail"
                    placeholder="Enter student email"
                    value={studentEmail}
                    className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out `}
                    onChange={(e) => setStudentEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="md:flex justify-between ">
                <div className="md:w-[45%] ">
                  <label
                    htmlFor="studentPassword"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Student Password
                  </label>
                  <input
                    type="password"
                    id="studentPassword"
                    value={studentPassword}
                    placeholder="Enter student password"
                    name="studentPassword"
                    className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out `}
                    onChange={(e) => setStudentPassword(e.target.value)}
                  />
                </div>
                <div className="md:w-[45%] ">
                  <label
                    htmlFor="studentsCourses"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Student Courses
                  </label>
                  <div>
                    <select
                      id="studentCourses"
                      name="studentCourses"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-purple-500 dark:focus:border-purple-500"
                      onChange={handleSelectCourse}
                      value=""
                    >
                      <option selected disabled value="">
                        Select
                      </option>
                      {courses && Array.isArray(courses)
                        ? courses.map((course) => (
                            <option
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
                    htmlFor="studentIdCardno"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Student Id Card Number
                  </label>
                  <input
                    type="text"
                    id="studentIdCardno"
                    name="studentIdCardno"
                    placeholder="Enter unique student id card number"
                    value={studentIdCardNumber}
                    className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out `}
                    onChange={(e) => setStudentIdCardNumber(e.target.value)}
                  />
                </div>
                <div className="md:w-[45%] ">
                  <label
                    htmlFor="studentGrade"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Student Grade
                  </label>
                  <select
                    name="studentGrade"
                    id="studentGrade"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-purple-500 dark:focus:border-purple-500"
                    onChange={(e) => setStudentGrade(e.target.value)}
                  >
                    <option value="">Grade</option>
                    {grades && Array.isArray(grades)
                      ? grades.map((grade) => (
                          <option value={grade?._id}>
                            {grade?.gradeCategory}
                          </option>
                        ))
                      : ""}
                  </select>
                </div>
              </div>
              <div className="md:flex justify-between ">
                <div className="md:w-[45%] ">
                  <label
                    htmlFor="studentId"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Student Id
                  </label>
                  <input
                    type="studentId"
                    id="studentId"
                    name="studentId"
                    value={studentId}
                    placeholder="Enter unqiue student id"
                    className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out `}
                    onChange={(e) => setStudentId(e.target.value)}
                  />
                </div>

                <div className="md:w-[45%] ">
                  <label
                    htmlFor="studentAvatar"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Student Avatar
                  </label>
                  <input
                    type="file"
                    id="studentAvatar"
                    name="studentAvatar"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e) => setStudentAvatar(e.target.files[0])}
                  />
                </div>
              </div>
              <div className="md:flex justify-between ">
                <div className="md:w-[45%] ">
                  <label
                    htmlFor="studentIdCardCopy"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Student Id Card Copy
                  </label>
                  <input
                    type="file"
                    id="studentIdCardCopy"
                    name="studentIdCardCopy"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e) => setStudentIdCardCopy(e.target.files[0])}
                  />
                </div>
              </div>
              <div className="p-2 w-full mt-4">
                <button
                  className="w-1/3 flex justify-center mx-auto text-white bg-[#40b08c] border-0 py-1 px-4 focus:outline-none hover:bg-[#75dbbb] rounded text-lg"
                  type="submit"
                >
                  {loading ? <ThreeDotLoader /> : "Add Student"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
