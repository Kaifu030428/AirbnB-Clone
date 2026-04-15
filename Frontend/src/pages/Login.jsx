import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

const Login = () => {
  return (
    <div className="flex justify-center items-center px-6 py-12 min-h-[70vh] bg-gradient-to-b from-rose-50/60 to-white">
      <Card className="w-full max-w-md p-7 shadow-xl border-gray-100">
        <h2 className="text-2xl font-bold mb-1 text-center text-gray-900">Welcome back</h2>
        <p className="text-center text-gray-500 mb-6">Login to continue booking amazing stays.</p>

        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
          />

          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
          />

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        <p className="text-center mt-5 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-airbnb font-semibold hover:underline">
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;