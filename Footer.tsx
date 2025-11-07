import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-green-400 mb-4">Feed Hope</h3>
            <p className="text-gray-400">
              Together, we can end hunger and reduce food waste. Join us in making a difference.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-green-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-400 hover:text-green-400 transition">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-green-400 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-green-400 transition">
                  Join Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Get Involved</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/register?role=donor" className="text-gray-400 hover:text-green-400 transition">
                  Donate Food
                </Link>
              </li>
              <li>
                <Link to="/register?role=volunteer" className="text-gray-400 hover:text-green-400 transition">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-gray-400 hover:text-green-400 transition">
                  Monetary Donation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-green-400" />
                <span className="text-gray-400">info@feedhope.org</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-green-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-green-400" />
                <span className="text-gray-400">123 Main St, City, State 12345</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Feed Hope. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

