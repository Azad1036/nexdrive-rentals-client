import React from "react";

const RecentListings = () => {
  const listings = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      model: "Toyota Camry 2023",
      price: "$45/day",
      availability: "Available",
      bookingCount: 12,
      posted: "Added 2 days ago",
      featured: false,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      model: "Ford Mustang GT 2022",
      price: "$89/day",
      availability: "Available",
      bookingCount: 8,
      posted: "Added 1 week ago",
      featured: true,
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      model: "Honda Civic 2023",
      price: "$38/day",
      availability: "Booked",
      bookingCount: 15,
      posted: "Added 3 days ago",
      featured: false,
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      model: "Tesla Model 3 2023",
      price: "$75/day",
      availability: "Available",
      bookingCount: 5,
      posted: "Added 5 days ago",
      featured: false,
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      model: "Chevrolet Tahoe 2022",
      price: "$65/day",
      availability: "Available",
      bookingCount: 7,
      posted: "Added 1 day ago",
      featured: true,
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      model: "BMW X5 2023",
      price: "$95/day",
      availability: "Available",
      bookingCount: 3,
      posted: "Added 4 days ago",
      featured: false,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Recent Listings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <div className="relative">
                <img
                  src={car.image}
                  alt={car.model}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                />
                {car.featured && (
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
                    {car.model}
                  </h3>
                  <span className="text-lg font-bold text-red-600">
                    {car.price}
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
                  <span>Booked {car.bookingCount} times</span>
                </div>

                <button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentListings;
