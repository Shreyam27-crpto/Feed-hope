import { useState, useEffect } from 'react';
import api from '../utils/api';
import { Calendar, User, Eye, Mail, Clock, Award } from 'lucide-react';

const Community = () => {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // NGO Team Members
  const ngoTeamMembers = [
    {
      id: 1,
      name: 'Dr. Robert Thompson',
      position: 'Executive Director',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Oversees all operations, strategic planning, and partnerships. Leads the organization\'s mission to reduce food waste and feed communities.',
      tenure: '5 years',
      joinDate: '2019-01-15',
      achievements: 'Led expansion to 10 cities'
    },
    {
      id: 2,
      name: 'Maria Garcia',
      position: 'Program Coordinator',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Manages food donation programs, coordinates with donors and volunteers, and ensures smooth distribution operations.',
      tenure: '4 years',
      joinDate: '2020-03-20',
      achievements: 'Coordinated 500+ donations'
    },
    {
      id: 3,
      name: 'Ahmed Hassan',
      position: 'Volunteer Manager',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Recruits, trains, and manages volunteers. Organizes volunteer schedules and ensures all food drives are properly staffed.',
      tenure: '3 years',
      joinDate: '2021-06-10',
      achievements: 'Managed 200+ volunteers'
    },
    {
      id: 4,
      name: 'Jennifer Lee',
      position: 'Community Outreach Specialist',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Builds relationships with local communities, restaurants, and businesses. Organizes awareness campaigns and fundraising events.',
      tenure: '2.5 years',
      joinDate: '2021-09-05',
      achievements: 'Partnered with 50+ businesses'
    },
    {
      id: 5,
      name: 'Carlos Rodriguez',
      position: 'Logistics Coordinator',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Handles transportation, storage, and distribution logistics. Ensures food safety standards and timely delivery to recipients.',
      tenure: '3.5 years',
      joinDate: '2020-11-12',
      achievements: 'Delivered 10,000+ meals'
    },
    {
      id: 6,
      name: 'Priya Patel',
      position: 'Data & Analytics Manager',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Tracks donations, impact metrics, and program effectiveness. Creates reports and analyzes data to improve operations.',
      tenure: '2 years',
      joinDate: '2022-02-18',
      achievements: 'Tracked 1M+ meals distributed'
    },
    {
      id: 7,
      name: 'Michael O\'Brien',
      position: 'Fundraising Manager',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Develops fundraising strategies, manages donor relationships, and organizes charity events to support our mission.',
      tenure: '1.5 years',
      joinDate: '2022-08-22',
      achievements: 'Raised $500K+ in donations'
    },
    {
      id: 8,
      name: 'Sofia Martinez',
      position: 'Communications Director',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Manages social media, website content, and public relations. Shares success stories and keeps the community engaged.',
      tenure: '1 year',
      joinDate: '2023-01-10',
      achievements: 'Grew social media by 300%'
    }
  ];

  // Default success stories with images
  const defaultSuccessStories = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Food Donor',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      storyImage: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      content: 'I started donating leftover food from my restaurant three months ago. We\'ve fed over 500 families! Seeing the smiles on people\'s faces makes it all worth it.',
      location: 'New York, USA',
      impact: '500+ families fed'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Volunteer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      storyImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      content: 'I\'ve been volunteering for 6 months now. Every weekend, I help distribute food to shelters. The community support has been incredible, and we\'ve reduced food waste by 40% in our area.',
      location: 'Los Angeles, USA',
      impact: '40% waste reduction'
    },
    {
      id: 3,
      name: 'Priya Sharma',
      role: 'Community Organizer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      storyImage: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      content: 'Our community kitchen has been running for a year now. We collect food from local markets and restaurants, and serve hot meals to 200+ people daily. This platform made it so easy to coordinate!',
      location: 'Mumbai, India',
      impact: '200+ daily meals'
    },
    {
      id: 4,
      name: 'David Martinez',
      role: 'Restaurant Owner',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      storyImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      content: 'We used to throw away so much food. Now, through Feed Hope, we donate everything we can\'t use. It\'s helped us reduce costs and make a real difference in our neighborhood.',
      location: 'Chicago, USA',
      impact: '2 tons saved monthly'
    },
    {
      id: 5,
      name: 'Emma Wilson',
      role: 'Event Coordinator',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      storyImage: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      content: 'After our corporate events, we always have leftover food. Feed Hope connected us with local shelters. Now every event ends with a donation, and we\'ve fed thousands of people!',
      location: 'London, UK',
      impact: '1000+ meals donated'
    },
    {
      id: 6,
      name: 'James Anderson',
      role: 'NGO Director',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      storyImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      content: 'Feed Hope has transformed how we operate. The platform makes it easy to coordinate with donors and volunteers. We\'ve doubled our food distribution capacity in just 3 months!',
      location: 'Toronto, Canada',
      impact: '2x distribution capacity'
    }
  ];

  // Default Gallery Items with Community Work Images
  const defaultGallery = [
    {
      id: 1,
      title: 'Community Food Drive',
      description: 'Volunteers distributing food packages to families in need during our monthly community food drive.',
      images: ['https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      eventDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'Restaurant Partnership Event',
      description: 'Local restaurants donating surplus food to our organization. Building partnerships for sustainable food rescue.',
      images: ['https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      eventDate: '2024-02-10'
    },
    {
      id: 3,
      title: 'Volunteer Training Session',
      description: 'New volunteers learning about food safety and distribution procedures. Empowering our community to make a difference.',
      images: ['https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      eventDate: '2024-02-28'
    },
    {
      id: 4,
      title: 'School Food Program',
      description: 'Delivering nutritious meals to local schools. Ensuring children have access to healthy food every day.',
      images: ['https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      eventDate: '2024-03-05'
    },
    {
      id: 5,
      title: 'Community Kitchen Setup',
      description: 'Setting up our new community kitchen facility. A place where volunteers prepare meals for distribution.',
      images: ['https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      eventDate: '2024-03-20'
    },
    {
      id: 6,
      title: 'Awareness Campaign',
      description: 'Raising awareness about food waste and hunger in our community. Education is key to making lasting change.',
      images: ['https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      eventDate: '2024-04-12'
    },
    {
      id: 7,
      title: 'Senior Center Meal Service',
      description: 'Volunteers serving hot meals to seniors at the community center. Bringing warmth and nutrition to our elders.',
      images: ['https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      eventDate: '2024-04-25'
    },
    {
      id: 8,
      title: 'Food Sorting & Packaging',
      description: 'Dedicated volunteers sorting and packaging donated food items. Every item is carefully checked for quality and safety.',
      images: ['https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      eventDate: '2024-05-08'
    },
    {
      id: 9,
      title: 'Mobile Food Distribution',
      description: 'Our mobile food truck bringing fresh produce and meals directly to underserved neighborhoods.',
      images: ['https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
      eventDate: '2024-05-18'
    }
  ];

  useEffect(() => {
    fetchBlogPosts();
    fetchTestimonials();
    fetchGallery();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await api.get('/community/blog');
      setBlogPosts(response.data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };

  const fetchTestimonials = async () => {
    try {
      const response = await api.get('/community/testimonials');
      setTestimonials(response.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  const fetchGallery = async () => {
    try {
      const response = await api.get('/community/gallery');
      setGallery(response.data);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/community/newsletter', { email: newsletterEmail });
      setNewsletterSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSuccess(false), 5000);
    } catch (error) {
      console.error('Error subscribing:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Community
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Stories, updates, and events from our community
        </p>
      </div>

      {/* Blog Posts */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Latest Updates
        </h2>
        {blogPosts.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <div
                key={post._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{post.author?.name || 'Admin'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{post.views || 0}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                    {post.content.substring(0, 150)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Success Stories */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Success Stories
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(testimonials.length > 0 ? testimonials : defaultSuccessStories).map((story: any, index: number) => (
            <div
              key={story._id || story.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
            >
              {/* Story Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={story.storyImage || story.image || 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                  alt={story.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Success Story
                </div>
              </div>
              
              {/* Story Content */}
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={story.image || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'}
                    alt={story.name}
                    className="w-12 h-12 rounded-full mr-3 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {story.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {story.role}
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                  "{story.content}"
                </p>
                
                {story.location && (
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span className="mr-2">📍</span>
                    <span>{story.location}</span>
                  </div>
                )}
                
                {story.impact && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                      Impact: {story.impact}
                    </p>
                  </div>
                )}
                
                {story.rating && (
                  <div className="mt-4 flex">
                    {[...Array(story.rating || 5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NGO Team Members */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Our NGO Team
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Meet the dedicated team members who work tirelessly to make our mission a reality. 
            Each member brings unique skills and passion to help feed communities and reduce food waste.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ngoTeamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
            >
              {/* Member Image */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                  }}
                />
                {/* Tenure Badge */}
                <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{member.tenure}</span>
                </div>
              </div>
              
              {/* Member Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-green-600 dark:text-green-400 font-semibold mb-3">
                  {member.position}
                </p>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {member.description}
                </p>
                
                {/* Tenure Details */}
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-500 mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Joined {new Date(member.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </div>
                
                {/* Achievements */}
                {member.achievements && (
                  <div className="flex items-start text-sm">
                    <Award className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {member.achievements}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Gallery
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {(gallery.length > 0 ? gallery : defaultGallery).map((item: any) => (
            <div
              key={item._id || item.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.images && item.images.length > 0 ? item.images[0] : 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                  alt={item.title}
                  className="w-full h-full object-cover transition transform hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                  }}
                />
                {item.eventDate && (
                  <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {new Date(item.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
                    {item.description}
                  </p>
                )}
                {item.eventDate && (
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{new Date(item.eventDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-green-600 text-white rounded-lg p-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-green-100 mb-6">
            Subscribe to our newsletter to receive updates about our activities and events.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex gap-4">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center space-x-2"
            >
              <Mail className="w-5 h-5" />
              <span>Subscribe</span>
            </button>
          </form>
          {newsletterSuccess && (
            <p className="mt-4 text-green-100">Thank you for subscribing!</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Community;

