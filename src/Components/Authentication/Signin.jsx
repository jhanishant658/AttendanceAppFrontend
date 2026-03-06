import React, { useState } from "react";
import axios from "axios";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from "@mui/icons-material/Login";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import CircularProgress from "@mui/material/CircularProgress";

import { Link, useNavigate } from "react-router-dom";

export default function Signin() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    try {

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/login`,
        formData
      );

      localStorage.setItem("name", response.data.name);
      localStorage.setItem("userId", response.data.id);

      setLoading(false);

      navigate("/dashboard");

    } catch (error) {

      setLoading(false);

      alert("Invalid Credentials");

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 px-4">

      {/* LOADING OVERLAY */}

      {loading && (

        <div className="fixed inset-0 bg-black/40 flex flex-col items-center justify-center z-50">

          <CircularProgress size={50} className="text-white"/>

          <p className="text-white mt-4 text-center text-sm">

            Please wait, first time may take a few seconds...

          </p>

        </div>

      )}

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">

        <div className="flex justify-center mb-4">
          <LoginIcon className="text-blue-600" style={{ fontSize: 42 }} />
        </div>

        <h2 className="text-3xl font-bold text-center mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">

            <EmailIcon className="text-gray-500 mr-2" />

            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="w-full outline-none"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">

            <LockIcon className="text-gray-500 mr-2" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full outline-none"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}
            </button>

          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition"
          >

            <LoginIcon fontSize="small"/>
            Sign In

          </button>

        </form>

        <p className="text-center mt-6 text-sm">

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