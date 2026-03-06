import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";
export default function MarkAttendance() {

  const markAttendance = async () => {

    try {

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/attendance/mark`,
        {
          userId: localStorage.getItem("userId"),
          status: "present"

        }
      );

      const data = await response.data;
      console.log(data);

      alert(data);

    } catch (error) {
      console.error(error);
      alert("Error marking attendance");
    }

  };

  return (

    <div className="bg-white p-8 rounded-xl shadow text-center">

      <div className="flex justify-center mb-4">
        <LocationOnIcon className="text-blue-600" style={{ fontSize: 40 }} />
      </div>

      <h2 className="text-xl font-bold mb-3">
        Mark Today's Attendance
      </h2>

      <p className="text-gray-600 mb-6">
        Click the button below to mark your attendance for today.
      </p>

      <button
        onClick={markAttendance}
        className="bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto hover:bg-green-700"
      >
        <CheckCircleIcon />
        Mark Attendance
      </button>

    </div>
  );
}