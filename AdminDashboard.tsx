import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import {
  Users,
  Package,
  DollarSign,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  Edit,
  Trash2,
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [donations, setDonations] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
    fetchDonations();
    fetchUsers();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/admin/dashboard');
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDonations = async () => {
    try {
      const response = await api.get('/donations/food');
      setDonations(response.data);
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleApproveDonation = async (id: string, volunteerId?: string) => {
    try {
      await api.put(`/admin/donations/${id}/approve`, {
        status: 'approved',
        assignedVolunteer: volunteerId,
      });
      fetchDonations();
      fetchDashboardData();
    } catch (error) {
      alert('Failed to approve donation');
    }
  };

  const handleRejectDonation = async (id: string) => {
    try {
      await api.put(`/admin/donations/${id}/approve`, { status: 'rejected' });
      fetchDonations();
      fetchDashboardData();
    } catch (error) {
      alert('Failed to reject donation');
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

  const chartData = {
    labels: dashboardData.statusBreakdown?.map((s: any) => s._id) || [],
    datasets: [
      {
        label: 'Donations',
        data: dashboardData.statusBreakdown?.map((s: any) => s.count) || [],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(234, 179, 8, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome, {user?.name}. Manage donations, users, and track analytics.
        </p>
      </div>

      <div className="flex space-x-4 mb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'overview'
              ? 'text-green-600 dark:text-green-400 border-b-2 border-green-600'
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('donations')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'donations'
              ? 'text-green-600 dark:text-green-400 border-b-2 border-green-600'
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          Donations
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'users'
              ? 'text-green-600 dark:text-green-400 border-b-2 border-green-600'
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          Users
        </button>
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Total Donors</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {dashboardData.stats.totalDonors}
                  </p>
                </div>
                <Users className="w-12 h-12 text-blue-500" />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Total Volunteers</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {dashboardData.stats.totalVolunteers}
                  </p>
                </div>
                <Users className="w-12 h-12 text-green-500" />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Total Donations</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {dashboardData.stats.totalDonations}
                  </p>
                </div>
                <Package className="w-12 h-12 text-orange-500" />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Meals Distributed</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {dashboardData.stats.mealsDistributed}
                  </p>
                </div>
                <TrendingUp className="w-12 h-12 text-purple-500" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Donation Status Breakdown
              </h3>
              <Doughnut data={chartData} />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Recent Donations
              </h3>
              <div className="space-y-3">
                {dashboardData.recentDonations?.slice(0, 5).map((donation: any) => (
                  <div
                    key={donation._id}
                    className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {donation.foodType}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {donation.donorId?.name}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        donation.status === 'delivered'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {donation.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'donations' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            All Donations
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Food Type</th>
                  <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Donor</th>
                  <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Quantity</th>
                  <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Status</th>
                  <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => (
                  <tr
                    key={donation._id}
                    className="border-b border-gray-200 dark:border-gray-700"
                  >
                    <td className="py-3 px-4 text-gray-900 dark:text-white">
                      {donation.foodType}
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {donation.donorId?.name || 'N/A'}
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {donation.quantity}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          donation.status === 'delivered'
                            ? 'bg-green-100 text-green-800'
                            : donation.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {donation.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        {donation.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApproveDonation(donation._id)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleRejectDonation(donation._id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            All Users
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Name</th>
                  <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Email</th>
                  <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Role</th>
                  <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((userItem) => (
                  <tr
                    key={userItem._id}
                    className="border-b border-gray-200 dark:border-gray-700"
                  >
                    <td className="py-3 px-4 text-gray-900 dark:text-white">
                      {userItem.name}
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {userItem.email}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                        {userItem.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {new Date(userItem.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

