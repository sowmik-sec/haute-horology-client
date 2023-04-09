import React, { useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import useSeller from "../../hooks/useSeller";
import useAdmin from "../../hooks/useAdmin";
import LoaderSpinner from "./LoaderSpinner/LoaderSpinner";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isSeller, isSellerLoading] = useSeller(user?.email);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);
  const location = useLocation();
  if (isSellerLoading || isAdminLoading) {
    return <LoaderSpinner />;
  }

  const handleLogOut = () => {
    logout()
      .then(() => {})
      .catch((err) => console.error(err));
  };
  const menuItems = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/brands">Brands</NavLink>
      </li>
      <li>
        <NavLink to="/watch-collection">Watch Collections</NavLink>
      </li>
      <li>
        <NavLink to="/">About</NavLink>
      </li>
      <li>
        <NavLink
          to={`/dashboard/${
            isSeller ? "my-watches" : isAdmin ? "all-sellers" : "my-orders"
          }`}
        >
          Dashboard
        </NavLink>
      </li>
      {user ? (
        <li>
          <Link onClick={handleLogOut}>Logout</Link>
        </li>
      ) : (
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      )}
    </>
  );
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
            tabIndex={1}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost normal-case text-xl">
          Houte Horology Hub
        </NavLink>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{menuItems}</ul>
      </div>
      <label
        htmlFor="dashboard-drawer"
        tabIndex={2}
        className={`btn btn-ghost ${
          location.pathname.substring(0, 10) === "/dashboard"
            ? "block"
            : "hidden"
        } lg:hidden flex items-center ml-5`}
      >
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
    </div>
  );
};

export default Navbar;
