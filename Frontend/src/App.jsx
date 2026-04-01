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

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="experiences" element={<Experiences />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="property/:id" element={<PropertyDetails />} />
        <Route path="booking/:id" element={<Booking />} />
      </Route>
    </Routes>
  );
};

export default App;