import React from "react";
import { Link } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BarChartIcon from "@mui/icons-material/BarChart";
import SecurityIcon from "@mui/icons-material/Security";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export default function Home() {

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}

      <nav className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-10 py-4 bg-white shadow gap-3 sm:gap-0">

        <div className="flex items-center gap-2 text-lg sm:text-xl font-bold text-blue-600">
          <SchoolIcon />
          Smart Attendance
        </div>

        <div className="flex gap-3 sm:gap-4">

          <Link
            to="/signin"
            className="flex items-center gap-1 px-3 py-2 text-blue-600 font-semibold hover:text-blue-800"
          >
            <LoginIcon fontSize="small"/>
            Login
          </Link>

          <Link
            to="/signup"
            className="flex items-center gap-1 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <PersonAddIcon fontSize="small"/>
            Sign Up
          </Link>

        </div>

      </nav>

      {/* Hero Section */}

      <div className="flex flex-col items-center justify-center text-center mt-16 sm:mt-24 px-6">

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Attendance Made <span className="text-blue-600">Smart</span>
        </h1>

        <p className="text-gray-600 max-w-xl mb-8 text-sm sm:text-base">
          A modern attendance system with location verification,
          real-time statistics and secure authentication for students and teachers.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

          <Link
            to="/signin"
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg text-sm sm:text-lg hover:bg-blue-700"
          >
            <LoginIcon />
            Get Started
          </Link>

          <Link
            to="/signup"
            className="flex items-center justify-center gap-2 border border-blue-600 text-blue-600 px-6 py-3 rounded-lg text-sm sm:text-lg hover:bg-blue-50"
          >
            <PersonAddIcon />
            Create Account
          </Link>

        </div>

      </div>

      {/* Features Section */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 sm:mt-24 px-6 sm:px-12 lg:px-16 pb-12">

        <div className="bg-white p-6 sm:p-8 rounded-xl shadow hover:shadow-lg transition text-center sm:text-left">

          <LocationOnIcon className="text-blue-600 mb-4" style={{fontSize:40}}/>

          <h3 className="font-bold text-lg mb-2">
            Location Verification
          </h3>

          <p className="text-gray-600 text-sm sm:text-base">
            Attendance only marked when the student is inside the allowed location.
          </p>

        </div>

        <div className="bg-white p-6 sm:p-8 rounded-xl shadow hover:shadow-lg transition text-center sm:text-left">

          <BarChartIcon className="text-blue-600 mb-4" style={{fontSize:40}}/>

          <h3 className="font-bold text-lg mb-2">
            Attendance Analytics
          </h3>

          <p className="text-gray-600 text-sm sm:text-base">
            View attendance percentage and detailed statistics instantly.
          </p>

        </div>

        <div className="bg-white p-6 sm:p-8 rounded-xl shadow hover:shadow-lg transition text-center sm:text-left">

          <SecurityIcon className="text-blue-600 mb-4" style={{fontSize:40}}/>

          <h3 className="font-bold text-lg mb-2">
            Secure System
          </h3>

          <p className="text-gray-600 text-sm sm:text-base">
            Authentication system ensures safe and secure attendance tracking.
          </p>

        </div>

      </div>

    </div>
  );
}