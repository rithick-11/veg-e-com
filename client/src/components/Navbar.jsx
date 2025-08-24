import React from "react";
import { Container } from "./UI";
import { AiOutlineLogout, AiOutlineShoppingCart } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";
import useAppStore, { cookieStorage } from "../store/useAppStore.js";

const Navbar = () => {
  const { logout } = useAppStore();
  return (
    <nav className="border-b bg-green-500/90 shadow-lg">
      <Container className="min-h-16 flex justify-between items-center">
        <Link to="/" className="">
          <h1 className="text-2xl font-bold">Excel Store</h1>
        </Link>
        <ul className="flex items-center gap-6">
          <li>
            <Link
              to="/dashboard"
              className="text-lg font-medium hover:text-white"
            >
              Dashboard
            </Link>
          </li>
          <li className="cursor-pointer">
            <Link to="/cart">
              <AiOutlineShoppingCart size={30} className="text-black" />
            </Link>
          </li>

          {cookieStorage.getItem("veg-token") === null ? (
            <Link
              to={"/login"}
              className="cursor-pointer flex items-center bg-white/90 px-3 py-1 rounded-md"
            >
              login{" "}
              <VscAccount size={30} className="inline-block ml-2 text-black" />
            </Link>
          ) : (
            <button
              onClick={logout}
              className="cursor-pointer flex items-center bg-white/90 px-3 py-1 rounded-md self-baseline-last"
            >
              <AiOutlineLogout className="text-sm text-black" />
              Logout
            </button>
          )}
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;
