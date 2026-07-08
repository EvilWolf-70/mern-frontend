import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white py-5">
      <p className="text-center text-sm text-gray-600">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold">ShopEasy</span>. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
