import React, { useState } from "react";
import axios from "axios";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { Link } from "react-router-dom";

export default function Signup() {

  const [formData, setFormData] = useState({
    name: "",
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
        `${import.meta.env.VITE_API_BASE_URL}/api/users/signup`,
        formData
      );

      console.log(response.data);

      alert("Signup Successful");

    } catch (error) {

      alert("Signup Failed");

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4">

      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-xl w-full max-w-md">

        {/* Icon */}

        <div className="flex justify-center mb-4">
          <HowToRegIcon className="text-blue-600" style={{ fontSize: 42 }} />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}

          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">

            <PersonIcon className="text-gray-500 mr-2" />

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full outline-none text-sm sm:text-base"
              required
            />

          </div>


          {/* Email */}

          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">

            <EmailIcon className="text-gray-500 mr-2" />

            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full outline-none text-sm sm:text-base"
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
              value={formData.password}
              onChange={handleChange}
              className="w-full outline-none text-sm sm:text-base"
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


          {/* Signup Button */}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition"
          >

            <HowToRegIcon fontSize="small"/>
            Sign Up

          </button>

        </form>


        {/* Login Redirect */}

        <p className="text-center mt-5 text-sm">

          Already have an account?

          <Link
            to="/signin"
            className="text-blue-600 font-semibold ml-1 hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}