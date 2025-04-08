import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../components/Loading";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const UpdateCar = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [features, setFeatures] = useState([]);
  const navigate = useNavigate();

  // Update Cars Data Get From Database
  const { data: updateCar, isLoading } = useQuery({
    queryKey: ["myCars", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/update-car/${id}`
      );
      return data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (updateData) => {
      await axiosSecure.put(`/update-car-details/${id}`, updateData);
    },
    onSuccess: () => {
      Swal.fire({
        title: "Updated!",
        text: "Your car details have been updated.",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });
      navigate("/my-cars");
    },
    onError: () => {
      Swal.fire(
        "Error!",
        "There was a problem updating your car details.",
        "error"
      );
    },
  });

  const handleUpdateCardForm = async (e) => {
    e.preventDefault();
    const form = e.target;
    const carModel = form.carModel.value;
    const dailyRentalPrice = form.dailyRentalPrice.value;
    const availability = form.availability.value;
    const vehicleRegistrationNumber = form.vehicleRegistrationNumber.value;
    const carImage = form.carImage.value;
    const location = form.location.value;
    const description = form.description.value;

    const updateCarData = {
      carModel,
      dailyRentalPrice,
      availability,
      vehicleRegistrationNumber,
      features,
      carImage,
      location,
      description,
    };
    console.log(updateCarData);

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone. Do you want to proceed with updating?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      try {
        await mutateAsync(updateCarData);
      } catch (error) {
        toast.error(error.message || "Something went wrong. Try again.");
      }
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

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Update Car Details
        </h2>

        <form onSubmit={handleUpdateCardForm} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Car Model */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Car Model
              </label>
              <input
                defaultValue={updateCar?.carModel}
                type="text"
                name="carModel"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Toyota Camry 2023"
                required
              />
            </div>
            {/* Daily Rental Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Daily Rental Price ($)
              </label>
              <input
                defaultValue={updateCar?.dailyRentalPrice}
                type="number"
                name="dailyRentalPrice"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="45"
                required
              />
            </div>
            {/* Availability */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Availability
              </label>
              <select
                defaultValue={updateCar?.availability}
                name="availability"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option>Available</option>
                <option>Not Available</option>
              </select>
            </div>
            {/* Vehicle Registration Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Registration Number
              </label>
              <input
                defaultValue={updateCar?.vehicleRegistrationNumber}
                name="vehicleRegistrationNumber"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ABC123XYZ"
                required
              />
            </div>

            {/* Features */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Features
              </label>
              <div className="flex flex-wrap gap-4">
                {["GPS", "AC", "Bluetooth", "Sunroof"].map((feature) => (
                  <div key={feature} className="flex items-center">
                    <input
                      onChange={handleFeatureChange}
                      id={`feature-${feature.toLowerCase()}`}
                      name="features"
                      type="checkbox"
                      value={feature}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`feature-${feature.toLowerCase()}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {feature}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Count */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Booking Count
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                value={updateCar?.set_count || 0}
                readOnly
              />
            </div>
            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                defaultValue={updateCar?.carImage}
                name="carImage"
                type="url"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/car.jpg"
                required
              />
            </div>
            {/* Location */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                defaultValue={updateCar?.location}
                name="location"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="New York"
                required
              />
            </div>
            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                defaultValue={updateCar?.description}
                name="description"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the car..."
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
            >
              Update Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCar;
