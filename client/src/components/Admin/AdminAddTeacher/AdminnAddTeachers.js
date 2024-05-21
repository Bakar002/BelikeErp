import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../ToastMessages/ToastMessage";
import { Toaster } from "react-hot-toast";
import ThreeDotLoader from "../../Loaders/ThreeDotLoader";

export const AdminAddTeacher = () => {
  const [courses, setCourses] = useState(null);
  const [grades, setGrades] = useState(null);
  const [teacherAvatar, setTeacherAvatar] = useState(null);
  const [teacherIdCardCopy, setTeacherIdCardCopy] = useState(null);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [teacherSalary, setTeacherSalary] = useState("");
  const [teacherJobDate, setTeacherJobDate] = useState("");
  const [teacherIdCardNumber, setTeacherIdCardNumber] = useState("");
  const [teacherGradeIncharge, setteacherGradeIncharge] = useState([]);
  const [teacherGrades, setTeacherGrades] = useState([]);

  const [teacherCourses, setTeacherCourses] = useState([]);
  const [teacherName, setTeacherName] = useState([]);
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

  const addTeacherDataSendHandler = async (e) => {
    e.preventDefault();
    if (
      teacherAvatar &&
      teacherName &&
      teacherEmail &&
      teacherPassword &&
      teacherGrades &&
      teacherCourses &&
      teacherIdCardNumber &&
      teacherIdCardCopy &&
      teacherSalary &&
      teacherGradeIncharge &&
      teacherJobDate
    ) {
      let Grades = [];
      teacherGrades.map((grade) => {
        return Grades.push({ gradeId: grade });
      });
      const Courses = [];
      teacherCourses.map((course) => {
        return Courses.push({ courseId: course });
      });
      const data = {
        teacherEmail,
        teacherPassword,
        teacherName,
        teacherAvatar,
        teacherCourses: Courses,
        teacherGrades: Grades,
        teacherIdCardNumber,
        teacherIdCardCopy,
        teacherSalary,
        teacherJobDate,
        teacherGradeIncharge,
      };
      const sendTeacherData = async () => {
        try {
          setLoading(true);
          const response = await axios.post("https://belikeerp.onrender.com/add-teacher", data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log(response.data.message);
          handleShowSuccessToast(response.data.message);
          setLoading(false);
          setTeacherEmail("");
          setTeacherJobDate("");
          setTeacherName("");
          setTeacherIdCardNumber("");
          setTeacherSalary("");
          setTeacherPassword("");
        } catch (error) {
          console.log(error.response.data.message);
          handleShowFailureToast(error.response.data.message);
          setLoading(false);
        }
      };
      sendTeacherData();
      
    } else {
      handleShowFailureToast("Input parameter is missing!");
    }
  };

  const [selectedGrades, setSelectedGrades] = useState([]);
  const [SelectedCourses, setSelectedCourses] = useState([]);
  const [selectedCoursesNames, setSelectedCoursesNames] = useState([]);
  const [selectedGradeCategory, setSelectedGradeCategory] = useState([]);

  useEffect(() => {
    setTeacherCourses(SelectedCourses);
    setTeacherGrades(selectedGrades);
    setteacherGradeIncharge(selectedGrades);
  }, [selectedGrades, SelectedCourses]);

  const handleSelectChange = (event) => {
    const selectedOption = JSON.parse(event.target.value).gradeId;
    const gradeCategory = JSON.parse(event.target.value);
    setSelectedGrades((prevOptions) => {
      if (!prevOptions.includes(selectedOption)) {
        return [...prevOptions, selectedOption];
      } else {
        return prevOptions;
      }
    });
    setSelectedGradeCategory((prevGrades) => {
      if (!prevGrades.some((item) => item.gradeId === gradeCategory.gradeId)) {
        return [...prevGrades, gradeCategory];
      } else {
        return prevGrades;
      }
    });
  };

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

  const removeOption = (option) => {
    setSelectedGrades(selectedGrades.filter((item) => item !== option.gradeId));
    setSelectedGradeCategory(
      selectedGradeCategory.filter((item) => item.gradeId !== option.gradeId)
    );
  };
  console.log(selectedGradeCategory);
  return (
    <div className="md:px-8 mt-4">
      <Toaster />
      <form
        onSubmit={addTeacherDataSendHandler}
        className="text-gray-600 body-font relative"
      >
        <div className="">
          <div className="flex flex-col text-center w-full mb-2">
            <h1 className="sm:text-3xl text-2xl font-medium teacherName-font  text-gray-900">
              Add Teacher
            </h1>
          </div>
          <div className=" ">
            <div className=" ">
              <div className="md:flex justify-between   ">
                <div className="md:w-[45%]">
                  <label
                    htmlFor="teacherName"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Teacher Name
                  </label>
                  <input
                    type="text"
                    id="teacherName"
                    name="teacherName"
                    placeholder="Enter teacher name"
                    value={teacherName}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e) => setTeacherName(e.target.value)}
                  />
                </div>
                <div className="md:w-[45%]">
                  <label
                    htmlFor="teacherEmail"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Teacher Email
                  </label>
                  <input
                    id="teacherEmail"
                    name="teacherEmail"
                    value={teacherEmail}
                    placeholder="Enter teacher email"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e) => setTeacherEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="md:flex justify-between ">
                <div className="md:w-[45%]">
                  <label
                    htmlFor="teachersGrade"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Teacher Grades
                  </label>
                  <div>
                    <select
                      id="grades"
                      name="teacherGrades"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-purple-500 dark:focus:border-purple-500"
                      onChange={handleSelectChange}
                      value=""
                    >
                      <option selected disabled value="">
                        Select
                      </option>
                      {grades && Array.isArray(grades)
                        ? grades.map((grade) => (
                            <option
                              value={JSON.stringify({
                                gradeId: grade?._id,
                                gradeCategory: grade?.gradeCategory,
                              })}
                            >
                              {"Grade " + grade?.gradeCategory}
                            </option>
                          ))
                        : ""}
                    </select>
                    <div>
                      {selectedGradeCategory.map((option, index) => (
                        <div
                          key={index}
                          className="inline-block bg-gray-100 text-gray-800 rounded-md px-2 py-1 mr-2 mt-2"
                        >
                          {option.gradeCategory}
                          <button
                            onClick={() => removeOption(option)}
                            className="ml-2"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="md:w-[45%]">
                  <label
                    htmlFor="teacherPassword"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Teacher Password
                  </label>
                  <input
                    id="teacherPassword"
                    name="teacherPassword"
                    type="password"
                    placeholder="Enter teacher password"
                    value={teacherPassword}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e) => setTeacherPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="md:flex justify-between ">
                <div className="md:w-[45%] ">
                  <label
                    htmlFor="teacherSalary"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Teacher Salary
                  </label>
                  <input
                    type="text"
                    id="teacherSalary"
                    name="teacherSalary"
                    placeholder="Enter teacher salary"
                    value={teacherSalary}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e) => setTeacherSalary(e.target.value)}
                  />
                </div>
                <div className="md:w-[45%] ">
                  <label
                    htmlFor="teacherIdCardno"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Teacher Id Card Number
                  </label>
                  <input
                    type="text"
                    id="teacherIdCardno"
                    name="teacherIdCardno"
                    value={teacherIdCardNumber}
                    placeholder="Enter teacher id card number"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e) => setTeacherIdCardNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="md:flex justify-between ">
                <div className="md:w-[45%]">
                  <label
                    htmlFor="teachersCourses"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Teacher Courses
                  </label>

                  <div>
                    <select
                      id="courses"
                      name="teacherCourses"
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
                <div className="md:w-[45%] ">
                  <label
                    htmlFor="teacherJobDate"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Teacher Job Date
                  </label>
                  <input
                    id="teacherJobDate"
                    name="teacherJobDate"
                    placeholder="10 May 2024"
                    value={teacherJobDate}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e) => setTeacherJobDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="md:flex justify-between ">
                <div className="md:w-[45%] ">
                  <label
                    htmlFor="teacherAvatar"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Teacher Avatar
                  </label>
                  <input
                    type="file"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e) => setTeacherAvatar(e.target.files[0])}
                  />
                </div>
                <div className="md:w-[45%] ">
                  <label
                    htmlFor="teacherIdCardCopy"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Teacher Id Card Copy
                  </label>
                  <input
                    type="file"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e) => setTeacherIdCardCopy(e.target.files[0])}
                  />
                </div>
              </div>
              <div className="p-2 w-full mt-4">
                <button
                  className="flex w-1/3 mx-auto justify-center items-center text-white bg-[#40b08c] border-0 py-1 px-4 focus:outline-none hover:bg-[#75dbbb] rounded text-lg"
                  type="submit"
                >
                  {loading ? <ThreeDotLoader /> : "Add Teacher"}
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
