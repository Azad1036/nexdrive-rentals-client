import useAuth from "../hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  const {
    data: myBooking = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["booking", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
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
      // console.log("Mutation successful, invalidating queries...");
      queryClient.invalidateQueries({ queryKey: ["booking", user?.email] });
      refetch(); // Trigger refetch after mutation
      Swal.fire({
        title: "Deleted",
        text: "Your booking has been removed.",
        icon: "success",
      });
    },
    onError: () => {
      console.error("Error occurred during deletion");
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

  // Change Status
  const handleStatusChange = async (id, previousStatus, status) => {
    // console.log(id, previousStatus, status);
    if (previousStatus === "Accepted") {
      return toast.success("Not Allowed");
    }

    try {
      await axiosSecure.patch(`/update-booking-status/${id}`, { status });
    } catch (error) {
      // console.log(error);
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
          <Link
            to="/booking-Chart"
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
            Booking Chart
          </Link>
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
