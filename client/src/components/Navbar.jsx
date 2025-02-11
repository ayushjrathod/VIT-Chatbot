import { useState } from "react";
import { Link } from "react-router-dom";

import companyLogo from "../assets/vitlogo.png";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className="relative container mx-auto p-6">
      {/* Flex Container */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className=" w-96 h-16">
          <img className="" src={companyLogo} alt="" />
        </Link>
        {/* Menu Items */}
        <div className="hidden space-x-6 md:flex">
          <Link
            to="/admin/dashboard"
            className="hover:text-darkGrayishBlue text-black text-lg bg-blue-500 p-2 rounded-xl"
          >
            Admin Panel
          </Link>
        </div>
        {/* Hamburger Icon */}
        <button
          className={
            toggleMenu
              ? "open block hamburger md:hidden focus:outline-none"
              : "block hamburger md:hidden focus:outline-none"
          }
          onClick={() => setToggleMenu(!toggleMenu)}
        >
          <span className="hamburger-top"></span>
          <span className="hamburger-middle"></span>
          <span className="hamburger-bottom"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <div
          className={
            toggleMenu
              ? "absolute flex flex-col items-center self-end py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md"
              : "absolute flex-col items-center hidden self-end py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md"
          }
        >
          <Link to="/admin/dashboard">Admin Panel</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
