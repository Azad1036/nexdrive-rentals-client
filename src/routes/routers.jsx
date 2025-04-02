import MainLayout from "../layouts/MainLayout";
import { createBrowserRouter } from "react-router-dom";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
  },
]);

export default routers;
