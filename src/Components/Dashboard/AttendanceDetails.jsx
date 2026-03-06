import React, { useEffect, useState } from "react";
import axios from "axios";

import MarkAttendance from "./MarkAttendance";
import AttendanceCalendar from "./AttendanceCalendar";

import BarChartIcon from "@mui/icons-material/BarChart";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PercentIcon from "@mui/icons-material/Percent";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

export default function AttendanceDetails() {

  const [attendanceData, setAttendanceData] = useState({
    presentCount: 1,
    abbsentCount: 1,
    totalAttendance: 2,
    attendancePercentage: 50,
    daysRequiredFor75Percent: 2,
    daysRequiredFor60Percent: 1,
    daysWeCanBeAbsentFor75Percent: 0,
    daysWeCanBeAbsentFor60Percent: 0
  });

  const [showCalendar, setShowCalendar] = useState(false);

  const fetchAttendanceData = async () => {
    try {
      const res = await axios.get(
        "https://attendanceapp-c2gu.onrender.com/api/attendance/stats"
      );
      setAttendanceData(res.data);
    } catch {
      console.log("Using default data");
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  return (

    <div className="min-h-screen bg-slate-100 flex justify-center">

      <div className="flex w-full max-w-7xl">

        {/* Main Dashboard */}
        <div className="flex-1 p-4 sm:p-8">

          <div className="flex justify-between items-center mb-6">

            <h1 className="text-2xl font-bold flex items-center gap-2">
              <BarChartIcon className="text-blue-600"/>
              Attendance Dashboard
            </h1>

            <button
              className="lg:hidden bg-blue-600 text-white p-2 rounded-full"
              onClick={() => setShowCalendar(true)}
            >
              <CalendarMonthIcon/>
            </button>

          </div>

          {/* Stats */}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

            <div className="bg-white p-4 rounded-lg shadow text-center">
              <CheckCircleIcon className="text-green-600 mx-auto mb-1"/>
              Present
              <p className="text-xl font-bold text-green-600">
                {attendanceData.presentCount}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow text-center">
              <CancelIcon className="text-red-600 mx-auto mb-1"/>
              Absent
              <p className="text-xl font-bold text-red-600">
                {attendanceData.abbsentCount}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow text-center">
              <EventAvailableIcon className="text-blue-600 mx-auto mb-1"/>
              Total
              <p className="text-xl font-bold">
                {attendanceData.totalAttendance}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow text-center">
              <PercentIcon className="text-indigo-600 mx-auto mb-1"/>
              %
              <p className="text-xl font-bold text-indigo-600">
                {attendanceData.attendancePercentage}
              </p>
            </div>

          </div>


          {/* Attendance Requirement */}

          <div className="grid md:grid-cols-2 gap-4 mb-8">

            <div className="bg-white p-5 rounded-lg shadow">

              <h3 className="font-semibold mb-2 text-blue-700">
                For 75% Attendance
              </h3>

              <p>
                Required Days: 
                <span className="font-semibold ml-1">
                  {attendanceData.daysRequiredFor75Percent}
                </span>
              </p>

              <p>
                You Can Miss: 
                <span className="font-semibold ml-1">
                  {attendanceData.daysWeCanBeAbsentFor75Percent}
                </span>
              </p>

            </div>

            <div className="bg-white p-5 rounded-lg shadow">

              <h3 className="font-semibold mb-2 text-blue-700">
                For 60% Attendance
              </h3>

              <p>
                Required Days:
                <span className="font-semibold ml-1">
                  {attendanceData.daysRequiredFor60Percent}
                </span>
              </p>

              <p>
                You Can Miss:
                <span className="font-semibold ml-1">
                  {attendanceData.daysWeCanBeAbsentFor60Percent}
                </span>
              </p>

            </div>

          </div>

          <MarkAttendance/>

        </div>

        {/* Desktop Calendar */}
        <div className="hidden lg:block w-72 p-4 mt-[20vh]">
          <AttendanceCalendar/>
        </div>

      </div>


      {/* Mobile Calendar Overlay */}

      {showCalendar && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white p-5 rounded-xl shadow-xl w-[90%] max-w-md relative">

            <button
              className="absolute right-3 top-3"
              onClick={() => setShowCalendar(false)}
            >
              <CloseIcon/>
            </button>

            <AttendanceCalendar/>

          </div>

        </div>

      )}

    </div>

  );

}