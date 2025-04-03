import { NavLink } from "react-router-dom";
import companyLogo from "../assets/NexDrive-Rentals-Logo.svg";
import "./custom/logo.css"; // Keeping this if you have additional custom styles
import { FaBars, FaMoon } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  
  const isAuthenticated = false; // Replace with your auth state (e.g., from Firebase)

  // Conditional Links based on authentication
  const links = isAuthenticated ? (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md text-sm font-medium ${
            isActive ? "text-teal-400 bg-gray-100" : "text-gray-700"
          } hover:text-teal-400 transition-colors duration-300`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/available-cars"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md text-sm font-medium ${
            isActive ? "text-teal-400 bg-gray-100" : "text-gray-700"
          } hover:text-teal-400 transition-colors duration-300`
        }
      >
        Available Cars
      </NavLink>
      <NavLink
        to="/add-car"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md text-sm font-medium ${
            isActive ? "text-teal-400 bg-gray-100" : "text-gray-700"
          } hover:text-teal-400 transition-colors duration-300`
        }
      >
        Add Car
      </NavLink>
      <NavLink
        to="/my-cars"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md text-sm font-medium ${
            isActive ? "text-teal-400 bg-gray-100" : "text-gray-700"
          } hover:text-teal-400 transition-colors duration-300`
        }
      >
        My Cars
      </NavLink>
      <NavLink
        to="/my-bookings"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md text-sm font-medium ${
            isActive ? "text-teal-400 bg-gray-100" : "text-gray-700"
          } hover:text-teal-400 transition-colors duration-300`
        }
      >
        My Bookings
      </NavLink>
    </>
  ) : (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md text-sm font-medium ${
            isActive ? "text-teal-400 bg-gray-100" : "text-gray-700"
          } hover:text-teal-400 transition-colors duration-300`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/available-cars"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md text-sm font-medium ${
            isActive ? "text-teal-400 bg-gray-100" : "text-gray-700"
          } hover:text-teal-400 transition-colors duration-300`
        }
      >
        Available Cars
      </NavLink>
    </>
  );

  return (
    <div>
      <nav className="bg-white shadow-lg p-4 transition-colors duration-300">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo and Name */}
          <div className="flex items-center space-x-2">
            <img
              src={companyLogo}
              alt="NexDrive Rentals Logo"
              className="h-10 w-10 rounded-full"
            />
            <span className="text-xl font-bold text-teal-500 tracking-tight">
              NexDrive Rentals
            </span>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-2xl text-gray-700 border border-gray-300 p-1 rounded-md hover:bg-gray-100"
              onClick={() => setToggleMenu(!toggleMenu)}
            >
              <FaBars />
            </button>
          </div>

          {/* Desktop View */}
          <div className="hidden md:flex items-center space-x-4">
            {links}
            {isAuthenticated ? (
              <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300">
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors duration-300"
              >
                Login
              </NavLink>
            )}
            <button
              className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
              title="Toggle Theme"
            >
              <FaMoon />
            </button>
          </div>
        </div>

        {/* Mobile View */}
        {toggleMenu && (
          <div className="md:hidden mt-4 flex flex-col items-center space-y-4 pb-4">
            {links}
            {isAuthenticated ? (
              <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300">
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors duration-300"
              >
                Login
              </NavLink>
            )}
            <button
              className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
              title="Toggle Theme"
            >
              <FaMoon />
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
