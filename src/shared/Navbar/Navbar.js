import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const handleLogOut = () => {
    logout()
      .then(() => {})
      .catch((err) => console.error(err));
  };
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link
                to="/"
                className={`${
                  location.pathname === "/" && "bg-gray-700 text-white"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className={`${
                  location.pathname === "/brands" && "bg-gray-700 text-white"
                }`}
              >
                Brands
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className={`${
                  location.pathname === "/watch-collections" &&
                  "bg-gray-700 text-white"
                }`}
              >
                Watch Collections
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className={`${
                  location.pathname === "/about" && "bg-gray-700 text-white"
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className={`${
                  location.pathname === "/dashboard" && "bg-gray-700 text-white"
                }`}
              >
                Dashboard
              </Link>
            </li>
            {user ? (
              <li>
                <Link onClick={handleLogOut}>Logout</Link>
              </li>
            ) : (
              <li>
                <Link
                  to="/login"
                  className={`${
                    location.pathname === "/login" && "bg-gray-700 text-white"
                  }`}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Houte Horology Hub
        </Link>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link
              to="/"
              className={`${
                location.pathname === "/" && "bg-gray-700 text-white"
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className={`${
                location.pathname === "/brands" && "bg-gray-700 text-white"
              }`}
            >
              Brands
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className={`${
                location.pathname === "/watch-collections" &&
                "bg-gray-700 text-white"
              }`}
            >
              Watch Collections
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className={`${
                location.pathname === "/about" && "bg-gray-700 text-white"
              }`}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className={`${
                location.pathname === "/dashboard" && "bg-gray-700 text-white"
              }`}
            >
              Dashboard
            </Link>
          </li>
          {user ? (
            <li>
              <Link onClick={handleLogOut}>Logout</Link>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className={`${
                  location.pathname === "/login" && "bg-gray-700 text-white"
                }`}
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
