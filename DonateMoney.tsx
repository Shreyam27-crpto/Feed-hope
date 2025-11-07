import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { CreditCard, CheckCircle, AlertCircle } from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const DonateMoney = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState('monthly');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const donationAmount = parseFloat(amount);
    if (isNaN(donationAmount) || donationAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setLoading(true);

    try {
      // Load Razorpay script
      await loadRazorpayScript();

      // Create order
      const orderResponse = await api.post('/payment/create-order', {
        amount: donationAmount,
        isRecurring,
        recurringFrequency: isRecurring ? recurringFrequency : null,
      });

      const { orderId, key } = orderResponse.data;

      // Initialize Razorpay
      const options = {
        key: key || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderResponse.data.amount,
        currency: 'INR',
        name: 'Feed Hope',
        description: 'Food Relief Donation',
        order_id: orderId,
        handler: async (response: any) => {
          try {
            await api.post('/payment/verify', {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              amount: donationAmount,
            });
            setSuccess(true);
            setAmount('');
            setTimeout(() => {
              setSuccess(false);
            }, 5000);
          } catch (error: any) {
            setError(error.response?.data?.message || 'Payment verification failed');
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        theme: {
          color: '#22c55e',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to initiate payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <CreditCard className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Make a Monetary Donation
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Your contribution helps us feed the needy and reduce food waste
            </p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg flex items-center space-x-2 mb-6">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 px-4 py-3 rounded-lg flex items-center space-x-2 mb-6">
              <CheckCircle className="w-5 h-5" />
              <span>Thank you! Your donation was successful. A receipt has been sent to your email.</span>
            </div>
          )}

          <form onSubmit={handleDonate} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Donation Amount (₹)
              </label>
              <input
                type="number"
                required
                min="1"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setAmount('100')}
                  className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  ₹100
                </button>
                <button
                  type="button"
                  onClick={() => setAmount('500')}
                  className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  ₹500
                </button>
                <button
                  type="button"
                  onClick={() => setAmount('1000')}
                  className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  ₹1,000
                </button>
                <button
                  type="button"
                  onClick={() => setAmount('5000')}
                  className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  ₹5,000
                </button>
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Make this a recurring donation
                </span>
              </label>
            </div>

            {isRecurring && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Frequency
                </label>
                <select
                  value={recurringFrequency}
                  onChange={(e) => setRecurringFrequency(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold text-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Proceed to Payment'}
            </button>
          </form>

          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Note:</strong> Your payment is secure and processed through Razorpay. 
              A receipt will be sent to your registered email address after successful payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateMoney;

