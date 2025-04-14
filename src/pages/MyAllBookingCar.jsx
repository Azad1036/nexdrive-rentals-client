import { format, parseISO, isBefore } from "date-fns";
import { useRef } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyAllBookingCar = ({
  booking,
  handleDeleteBooking,
  handleStatusChange,
}) => {
  const axiosSecure = useAxiosSecure();

  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  // Modify Booking Date (UI only - no logic)
  const handleModifyBooking = async (booking) => {
    const startDate = startDateRef.current.value;
    const endDate = endDateRef.current.value;

    // Check if startDate and endDate are valid
    if (!startDate || !endDate) {
      alert("❌ Please select both start and end dates.");
      return;
    }

    const bookingDate = new Date(booking.bookingCurrentDate);
    const start = parseISO(startDate);
    const end = parseISO(endDate);

    // Validate if the dates are valid
    if (isNaN(start)) {
      alert("❌ Invalid start date.");
      return;
    }
    if (isNaN(end)) {
      alert("❌ Invalid end date.");
      return;
    }

    // Validate Start Date: Start date cannot be before the booking date
    if (isBefore(start, bookingDate)) {
      alert(
        `❌ Start date cannot be before your booking date: ${format(
          bookingDate,
          "yyyy-MM-dd"
        )}`
      );
      return;
    }

    // Validate End Date: End date cannot be before start date
    if (isBefore(end, start)) {
      alert("❌ End date cannot be before start date.");
      return;
    }

    // Valid dates - convert to ISO 8601 format
    const formattedStartDate = format(start, "yyyy-MM-dd'T'HH:mm:ssXXX");
    const formattedEndDate = format(end, "yyyy-MM-dd'T'HH:mm:ssXXX");

    try {
      // Sending the PATCH request to the server
      const response = await axiosSecure.patch(
        `/update-booking-date/${booking._id}`,
        { bookingCurrentDate: formattedStartDate, updateDate: formattedEndDate }
      );
      toast.success("Update");

      if (response.status === 200) {
        // console.log("✅ Booking Updated Successfully:", response.data);

        // Show toast on successful update
        toast.success("Booking updated successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error updating booking:", error);
    }

    // Close modal
    document.getElementById("my_modal_1").close();
  };

  // Date Formation
  const formattedDate = format(
    new Date(booking?.bookingCurrentDate),
    "MMMM dd, yyyy"
  );

  const updateDates = booking?.updateDate
    ? format(new Date(booking.updateDate), "MMMM dd, yyyy")
    : "Not Available";

  return (
    <>
      <ToastContainer />
      <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-5">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-24 flex-shrink-0 rounded-md overflow-hidden border border-gray-200">
              <img
                className="h-full w-full object-cover"
                src={booking.carImage}
                alt={booking.carModel}
              />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {booking.carModel}
              </div>
              <div className="text-sm text-gray-500">
                VRN - {booking.vehicleRegistrationNumber}
              </div>
            </div>
          </div>
        </td>
        <td className="px-6 py-5">
          <div className="text-sm text-gray-900 font-medium">
            {formattedDate} - {updateDates}
          </div>
          <div className="text-sm text-gray-500">
            {booking.totalDays} days rental
          </div>
        </td>
        <td className="px-6 py-5">
          <div className="text-lg font-bold text-gray-900">
            ${booking.dailyRentalPrice}
          </div>
          <div className="text-xs text-gray-500">incl. taxes & fees</div>
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
              onClick={() => document.getElementById("my_modal_1").showModal()}
              className={`text-blue-600 hover:text-blue-900 flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors ${
                booking.status === "Accepted" && "cursor-not-allowed"
              }`}
              disabled={booking.status === "Accepted"}
            >
              <FaRegEdit />
              Modify
            </button>
            <button
              onClick={() =>
                handleStatusChange(booking._id, booking.status, "Canceled")
              }
              className={`text-red-600 hover:text-red-900 flex items-center gap-1 bg-red-50 px-3 py-1.5 rounded-md hover:bg-red-100 transition-colors ${
                booking.status === "Accepted" && "cursor-not-allowed"
              }`}
            >
              <FaTrashAlt />
              Cancel
            </button>

            <button
              onClick={() => handleDeleteBooking(booking._id)}
              className={`text-red-600 hover:text-red-900 flex items-center gap-1 bg-red-50 px-3 py-1.5 rounded-md hover:bg-red-100 transition-colors ${
                booking.status === "Accepted" && "cursor-not-allowed"
              }`}
              disabled={booking.status === "Accepted"}
            >
              <FaTrashAlt />
              Delete
            </button>
          </div>
        </td>
      </tr>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Modify Booking Dates</h3>

          <form method="dialog" className="space-y-4">
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700"
              >
                Start Date
              </label>
              <input
                ref={startDateRef}
                type="date"
                id="startDate"
                name="startDate"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700"
              >
                End Date
              </label>
              <input
                ref={endDateRef}
                type="date"
                id="endDate"
                name="endDate"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>

            <div className="modal-action">
              <button
                onClick={() => handleModifyBooking(booking)}
                className="btn btn-primary"
              >
                Save Changes
              </button>
              <button className="btn">Close</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default MyAllBookingCar;
