import MainLayout from "../layouts/MainLayout";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import ErrorPage from "../pages/ErrorPage";
import Register from "../pages/auth/Register";
import AddCar from "../pages/AddCar";
import AllAvailableCars from "../pages/AllAvailableCars";
import CarDetails from "../pages/CarDetails";
import PrivateRouter from "./PrivateRouter";
import MyBookings from "../pages/MyBookings";
import MyCars from "../pages/MyCars";
import UpdateCar from "../pages/UpdateCar";
import ManageCars from "../pages/ManageCars";
import BookingChart from "../pages/BookingChart";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/available-cars",
        element: <AllAvailableCars />,
      },
      {
        path: "car-details/:id",
        element: (
          <PrivateRouter>
            <CarDetails />
          </PrivateRouter>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/car-details/${params.id}`),
      },
      {
        path: "/add-car",
        element: (
          <PrivateRouter>
            <AddCar />
          </PrivateRouter>
        ),
      },
      {
        path: "/my-cars",
        element: (
          <PrivateRouter>
            <MyCars />
          </PrivateRouter>
        ),
      },
      {
        path: "/update-car-details/:id",
        element: (
          <PrivateRouter>
            <UpdateCar />
          </PrivateRouter>
        ),
      },
      {
        path: "/my-bookings",
        element: (
          <PrivateRouter>
            <MyBookings />
          </PrivateRouter>
        ),
      },
      {
        path: "/booking-Chart",
        element: <BookingChart />,
      },
      {
        path: "manage-cars",
        element: <ManageCars />,
      },
    ],
  },
]);

export default routers;
