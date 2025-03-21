import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    "Home",
    "About Us",
    "Team",
    "Our Services",
    "Recent Closings",
    "Loans Funded",
    "Loan Programs",
    "How It Works",
    "Property Management"
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="flex justify-between items-center py-3 px-4 md:px-8 lg:px-12">
        {/* Logo and Navigation in a Single Line */}
        <div className="flex items-center w-full justify-between">
          <img src="/Logo.png" alt="Equimax Logo" className="h-8 md:h-10" />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-4 md:space-x-5 lg:space-x-6 text-[14px] md:text-[15px] font-medium text-gray-800 tracking-wide">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="hover:text-green-600 transition-all duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Menu Button (Mobile) */}
        <button
          className="md:hidden text-gray-800 focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-white shadow-md p-4">
          <ul className="flex flex-col space-y-3 text-[14px] font-medium text-gray-800 tracking-wide">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="hover:text-green-600 transition-all duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}