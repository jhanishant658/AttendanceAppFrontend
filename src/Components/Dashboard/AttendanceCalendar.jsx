import React, { useEffect, useState } from "react";
import axios from "axios";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function AttendanceCalendar() {

  const API = import.meta.env.VITE_API_BASE_URL;

  const [attendance, setAttendance] = useState({});
  const [stats, setStats] = useState({
    present: 0,
    absent: 0
  });

  const [currentDate, setCurrentDate] = useState(new Date());

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

      const res = await axios.post(
        `${API}/api/attendance/byMonth`,
        {
          userId: localStorage.getItem("userId"),
          month: monthString
        }
      );

      const map = {};

      let present = 0;
      let absent = 0;

      res.data.attendances.forEach(a => {

        map[a.date] = a.status;

        if (a.status === "present") present++;
        if (a.status === "absent") absent++;

      });

      setAttendance(map);
      setStats({ present, absent });

    } catch (error) {
      console.log(error);
    }

  };

  const changeMonth = (direction) => {

    const newDate = new Date(currentDate);
    newDate.setMonth(month + direction);

    setCurrentDate(newDate);

  };

  const getColor = (status) => {

    switch (status) {

      case "present":
        return "bg-green-500";

      case "absent":
        return "bg-red-500";

      case "holiday":
        return "bg-yellow-400";

      default:
        return "bg-gray-400";

    }

  };

  const renderDays = () => {

    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={"empty" + i}></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {

      const date =
        `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;

      const status = attendance[date] || "default";

      days.push(

        <div key={i} className="flex justify-center">

          <div
            className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full text-white text-xs sm:text-sm ${getColor(status)}`}
          >

            {i}

          </div>

        </div>

      );

    }

    return days;

  };

  const total = stats.present + stats.absent;

  const percentage =
    total === 0 ? 0 : ((stats.present / total) * 100).toFixed(1);

  const monthName = currentDate.toLocaleString("default", {
    month: "long"
  });

  return (

    <div className="bg-white p-4 rounded-xl shadow w-full">

      {/* Stats */}

      <div className="grid grid-cols-3 gap-2 mb-4 text-center">

        <div className="bg-green-100 p-2 rounded-lg">

          <p className="text-xs">Present</p>

          <p className="font-bold text-green-700">
            {stats.present}
          </p>

        </div>

        <div className="bg-red-100 p-2 rounded-lg">

          <p className="text-xs">Absent</p>

          <p className="font-bold text-red-700">
            {stats.absent}
          </p>

        </div>

        <div className="bg-blue-100 p-2 rounded-lg">

          <p className="text-xs">Attendance %</p>

          <p className="font-bold text-blue-700">
            {percentage}%
          </p>

        </div>

      </div>

      {/* Month Navigation */}

      <div className="flex justify-between items-center mb-3">

        <button onClick={() => changeMonth(-1)}>
          <ArrowBackIosIcon fontSize="small"/>
        </button>

        <h2 className="font-semibold text-sm">
          {monthName} {year}
        </h2>

        <button onClick={() => changeMonth(1)}>
          <ArrowForwardIosIcon fontSize="small"/>
        </button>

      </div>

      {/* Days Header */}

      <div className="grid grid-cols-7 text-xs text-center mb-1 text-gray-600">

        {["S","M","T","W","T","F","S"].map((d,i)=>(
          <div key={i}>{d}</div>
        ))}

      </div>

      {/* Calendar */}

      <div className="grid grid-cols-7 gap-1">

        {renderDays()}

      </div>

    </div>

  );

}
