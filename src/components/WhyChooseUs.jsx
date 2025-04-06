import {
  FiCheckCircle,
  FiDollarSign,
  FiClock,
  FiHeadphones,
} from "react-icons/fi";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Title with animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Why Choose Our Service
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the difference with our premium car rental solutions
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-gray-50 p-6 rounded-xl border border-gray-200"
          >
            <div className="text-blue-600 mb-4">
              <FiCheckCircle className="text-4xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Verified Fleet
            </h3>
            <p className="text-gray-600">
              All vehicles undergo rigorous 150-point inspections
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -5 }}
            className="bg-gray-50 p-6 rounded-xl border border-gray-200"
          >
            <div className="text-green-600 mb-4">
              <FiDollarSign className="text-4xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              No Hidden Fees
            </h3>
            <p className="text-gray-600">
              Transparent pricing with all taxes included
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ y: -5 }}
            className="bg-gray-50 p-6 rounded-xl border border-gray-200"
          >
            <div className="text-purple-600 mb-4">
              <FiClock className="text-4xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Quick Booking
            </h3>
            <p className="text-gray-600">Reserve your car in just 2 minutes</p>
          </motion.div>

          {/* Feature 4 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ y: -5 }}
            className="bg-gray-50 p-6 rounded-xl border border-gray-200"
          >
            <div className="text-red-600 mb-4">
              <FiHeadphones className="text-4xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              24/7 Support
            </h3>
            <p className="text-gray-600">
              Dedicated assistance anytime, anywhere
            </p>
          </motion.div>
        </div>

        {/* Animated CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all hover:bg-blue-700">
            Explore Our Fleet
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
