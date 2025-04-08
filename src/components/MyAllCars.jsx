import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing the icons
import { format } from "date-fns";

const MyAllCars = ({ carlist, handleDeleteMyCar }) => {
  // Ensure carlist is available
  if (!carlist) return null; // If carlist is undefined or null, return nothing

  const {
    _id,
    carModel,
    dailyRentalPrice,
    availability,
    carImage,
    currentData,
  } = carlist;

  const formattedDate = format(new Date(currentData), "MMMM dd, yyyy");
  // const formattedDate = format(new Date(currentData), "MMMM dd, yyyy HH:mm:ss");

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-10 w-16">
          <img
            className="h-10 w-16 rounded object-cover"
            src={carImage}
            alt="Car"
          />
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{carModel}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">${dailyRentalPrice}/day</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{0}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            availability === "Available"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {availability}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formattedDate}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Link
          to={`/update-car-details/${_id}`}
          className="text-blue-600 hover:text-blue-900 mr-4"
        >
          <FaEdit className="inline-block mr-1" /> Update{" "}
          {/* Using edit icon */}
        </Link>
        <button
          onClick={() => handleDeleteMyCar(_id)}
          className="text-red-600 hover:text-red-900"
        >
          <FaTrash className="inline-block mr-1" /> Delete{" "}
          {/* Using trash icon */}
        </button>
      </td>
    </tr>
  );
};

export default MyAllCars;
