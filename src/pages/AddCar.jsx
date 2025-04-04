import React from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const AddCar = () => {
  const axiosSecure = useAxiosSecure();
  const currentData = new Date();
  const { user } = useAuth();

  const handleAddCardForm = async (e) => {
    e.preventDefault();
    const form = e.target;
    const carModel = form.carModel.value;
    const dailyRentalPrice = form.dailyRentalPrice.value;
    const availability = form.availability.value;
    const vehicleRegistrationNumber = form.vehicleRegistrationNumber.value;
    const features = form.features.value;
    const carImage = form.carImage.value;
    const location = form.location.value;
    const description = form.description.value;

    const addCarData = {
      carModel,
      dailyRentalPrice,
      availability,
      vehicleRegistrationNumber,
      features,
      carImage,
      location,
      description,
      set_count: 0,
      currentData,
      buyer: {
        name: user?.displayName,
        email: user?.email,
      },
    };

    const { data } = await axiosSecure.post("/car-added", addCarData);
    console.log(data);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Add a New Car
        </h2>

        <form
          onSubmit={handleAddCardForm}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Car Model */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Car Model
            </label>
            <input
              type="text"
              name="carModel"
              className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="e.g., Toyota Camry 2023"
            />
          </div>

          {/* Daily Rental Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Daily Rental Price ($)
            </label>
            <input
              type="number"
              name="dailyRentalPrice"
              className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="e.g., 45"
            />
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Availability
            </label>
            <select
              name="availability"
              className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            >
              <option>Available</option>
              <option>Not Available</option>
            </select>
          </div>

          {/* Vehicle Registration Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Vehicle Registration Number
            </label>
            <input
              name="vehicleRegistrationNumber"
              type="text"
              className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="e.g., ABC123XYZ"
            />
          </div>

          {/* Features (Now as a Dropdown like Availability) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Features
            </label>
            <select
              name="features"
              className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            >
              <option>GPS</option>
              <option>AC</option>
              <option>Bluetooth</option>
              <option>Sunroof</option>
            </select>
          </div>

          {/* Booking Count */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Booking Count
            </label>
            <input
              type="number"
              className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
              value="0"
              readOnly
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              name="carImage"
              type="url"
              className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="e.g., https://example.com/car.jpg"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              name="location"
              type="text"
              className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="e.g., New York"
            />
          </div>

          {/* Description (Single Line, Full Width) */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              type="text"
              name="description"
              className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Describe the car..."
            />
          </div>

          {/* Submit Button (Full Width, Spanning Both Columns) */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Add Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
