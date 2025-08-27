import React from "react";
import { Container } from "./UI";
import { AiOutlineLogout, AiOutlineShoppingCart } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";
import useAppStore from "../store/useAppStore.js";

const Navbar = () => {
  const { logout, user, token, cartItems } = useAppStore();

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 border-b bg-green-600 text-white shadow-lg">
      <Container className="min-h-16 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-bold tracking-tight">Excel Store</h1>
        </Link>
        <ul className="flex items-center gap-6">
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
      </Container>
    </nav>
  );
};

export default Navbar;
