import React from "react";
import useAuth from "../hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../components/Loading";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import MyAllBookingCar from "./MyAllBookingCar";

const MyBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // My Booking Data Get From Database
  const { data: myBooking = [], isLoading } = useQuery({
    queryKey: ["booking", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/my-all-booking/${user?.email}`
      );
      return data;
    },
  });

  // Delete Booking Api Call
  const { mutateAsync } = useMutation({
    mutationFn: async (deleteBookingData) => {
      await axiosSecure.delete(`/remove-bookingCar/${deleteBookingData}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking", user?.email] });
      Swal.fire({
        title: "Deleted",
        text: "Your booking has been removed.",
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

  // Delete Booking Function logic
  const handleDeleteBooking = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await mutateAsync(id);
      } catch (error) {
        toast.error(error.message || "Something went wrong. Try again.");
      }
    }
  };

  // // Modify Booking Date (UI only - no logic)
  const handleModifyBooking = (booking) => {
    Swal.fire({
      title: "Modify Booking Dates",
      html: `
        <div class="text-left">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Current Dates</label>
            <p class="text-gray-600">${new Date(
              booking.startDate
            ).toLocaleDateString()} - ${new Date(
        booking.endDate
      ).toLocaleDateString()}</p>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">New Start Date</label>
            <input type="date" id="startDate" class="w-full px-3 py-2 border rounded-lg">
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">New End Date</label>
            <input type="date" id="endDate" class="w-full px-3 py-2 border rounded-lg">
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Update Booking",
      cancelButtonText: "Cancel",
      focusConfirm: false,
      preConfirm: () => {
        return {
          startDate: document.getElementById("startDate").value,
          endDate: document.getElementById("endDate").value,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Updated!",
          "Your booking dates have been modified.",
          "success"
        );
      }
    });
  };

  // Change Status
  const handleStatusChange = async (id, previousStatus, status) => {
    console.log(id, previousStatus, status);
    if (previousStatus === status || previousStatus === "Accepted") {
      return toast.success("Not Allowed");
    }

    try {
      await axiosSecure.patch(`/update-booking-status/${id}`, { status });
    } catch (error) {
      console.log(error);
    }
    handleStatusChange();
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
            to="/available-cars"
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
            New Booking
          </Link>
        </div>
      </div>

      {/* Filter and Search Section */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Status Filter */}
          <div className="w-full md:w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Status
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option value="">All Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Date Range Filter */}
          <div className="w-full md:w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Date
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option value="">All Dates</option>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
              <option value="current">Current</option>
            </select>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-2/4 relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Bookings
            </label>
            <input
              type="text"
              placeholder="Search by car model, location..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
            <svg
              className="absolute left-3 bottom-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      {myBooking.length > 0 ? (
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
                {myBooking.map((booking) => (
                  <MyAllBookingCar
                    booking={booking}
                    key={booking._Id}
                    handleDeleteBooking={handleDeleteBooking}
                    handleModifyBooking={handleModifyBooking}
                    handleStatusChange={handleStatusChange}
                  />
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
            No bookings found
          </h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            You haven't made any bookings yet. Browse our available cars and
            make your first reservation today!
          </p>
          <Link
            to="/available-cars"
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
            Book a Car Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
