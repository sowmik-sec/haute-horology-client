import { createBrowserRouter } from "react-router-dom";
import Main from "../../layouts/Main";
import Login from "../../pages/Login/Login/Login";
import SignUp from "../../pages/Login/SignUp/SignUp";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import Brands from "../../pages/Brands/Brands";

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
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
export default routes;
