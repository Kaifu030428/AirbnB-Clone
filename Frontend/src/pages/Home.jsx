import React from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import PropertyRow from "../components/PropertyRow";

const Home = () => {
  return (
    <div>
      <SearchBar />

      <PropertyRow title="Popular homes in North Goa" />
      <PropertyRow title="Available next month in South Goa" />
    </div>
  );
};

export default Home;