import React, { useState } from "react";
import axios from "axios";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PercentIcon from "@mui/icons-material/Percent";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

import Footer from "./Footer";
import Navbar from "./NavBar";

export default function AttendancePredictor() {

  const [activeTab, setActiveTab] = useState("future");

  const [days, setDays] = useState("");
  const [percentage, setPercentage] = useState("");

  const [futureResult, setFutureResult] = useState("");
  const [requiredDaysResult, setRequiredDaysResult] = useState("");

  const userId = localStorage.getItem("userId");

  // API 1
  const calculateFuturePercentage = async () => {

    try {

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/attendance/percentageIfAttendNextDays`,
        {
          userId: userId,
          nextDays: Number(days)
        }
      );

      setFutureResult(res.data);

    } catch (err) {

      console.error(err);
      setFutureResult("Error calculating percentage");

    }

  };

  // API 2
  const calculateRequiredDays = async () => {

    try {

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/attendance/daysRequiredToReachXPercentage`,
        {
          userId: userId,
          nextDays: Number(percentage)
        }
      );

      setRequiredDaysResult(res.data);

    } catch (err) {

      console.error(err);
      setRequiredDaysResult("Error calculating required days");

    }

  };

 return (

  <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

    {/* Navbar */}
    <Navbar/>

    {/* Main Content */}
    <div className="flex-grow p-6">

      <div className="max-w-3xl mx-auto">

        {/* Title */}

        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2 text-gray-800">
          <QueryStatsIcon fontSize="large" />
          Attendance Predictor
        </h1>


        {/* Tabs */}

        <div className="flex bg-white rounded-xl shadow mb-6 overflow-hidden">

          <button
            onClick={() => setActiveTab("future")}
            className={`flex-1 py-3 font-medium flex items-center justify-center gap-2
              ${activeTab === "future"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            <CalendarMonthIcon fontSize="small" />
            Predict Future %
          </button>

          <button
            onClick={() => setActiveTab("target")}
            className={`flex-1 py-3 font-medium flex items-center justify-center gap-2
              ${activeTab === "target"
                ? "bg-green-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            <PercentIcon fontSize="small" />
            Days Needed
          </button>

        </div>


        {/* Tab Content */}

        <div className="bg-white rounded-2xl shadow-xl p-8">

          {activeTab === "future" && (

            <div>

              <h2 className="text-xl font-semibold mb-2">
                Want to know your future attendance percentage?
              </h2>

              <p className="text-gray-500 mb-5">
                Enter how many upcoming classes you will attend.
              </p>

              <input
                type="number"
                placeholder="Enter number of days"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                onClick={calculateFuturePercentage}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Calculate Future Percentage
              </button>

              {futureResult && (

                <div className="mt-5 bg-blue-50 text-blue-700 p-4 rounded-lg font-medium">
                  {futureResult}
                </div>

              )}

            </div>

          )}


          {activeTab === "target" && (

            <div>

              <h2 className="text-xl font-semibold mb-2">
                Want to know how many days you must attend?
              </h2>

              <p className="text-gray-500 mb-5">
                Enter the target attendance percentage you want.
              </p>

              <input
                type="number"
                placeholder="Enter target percentage"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-green-500 outline-none"
              />

              <button
                onClick={calculateRequiredDays}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
              >
                Calculate Required Days
              </button>

              {requiredDaysResult && (

                <div className="mt-5 bg-green-50 text-green-700 p-4 rounded-lg font-medium">
                  {requiredDaysResult}
                </div>

              )}

            </div>

          )}

        </div>

      </div>

    </div>

    {/* Footer */}
    <Footer/>

  </div>

);
}