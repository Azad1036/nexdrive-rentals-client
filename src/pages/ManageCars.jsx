import React from "react";
import useAuth from "../hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";
import { FcAcceptDatabase } from "react-icons/fc";

const ManageCars = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  //   const queryClient = useQueryClient();

  // My Booking Data Get From Database
  const { data: manageCar = [], isLoading } = useQuery({
    queryKey: ["booking", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/my-all-booking/${
          user?.email
        }?buyer=true`
      );
      return data;
    },
  });

  // Delete Booking Api Call
  const { mutateAsync } = useMutation({
    mutationFn: async ({ id, status }) => {
      // PATCH request with status in body
      await axiosSecure.patch(`/update-booking-status/${id}`, { status });
    },
    onSuccess: () => {
      Swal.fire({
        title: "Action Success",
        text: "Your Action Success",
        icon: "success",
      });
    },
    onError: () => {
      Swal.fire({
        title: "Error!",
        text: "There was a problem deleting your booking.",
        icon: "error",
      });
    },
  });

  // Change Status
  const handleStatusChange = async (id, previousStatus, status) => {
    if (previousStatus === status || previousStatus === "Accepted") {
      return toast.success("Not Allowed");
    }

    try {
      await mutateAsync({ id, status }); // pass as object
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-600 mt-2">
            View and manage all your car rental reservations
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Link
            to="/add-car"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center font-medium flex items-center justify-center gap-2"
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
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            New Car Add
          </Link>
        </div>
      </div>

      {/* Bookings Table */}
      {manageCar.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {manageCar.map((booking) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {booking.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-sm text-gray-900 font-medium">
                        {new Date(booking.startDate).toLocaleDateString()} -{" "}
                        {new Date(booking.endDate).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.totalDays} days rental
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-lg font-bold text-gray-900">
                        ${booking.dailyRentalPrice}
                      </div>
                      <div className="text-xs text-gray-500">
                        incl. taxes & fees
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          booking.status === "Confirmed"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() =>
                            handleStatusChange(
                              booking?._id,
                              booking?.status,
                              "Accepted"
                            )
                          }
                          className={`text-blue-600 hover:text-blue-900 flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colorss ${
                            booking.status === "Accepted" &&
                            "cursor-not-allowed"
                          }`}
                        >
                          <FcAcceptDatabase />
                          Accepted
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(
                              booking?._id,
                              booking?.status,
                              "Canceled"
                            )
                          }
                          className={`text-red-600 hover:text-red-900 flex items-center gap-1 bg-red-50 px-3 py-1.5 rounded-md hover:bg-red-100 transition-colors ${
                            booking.status === "Accepted" &&
                            "cursor-not-allowed"
                          }`}
                          disabled={booking.status === "Accepted"}
                        >
                          <FaTrashAlt />
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No bookings Car found
          </h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            You haven't made any bookings yet. Browse our available cars and
            make your first reservation today!
          </p>
          <Link
            to="/my-bookings"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            My All Cars
          </Link>
        </div>
      )}
    </div>
  );
};

export default ManageCars;
