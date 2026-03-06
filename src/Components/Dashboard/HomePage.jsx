import { Link } from "react-router-dom";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BarChartIcon from "@mui/icons-material/BarChart";

import Navbar from "./NavBar";
import MarkAttendance from "./MarkAttendance";

export default function HomePage() {

  const name = localStorage.getItem("name");

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

      {/* Navbar */}
      <Navbar/>

      {/* Container */}
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Welcome Card */}

        <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl p-10 shadow-xl">

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Hello {name} 👋
          </h1>

          <p className="text-gray-600 text-lg">
            Welcome back! Track your attendance and stay on top of your academic goals.
          </p>

        </div>


        {/* Mark Attendance */}

        <div className="mt-8">
          <MarkAttendance/>
        </div>


        {/* Explore Section */}

        <h2 className="text-xl font-semibold mt-10 mb-4 text-gray-700">
          Explore
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Calendar */}

          <Link to="/AttendanceDetail">

            <div className="bg-white rounded-2xl p-7 shadow-md hover:shadow-xl transition hover:-translate-y-1 cursor-pointer">

              <CalendarMonthIcon
                style={{fontSize:42}}
                className="text-blue-600"
              />

              <h3 className="text-lg font-semibold mt-3">
                Attendance Calendar
              </h3>

              <p className="text-gray-500 mt-1">
                View and manage your attendance records in a calendar view.
              </p>

            </div>

          </Link>


          {/* Analytics */}

          <div className="bg-white rounded-2xl p-7 shadow-md hover:shadow-xl transition hover:-translate-y-1">

            <BarChartIcon
              style={{fontSize:42}}
              className="text-purple-600"
            />

            <h3 className="text-lg font-semibold mt-3">
              Attendance Analytics
            </h3>

            <p className="text-gray-500 mt-1">
              Analyze your attendance percentage and stay above the required limit.
            </p>

          </div>

        </div>


        {/* Info Section */}

        <div className="mt-10 bg-white rounded-2xl shadow-md p-8 border">

          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Stay on Track 🎯
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Maintaining a strong attendance record is essential for academic success.
            Use this dashboard regularly to monitor your attendance and ensure that
            you meet the required attendance threshold for your courses.
          </p>

        </div>

      </div>

    </div>

  );

}