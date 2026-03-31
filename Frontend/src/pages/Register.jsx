import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="w-96 p-6 shadow-xl rounded-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
          />

          <button className="bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition">
            Register
          </button>
        </form>

        {/* Login link */}
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-rose-500 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;