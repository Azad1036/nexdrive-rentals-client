import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

const SpecialOffers = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Exclusive Special Offers
          </h2>
          <p className="text-lg text-gray-600">
            Limited-time deals to upgrade your driving experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Offer Card 1 */}
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          >
            <div className="p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Weekend Getaway Special</h3>
              <p className="mb-4">Get 15% off all rentals from Friday to Sunday</p>
              <div className="flex justify-between items-center">
                <span className="font-medium">Starts at $39/day</span>
                <button className="flex items-center bg-emerald-300 bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all hover:scale-105">
                  Book Now <FiArrowRight className="ml-2 transform transition-all hover:translate-x-1" />
                </button>
              </div>
              <div className="mt-3 text-xs opacity-80">Expires: Dec 31, 2023</div>
            </div>
          </motion.div>

          {/* Offer Card 2 */}
          <motion.div
            className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
          >
            <div className="p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Luxury Experience</h3>
              <p className="mb-4">Premium cars at just $99/day this season</p>
              <div className="flex justify-between items-center">
                <span className="font-medium">Limited time offer</span>
                <button className="flex items-center bg-emerald-300 bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all hover:scale-105">
                  Reserve Yours <FiArrowRight className="ml-2 transform transition-all hover:translate-x-1" />
                </button>
              </div>
              <div className="mt-3 text-xs opacity-80">Expires: Dec 25, 2023</div>
            </div>
          </motion.div>

          {/* Offer Card 3 */}
          <motion.div
            className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.6 }}
          >
            <div className="p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Monthly Rental Deal</h3>
              <p className="mb-4">Save 20% when you rent for 30+ days</p>
              <div className="flex justify-between items-center">
                <span className="font-medium">All vehicle classes</span>
                <button className="flex items-center bg-emerald-300 bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all hover:scale-105">
                  Learn More <FiArrowRight className="ml-2 transform transition-all hover:translate-x-1" />
                </button>
              </div>
              <div className="mt-3 text-xs opacity-80">Expires: Jan 15, 2024</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
