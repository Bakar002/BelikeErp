import axios from "axios";
import React, { useEffect, useState } from "react";

export default function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const loadFeedbacks = async () => {
      try {
        const response = await axios.get(
          "https://belikeerp.onrender.com/load-all-courses-feedbacks"
        );
        setFeedbacks(response.data.coursesFeedbacks);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    loadFeedbacks();
  }, []);
  return (
    <div className="mt-4 flex flex-col justify-center items-center">
      <div className="w-[90%] md:w-[80%]">
        <div className="text-center ">
          <h1 className="font-bold text-xl ">Student Feedback</h1>
        </div>
        <div className="flex flex-col overflow-x-auto">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Student Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Teacher Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Course
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Feedback
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {feedbacks && Array.isArray(feedbacks)
                      ? feedbacks.map((feedback) => (
                          <tr className="border-b dark:border-neutral-500">
                            <td className="whitespace-nowrap px-6 py-4">
                              {feedback?.studentId?.studentName}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {feedback?.courseId?.courseTeacher?.teacherName}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {feedback?.courseId?.courseTitle}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {feedback?.feedbackMessage}
                            </td>
                          </tr>
                        ))
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
