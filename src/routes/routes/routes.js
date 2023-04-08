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

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
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
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "add-watch",
        element: <AddProduct />,
      },
      {
        path: "my-watches",
        element: <MyWatches />,
      },
      {
        path: "my-orders",
        element: <MyOrders />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
export default routes;
