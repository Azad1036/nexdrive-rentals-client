import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AllAvailableCars = () => {
  const [gridView, setGridView] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const axiosSecure = useAxiosSecure();

  // Debounce search term to avoid rapid API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // Adjust debounce delay as needed

    return () => clearTimeout(timeoutId); // Cleanup on searchTerm change
  }, [searchTerm]);

  const { data: cars = [], isLoading } = useQuery({
    queryKey: ["cars", debouncedSearchTerm], // Use debounced search term for better performance
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `${
          import.meta.env.VITE_API_URL
        }/all-cars?searchTerm=${debouncedSearchTerm}`
      );
      return data;
    },
  });

  // Filter and sort cars
  const filteredCars = cars.sort((a, b) => {
    if (sortOption === "highest")
      return b.dailyRentalPrice - a.dailyRentalPrice;
    if (sortOption === "lowest") return a.dailyRentalPrice - b.dailyRentalPrice;
    return 0;
  });

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Discover Our <span className="text-blue-600">Premium</span> Fleet
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find your perfect ride from our curated collection of vehicles.
          Whether for business or leisure, we have the right car for your
          journey.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 bg-white p-4 rounded-xl shadow-sm">
        {/* Search */}
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search by model, brand, or location..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full shadow-sm"
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on change
            value={searchTerm} // Bind searchTerm to the input field
          />
          <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <CiSearch />
          </div>
        </div>

        {/* View Toggle & Sort */}
        <div className="flex items-center gap-4">
          {/* Toggle Button */}
          <div className="flex bg-gray-100 rounded-full border border-gray-200 overflow-hidden shadow-inner">
            <button
              onClick={() => setGridView(true)}
              className={`p-2 ${
                gridView
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 hover:bg-gray-200"
              } transition`}
              aria-label="Grid View"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setGridView(false)}
              className={`p-2 ${
                !gridView
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 hover:bg-gray-200"
              } transition`}
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
            <select
              className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
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

      {/* Results Count */}
      <div className="mb-6 text-sm text-gray-500">
        Showing {filteredCars.length}{" "}
        {filteredCars.length === 1 ? "car" : "cars"}
      </div>

      {/* Cars Grid/List */}
      {filteredCars.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-700">No cars found</h3>
          <p className="text-gray-500 mt-2">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div
          className={`gap-6 ${
            gridView
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "space-y-4"
          }`}
        >
          {filteredCars.map((car) => (
            <div
              key={car._id}
              className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition transform hover:-translate-y-1 ${
                !gridView ? "flex flex-col sm:flex-row" : ""
              }`}
            >
              {/* Image */}
              <div
                className={`relative ${
                  gridView ? "h-48" : "h-48 sm:h-32 sm:w-48 flex-shrink-0"
                }`}
              >
                <img
                  src={
                    car?.carImage ||
                    "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  }
                  alt={car.carModel}
                  className="w-full h-full object-cover"
                />
                {car?.availability && (
                  <div className="absolute top-3 left-3 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full">
                    {car.availability}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className={`p-5 ${!gridView ? "sm:flex-grow" : ""}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {car.carModel}
                    </h3>
                    <p className="text-sm text-gray-500">
                      -{car.vehicleRegistrationNumber || "2022"} •{" "}
                      {car.location || "New York"}
                    </p>
                  </div>
                  <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    Count : {car?.set_count || "0"}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">
                      ${car.dailyRentalPrice}
                      <span className="text-sm font-normal text-gray-500">
                        {" "}
                        /day
                      </span>
                    </p>
                  </div>
                  <Link
                    to={`/car-details/${car._id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-full text-sm font-medium transition inline-flex items-center"
                  >
                    Book Now
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllAvailableCars;
