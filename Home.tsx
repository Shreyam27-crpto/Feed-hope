import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, Users, Utensils, TrendingUp, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../utils/api';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [stats, setStats] = useState({
    mealsDistributed: 0,
    donors: 0,
    volunteers: 0,
    foodSaved: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const donationsRes = await api.get('/donations/public-stats');
        const donations = donationsRes.data;

        setStats({
          mealsDistributed: donations.deliveredDonations * 10 || 12500,
          donors: 250,
          volunteers: 150,
          foodSaved: donations.deliveredDonations * 5 || 6250,
        });
      } catch (error) {
        // Use default stats if API fails
        setStats({
          mealsDistributed: 12500,
          donors: 250,
          volunteers: 150,
          foodSaved: 6250,
        });
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative text-white py-20 md:py-32 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('war of hunger1.jpg')`,
          }}
        >
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Together, We Can End Hunger
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-md text-white/95">
            Feed Hope, Not Waste. Join our mission to reduce food waste and feed the needy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/register?role=donor"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition transform hover:scale-105 shadow-lg"
                >
                  Donate Food
                </Link>
                <Link
                  to="/register?role=volunteer"
                  className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-semibold transition transform hover:scale-105 shadow-lg"
                >
                  Join as Volunteer
                </Link>
              </>
            ) : (
              <Link
                to={isAuthenticated ? '/donate' : '/register'}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition transform hover:scale-105 shadow-lg"
              >
                Make a Donation
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Impact Counters */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {stats.mealsDistributed.toLocaleString()}+
              </h3>
              <p className="text-gray-600 dark:text-gray-400">Meals Distributed</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {stats.donors}+
              </h3>
              <p className="text-gray-600 dark:text-gray-400">Donors</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {stats.volunteers}+
              </h3>
              <p className="text-gray-600 dark:text-gray-400">Volunteers</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {stats.foodSaved.toLocaleString()}+
              </h3>
              <p className="text-gray-600 dark:text-gray-400">Kg Food Saved</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We connect donors, volunteers, and NGOs to reduce food waste and ensure
              that no one goes hungry. Every donation, every volunteer hour, and every
              meal matters.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="text-green-600 dark:text-green-400 text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Reduce Waste
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We rescue surplus food from restaurants, events, and households before
                it goes to waste.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="text-orange-600 dark:text-orange-400 text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Feed the Needy
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We distribute rescued food to shelters, community centers, and families
                in need.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="text-blue-600 dark:text-blue-400 text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Build Community
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We bring together people who care about making a positive impact in
                their communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="order-2 md:order-1">
              <img
                src="/images/cta-image.jpg"
                alt="Community helping others"
                className="w-full h-64 md:h-80 object-cover rounded-lg shadow-xl"
                onError={(e) => {
                  // Fallback to a placeholder if image doesn't exist
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
                }}
              />
            </div>
            {/* Content */}
            <div className="order-1 md:order-2 text-center md:text-left">
              <h2 className="text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
              <p className="text-xl mb-8 text-green-100">
                Join thousands of people who are already making an impact.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-semibold transition transform hover:scale-105"
              >
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

