import { useState } from "react";
import { NavLink } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {

  const name = localStorage.getItem("name");

  const [mobileMenu,setMobileMenu] = useState(false);
  const [profileMenu,setProfileMenu] = useState(false);

  const handleLogout = () => {

    const confirmLogout = window.confirm("क्या आप सच में logout करना चाहते हैं?");

    if(confirmLogout){

      localStorage.setItem("userId",0);
      localStorage.setItem("name","");

      window.location.href = "/signin";

    }

  };

  return (

    <nav className="bg-white border-b shadow-sm">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <h1 className="text-xl font-bold text-blue-600 tracking-wide">
            AttendEase
          </h1>


          {/* Desktop Menu */}

          <div className="hidden md:flex items-center gap-6">

            <NavLink
              to="/dashboard"
              className={({isActive}) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg transition 
                ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}`
              }
            >
              <DashboardIcon fontSize="small"/>
              Dashboard
            </NavLink>


            <NavLink
              to="/AttendanceDetail"
              className={({isActive}) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg transition 
                ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}`
              }
            >
              <FactCheckIcon fontSize="small"/>
              Attendance
            </NavLink>


            {/* NEW Predictor Link */}

            <NavLink
              to="/AttendancePredictor"
              className={({isActive}) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg transition 
                ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}`
              }
            >
              <QueryStatsIcon fontSize="small"/>
              Predictor
            </NavLink>

          </div>


          {/* Profile */}

          <div className="relative hidden md:flex items-center">

            <button
              onClick={()=>setProfileMenu(!profileMenu)}
              className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              <AccountCircleIcon/>
              Hello {name}
            </button>

            {profileMenu && (

              <div className="absolute right-0 top-12 bg-white border rounded-lg shadow-lg w-40">

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-3 w-full hover:bg-gray-100"
                >
                  <LogoutIcon fontSize="small"/>
                  Logout
                </button>

              </div>

            )}

          </div>


          {/* Mobile Menu Button */}

          <div className="md:hidden">

            <MenuIcon
              onClick={()=>setMobileMenu(!mobileMenu)}
              className="cursor-pointer"
            />

          </div>

        </div>

      </div>


      {/* Mobile Menu */}

      {mobileMenu && (

        <div className="md:hidden px-6 pb-4 space-y-3 bg-gray-50">

          <NavLink
            to="/dashboard"
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"
          >
            <DashboardIcon fontSize="small"/>
            Dashboard
          </NavLink>


          <NavLink
            to="/AttendanceDetail"
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"
          >
            <FactCheckIcon fontSize="small"/>
            Attendance
          </NavLink>


          {/* Predictor Mobile */}

          <NavLink
            to="/AttendancePredictor"
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"
          >
            <QueryStatsIcon fontSize="small"/>
            Predictor
          </NavLink>


          <button
            onClick={handleLogout}
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 w-full"
          >
            <LogoutIcon fontSize="small"/>
            Logout
          </button>

        </div>

      )}

    </nav>

  );
}