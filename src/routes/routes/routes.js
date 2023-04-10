import { createBrowserRouter } from "react-router-dom";
import Main from "../../layouts/Main";
import Login from "../../pages/Login/Login/Login";
import SignUp from "../../pages/Login/SignUp/SignUp";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import Brands from "../../pages/Brands/Brands";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import DashboardLayout from "../../layouts/DashboardLayout";
import AddProduct from "../../pages/Dashboard/seller/AddProduct/AddProduct";
import MyWatches from "../../pages/Dashboard/seller/MyWatches/MyWatches";
import BrandItems from "../../pages/Brands/BrandItems";
import MyOrders from "../../pages/Dashboard/buyer/MYOrders/MyOrders";
import BrandItemDetails from "../../pages/Brands/BrandItemDetails";
import WatchCollections from "../../pages/WatchCollections/WatchCollections";
import AdminRoute from "../AdminRoute/AdminRoute";
import AllSellers from "../../pages/Dashboard/admin/AllSellers/AllSellers";
import AllBuyers from "../../pages/Dashboard/admin/AllBuyers/AllBuyers";
import ReportedItems from "../../pages/Dashboard/admin/ReportedItems/ReportedItems";
import Payment from "../../pages/Dashboard/buyer/Payment/Payment";
import DisplayError from "../../shared/DisplayError/DisplayError";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <DisplayError />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/brands",
        element: <Brands />,
      },
      {
        path: "/brands/:brand",
        element: <BrandItems />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/watches/brand/${params.brand}`, {
            headers: {
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
          }),
      },
      {
        path: "/brands/:brand/:id",
        element: (
          <PrivateRoute>
            <BrandItemDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/watch-collection",
        element: <WatchCollections />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <DisplayError />,
    children: [
      {
        path: "add-watch",
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "my-watches",
        element: (
          <PrivateRoute>
            <MyWatches />
          </PrivateRoute>
        ),
      },
      {
        path: "my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "my-orders/payment/:id",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/orders/${params.id}`, {
            headers: {
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
          }),
      },
      {
        path: "all-sellers",
        element: (
          <AdminRoute>
            <AllSellers />
          </AdminRoute>
        ),
      },
      {
        path: "all-buyers",
        element: (
          <AdminRoute>
            <AllBuyers />
          </AdminRoute>
        ),
      },
      {
        path: "reported-items",
        element: (
          <AdminRoute>
            <ReportedItems />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
export default routes;
