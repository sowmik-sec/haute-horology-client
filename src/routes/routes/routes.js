import { createBrowserRouter } from "react-router-dom";
import Main from "../../layouts/Main";
import Login from "../../pages/Login/Login";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
export default routes;
