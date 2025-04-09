import { format } from "date-fns";
import { FaTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

const MyAllBookingCar = ({
  booking,
  handleDeleteBooking,
  handleModifyBooking,
  handleStatusChange,
}) => {
  // Date Formation
  const formattedDate = format(
    new Date(booking?.bookingCurrentDate),
    "MMMM dd, yyyy HH:mm:ss"
  );

  return (
    <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-5">
        <div className="flex items-center">
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
          {formattedDate} - {formattedDate}
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
            onClick={() => handleModifyBooking(booking)}
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
  );
};

export default MyAllBookingCar;
