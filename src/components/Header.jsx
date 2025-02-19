import React from 'react';

export default function Header() {
  return (
    <header className="flex flex-col items-center py-3 bg-white shadow-md">
      {/* Logo and Company Name */}
      <div className="flex flex-col items-center mt-4">
        <img src="/Logo.png" alt="Equimax Logo" className="h-10 mb-2" />
      </div>

      {/* Navigation */}
      <nav className="mt-3">
        <ul className="flex space-x-6 text-[15px] font-medium text-gray-800 tracking-wide">
          {[
            "Home",
            "About Us",
            "Team",
            "Our Services",
            "Recent Closings",
            "Loans Funded",
            "Loan Programs",
            "How It Works",
            "Property Management",
            "Notes",
            "Contact",
          ].map((item, index) => (
            <li key={index} className="relative group">
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
    </header>
  );
}
