import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LoadScript, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { Shirt, Book, Home, Utensils, Heart, MapPin, Phone, Mail } from 'lucide-react';

const ShareItems = () => {
  const [selectedOffice, setSelectedOffice] = useState<number | null>(null);

  // Shareable items categories
  const shareableItems = [
    {
      id: 1,
      category: 'Clothing',
      icon: Shirt,
      color: 'bg-blue-500',
      items: [
        'Winter coats and jackets',
        'Warm sweaters and hoodies',
        'Shirts and t-shirts',
        'Pants and jeans',
        'Dresses and skirts',
        'Shoes and boots',
        'Hats, gloves, and scarves',
        'Children\'s clothing',
        'Baby clothes and accessories',
        'Underwear and socks (new only)'
      ],
      description: 'Clean, gently used clothing in good condition can make a huge difference for families in need. All items should be washed and free of stains or tears.'
    },
    {
      id: 2,
      category: 'Books',
      icon: Book,
      color: 'bg-purple-500',
      items: [
        'Children\'s books',
        'Textbooks and educational materials',
        'Fiction and non-fiction books',
        'Cookbooks',
        'Reference books',
        'Magazines (recent issues)',
        'Comic books and graphic novels',
        'Language learning books',
        'Religious texts',
        'Activity books and coloring books'
      ],
      description: 'Books help educate and entertain. Donate books in good condition that can be enjoyed by others. Educational materials are especially valuable.'
    },
    {
      id: 3,
      category: 'Household Items',
      icon: Home,
      color: 'bg-orange-500',
      items: [
        'Kitchen utensils and cookware',
        'Dishes, plates, and bowls',
        'Bedding and blankets',
        'Towels and bath linens',
        'Small appliances (working condition)',
        'Furniture (small items)',
        'Cleaning supplies',
        'Storage containers',
        'Home decor items',
        'Tools and hardware'
      ],
      description: 'Household items help families set up and maintain their homes. Items should be clean, functional, and in good working condition.'
    },
    {
      id: 4,
      category: 'Food Items',
      icon: Utensils,
      color: 'bg-green-500',
      items: [
        'Non-perishable canned goods',
        'Dry pasta and rice',
        'Cereal and breakfast items',
        'Baby formula and food',
        'Snacks and treats',
        'Cooking oils and spices',
        'Beverages (non-alcoholic)',
        'Frozen foods (if properly stored)',
        'Fresh produce (when available)',
        'Baked goods (day of)'
      ],
      description: 'Food donations should be unexpired and properly sealed. We accept both perishable and non-perishable items to help feed families.'
    }
  ];

  // Office locations
  const officeLocations = [
    {
      id: 1,
      name: 'Main Office - Downtown',
      address: '123 Main Street, Downtown District',
      city: 'New York, NY 10001',
      phone: '+1 (555) 123-4567',
      email: 'downtown@feedhope.org',
      hours: 'Mon-Fri: 9 AM - 6 PM, Sat: 10 AM - 4 PM',
      position: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: 2,
      name: 'North Branch Office',
      address: '456 Oak Avenue, North Side',
      city: 'New York, NY 10025',
      phone: '+1 (555) 123-4568',
      email: 'north@feedhope.org',
      hours: 'Mon-Fri: 9 AM - 5 PM, Sat: 10 AM - 3 PM',
      position: { lat: 40.7900, lng: -73.9600 }
    },
    {
      id: 3,
      name: 'South Community Center',
      address: '789 Elm Street, South District',
      city: 'New York, NY 10014',
      phone: '+1 (555) 123-4569',
      email: 'south@feedhope.org',
      hours: 'Mon-Fri: 8 AM - 7 PM, Sat-Sun: 9 AM - 5 PM',
      position: { lat: 40.7300, lng: -74.0100 }
    },
    {
      id: 4,
      name: 'East Side Collection Point',
      address: '321 Pine Road, East Side',
      city: 'New York, NY 10016',
      phone: '+1 (555) 123-4570',
      email: 'east@feedhope.org',
      hours: 'Mon-Sat: 10 AM - 6 PM',
      position: { lat: 40.7500, lng: -73.9800 }
    },
    {
      id: 5,
      name: 'West Distribution Hub',
      address: '654 Maple Drive, West End',
      city: 'New York, NY 10023',
      phone: '+1 (555) 123-4571',
      email: 'west@feedhope.org',
      hours: 'Mon-Fri: 9 AM - 6 PM',
      position: { lat: 40.7800, lng: -73.9900 }
    }
  ];

  const mapContainerStyle = {
    width: '100%',
    height: '500px'
  };

  const center = {
    lat: 40.7580,
    lng: -73.9855
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Share More Than Food
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Beyond food, we accept clothing, books, and household items. Your donations help families in need build better lives.
        </p>
      </div>

      {/* Shareable Items Categories */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {shareableItems.map((category) => {
          const IconComponent = category.icon;
          return (
            <div
              key={category.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition"
            >
              <div className="flex items-center mb-4">
                <div className={`${category.color} p-3 rounded-lg mr-4`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {category.category}
                </h2>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {category.description}
              </p>

              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Items We Accept:
                </h3>
                <ul className="space-y-1">
                  {category.items.map((item, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                      <Heart className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Donation Guidelines */}
      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Donation Guidelines
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">✓ What We Accept:</h3>
            <ul className="space-y-1 text-gray-600 dark:text-gray-400 text-sm">
              <li>• Clean, gently used items in good condition</li>
              <li>• Items free of stains, tears, or damage</li>
              <li>• Working appliances and electronics</li>
              <li>• Unexpired food items</li>
              <li>• Items that can be safely used by others</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">✗ What We Cannot Accept:</h3>
            <ul className="space-y-1 text-gray-600 dark:text-gray-400 text-sm">
              <li>• Items that are broken or non-functional</li>
              <li>• Expired food or opened packages</li>
              <li>• Items with safety hazards</li>
              <li>• Recalled products</li>
              <li>• Items that require special disposal</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Office Locations Map */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Find Our Nearest Offices
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Visit any of our locations to drop off your donations. All offices accept food, clothing, books, and household items.
        </p>
      </div>

      {/* Office List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {officeLocations.map((office) => (
          <div
            key={office.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition cursor-pointer"
            onClick={() => setSelectedOffice(office.id)}
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {office.name}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start">
                <MapPin className="w-4 h-4 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <div className="text-gray-600 dark:text-gray-400">
                  <p>{office.address}</p>
                  <p>{office.city}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">{office.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">{office.email}</span>
              </div>
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-500">{office.hours}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Google Map */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={12}
          >
            {officeLocations.map((office) => (
              <Marker
                key={office.id}
                position={office.position}
                onClick={() => setSelectedOffice(office.id)}
                label={{
                  text: office.name,
                  color: '#22c55e',
                  fontWeight: 'bold'
                }}
              >
                {selectedOffice === office.id && (
                  <InfoWindow
                    onCloseClick={() => setSelectedOffice(null)}
                  >
                    <div className="p-2">
                      <h3 className="font-bold text-gray-900 mb-2">{office.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">{office.address}</p>
                      <p className="text-sm text-gray-600 mb-1">{office.city}</p>
                      <p className="text-sm text-gray-600 mb-1">{office.phone}</p>
                      <p className="text-sm text-gray-600">{office.hours}</p>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            ))}
          </GoogleMap>
        </LoadScript>
      </div>

      {/* Call to Action */}
      <div className="mt-12 bg-green-600 text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Donate?</h2>
        <p className="text-green-100 mb-6 text-lg">
          Your donations make a real difference. Visit any of our offices or contact us to schedule a pickup for large items.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition"
          >
            Contact Us
          </Link>
          <Link
            to="/register"
            className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Become a Donor
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShareItems;

