import { Link } from "react-router-dom";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BarChartIcon from "@mui/icons-material/BarChart";
import FactCheckIcon from "@mui/icons-material/FactCheck";

const Footer = () => {

  return (

    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 mt-10">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center sm:text-left">

          {/* Brand */}

          <div>

            <h2 className="text-2xl font-bold text-white mb-3">

              AttendEase

            </h2>

            <p className="text-sm leading-relaxed">

              A smart attendance management platform that helps students
              track attendance, monitor percentage and stay consistent
              with academic goals.

            </p>

          </div>


          {/* Quick Links */}

          <div>

            <h3 className="text-lg font-semibold text-white mb-4">

              Quick Links

            </h3>

            <ul className="space-y-2 text-sm">

              <li>

                <Link to="/dashboard" className="hover:text-white">

                  Dashboard

                </Link>

              </li>

              <li>

                <Link to="/AttendanceDetail" className="hover:text-white">

                  Attendance Details

                </Link>

              </li>

              <li>

                <Link to="/signin" className="hover:text-white">

                  Login

                </Link>

              </li>

              <li>

                <Link to="/signup" className="hover:text-white">

                  Register

                </Link>

              </li>

            </ul>

          </div>


          {/* Features */}

          <div>

            <h3 className="text-lg font-semibold text-white mb-4">

              Features

            </h3>

            <ul className="space-y-2 text-sm flex flex-col items-center sm:items-start">

              <li className="flex items-center gap-2">

                <FactCheckIcon fontSize="small"/>

                Mark Attendance

              </li>

              <li className="flex items-center gap-2">

                <CalendarMonthIcon fontSize="small"/>

                Attendance Calendar

              </li>

              <li className="flex items-center gap-2">

                <BarChartIcon fontSize="small"/>

                Attendance Analytics

              </li>

            </ul>

          </div>


          {/* Social */}

          <div>

            <h3 className="text-lg font-semibold text-white mb-4">

              Connect

            </h3>

            <div className="flex justify-center sm:justify-start space-x-4 text-xl">

              <a
                href="https://www.instagram.com/nishant_jha__18/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-500 transition"
              >
                <FacebookIcon/>
              </a>

              <a
                href="https://www.instagram.com/nishant_jha__18/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-500 transition"
              >
                <InstagramIcon/>
              </a>

              <a
                href="#"
                className="hover:text-sky-500 transition"
              >
                <TwitterIcon/>
              </a>

              <a
                href="https://www.linkedin.com/in/nishant-jha-0b96a629b/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-400 transition"
              >
                <LinkedInIcon/>
              </a>

            </div>

          </div>

        </div>


        {/* Bottom */}

        <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-4">

          © {new Date().getFullYear()} AttendEase. All rights reserved.

        </div>

      </div>

    </footer>

  );

};

export default Footer;