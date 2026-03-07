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

import Navbar from "./NavBar";

export default function AttendanceDetails() {

  const [attendanceData, setAttendanceData] = useState({
    presentCount: 0,
    abbsentCount: 0,
    totalAttendance: 0,
    attendancePercentage: 0,
    daysRequiredFor75Percent: 0,
    daysRequiredFor60Percent: 0,
    daysWeCanBeAbsentFor75Percent: 0,
    daysWeCanBeAbsentFor60Percent: 0
  });

  const [showCalendar, setShowCalendar] = useState(false);

  const fetchAttendanceData = async () => {

    try {

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/attendance/summary`,
        { userId: localStorage.getItem("userId") }
      );

      setAttendanceData(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchAttendanceData();

  }, []);

  return (

    <div>

      <Navbar/>

      <div className="min-h-screen bg-slate-100">

        <div className="max-w-7xl mx-auto px-4 py-6">

          <div className="flex flex-col lg:flex-row gap-6">

            {/* LEFT SIDE DASHBOARD */}

            <div className="flex-1">

              {/* Header */}

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

              {/* Stats Cards */}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

                <div className="bg-white p-4 rounded-xl shadow text-center">

                  <CheckCircleIcon className="text-green-600 mx-auto mb-1"/>

                  Present

                  <p className="text-xl font-bold text-green-600">

                    {attendanceData.presentCount}

                  </p>

                </div>

                <div className="bg-white p-4 rounded-xl shadow text-center">

                  <CancelIcon className="text-red-600 mx-auto mb-1"/>

                  Absent

                  <p className="text-xl font-bold text-red-600">

                    {attendanceData.abbsentCount}

                  </p>

                </div>

                <div className="bg-white p-4 rounded-xl shadow text-center">

                  <EventAvailableIcon className="text-blue-600 mx-auto mb-1"/>

                  Total

                  <p className="text-xl font-bold">

                    {attendanceData.totalAttendance}

                  </p>

                </div>

                <div className="bg-white p-4 rounded-xl shadow text-center">

                  <PercentIcon className="text-indigo-600 mx-auto mb-1"/>

                  Percentage

                  <p className="text-xl font-bold text-indigo-600">

                    {attendanceData.attendancePercentage.toFixed(2)}

                  </p>

                </div>

              </div>

              {/* Attendance Requirement */}

              <div className="grid md:grid-cols-2 gap-4 mb-8">

                <div className="bg-white p-6 rounded-xl shadow">

                  <h3 className="font-semibold mb-2 text-blue-700">

                    For 75% Attendance

                  </h3>

                  <p>

                    Required Days :

                    <span className="font-semibold ml-1">

                      {attendanceData.daysRequiredFor75Percent}

                    </span>

                  </p>

                  <p>

                    You Can Miss :

                    <span className="font-semibold ml-1">

                      {attendanceData.daysWeCanBeAbsentFor75Percent}

                    </span>

                  </p>

                </div>

                <div className="bg-white p-6 rounded-xl shadow">

                  <h3 className="font-semibold mb-2 text-blue-700">

                    For 60% Attendance

                  </h3>

                  <p>

                    Required Days :

                    <span className="font-semibold ml-1">

                      {attendanceData.daysRequiredFor60Percent}

                    </span>

                  </p>

                  <p>

                    You Can Miss :

                    <span className="font-semibold ml-1">

                      {attendanceData.daysWeCanBeAbsentFor60Percent}

                    </span>

                  </p>

                </div>

              </div>

              {/* Mark Attendance */}

              <MarkAttendance/>

            </div>

        {/* Desktop Calendar */}
        <div className="hidden lg:block w-72 p-4 bg-white rounded-xl shadow">
          <AttendanceCalendar onAttendanceChange={fetchAttendanceData}/>
        </div>

      </div>

      {/* MOBILE CALENDAR POPUP */}

      {showCalendar && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white p-4 rounded-xl shadow-xl w-[95%] max-w-sm relative">

            <button
              className="absolute right-3 top-3"
              onClick={() => setShowCalendar(false)}
            >
              <CloseIcon/>
            </button>

           <AttendanceCalendar onAttendanceChange={fetchAttendanceData}/>

          </div>

        </div>

      )}

    </div>
</div>
</div>
  );

}
