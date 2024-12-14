import { useState } from "react";
import { Link } from "react-router-dom";
import vitlogo from "../assets/vitlogo.png";
const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className="relative container mx-auto p-6">
      {/* Flex Container */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className=" w-96 h-16">
          <img to="/" src={vitlogo} alt="Indian Aviation Academy" />
        </Link>
        {/* Menu Items */}
        <div className="hidden space-x-6 md:flex">
          <Link to="/admin/dashboard" className="hover:text-darkGrayishBlue">
            Admin Panel
          </Link>
          <Link to="#" className="hover:text-darkGrayishBlue">
            Academics
          </Link>
          <Link to="#" className="hover:text-darkGrayishBlue">
            Placements
          </Link>
          <Link to="#" className="hover:text-darkGrayishBlue">
            Accreditation
          </Link>
          <Link to="#" className="hover:text-darkGrayishBlue">
            About Us
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
          <Link to="#">Training Calendar</Link>
          <Link to="#">Photo Gallery</Link>
          <Link to="#">About Us</Link>
          <Link to="#">Careers</Link>
          <Link to="#">News</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
