import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { Clock, MapPin, Package, CheckCircle, Award, TrendingUp } from 'lucide-react';

const VolunteerDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/volunteers/dashboard');
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (donationId: string, status: string) => {
    try {
      await api.put(`/donations/food/${donationId}/status`, { status });
      fetchDashboardData();
    } catch (error) {
      alert('Failed to update status');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!dashboardData) {
    return <div>Error loading dashboard</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome, {dashboardData.volunteer.name}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your volunteer activities and contributions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Assigned</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {dashboardData.stats.totalAssigned}
              </p>
            </div>
            <Package className="w-12 h-12 text-blue-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Completed</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {dashboardData.stats.completed}
              </p>
            </div>
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Volunteer Hours</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {dashboardData.volunteer.volunteerHours || 0}
              </p>
            </div>
            <Clock className="w-12 h-12 text-orange-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Points</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {dashboardData.volunteer.volunteerPoints || 0}
              </p>
            </div>
            <Award className="w-12 h-12 text-purple-500" />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Assigned Donations
        </h2>
        {dashboardData.assignedDonations.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">No assigned donations yet.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {dashboardData.assignedDonations.map((donation: any) => (
              <div
                key={donation._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {donation.foodType}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Quantity: {donation.quantity}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      donation.status === 'delivered'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : donation.status === 'picked_up'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}
                  >
                    {donation.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>{donation.pickupAddress}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(donation.pickupTime).toLocaleString()}</span>
                  </div>
                </div>
                {donation.donorId && (
                  <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Donor:</strong> {donation.donorId.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Contact:</strong> {donation.donorId.email}
                      {donation.donorId.phone && ` | ${donation.donorId.phone}`}
                    </p>
                  </div>
                )}
                <div className="flex space-x-4">
                  {donation.status === 'assigned' && (
                    <button
                      onClick={() => updateStatus(donation._id, 'picked_up')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                    >
                      Mark as Picked Up
                    </button>
                  )}
                  {donation.status === 'picked_up' && (
                    <button
                      onClick={() => updateStatus(donation._id, 'delivered')}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                    >
                      Mark as Delivered
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerDashboard;

