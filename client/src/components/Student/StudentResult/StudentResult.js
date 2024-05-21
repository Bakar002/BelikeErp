import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import loadCurrentStudentAction from "../../Redux/Student/Actions/loadCurrentStudentAction.Student";
import { handleShowFailureToast } from "../../ToastMessages/ToastMessage";
import axios from "axios";
export default function StudentResult() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCurrentStudentAction());
  }, []);
  const { currentStudentData } = useSelector(
    (state) => state.currentStudentData
  );
  console.log(
    currentStudentData.currentStudent.studentResults[0].courseId.courseTitle
  );
  return (
    <div className="mt-4 flex flex-col justify-center items-center">
      <div className="w-[90%] md:w-[80%]">
        <div className="text-center ">
          <h1 className="font-bold text-xl ">Student Result</h1>
        </div>
        <div className="flex flex-col overflow-x-auto">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Course Title
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Test Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Obtained Marks
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Total Marks
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Percentage
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentStudentData &&
                    Array.isArray(
                      currentStudentData.currentStudent.studentResults
                    )
                      ? currentStudentData.currentStudent.studentResults.map(
                          (result) => (
                            <tr className="border-b dark:border-neutral-500">
                              <td className="whitespace-nowrap px-6 py-4">
                                {result.courseId.courseTitle}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {result.testName}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {result.resultObtainedNumber}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {result.resultTotalMarks}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {result.resultPercentage + "%"}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {result.resultStatus ? (
                                  <h1 className="w-14 h-6 bg-green-600 flex justify-center items-center shadow-xl rounded">
                                    Pass
                                  </h1>
                                ) : (
                                  <h1 className="w-14 h-6 bg-red-600 flex justify-center items-center shadow-xl rounded">
                                    Fail
                                  </h1>
                                )}
                              </td>
                            </tr>
                          )
                        )
                      : ""}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
