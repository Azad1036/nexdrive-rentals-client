import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import companyLogo from "../assets/NexDrive-Rentals-Logo.svg";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div className="flex flex-col items-start space-y-4">
          <div className="flex items-center space-x-3">
            <img src={companyLogo} alt="Logo" className="h-12 w-12 rounded-full" />
            <span className="text-2xl font-bold text-teal-400">NexDrive Rentals</span>
          </div>
          <p className="text-sm text-gray-400">
            Drive your dreams with NexDrive. Book premium cars at affordable prices anytime, anywhere.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-3">
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <a href="/" className="hover:text-teal-400 transition">Home</a>
          <a href="/available-cars" className="hover:text-teal-400 transition">Available Cars</a>
          <a href="/add-car" className="hover:text-teal-400 transition">Add Car</a>
          <a href="/my-bookings" className="hover:text-teal-400 transition">My Bookings</a>
        </div>

        {/* Social & Contact */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold text-white mb-2">Connect With Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" className="text-gray-400 hover:text-teal-400">
              <FaFacebookF size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" className="text-gray-400 hover:text-teal-400">
              <FaTwitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" className="text-gray-400 hover:text-teal-400">
              <FaInstagram size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" className="text-gray-400 hover:text-teal-400">
              <FaLinkedinIn size={20} />
            </a>
          </div>
          <p className="text-sm text-gray-400">Email: support@nexdrive.com</p>
          <p className="text-sm text-gray-400">Phone: +880 1234-567890</p>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} NexDrive Rentals. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
