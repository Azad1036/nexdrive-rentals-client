import React from "react";

const Banner = () => {
  return (
    <div className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute w-full h-full bg-[url('https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-center bg-cover bg-no-repeat z-10"></div>

      {/* Overlay */}
      <div className="absolute w-full h-full bg-black/40 z-20"></div>

      {/* Content */}
      <div className="relative z-30 h-full flex flex-col justify-center items-center text-center px-5">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg mb-8 leading-tight max-w-4xl">
          Drive Your Dreams Today!
        </h1>
        <button className="px-10 py-4 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold rounded shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          View Available Cars
        </button>
      </div>
    </div>
  );
};

export default Banner;
