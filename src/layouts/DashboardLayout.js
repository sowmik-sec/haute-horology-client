import React, { useContext } from "react";
import Navbar from "../shared/Navbar/Navbar";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import useSeller from "../hooks/useSeller";
import "./DashboardLayout.css";
import useBuyer from "../hooks/useBuyer";
import LoaderSpinner from "../shared/Navbar/LoaderSpinner/LoaderSpinner";
import useTitle from "../hooks/useTitle";

const DashboardLayout = () => {
  useTitle("Dashboard");
  const { user } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);
  const [isSeller, isSellerLoading] = useSeller(user?.email);
  const [isBuyer, isBuyerLoading] = useBuyer(user?.email);
  if (isAdminLoading || isSellerLoading || isBuyerLoading) {
    return <LoaderSpinner />;
  }
  return (
    <div>
      <Navbar />
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            {isSeller && (
              <>
                <li>
                  <NavLink to={`my-watches`}>My Watches</NavLink>
                </li>
                <li>
                  <NavLink to={`add-watch`}>Add Watch</NavLink>
                </li>
                <li>
                  <NavLink to={`my-buyers`}>My buyers</NavLink>
                </li>
              </>
            )}
            {isAdmin && (
              <>
                <li>
                  <NavLink to={`all-sellers`}>All Sellers</NavLink>
                </li>
                <li>
                  <NavLink to={`all-buyers`}>All Buyers</NavLink>
                </li>
                <li>
                  <NavLink to={`reported-items`}>Reported Items</NavLink>
                </li>
              </>
            )}
            {isBuyer && (
              <>
                <li>
                  <NavLink to={`my-orders`}>My Orders</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
