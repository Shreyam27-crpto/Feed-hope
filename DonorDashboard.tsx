import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { Plus, MapPin, Clock, Package, CheckCircle, XCircle, Loader } from 'lucide-react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const DonorDashboard = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    foodType: '',
    quantity: '',
    description: '',
    pickupAddress: '',
    pickupTime: '',
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    if (user?.id) {
      fetchDonations();
    }
  }, [user?.id]);

  const fetchDonations = async () => {
    try {
      const response = await api.get('/donations/food?donorId=' + user?.id);
      setDonations(response.data);
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };

  const handleMapClick = (e: any) => {
    if (e.latLng) {
      setFormData({
        ...formData,
        latitude: e.latLng.lat(),
        longitude: e.latLng.lng(),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/donations/food', {
        ...formData,
        pickupLocation: {
          latitude: formData.latitude,
          longitude: formData.longitude,
        },
      });
      setShowForm(false);
      setFormData({
        foodType: '',
        quantity: '',
        description: '',
        pickupAddress: '',
        pickupTime: '',
        latitude: 0,
        longitude: 0,
      });
      fetchDonations();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to create donation');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'picked_up':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'approved':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome, {user?.name}!
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition"
        >
          <Plus className="w-5 h-5" />
          <span>New Donation</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Donate Food
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Food Type *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="e.g., Cooked meals, Vegetables, Fruits"
                  value={formData.foodType}
                  onChange={(e) => setFormData({ ...formData, foodType: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Quantity *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="e.g., 10 meals, 5 kg"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Pickup Address *
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={formData.pickupAddress}
                onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Pickup Time *
              </label>
              <input
                type="datetime-local"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={formData.pickupTime}
                onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 mb-2">
                Select Pickup Location on Map *
              </label>
              <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}>
                <GoogleMap
                  mapContainerStyle={{ height: '300px', width: '100%' }}
                  center={{ lat: 28.6139, lng: 77.2090 }}
                  zoom={10}
                  onClick={handleMapClick}
                >
                  {formData.latitude !== 0 && (
                    <Marker position={{ lat: formData.latitude, lng: formData.longitude }} />
                  )}
                </GoogleMap>
              </LoadScript>
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Donation'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          My Donations
        </h2>
        {donations.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">No donations yet. Start by making your first donation!</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {donations.map((donation) => (
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
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      donation.status
                    )}`}
                  >
                    {donation.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                {donation.description && (
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {donation.description}
                  </p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>{donation.pickupAddress}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>
                      {new Date(donation.pickupTime).toLocaleString()}
                    </span>
                  </div>
                </div>
                {donation.assignedVolunteer && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Assigned Volunteer: {donation.assignedVolunteer.name}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorDashboard;

