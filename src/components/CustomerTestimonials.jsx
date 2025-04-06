import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Rahim Uddin",
    comment:
      "Fantastic experience! The car was clean, well-maintained, and the service was super quick!",
    location: "Dhaka, Bangladesh",
  },
  {
    name: "Amina Sultana",
    comment:
      "Affordable pricing and no hidden charges. Highly recommend for city travel!",
    location: "Chittagong, Bangladesh",
  },
  {
    name: "Junaid Ahmed",
    comment:
      "Their support team was very responsive. I needed to extend my booking and they handled it smoothly.",
    location: "Sylhet, Bangladesh",
  },
];

const CustomerTestimonials = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real stories from real customers who experienced our service
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
            >
              <div className="text-blue-500 mb-4">
                <FaQuoteLeft className="text-3xl" />
              </div>
              <p className="text-gray-700 mb-4 italic">“{t.comment}”</p>
              <div>
                <h4 className="text-md font-semibold text-gray-800">
                  {t.name}
                </h4>
                <p className="text-sm text-gray-500">{t.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;
