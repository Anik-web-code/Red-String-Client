# 🩸 Blood Donation Web Application — Fullstack Project (MERN)

> ⚠️ **IMPORTANT:**  
> The backend server is hosted on **Render** and may take **20–30 seconds** to wake up if inactive.

---

## 🌐 Live Links

- 🚀 **Frontend:** [[https://your-frontend-link.com](https://your-frontend-link.com)](https://glistening-melomakarona-e8bb27.netlify.app/)
- 🔗 **Backend (Render):** [[https://your-backend-link.onrender.com](https://your-backend-link.onrender.com)](https://blood-donating-website.onrender.com/donations)

---

## 📖 Project Overview

This is a fullstack **Blood Donation Platform** built using the **MERN stack**. It allows users to request blood, become donors, fund the platform, and manage blog content. It also features **role-based dashboards** for **Admin**, **Donor**, and **Volunteer** users.

---

## 🎯 Key Features

- 🔐 Firebase Email/Password Authentication (no JWT)
- 🛠 Role-based dashboards (Admin, Donor, Volunteer)
- 🩸 Create, manage, approve donation requests
- 🧾 View funding and make donations (Stripe integration)
- ✍️ Blog management system for admin
- 📋 User and role management by admin
- 🧾 Pagination, sweet alerts, modals, responsive UI

> ❌ Skipped:
> - JWT authentication
> - Optional edit features for blog/request

---

## 🧰 Tech Stack

### 🖥 Frontend

- React
- Tailwind CSS
- React Router DOM
- Axios
- Firebase Auth
- Stripe JS (Checkout)
- SweetAlert2, React Hot Toast
- React Paginate

### 🖥 Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- CORS, Dotenv
- Stripe API
- Render (for deployment)

---

## 📁 Project Structure
project-root/
│
├── client/ # React Frontend
│ └── src/
│ ├── Pages/
│ ├── Context/
│ ├── Routes/
│ └── App.jsx
│
├── server/ # Express Backend
│ ├── routes/
│ ├── controllers/
│ ├── models/
│ └── index.js


💳 Stripe Integration
Frontend uses Stripe Checkout (loadStripe with publishable key)

Backend creates session using secret key

After payment, details are stored in MongoDB

🔐 Protected Routes
Frontend
PrivateRoute: Checks Firebase login status

AdminRoute, DonorRoute, VolunteerRoute: Based on user role

🧾 Pages Overview
🔓 Public Pages
/ — Home

/login — Login

/register — Register

/blogs — View blogs

🔐 Donor Dashboard
/dashboard/donor

/dashboard/donor/my-donation-requests

/dashboard/donor/create-donation-request

🔐 Volunteer Dashboard
/dashboard/volunteer

/dashboard/volunteer/manage-requests

🔐 Admin Dashboard
/dashboard/admin

/dashboard/admin/all-users

/dashboard/admin/donation-requests

/dashboard/admin/content-management

/dashboard/admin/add-blog

💰 Funding
/dashboard/funding — View all donations, donate via Stripe

🌍 Deployment Guide
🔧 Host Backend on Render
Go to https://render.com

Create new Web Service

Connect your GitHub repo

Set environment variables:

PORT, MONGO_URI, STRIPE_SECRET_KEY

Set build/run command:

node index.js
Deploy. Wait for Render to build and serve your API.

⚠ NOTE: Free Render services take ~30s to activate if idle.

🌐 Host Frontend on Vercel/Netlify
Push client/ to a GitHub repo

Connect the repo to Vercel or Netlify

Set build command: npm run build

Set output folder: dist

Set environment variable VITE_STRIPE_KEY in dashboard

Deploy and you're done ✅

📌 Notes
🛑 JWT Auth was not used

🔐 Firebase Auth manages login & roles (stored in DB)

📬 Stripe payments go to a real session (test mode)

🖼 SweetAlerts and modals provide UX feedback

🕐 Backend on Render may delay response on first hit

🤝 Credits
Built with ❤️ by [Md. Anik Ali]

📬 Contact
For issues, reach out at: alianik11star@gmail.com

