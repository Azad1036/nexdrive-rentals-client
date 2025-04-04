import { useLoaderData } from "react-router-dom";

const CarDetails = () => {
  const carDetailsData = useLoaderData();
  const {
    carModel,
    dailyRentalPrice,
    availability,
    features,
    carImage,
    location,
    description,
    vehicleRegistrationNumber,
  } = carDetailsData;

  // const car = {
  //   model: "Toyota Camry 2023",
  //   dailyPrice: 45,
  //   availability: true,
  //   features: [
  //     "GPS Navigation",
  //     "Bluetooth",
  //     "Air Conditioning",
  //     "Backup Camera",
  //   ],
  //   description:
  //     "The Toyota Camry offers a comfortable ride with excellent fuel economy. Perfect for city driving and long trips alike.",
  //   imageUrl: "https://example.com/camry.jpg",
  //   location: "Downtown Branch",
  //   bookingCount: 12,
  //   registrationNumber: "CAM2023XYZ",
  // };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Car Image Section */}
        <div className="lg:w-1/2">
          <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img
              src={carImage}
              alt={carModel}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>

          {/* Additional Images Thumbnails */}
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-gray-200 h-20 rounded cursor-pointer"
              ></div>
            ))}
          </div>
        </div>

        {/* Car Details Section */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{carModel}</h1>

          {/* Price and Availability */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-2xl font-semibold">
                ${dailyRentalPrice}
              </span>
              <span className="text-gray-600">/day</span>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                { availability }
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {availability ? "Available Now" : "Currently Unavailable"}
            </span>
          </div>

          {/* Key Features */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Features</h2>
            <ul className="grid grid-cols-2 gap-2">
              {/* {features.map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  {item}
                </li>
              ))} */}
            </ul>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-gray-700">{description}</p>
          </div>

          {/* Additional Information */}
          <div className="border-t border-gray-200 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                <p>{location}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Registration Number
                </h3>
                <p>{vehicleRegistrationNumber}</p>
              </div>
            </div>
          </div>

          {/* Book Now Button */}
          <button className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition duration-200">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
