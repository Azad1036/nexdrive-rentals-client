// MyCars.jsx
import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const MyCars = () => {
  const { user } = useAuth();

  // My Cars Data Get From Database
  const { data: myCarList, isLoading } = useQuery({
    queryKey: ["myCars", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/my-carList/${user?.email}`
      );
      return data;
    },
  });


  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header section with title and add button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Cars</h1>
        <a
          href="/add-car"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          {/* FontAwesome icon with label */}
          <i className="fas fa-plus mr-2"></i> Add New Car
        </a>
      </div>

      {/* Sorting dropdown */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Sort by:</span>
          {/* Select dropdown for sorting options */}
          <select className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="date-desc">Date Added (Newest First)</option>
            <option value="date-asc">Date Added (Oldest First)</option>
            <option value="price-asc">Price (Lowest First)</option>
            <option value="price-desc">Price (Highest First)</option>
          </select>
        </div>
      </div>

      {/* Table for listing cars */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {/* Table column headers */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Model
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Daily Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bookings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Availability
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Added
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Dynamic row rendering using map */}
              {myCarList?.map((carlist, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* Car image */}
                    <div className="flex-shrink-0 h-10 w-16">
                      <img
                        className="h-10 w-16 rounded object-cover"
                        src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=500&q=60"
                        alt="Car"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* Car model */}
                    <div className="text-sm font-medium text-gray-900">
                      Toyota Camry 2021
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* Price per day */}
                    <div className="text-sm text-gray-900">$45/day</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* Total bookings */}
                    <div className="text-sm text-gray-900">12</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* Availability status */}
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Available
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {/* Date added */}
                    May 15, 2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {/* Action buttons */}
                    <Link
                      to={`/update-car-details/${carlist._id}`}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Update
                    </Link>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Optional: Empty state UI */}
      <div className="text-center py-12 bg-white rounded-lg shadow-sm hidden">
        {/* Empty icon */}
        <i className="fas fa-car text-4xl text-gray-300 mb-4"></i>
        {/* Empty message */}
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No cars added yet
        </h3>
        <p className="text-gray-500 mb-4">
          Start by adding your first car to the platform
        </p>
        <a
          href="/add-car"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md inline-flex items-center"
        >
          <i className="fas fa-plus mr-2"></i> Add Car
        </a>
      </div>
    </div>
  );
};

export default MyCars;
