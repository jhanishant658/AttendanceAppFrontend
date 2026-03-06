import React, { useState } from "react";
import axios from "axios";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from "@mui/icons-material/Login";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { Link } from "react-router-dom";

export default function Signin() {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "https://attendanceapp-c2gu.onrender.com/api/users/login",
        formData
      );

      console.log(response.data);

      alert("Login Successful");

    } catch (error) {

      alert("Invalid Credentials");

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4">

      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-xl w-full max-w-md">

        {/* Icon */}

        <div className="flex justify-center mb-4">
          <LoginIcon className="text-blue-600" style={{ fontSize: 42 }} />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Sign In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}

          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">

            <EmailIcon className="text-gray-500 mr-2" />

            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="w-full outline-none text-sm sm:text-base"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          {/* Password */}

          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">

            <LockIcon className="text-gray-500 mr-2" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full outline-none text-sm sm:text-base"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500"
            >
              {showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}
            </button>

          </div>

          {/* Login Button */}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition"
          >

            <LoginIcon fontSize="small"/>
            Login

          </button>

        </form>

        {/* Signup link */}

        <p className="text-center mt-5 text-sm">

          Don't have an account?

          <Link
            to="/signup"
            className="text-blue-600 font-semibold ml-1 hover:underline"
          >
            Sign Up
          </Link>

        </p>

      </div>

    </div>

  );

}