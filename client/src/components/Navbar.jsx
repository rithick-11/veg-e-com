import React, { useState } from "react";
import { Container } from "./UI";
import { AiOutlineLogout, AiOutlineShoppingCart } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import useAppStore from "../store/useAppStore.js";

const Navbar = () => {
  const { logout, user, token, cartItems } = useAppStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-green-600 text-white shadow-lg">
      <Container className="min-h-16 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-bold tracking-tight">Excel Store</h1>
        </Link>
        {/* Desktop Menu */}
        <ul className="hidden items-center gap-6 md:flex">
          {token && user ? (
            <>
              {user.role === "admin" && (
                <li>
                  <Link
                    to="/dashboard"
                    className="font-medium transition-colors hover:text-green-200"
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/profile"
                  className="font-medium transition-colors hover:text-green-200"
                >
                  Profile
                </Link>
              </li>
              <li className="relative">
                <Link
                  to="/cart"
                  className="transition-colors hover:text-green-200"
                >
                  <AiOutlineShoppingCart size={28} />
                  {cartItemCount > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-sm font-semibold transition-colors hover:bg-white/20"
                >
                  <AiOutlineLogout size={18} />
                  <span>Logout</span>
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                to={"/login"}
                className="flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-green-700 transition-colors hover:bg-gray-100"
              >
                <VscAccount size={20} />
                <span>Login</span>
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button & Cart */}
        <div className="flex items-center gap-4 md:hidden">
          <Link
            to="/cart"
            className="relative transition-colors hover:text-green-200"
            aria-label="Shopping cart"
          >
            <AiOutlineShoppingCart size={28} />
            {cartItemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
                {cartItemCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-white"
            aria-label="Open menu"
          >
            <HiMenu size={28} />
          </button>
        </div>
      </Container>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/40"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        {/* Menu Content */}
        <div className="fixed right-0 top-0 h-full w-4/5 max-w-sm bg-white text-black shadow-xl">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-xl font-bold text-green-700">Menu</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-600 hover:text-gray-900"
              aria-label="Close menu"
            >
              <HiX size={24} />
            </button>
          </div>
          <div className="p-4">
            <ul className="flex flex-col gap-4 font-medium">
              {token && user ? (
                <>
                  {user.role === "admin" && (
                    <li><Link to="/dashboard" className="block py-2" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link></li>
                  )}
                  <li><Link to="/profile" className="block py-2" onClick={() => setIsMobileMenuOpen(false)}>Profile</Link></li>
                  <li><button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-left text-sm font-semibold text-white transition-colors hover:bg-red-600"><AiOutlineLogout size={18} /><span>Logout</span></button></li>
                </>
              ) : (
                <li><Link to={"/login"} className="flex w-full items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-left text-sm font-semibold text-white transition-colors hover:bg-green-700" onClick={() => setIsMobileMenuOpen(false)}><VscAccount size={20} /><span>Login</span></Link></li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
