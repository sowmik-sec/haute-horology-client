import React, { useContext } from "react";
import Navbar from "../shared/Navbar/Navbar";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import useSeller from "../hooks/useSeller";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);
  const [isSeller, isSellerLoading] = useSeller(user?.email);

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
                  <NavLink to={`my-products`}>My Products</NavLink>
                </li>
                <li>
                  <NavLink to={`add-product`}>Add Product</NavLink>
                </li>
                <li>
                  <NavLink to={`my-buyers`}>My buyers</NavLink>
                </li>
              </>
            )}
            {isAdmin && (
              <>
                <li>
                  <NavLink>All Sellers</NavLink>
                </li>
                <li>
                  <NavLink>All Buyers</NavLink>
                </li>
                <li>
                  <NavLink>Reported Items</NavLink>
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
