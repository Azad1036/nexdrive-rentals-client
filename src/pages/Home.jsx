import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    /* Main Banner Container - Full width */
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      
      {/* Background Layer - Premium car image */}
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center bg-no-repeat"
        aria-hidden="true"
      />
      
      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content Layer - Centered with shadow effects */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-4">
        
        {/* Motivational Heading */}
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight max-w-3xl drop-shadow-lg">
          Drive Your Dreams Today!
          {/* Alternative: Your Next Car Awaits You */}
        </h1>
        
        {/* Call-to-Action Button */}
        <Link
          href="#available-cars" 
          className="px-12 py-4 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold rounded-lg shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          View Available Cars
        </Link>
      </div>
    </section>
  );
};

export default Banner;