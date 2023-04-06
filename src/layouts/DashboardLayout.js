import React, { useContext } from "react";
import Navbar from "../shared/Navbar/Navbar";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import useSeller from "../hooks/useSeller";

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
                  <Link>My Products</Link>
                </li>
                <li>
                  <Link>Add Product</Link>
                </li>
                <li>
                  <Link>My buyers</Link>
                </li>
              </>
            )}
            {isAdmin && (
              <>
                <li>
                  <Link>All Sellers</Link>
                </li>
                <li>
                  <Link>All Buyers</Link>
                </li>
                <li>
                  <Link>Reported Items</Link>
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
