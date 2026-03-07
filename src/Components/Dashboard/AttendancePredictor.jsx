import React, { useState } from "react";
import axios from "axios";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PercentIcon from "@mui/icons-material/Percent";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import Footer from "./Footer";

export default function AttendancePredictor() {

  const [days, setDays] = useState("");
  const [percentage, setPercentage] = useState("");

  const [futureResult, setFutureResult] = useState("");
  const [requiredDaysResult, setRequiredDaysResult] = useState("");

  const userId = localStorage.getItem("userId");

  // API 1 → Predict percentage after attending days
  const calculateFuturePercentage = async () => {
    try {

      const res = await axios.post(
         `${import.meta.env.VITE_API_BASE_URL}/api/attendance/percentageIfAttendNextDays`,
        {
          userId: localStorage.getItem("userId"),
          days: Number(days)
        }
      );

      setFutureResult(res.data);

    } catch (err) {
      console.error(err);
      setFutureResult("Error calculating percentage");
    }
  };


  // API 2 → Days required for target percentage
  const calculateRequiredDays = async () => {

    try {

      const res = await axios.post(
         `${import.meta.env.VITE_API_BASE_URL}/api/attendance/daysRequiredToReachXPercentage`,
        {
          userId:localStorage.getItem("userId"),
          percentage: Number(percentage)
        }
      );

      setRequiredDaysResult(res.data);

    } catch (err) {
      console.error(err);
      setRequiredDaysResult("Error calculating required days");
    }
  };



  return (

    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <QueryStatsIcon fontSize="large" />
          Attendance Predictor
        </h1>

        <div className="grid md:grid-cols-2 gap-6">


          {/* Feature 1 */}
          <div className="bg-white shadow-lg rounded-xl p-6">

            <div className="flex items-center gap-2 mb-4 text-blue-600">
              <CalendarMonthIcon />
              <h2 className="text-xl font-semibold">
                Future Attendance Percentage
              </h2>
            </div>

            <p className="text-gray-600 mb-4">
              Enter how many more days you will attend and see your updated attendance percentage.
            </p>

            <input
              type="number"
              placeholder="Enter days you will attend"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-full border rounded-lg p-3 mb-4 focus:outline-blue-500"
            />

            <button
              onClick={calculateFuturePercentage}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Calculate Percentage
            </button>

            {futureResult && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg text-blue-700 font-semibold">
                {futureResult}
              </div>
            )}

          </div>



          {/* Feature 2 */}
          <div className="bg-white shadow-lg rounded-xl p-6">

            <div className="flex items-center gap-2 mb-4 text-green-600">
              <PercentIcon />
              <h2 className="text-xl font-semibold">
                Required Days for Target %
              </h2>
            </div>

            <p className="text-gray-600 mb-4">
              Enter the percentage you want and we will tell you how many days you must attend.
            </p>

            <input
              type="number"
              placeholder="Enter target percentage"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              className="w-full border rounded-lg p-3 mb-4 focus:outline-green-500"
            />

            <button
              onClick={calculateRequiredDays}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
            >
              Calculate Required Days
            </button>

            {requiredDaysResult && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg text-green-700 font-semibold">
                {requiredDaysResult}
              </div>
            )}

          </div>


        </div>
      </div>
 <Footer/>
    </div>
  );
}