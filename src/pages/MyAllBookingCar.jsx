import { format } from "date-fns";

const MyAllBookingCar = ({
  booking,
  handleDeleteBooking,
  handleModifyBooking,
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
          {formattedDate} - {new Date(booking.endDate).toLocaleDateString()}
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
            className="text-blue-600 hover:text-blue-900 flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Modify
          </button>
          <button
            onClick={() => handleDeleteBooking(booking._id)}
            className="text-red-600 hover:text-red-900 flex items-center gap-1 bg-red-50 px-3 py-1.5 rounded-md hover:bg-red-100 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Cancel
          </button>
        </div>
      </td>
    </tr>
  );
};

export default MyAllBookingCar;
