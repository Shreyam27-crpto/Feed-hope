# Feed Hope - Community Food Relief & Management System

A full-stack web application connecting donors, volunteers, and NGOs to reduce food waste and feed the needy.

## 🌟 Features

- **Role-based Authentication**: Donors, Volunteers, and Admin/NGO roles
- **Food Donation System**: Submit food donations with pickup location using Google Maps
- **Monetary Donations**: Secure payment integration with Razorpay
- **Volunteer Management**: Track volunteer hours, points, and assigned donations
- **Admin Dashboard**: Comprehensive analytics, user management, and donation tracking
- **Community Page**: Blog posts, testimonials, gallery, and newsletter subscription
- **Contact System**: Contact form with Google Maps integration
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Mobile-friendly interface

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Chart.js for analytics visualization
- Google Maps API for location services
- Axios for API calls

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Razorpay for payments
- Nodemailer for email notifications
- Cloudinary for image uploads (optional)

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Google Maps API Key
- Razorpay Account (for payments)
- Email account for SMTP (Gmail recommended)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   cd "Mini Project"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/foodrelief
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   RAZORPAY_KEY_ID=your-razorpay-key-id
   RAZORPAY_KEY_SECRET=your-razorpay-key-secret
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   GOOGLE_MAPS_API_KEY=your-google-maps-api-key
   ```

   Create a `.env` file in the root for frontend (or use Vite env variables):
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
   VITE_RAZORPAY_KEY_ID=your-razorpay-key-id
   ```

4. **Start MongoDB**
   
   If using local MongoDB:
   ```bash
   mongod
   ```
   
   Or use MongoDB Atlas and update `MONGODB_URI` in `.env`

5. **Start the backend server**
   ```bash
   npm run dev:server
   ```
   
   Or for production:
   ```bash
   npm run server
   ```

6. **Start the frontend development server** (in a new terminal)
   ```bash
   npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
Mini Project/
├── server/
│   ├── index.js              # Express server entry point
│   ├── models/              # MongoDB models
│   │   ├── User.js
│   │   ├── FoodDonation.js
│   │   ├── MonetaryDonation.js
│   │   ├── Contact.js
│   │   └── Community.js
│   ├── routes/              # API routes
│   │   ├── auth.js
│   │   ├── donations.js
│   │   ├── volunteers.js
│   │   ├── admin.js
│   │   ├── contact.js
│   │   ├── community.js
│   │   └── payment.js
│   ├── middleware/          # Custom middleware
│   │   └── auth.js
│   └── utils/               # Utility functions
│       └── email.js
├── src/
│   ├── components/          # React components
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── pages/               # Page components
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── DonorDashboard.tsx
│   │   ├── VolunteerDashboard.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── DonateMoney.tsx
│   │   ├── Community.tsx
│   │   └── Contact.tsx
│   ├── context/             # React context
│   │   └── AuthContext.tsx
│   ├── utils/               # Utility functions
│   │   └── api.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
└── README.md
```

## 🔐 User Roles

1. **Donor**: Can submit food donations and make monetary donations
2. **Volunteer**: Can view assigned donations and update their status
3. **Admin/NGO**: Full access to manage users, donations, and view analytics

## 🎨 Features Overview

### Home Page
- Hero section with call-to-action
- Impact counters (meals, donors, volunteers, food saved)
- Mission statement
- Quick access buttons

### Authentication
- Role-based registration
- JWT-based login
- Protected routes
- Profile management

### Donor Dashboard
- Submit food donations with Google Maps location picker
- View donation status
- Track donation history

### Volunteer Dashboard
- View assigned donations
- Update donation status (picked up, delivered)
- Track volunteer hours and points

### Admin Dashboard
- Analytics with charts
- Manage all users
- Approve/reject donations
- View comprehensive statistics

### Monetary Donations
- Razorpay integration
- One-time and recurring donations
- Email receipts

### Community Page
- Blog posts (admin can create)
- Testimonials
- Gallery
- Newsletter subscription

### Contact Page
- Contact form
- Google Maps showing location
- Contact information

## 🔧 Configuration

### Google Maps API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Maps JavaScript API
4. Create API key and add to `.env`

### Razorpay Setup
1. Sign up at [Razorpay](https://razorpay.com/)
2. Get your Key ID and Key Secret from dashboard
3. Add to `.env` file

### Email Configuration (Gmail)
1. Enable 2-factor authentication
2. Generate App Password
3. Use App Password in `SMTP_PASS`

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Set environment variables in your hosting platform
2. Update `MONGODB_URI` to use MongoDB Atlas
3. Deploy the server folder

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables in hosting platform

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Donations
- `POST /api/donations/food` - Create food donation
- `GET /api/donations/food` - Get all donations
- `GET /api/donations/food/:id` - Get single donation
- `PUT /api/donations/food/:id/status` - Update donation status

### Volunteers
- `GET /api/volunteers/dashboard` - Get volunteer dashboard
- `GET /api/volunteers/available-donations` - Get available donations

### Admin
- `GET /api/admin/dashboard` - Get admin dashboard
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id` - Update user

### Payment
- `POST /api/payment/create-order` - Create payment order
- `POST /api/payment/verify` - Verify payment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Icons by Lucide React
- Charts by Chart.js
- Maps by Google Maps API
- Payments by Razorpay

## 📞 Support

For support, email info@feedhope.org or create an issue in the repository.

---

**Feed Hope, Not Waste** 🌱❤️

