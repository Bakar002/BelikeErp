import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import loadCurrentStudentAction from "../../../components/Redux/Student/Actions/loadCurrentStudentAction.Student";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../ToastMessages/ToastMessage";
const StudentAddFeedback = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCurrentStudentAction());
  }, []);
  const { currentStudentData } = useSelector(
    (state) => state.currentStudentData
  );
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        `https://belikeerp.onrender.com/submit-feedback/${data.course}`,
        {
          feedbackMessage: data.feedback,
        }
      );
      console.log(response.data.message);
      handleShowSuccessToast(response.data.message);
    } catch (error) {
      console.log(error.response.data.message);
      handleShowFailureToast(error.response.data.message);
    }
  };

  return (
    <div className="">
      <Toaster />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-gray-600 body-font "
      >
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="flex flex-col text-center w-full mb-2">
            <h1 className="sm:text-3xl text-2xl font-medium title-font  text-white">
              Add FeedBack
            </h1>
          </div>
          <div className="w-[90%] md:w-[30%]">
            <div className=" ">
              <div className="">
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
                    className="bg-gray-50 text-gray-900 border border-gray-300 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  >
                    <option value="">Course</option>
                    {currentStudentData &&
                    Array.isArray(
                      currentStudentData.currentStudent.studentCourses
                    )
                      ? currentStudentData.currentStudent.studentCourses.map(
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
                      Course Grade is required
                    </p>
                  )}
                </div>
              </div>
              <div className=" ">
                <div className="">
                  <label
                    htmlFor="feedback"
                    className="leading-7 text-sm text-white"
                  >
                    Feedback
                  </label>
                  <div>
                    <textarea
                      className="border-2 w-full h-[20rem] p-2"
                      {...register("feedback", { required: true })}
                      placeholder="Enter Your Feedback here"
                      name="feedback"
                      id="feedback"
                    ></textarea>
                  </div>
                  {errors.feedback && (
                    <p className="text-red-500 text-xs mt-1">
                      Course Teacher is required
                    </p>
                  )}
                </div>
              </div>
              <div className="p-2 w-full mt-4">
                <button
                  className=" w-full  mx-auto text-white bg-[#40b08c] border-0 py-1 px-4 focus:outline-none hover:bg-[#75dbbb] rounded text-lg"
                  type="submit"
                >
                  Submit Feedback
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

export default StudentAddFeedback;
