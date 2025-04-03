import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Section 1: About Next Zen */}
        <div className="footer-section">
          <h3 className="text-2xl font-bold mb-4">Next Zen</h3>
          <p className="text-gray-400">
            A platform to fund your dreams and support creative ideas.
          </p>
        </div>

        {/* Section 2: Quick Links */}
        <div className="footer-section">
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="text-gray-400 hover:text-secondary transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/allCampaign"
                className="text-gray-400 hover:text-secondary transition duration-300"
              >
                All Campaigns
              </Link>
            </li>
            <li>
              <Link
                to="/addCampaign"
                className="text-gray-400 hover:text-secondary transition duration-300"
              >
                Add New Campaign
              </Link>
            </li>
            <li>
              <Link
                to="/myCampaign"
                className="text-gray-400 hover:text-secondary transition duration-300"
              >
                My Campaigns
              </Link>
            </li>
            <li>
              <Link
                to="/myDonations"
                className="text-gray-400 hover:text-secondary transition duration-300"
              >
                My Donations
              </Link>
            </li>
          </ul>
        </div>

        {/* Section 3: Contact Us */}
        <div className="footer-section">
          <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
          <p className="text-gray-400">Email: support@crowdcube.com</p>
          <p className="text-gray-400">Phone: +880 123 456 789</p>
          <p className="text-gray-400">
            Address: 123 Dream Street, Dhaka, Bangladesh
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Next Zen. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
