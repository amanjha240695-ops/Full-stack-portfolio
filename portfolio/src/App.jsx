import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Hero from "./sections/Hero/Hero";
import About from "./sections/About/About";
import Skills from "./sections/Skills/Skills";
import Projects from "./sections/projects/Project";
import Experience from "./sections/Experience/Experience";
import Education from "./sections/Education/Education";
import Contact from "./sections/contact/Contact";
import Footer from "./sections/Footer/Footer";

// Public Blog
import Blogs from "./userblog/Blogs";
import BlogDetails from "./userblog/BlogDetails";

// Admin
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminSettings from "./admin/AdminSettings";
import AdminMessages from "./admin/AdminMessages";
import AdminBlogs from "./admin/AdminBlogs";

function PublicLayout() {
  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />
    </>
  );
}

function PortfolioHome() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Contact />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            Public Layout
        ========================== */}

        <Route element={<PublicLayout />}>

          <Route
            path="/"
            element={<PortfolioHome />}
          />

          <Route
            path="/blogs"
            element={<Blogs />}
          />

          <Route
            path="/blogs/:slug"
            element={<BlogDetails />}
          />

        </Route>

        {/* =========================
            Admin Login
        ========================== */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* =========================
            Admin Panel
        ========================== */}

        <Route element={<AdminLayout />}>

          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/messages"
            element={<AdminMessages />}
          />

          <Route
            path="/admin/blogs"
            element={<AdminBlogs />}
          />

          <Route
            path="/admin/settings"
            element={<AdminSettings />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;