# Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Environment Variables

Create a `.env` file in the root directory with at minimum:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/foodrelief
JWT_SECRET=your-super-secret-jwt-key-change-this
```

**Optional but recommended:**
```env
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

### Step 3: Start MongoDB

**Option A: Local MongoDB**
```bash
# Make sure MongoDB is installed and running
mongod
```

**Option B: MongoDB Atlas (Cloud)**
- Sign up at https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get connection string and update `MONGODB_URI` in `.env`

### Step 4: Start the Backend Server

In one terminal:
```bash
npm run dev:server
```

You should see: `Server running on port 5000` and `MongoDB Connected`

### Step 5: Start the Frontend

In another terminal:
```bash
npm run dev
```

You should see: `Local: http://localhost:5173`

### Step 6: Open the Application

Visit: http://localhost:5173

## 🎯 First Steps After Launch

1. **Create an Admin Account**
   - Go to Register page
   - Select "NGO/Organization" role
   - Complete registration

2. **Create Test Accounts**
   - Register as a Donor
   - Register as a Volunteer

3. **Test Features**
   - Submit a food donation (as Donor)
   - Approve donation (as Admin)
   - Assign to volunteer (as Admin)
   - Update status (as Volunteer)

## 🔧 Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check `MONGODB_URI` in `.env`
- For Atlas: Check IP whitelist and connection string

### Port Already in Use
- Change `PORT` in `.env` to a different port (e.g., 5001)
- Update frontend API URL if needed

### CORS Errors
- Make sure backend is running on port 5000
- Check that frontend proxy is configured in `vite.config.ts`

### Google Maps Not Loading
- Get API key from Google Cloud Console
- Enable Maps JavaScript API
- Add to `.env` as `GOOGLE_MAPS_API_KEY`

### Payment Not Working
- Set up Razorpay account
- Add test keys to `.env`
- For production, use live keys

## 📝 Default Test Credentials

After creating accounts, you can test with:
- **Admin**: Any account with role "ngo" or "admin"
- **Donor**: Any account with role "donor"
- **Volunteer**: Any account with role "volunteer"

## 🎨 Features to Test

1. ✅ User Registration & Login
2. ✅ Food Donation Submission
3. ✅ Google Maps Location Picker
4. ✅ Admin Dashboard & Analytics
5. ✅ Volunteer Dashboard
6. ✅ Monetary Donations (Razorpay)
7. ✅ Community Page (Blog, Testimonials, Gallery)
8. ✅ Contact Form
9. ✅ Dark Mode Toggle

## 🆘 Need Help?

- Check the main README.md for detailed documentation
- Review API endpoints in README.md
- Check browser console for errors
- Check server terminal for backend errors

---

**Happy Coding! 🌱❤️**

