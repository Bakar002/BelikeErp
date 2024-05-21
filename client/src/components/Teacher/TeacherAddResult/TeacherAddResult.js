import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import loadCurrentTeacherAction from "../../Redux/Teacher/Actions/loadCurrentTeacherAction.Teacher";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../ToastMessages/ToastMessage";
export const TeacherAddResult = () => {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [grade, setGrade] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    dispatch(loadCurrentTeacherAction());
    const loadSameGradeStudents = async () => {
      try {
        const response = await axios.get(
          `/api/v1/teacher/load-students-with-grade/${grade}`
        );
        setStudents(response.data.students);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    if (grade) {
      loadSameGradeStudents();
    }
  }, [grade, dispatch]);
  const { currentTeacherData } = useSelector(
    (state) => state.currentTeacherData
  );
  const onSubmit = async (data) => {
    if (data) {
      if (data.obtainedMarks < data.totalMarks) {
        handleShowFailureToast(
          "Obtained marks must be lesser or equal to total marks"
        );
        return;
      }
      try {
        const response = await axios.post(
          `/api/v1/teacher/create-result/${data.course}/${data.student}/${data.grade}`,
          {
            resultObtainedNumber: data.obtainedMarks,
            resultTotalMarks: data.totalMarks,
            resultStatus: data.result,
            testName: data.testName,
          }
        );
        handleShowSuccessToast(response.data.message);
        console.log(response.data.message);
      } catch (error) {
        console.log(error.response.data.message);
        handleShowFailureToast(error.response.data.message);
      }
    } else {
      handleShowFailureToast("Form data is missing");
      console.log("Form data is missing");
    }
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Toaster />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-gray-600 body-font w-full h-full xl:mt-20"
      >
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col text-center w-full mb-2">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-white">
              Add Result
            </h1>
          </div>
          <div className="w-[90%] md:w-[30%]">
            <div className=" ">
              <div className="">
                <div className="">
                  <label
                    htmlFor="student"
                    className="leading-7 text-sm text-white"
                  >
                    Select Grade
                  </label>
                  <select
                    name="grade"
                    id="grade"
                    {...register("grade", { required: true })}
                    onChange={(e) => setGrade(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  >
                    <option value="">Grade</option>
                    {currentTeacherData &&
                    Array.isArray(currentTeacherData.teacher.teacherGrades)
                      ? currentTeacherData.teacher.teacherGrades.map(
                          (grade) => (
                            <option value={grade.gradeId._id}>
                              {grade.gradeId.gradeCategory}
                            </option>
                          )
                        )
                      : ""}
                  </select>
                  {errors.student && (
                    <p className="text-red-500 text-xs mt-1">
                      Student Grade is required
                    </p>
                  )}
                </div>
                {students && (
                  <div className="">
                    <label
                      htmlFor="student"
                      className="leading-7 text-sm text-white"
                    >
                      Select Student
                    </label>
                    <select
                      name="student"
                      id="student"
                      {...register("student", { required: true })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-purple-500 dark:focus:border-purple-500"
                    >
                      <option value="">Student</option>
                      {Array.isArray(students)
                        ? students.map((student) => (
                            <option value={student._id}>
                              {student.studentName}
                            </option>
                          ))
                        : ""}
                    </select>
                    {errors.student && (
                      <p className="text-red-500 text-xs mt-1">
                        Student Grade is required
                      </p>
                    )}
                  </div>
                )}
                <div className="">
                  <label
                    htmlFor="course"
                    className="leading-7 text-sm text-white"
                  >
                    Select Course
                  </label>
                  <select
                    name="course"
                    id="course"
                    {...register("course", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  >
                    <option value="">Course</option>
                    {currentTeacherData &&
                    Array.isArray(currentTeacherData.teacher.teacherCourses)
                      ? currentTeacherData.teacher.teacherCourses.map(
                          (course) => (
                            <option value={course.courseId._id}>
                              {course.courseId.courseTitle}
                            </option>
                          )
                        )
                      : ""}
                  </select>
                  {errors.course && (
                    <p className="text-red-500 text-xs mt-1">
                      Course is required
                    </p>
                  )}
                </div>
              </div>
              <div className=" ">
                <div className="">
                  <label
                    htmlFor="totalMarks"
                    className="leading-7 text-sm text-white"
                  >
                    Enter Total Marks
                  </label>
                  <input
                    type="Number"
                    min={0}
                    max="500" // Notice that the value is provided as a string
                    onInput={(e) => {
                      e.target.value = Math.min(e.target.value, 500);
                    }}
                    id="totalMarks"
                    {...register("totalMarks", { required: true })}
                    name="totalMarks"
                    className={`w-full bg-white text-black bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out `}
                  />
                  {errors.totalMarks && (
                    <p className="text-red-500 text-xs mt-1">
                      Total Marks is required
                    </p>
                  )}
                </div>
                <div className="">
                  <label
                    htmlFor="testName"
                    className="leading-7 text-sm text-white"
                  >
                    Enter Test Name
                  </label>
                  <input
                    type="text"
                    id="testName"
                    {...register("testName", { required: true })}
                    name="testName"
                    className={`w-full bg-white text-black bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out `}
                  />
                  {errors.testName && (
                    <p className="text-red-500 text-xs mt-1">
                      Test name is required
                    </p>
                  )}
                </div>
                <div className="">
                  <label
                    htmlFor="obtainedMarks"
                    className="leading-7 text-sm text-white"
                  >
                    Enter Obtained Marks
                  </label>
                  <input
                    id="gradeSchoolTiming"
                    {...register("obtainedMarks", { required: true })}
                    name="obtainedMarks"
                    className={`w-full bg-white text-black bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out `}
                  />
                  {errors.obtainedMarks && (
                    <p className="text-red-500 text-xs mt-1">
                      Obtained Marks are required
                    </p>
                  )}
                </div>
                <div className="">
                  <label
                    htmlFor="result"
                    className="leading-7 text-sm text-white"
                  >
                    Select Result Status
                  </label>
                  <select
                    name="result"
                    id="result"
                    {...register("result", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  >
                    <option value="">Course</option>
                    <option value={true}>Pass</option>
                    <option value={false}>Fail</option>
                  </select>
                  {errors.result && (
                    <p className="text-red-500 text-xs mt-1">
                      Result is required
                    </p>
                  )}
                </div>
              </div>
              <div className=" w-full mt-4">
                <button
                  className=" w-full  mx-auto text-white bg-[#40b08c] border-0 py-1 px-4 focus:outline-none hover:bg-[#75dbbb] rounded text-lg"
                  type="submit"
                >
                  Submit Result
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
