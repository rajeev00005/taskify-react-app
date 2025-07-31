import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Features from "../pages/Features";
import Pricing from "../pages/Pricing";
import Blog from "../pages/Blog";
import Testimonial from "../pages/Testimonial";
import FAQ from "../pages/FAQ";
import Login from "../features/auth/pages/Login";
import Signup from "../features/auth/pages/Signup";
import Dashboard from "../pages/Dashboard";
import Tasks from "../features/task/pages/Tasks";
import Profile from "../pages/Profile";
import PrivateRoute from "../components/common/PrivateRoute";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/features" element={<Features />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/testimonial" element={<Testimonial />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
       <Route path="/tasks" element={<Tasks />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
