import React, { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddCar = () => {
  const axiosSecure = useAxiosSecure();
  const currentData = new Date();
  const { user } = useAuth();
  const navigation = useNavigate();

  const [features, setFeatures] = useState([]);

  const { mutateAsync } = useMutation({
    mutationFn: async (addCarData) => {
      await axiosSecure.post("/car-added", addCarData);
    },
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "Your car has been added successfully.",
        icon: "success",
        position: "center",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });

      navigation("/my-cars");
    },
    onError: () => {
      console.log(364);
    },
  });

  const handleAddCardForm = async (e) => {
    e.preventDefault();
    const form = e.target;
    const carModel = form.carModel.value;
    const dailyRentalPrice = form.dailyRentalPrice.value;
    const availability = form.availability.value;
    const vehicleRegistrationNumber = form.vehicleRegistrationNumber.value;
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

    try {
      await mutateAsync(addCarData);
    } catch (error) {
      toas
    }
  };

  const handleFeatureChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setFeatures([...features, value]);
    } else {
      setFeatures(features.filter((item) => item !== value));
    }
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

          {/* Features (Now in Single Line) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Features
            </label>
            <div className="mt-2 flex gap-4 flex-wrap">
              <div className="flex items-center">
                <input
                  onChange={handleFeatureChange}
                  id="feature-gps"
                  name="features"
                  type="checkbox"
                  value="GPS"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="feature-gps"
                  className="ml-2 text-sm text-gray-700"
                >
                  GPS
                </label>
              </div>
              <div className="flex items-center">
                <input
                  onChange={handleFeatureChange}
                  id="feature-ac"
                  name="features"
                  type="checkbox"
                  value="AC"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="feature-ac"
                  className="ml-2 text-sm text-gray-700"
                >
                  AC
                </label>
              </div>
              <div className="flex items-center">
                <input
                  onChange={handleFeatureChange}
                  id="feature-bluetooth"
                  name="features"
                  type="checkbox"
                  value="Bluetooth"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="feature-bluetooth"
                  className="ml-2 text-sm text-gray-700"
                >
                  Bluetooth
                </label>
              </div>
              <div className="flex items-center">
                <input
                  onChange={handleFeatureChange}
                  id="feature-sunroof"
                  name="features"
                  type="checkbox"
                  value="Sunroof"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="feature-sunroof"
                  className="ml-2 text-sm text-gray-700"
                >
                  Sunroof
                </label>
              </div>
            </div>
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
