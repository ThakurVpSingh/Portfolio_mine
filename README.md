# Vaibhav Pratap Singh - Portfolio Website

A modern, responsive, and dynamic personal portfolio website built with React and Vite. It showcases professional experience, featured projects, education, a contact form, and a dedicated admin dashboard for content management. 

## 🚀 Features

- **Dynamic Hero Section**: Interactive introduction featuring a custom `useTypewriter` hook for realistic typing and typo-correction animations.
- **Responsive Design**: Beautifully styled using pure CSS with glassmorphism effects, ensuring a seamless experience across all devices (Desktop, Tablet, iOS, and Android).
- **Admin Dashboard**: A secure, built-in admin panel (simulated authentication) allowing the owner to:
  - Add, edit, or delete **Projects**, **Experience**, and **Education** records.
  - Manage and moderate **Client Feedback** before it goes live on the site.
  - View simulated recent visitors and authentication logs.
- **"VP Group" Startup Section**: Highlights business initiatives, client services, and features a user authentication flow for submitting feedback.
- **Interactive Contact Form**: Fully functional contact form integrated with **Web3Forms**. (Requires a Web3Forms access key).
- **Smooth Animations**: Page transitions and element animations powered by **Framer Motion**.
- **Modern UI Components**: Sleek icons provided by **Lucide React**.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS (CSS3, Flexbox, CSS Grid) with a custom dark-theme glassmorphic design system.

## 📦 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and `npm` installed on your machine.

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-github-repo-url>
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Web3Forms (for the Contact section)**:
   - Go to `src/components/Contact.jsx`.
   - Replace the `accessKey` string with your real Web3Forms access key. You can get one for free at [Web3Forms](https://web3forms.com/).

### Running in Development
To start the development server, run:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### Building for Production
To build the app for production deployment:
```bash
npm run build
```
The optimized files will be generated in the `dist` folder, ready to be deployed to platforms like Vercel, Netlify, or GitHub Pages.

## 🔑 Admin Access
By default, the application simulates an admin environment using local storage and context state.
- Navigate to the Dashboard via the top-right menu (if visible/logged in) or by going to `/admin`.
- You can manage content dynamically without needing a backend database for initial setup, as data is persisted in the browser's `localStorage`.

## 📂 Project Structure Overview

- `src/components/`: Reusable UI sections (Hero, About, Projects, Experience, Contact, Navbar, Startup).
- `src/pages/`: Full-page route components (Admin, ProjectDetails).
- `src/context/`: React context providers (e.g., AdminContext for auth state).
- `src/hooks/`: Custom React hooks (e.g., useTypewriter).
- `src/data/`: Static JSON files used to pre-populate default content.
- `src/index.css`: Global styles, layout utilities, and responsive media queries.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## 📝 License
This project is open-source and available under the [MIT License](LICENSE). 

---

*Designed and developed by [Vaibhav Pratap Singh](https://github.com/vaibhav-pratap-singh).*
