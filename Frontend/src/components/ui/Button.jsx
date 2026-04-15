import React from "react";

const baseStyles =
  "inline-flex items-center justify-center rounded-xl font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-airbnb disabled:opacity-60 disabled:cursor-not-allowed";

const variants = {
  primary: "bg-airbnb text-white hover:bg-airbnb-dark",
  secondary: "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50",
};

const sizes = {
  md: "px-4 py-2.5 text-sm",
  lg: "px-4 py-3 text-base",
};

const Button = ({
  children,
  className = "",
  variant = "primary",
  size = "lg",
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
