import React from "react";

const Card = ({ children, className = "", as: Tag = "div" }) => {
  return (
    <Tag className={`border border-gray-200 rounded-3xl bg-white ${className}`}>
      {children}
    </Tag>
  );
};

export default Card;
