import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { formatISO } from "date-fns";
import { toast } from "react-toastify";

const CarDetails = () => {
  const carDetailsData = useLoaderData();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const email = user?.email;
  const formattedTime = new Date();
  const bookingCurrentDate = formatISO(formattedTime);
  const navigate = useNavigate();

  const {
    _id: carId,
    carImage,
    carModel,
    dailyRentalPrice,
    availability,
    vehicleRegistrationNumber,
    features,
    location,
    description,
    status,
    buyer,
  } = carDetailsData;

  const bookingData = {
    carId,
    carModel,
    dailyRentalPrice,
    bookingCurrentDate,
    vehicleRegistrationNumber,
    carImage,
    status,
    updateDate: "",
    email,
    buyer: buyer.email,
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (userBookingData) => {
      await axiosSecure.post("/my-booking", userBookingData);
    },
    onSuccess: () => {
      Swal.fire({
        title: "Booked!",
        text: "Your car is reserved.",
        icon: "success",
      });
      navigate("/my-bookings");
    },
    onError: (error) => {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "You Already Booking This Car",
        icon: "error",
      });
    },
  });

  const handleConfirmation = async () => {
    const result = await Swal.fire({
      title: "Book this car?",
      text: "Ready to roll?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Book!",
    });

    if (user.email === buyer.email) {
      return toast("Are You Not Allow Your Car Booking");
    }

    if (result.isConfirmed) {
      try {
        await mutateAsync(bookingData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Full-Width Image */}
      <div className="relative w-full h-64 md:h-80 bg-gray-100 rounded-xl overflow-hidden mb-6 shadow-md">
        <img
          src={
            carImage ||
            "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          }
          alt={carModel}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {carModel}
          </h1>
          <p className="text-lg font-semibold text-white">
            ${dailyRentalPrice}/day
          </p>
        </div>
        <span
          className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
            availability === "Available"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {availability}
        </span>
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Features */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Features</h2>
          <ul className="space-y-2 mb-6">
            {features && features.length > 0 ? (
              features.map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <span className="mr-2 text-indigo-500">✔</span>
                  {item}
                </li>
              ))
            ) : (
              <li className="text-gray-600">No features listed.</li>
            )}
          </ul>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Description
            </h2>
            <p className="text-gray-700 break-words">
              {description || "No description available."}
            </p>
          </div>
        </div>

        {/* Right: Info & Booking */}
        <div className="md:col-span-1 flex flex-col">
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm flex-grow">
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Location</p>
                <p className="text-gray-800">{location || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Registration
                </p>
                <p className="text-gray-800">
                  {vehicleRegistrationNumber || "N/A"}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={handleConfirmation}
            disabled={availability === "Not Available"}
            className={`mt-4 w-full py-2 px-4 rounded-lg font-medium text-white transition-all duration-300 ${
              availability === "Available"
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {availability === "Available" ? "Book Now" : "Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
