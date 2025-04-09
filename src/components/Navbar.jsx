import { NavLink } from "react-router-dom";
import companyLogo from "../assets/NexDrive-Rentals-Logo.svg";
import "./custom/logo.css";
import { FaBars, FaMoon } from "react-icons/fa";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { user, signOutUser } = useAuth();

  const handleThemeChange = () => {
    toast.success("Coming Soon");
  };

  const links = user ? (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md text-sm font-medium ${
            isActive ? "text-teal-400 bg-gray-100" : "text-gray-700"
          } hover:text-teal-400 transition duration-300`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/available-cars"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md text-sm font-medium ${
            isActive ? "text-teal-400 bg-gray-100" : "text-gray-700"
          } hover:text-teal-400 transition duration-300`
        }
      >
        Available Cars
      </NavLink>
      <NavLink
        to="/add-car"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md text-sm font-medium ${
            isActive ? "text-teal-400 bg-gray-100" : "text-gray-700"
          } hover:text-teal-400 transition duration-300`
        }
      >
        Add Car
      </NavLink>
      <NavLink
        to="/my-cars"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md text-sm font-medium ${
            isActive ? "text-teal-400 bg-gray-100" : "text-gray-700"
          } hover:text-teal-400 transition duration-300`
        }
      >
        My Cars
      </NavLink>
      <NavLink
        to="/my-bookings"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md text-sm font-medium ${
            isActive ? "text-teal-400 bg-gray-100" : "text-gray-700"
          } hover:text-teal-400 transition duration-300`
        }
      >
        My Bookings
      </NavLink>
      <NavLink
        to="/manage-cars"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md text-sm font-medium ${
            isActive ? "text-teal-400 bg-gray-100" : "text-gray-700"
          } hover:text-teal-400 transition duration-300`
        }
      >
        Manage Cars
      </NavLink>
    </>
  ) : (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md text-sm font-medium ${
            isActive ? "text-teal-400 bg-gray-100" : "text-gray-700"
          } hover:text-teal-400 transition duration-300`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/available-cars"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md text-sm font-medium ${
            isActive ? "text-teal-400 bg-gray-100" : "text-gray-700"
          } hover:text-teal-400 transition duration-300`
        }
      >
        Available Cars
      </NavLink>
    </>
  );

  return (
    <nav className="bg-white shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src={companyLogo}
            alt="Logo"
            className="h-10 w-10 rounded-full"
          />
          <span className="text-xl font-bold text-teal-500">
            NexDrive Rentals
          </span>
        </div>

        {/* Toggle Button for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setToggleMenu(!toggleMenu)}
            className="text-2xl text-gray-700 border border-gray-300 p-1 rounded-md hover:bg-gray-100"
          >
            <FaBars />
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {links}
          {user ? (
            <button
              onClick={signOutUser}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition duration-300"
            >
              Login
            </NavLink>
          )}
          <button
            onClick={handleThemeChange}
            className="p-2 rounded-full hover:bg-gray-200 transition duration-300"
            title="Toggle Theme"
          >
            <FaMoon />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {toggleMenu && (
        <div className="md:hidden mt-4 flex flex-col items-center space-y-4 pb-4">
          {links}
          {user ? (
            <button
              onClick={signOutUser}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition duration-300"
            >
              Login
            </NavLink>
          )}
          <button
            onClick={handleThemeChange}
            className="p-2 rounded-full hover:bg-gray-200 transition duration-300"
            title="Toggle Theme"
          >
            <FaMoon />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
