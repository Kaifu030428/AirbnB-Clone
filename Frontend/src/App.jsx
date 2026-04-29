import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import Experiences from "./pages/Experiences";
import PropertyDetails from "./pages/PropertyDetails";
import Booking from "./pages/Booking";
import SearchResults from "./pages/SearchResults";
import AddProperty from "./pages/AddProperty";
import MyBookings from "./pages/MyBookings";
import MyProperties from "./pages/MyProperties";
import Wishlist from "./pages/Wishlist";
import AITripPlanner from "./pages/AITripPlanner";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

import ScrollToTop from "./components/ScrollToTop";
import AIConcierge from "./components/AIConcierge";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <AIConcierge />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="experiences" element={<Experiences />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="property/:id" element={<PropertyDetails />} />
          <Route path="booking/:id" element={<Booking />} />
          <Route path="add-property" element={<AddProperty />} />
          <Route path="admin-dashboard" element={<AdminDashboard />} />
          <Route path="my-bookings" element={<MyBookings />} />
          <Route path="my-properties" element={<MyProperties />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="ai-planner" element={<AITripPlanner />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;