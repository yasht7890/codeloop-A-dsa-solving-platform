import React, { useState, useRef, useEffect } from "react";
import { User, Code, LogOut, ChevronDown } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { authUser } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-screen py-6">
      <div className="flex w-full justify-between items-center mx-auto max-w-5xl bg-black/20 shadow-xl shadow-neutral-600/10 backdrop-blur-xl border border-gray-200/20 px-8 py-6 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-neutral-600/15">
        {/* Logo Section */}
        <Link 
          to="/" 
          className="flex items-center gap-3 cursor-pointer group transition-all duration-300 hover:scale-105"
        >
          <div className="relative">
            <img 
              src="/leetlab.svg" 
              className="h-14 w-14 bg-gradient-to-br from-blue-500/20 to-purple-600/20 text-primary border-2 border-blue-400/30 px-2 py-2 rounded-full transition-all duration-300 group-hover:border-blue-400/60 group-hover:shadow-lg group-hover:shadow-blue-400/25" 
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <span className="text-xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent hidden md:block group-hover:from-blue-200 group-hover:to-white transition-all duration-300">
            CodeLoop 
          </span>
        </Link>

        {/* User Profile and Dropdown */}
        <div className="flex items-center">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-gray-200/10 hover:border-gray-200/20 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-400/30 group-hover:ring-blue-400/60 transition-all duration-300">
                <img
                  src={
                    authUser?.image ||
                    "https://avatar.iran.liara.run/public/boy"
                  }
                  alt="User Avatar"
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-all duration-300 ${isDropdownOpen ? 'rotate-180 text-white' : 'group-hover:text-white'}`} />
            </button>

            {/* Enhanced Dropdown */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-gray-900 border border-gray-200/20 rounded-2xl shadow-2xl shadow-black/40 z-[9999]">
                
                {/* User Info Header */}
                <div className="p-4 border-b border-gray-200/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-400/40">
                      <img
                        src={
                          authUser?.image ||
                          "https://avatar.iran.liara.run/public/boy"
                        }
                        alt="User Avatar"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-base">{authUser?.name}</p>
                      <p className="text-gray-400 text-sm">{authUser?.email || 'User'}</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2 space-y-1">
                  <Link
                    to="/profile"
                    onClick={closeDropdown}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-blue-600/20 transition-all duration-300 w-full"
                  >
                    <User className="w-5 h-5 text-blue-400" />
                    <span className="font-medium">My Profile</span>
                  </Link>

                  {authUser?.role === "ADMIN" && (
                    <Link
                      to="/add-problem"
                      onClick={closeDropdown}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-green-600/20 transition-all duration-300 w-full"
                    >
                      <Code className="w-5 h-5 text-green-400" />
                      <span className="font-medium">Add Problem</span>
                    </Link>
                  )}

                  <div className="border-t border-gray-200/10 mt-3 pt-3">
                    <LogoutButton 
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-red-600/20 transition-all duration-300 w-full"
                      onLogoutComplete={closeDropdown}
                    >
                      <LogOut className="w-5 h-5 text-red-400" />
                      <span className="font-medium">Logout</span>
                    </LogoutButton>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;