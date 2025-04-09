import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ErrorPage = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4 transition-opacity duration-1000 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Error Image or GIF */}
      <img
        src="https://media.giphy.com/media/UoeaPqYrimha6rdTFV/giphy.gif" // You can replace this with any other gif or local image
        alt="404 Not Found"
        className="w-80 h-auto mb-6"
      />

      <h1 className="text-6xl font-bold text-red-500 mb-2">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-500 mb-6">
        The page you are looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-teal-500 text-white rounded-md text-lg font-medium hover:bg-teal-600 transition-all duration-300 transform hover:scale-105 shadow-md"
      >
        🔙 Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
