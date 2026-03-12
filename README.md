# Vaibhav Pratap Singh - Full Stack Portfolio (MERN)

A professional, high-performance personal portfolio website built with the **MERN Stack** (MongoDB, Express, React, Node.js). This site features a fully integrated backend for global data persistence, a dynamic admin dashboard, and an interactive frontend.

## 🚀 Key Features

- **Full MERN Integration**: Replaced `localStorage` with **MongoDB Atlas** for secure, global data persistence across all devices.
- **Dynamic Content Management**: A robust **Admin Portal** to manage Projects, Experience, Education, and Feedback in real-time.
- **Global Profile Sync**: Profile images and site settings are stored in the cloud, ensuring consistency for all visitors.
- **Startup Section (VP Group)**: Dedicated business initiatives page with authenticated user feedback submission.
- **Responsive Aesthetics**: Modern **Glassmorphism** UI designed with Vanilla CSS, optimized for mobile (Desktop, Tablet, iOS, Android).
- **Animations**: Fluid transitions and interactive elements powered by **Framer Motion**.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas) (Mongoose ODM)
- **Deployment**: [Render](https://render.com/)

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (for the connection string)

### Local Setup

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Backend Setup**:
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```
   Start the server:
   ```bash
   npm start
   ```

3. **Frontend Setup**:
   ```bash
   cd ..
   npm install
   ```
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
   Start the development server:
   ```bash
   npm run dev
   ```

---

## 🔑 Deployment Notes

### Backend (Render)
- **Root Directory**: `server`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Env Variable**: `MONGODB_URI`

### Frontend (Vercel)
- **Framework Preset**: Vite
- **Env Variable**: `VITE_API_URL` (points to your Render URL)

---

## 📂 Project Structure

- `/src`: Frontend React components, pages, and context.
- `/server`: Node.js/Express backend server and Mongoose models.
- `/public`: Static assets and icons.

## 🤝 Contact
Designed and developed by **Vaibhav Pratap Singh**.  
[GitHub](https://github.com/ThakurVpSingh) | [Portfolio Live](https://portfolio-mine-green.vercel.app/)
