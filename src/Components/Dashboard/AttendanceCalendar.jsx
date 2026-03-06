import React, { useEffect, useState } from "react";
import axios from "axios";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function AttendanceCalendar() {

  const API = import.meta.env.VITE_API_BASE_URL;

  const [attendance, setAttendance] = useState({});
  const [stats, setStats] = useState({ present: 0, absent: 0, holiday: 0 });

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  const today = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthString = `${year}-${String(month + 1).padStart(2, "0")}`;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  useEffect(() => {
    fetchMonthlyAttendance();
  }, [currentDate]);

  const fetchMonthlyAttendance = async () => {

    try {

      const res = await axios.post(`${API}/api/attendance/byMonth`, {
        userId: localStorage.getItem("userId"),
        month: monthString
      });

      const map = {};

      let present = 0;
      let absent = 0;
      let holiday = 0;

      res.data.attendances.forEach(a => {

        map[a.date] = a.status;

        if (a.status === "present") present++;
        if (a.status === "absent") absent++;
        if (a.status === "holiday") holiday++;

      });

      setAttendance(map);
      setStats({ present, absent, holiday });

    } catch (error) {
      console.log(error);
    }

  };

  const markPastAttendance = async (status, date) => {

    try {

      const res = await axios.post(`${API}/api/attendance/addOldAttendance`, {
        userId: localStorage.getItem("userId"),
        status,
        date
      });

      alert(res.data);
      fetchMonthlyAttendance();

    } catch (error) {
      console.log(error);
    }

  };

  const updatePastAttendance = async (status, date) => {

    try {

      const res = await axios.patch(`${API}/api/attendance/update`, {
        userId: localStorage.getItem("userId"),
        status,
        date
      });

      alert(res.data);
      fetchMonthlyAttendance();

    } catch (error) {
      console.log(error);
    }

  };

  const changeMonth = (direction) => {

    const newDate = new Date(currentDate);
    newDate.setMonth(month + direction);
    setCurrentDate(newDate);

  };

  const isFutureDate = (date) => new Date(date) > today;

  const getColor = (status) => {

    switch (status) {

      case "present":
        return "bg-green-500";

      case "absent":
        return "bg-red-500";

      case "holiday":
        return "bg-yellow-400";

      case "weekend":
        return "bg-blue-300";

      case "not-marked":
        return "bg-purple-400";

      default:
        return "bg-gray-300";

    }

  };

  const handleDayClick = (date, status, isWeekend, future) => {

    if (isWeekend || future) return;

    setSelectedDate(date);
    setSelectedStatus(status === "not-marked" ? "" : status);

  };

  const handleSubmit = () => {

    if (!selectedDate) return;

    if (!attendance[selectedDate]) {
      markPastAttendance(selectedStatus, selectedDate);
    } else {
      updatePastAttendance(selectedStatus, selectedDate);
    }

    setSelectedDate(null);

  };

  const renderDays = () => {

    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={"empty" + i}></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {

      const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;

      const day = new Date(date).getDay();
      const isWeekend = day === 0 || day === 6;

      const future = isFutureDate(date);

      const status =
        future
          ? "future"
          : isWeekend
          ? "weekend"
          : attendance[date] || "not-marked";

      const isToday =
        today.getFullYear() === year &&
        today.getMonth() === month &&
        today.getDate() === i;

      days.push(

        <div key={i} className="flex justify-center">

          <div
            onClick={() => handleDayClick(date, status, isWeekend, future)}
            className={`
              w-8 h-8 sm:w-10 sm:h-10
              rounded-full flex items-center justify-center
              text-white text-xs sm:text-sm
              ${future ? "bg-gray-400 cursor-not-allowed" : getColor(status)}
              ${isWeekend ? "cursor-not-allowed" : "cursor-pointer"}
              ${isToday ? "ring-2 ring-indigo-600" : ""}
            `}
          >

            {i}

          </div>

        </div>

      );

    }

    return days;

  };

  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const daysHeader = ["S", "M", "T", "W", "T", "F", "S"];

  const total = stats.present + stats.absent;
  const percentage =
    total === 0 ? 0 : ((stats.present / total) * 100).toFixed(1);

  return (

    <div className="bg-white p-4 sm:p-6 rounded-xl shadow max-w-lg mx-auto">

      {/* Stats */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 text-center">

        <div className="bg-green-100 p-4 rounded-xl shadow-sm">
          <p className="text-xs sm:text-sm text-gray-600">Present</p>
          <p className="font-bold text-green-700 text-lg sm:text-xl">
            {stats.present}
          </p>
        </div>

        <div className="bg-red-100 p-4 rounded-xl shadow-sm">
          <p className="text-xs sm:text-sm text-gray-600">Absent</p>
          <p className="font-bold text-red-700 text-lg sm:text-xl">
            {stats.absent}
          </p>
        </div>

        <div className="bg-blue-100 p-4 rounded-xl shadow-sm">
          <p className="text-xs sm:text-sm text-gray-600">Attendance %</p>
          <p className="font-bold text-blue-700 text-lg sm:text-xl">
            {percentage}%
          </p>
        </div>

      </div>

      {/* Month Navigation */}

      <div className="flex justify-between items-center mb-4">

        <button onClick={() => changeMonth(-1)}>
          <ArrowBackIosIcon fontSize="small" />
        </button>

        <h2 className="font-semibold text-sm sm:text-base">
          {monthName} {year}
        </h2>

        <button onClick={() => changeMonth(1)}>
          <ArrowForwardIosIcon fontSize="small" />
        </button>

      </div>

      {/* Days Header */}

      <div className="grid grid-cols-7 text-xs sm:text-sm text-center mb-2 text-gray-600">

        {daysHeader.map((d, i) => (
          <div key={i}>{d}</div>
        ))}

      </div>

      {/* Calendar */}

      <div className="grid grid-cols-7 gap-2 mb-6">
        {renderDays()}
      </div>

      {/* Legend */}

      <div className="flex flex-wrap gap-3 text-xs sm:text-sm mb-4">

        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          Present
        </div>

        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          Absent
        </div>

        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          Holiday
        </div>

        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
          Weekend
        </div>

        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
          Not Marked
        </div>

      </div>

      {/* Attendance Form */}

      {selectedDate && (

        <div className="mt-4 p-4 border rounded-lg">

          <p className="text-sm mb-2">Date: {selectedDate}</p>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border p-2 rounded w-full"
          >

            <option value="">Select Status</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="holiday">Holiday</option>

          </select>

          <button
            onClick={handleSubmit}
            className="mt-3 bg-blue-600 text-white px-3 py-2 rounded w-full hover:bg-blue-700"
          >
            Submit
          </button>

        </div>

      )}

    </div>

  );

}
