import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-md">
      <h1 className="text-2xl font-bold text-rose-500">Airbnb</h1>
      <div className="space-x-6">
        <Link to="/" className="hover:text-rose-500">Home</Link>
        <Link to="/login" className="hover:text-rose-500">Login</Link>
        <Link to="/register" className="hover:text-rose-500">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;