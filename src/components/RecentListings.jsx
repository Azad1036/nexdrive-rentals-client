import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";

const RecentListings = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: listings = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cars"],
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get(
          `${import.meta.env.VITE_API_URL}/recent-allCars`
        );
        return data;
      } catch (error) {
        throw new Error("Failed to fetch listings");
      }
    },
  });

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="text-red-600 text-center">
        Something went wrong while fetching the listings. Please try again
        later.
      </div>
    );

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Recent Listings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((car) => (
            <div
              key={car._id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <div className="relative">
                <img
                  src={car.carImage || "/path/to/default-image.jpg"} // Fallback image in case of missing image
                  alt={car.carModel || "Car Image"} // Fallback alt text
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                />
                {car.features && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                    Featured
                  </div>
                )}
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  {car.posted}
                </div>
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {car.carModel}
                  </h3>
                  <span className="text-lg font-bold text-red-600">
                    ${car.dailyRentalPrice}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      car.availability === "Available"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {car.availability}
                  </span>
                  <span>Booked {car.set_count} times</span>
                </div>

                <div>
                  <Link
                    to={`/car-details/${car._id}`}
                    className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-center inline-block transition-colors duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentListings;
