import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../components/Loading";
import { Link } from "react-router-dom"; // Fixed import

const AllAvailableCars = () => {
  const [gridView, setGridView] = useState(false);

  const {
    data: cars = [],
    isLoading,
  } = useQuery({
    queryKey: ["cars"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/all-cars`
      );
      return data;
    },
  });

  if (isLoading) return <Loading />;
  

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Discover Our Available Cars
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore a wide range of cars available for rent. Choose your perfect
          ride for the journey ahead. Affordable, reliable, and ready when you
          are.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
        {/* Search */}
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search by model, brand, or location..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
          />
          <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* View Toggle & Sort */}
        <div className="flex items-center gap-4">
          {/* Toggle Button */}
          <div className="flex bg-gray-100 rounded-full border border-gray-300 overflow-hidden">
            <button
              onClick={() => setGridView(false)}
              className={`p-2 ${
                !gridView ? "bg-white text-blue-600" : "text-gray-500"
              } hover:bg-blue-100 transition`}
              aria-label="Grid View"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setGridView(true)}
              className={`p-2 ${
                gridView ? "bg-white text-blue-600" : "text-gray-500"
              } hover:bg-blue-100 transition`}
              aria-label="List View"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 pl-4 pr-10 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 text-sm">
              <option value="">Sort By</option>
              <option value="highest">Highest Price</option>
              <option value="lowest">Lowest Price</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.14.98l-4.25 4.65a.75.75 0 01-1.1 0L5.2 8.25a.75.75 0 01.02-1.04z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Cars Grid/List */}
      <div
        className={`grid gap-8 ${
          gridView ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {cars.map((car) => (
          <div
            key={car._id}
            className={`bg-white border border-gray-200 rounded-xl overflow-hidden shadow hover:shadow-lg transition ${
              gridView ? "flex flex-col sm:flex-row items-center" : ""
            }`}
          >
            {/* Image */}
            <div
              className={`${
                gridView ? "w-full sm:w-40 h-48 sm:h-28" : "h-48"
              } bg-gray-100 overflow-hidden`}
            >
              <img
                src={
                  car.image ||
                  "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                }
                alt={car.carModel}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div
              className={`p-4 flex flex-col ${
                gridView
                  ? "sm:flex-row sm:justify-between sm:items-center w-full"
                  : ""
              }`}
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {car.carModel}
                </h3>
                <p className="text-sm text-gray-500">
                  {car.year || "2022"} • {car.location || "New York"}
                </p>
                <p className="text-base font-bold text-blue-600 mt-1">
                  ${car.dailyRentalPrice} /day
                </p>
              </div>

              <div className={`${gridView ? "sm:mt-0 mt-4" : "mt-4"}`}>
                <Link
                  to={`/car-details/${car._id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-4 rounded-full text-sm font-medium transition"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAvailableCars;
