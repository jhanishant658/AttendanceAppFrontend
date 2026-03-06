import React, { useEffect, useState } from "react";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function AttendanceCalendar() {

  const [attendance, setAttendance] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());

  const dummyData = {
    "2026-03-01": "present",
    "2026-03-02": "absent",
    "2026-03-05": "holiday"
  };

  useEffect(() => {
    setAttendance(dummyData);
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const today = new Date();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const firstDayOfMonth = new Date(year, month, 1).getDay();

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

      case "weekend":
        return "bg-blue-300";

      default:
        return "bg-gray-300";

    }

  };

  const renderDays = () => {

    const days = [];

    // empty spaces before month start
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={"empty"+i}></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {

      const date = `${year}-${String(month+1).padStart(2,"0")}-${String(i).padStart(2,"0")}`;

      const day = new Date(date).getDay();

      const isWeekend = day === 0 || day === 6;

      const status = isWeekend
        ? "weekend"
        : attendance[date] || "not-marked";

      const isToday =
        today.getFullYear() === year &&
        today.getMonth() === month &&
        today.getDate() === i;

      days.push(

        <div key={i} className="flex justify-center">

          <div
            className={`
              w-9 h-9 rounded-full flex items-center justify-center
              text-white text-xs
              ${getColor(status)}
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

  const monthName = currentDate.toLocaleString("default", {
    month: "long"
  });

  const daysHeader = ["S","M","T","W","T","F","S"];

  return (

    <div className="bg-white p-4 rounded-xl shadow">

      {/* Month Navigation */}

      <div className="flex justify-between items-center mb-4">

        <button onClick={()=>changeMonth(-1)}>
          <ArrowBackIosIcon fontSize="small"/>
        </button>

        <h2 className="font-semibold">
          {monthName} {year}
        </h2>

        <button onClick={()=>changeMonth(1)}>
          <ArrowForwardIosIcon fontSize="small"/>
        </button>

      </div>

      {/* Day headers */}

      <div className="grid grid-cols-7 text-xs text-center mb-2 text-gray-600">

        {daysHeader.map((d,i)=>(
          <div key={i}>{d}</div>
        ))}

      </div>

      {/* Calendar days */}

      <div className="grid grid-cols-7 gap-2 mb-4">

        {renderDays()}

      </div>

      {/* Legend */}

      <div className="flex flex-wrap justify-center gap-3 text-xs">

        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
          Present
        </div>

        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          Absent
        </div>

        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
          Holiday
        </div>

        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-blue-300"></span>
          Weekend
        </div>

        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-gray-300"></span>
          Not Marked
        </div>

      </div>

    </div>

  );

}