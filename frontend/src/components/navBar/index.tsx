import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { motion } from "framer-motion";
import NavLinks from "./NavLinks";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  isTopOfPage: boolean;
};

const Navbar = ({ isTopOfPage }: Props) => {
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const token = localStorage.getItem("token");
  const navBarBackground = isTopOfPage ? "" : "bg-black drop-shadow";
  const navigate = useNavigate();

  // const navItems = ["About Us", "Featured Places", "Write a post"];
  const navItems = [
    {
      name: "About Us",
      link: "#aboutUs",
    },
    {
      name: "Featured Places",
      link: "#featuredPlaces",
    },
    {
      name: "Write a post",
      link: "#writePost",
    },
  ];

  const AuthButton = ({ mobile = false }: { mobile?: boolean }) => (
    <Link
      to="/login"
      className={`${
        mobile ? "bg-white text-gray-500" : "bg-primary text-textLight"
      } px-5 py-1.5 border-none rounded-xl`}
    >
      {token ? "Logout" : "Sign In"}
    </Link>
  );

  return (
    <nav>
      <div
        className={`${navBarBackground} fixed top-0 z-30 w-full py-6 flex items-center justify-between`}
      >
        <div className="w-5/6 mx-auto flex items-center justify-between">
          {/* Logo */}
          <h1 className="font-logo text-2xl sm:text-3xl md:text-4xl text-textPrimary">
            Uncharted Trails
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex w-4/6 items-center justify-between gap-2">
            <div className="flex w-3/4 items-center justify-evenly gap-7">
              {navItems.map((item) => (
                <NavLinks key={item.name} linkName={item.name} />
              ))}
            </div>
            <AuthButton />
          </div>

          {/* Hamburger for Mobile */}
          <button
            className="md:hidden flex rounded-full bg-gray-500 p-2"
            onClick={() => setIsMenuToggled(true)}
          >
            <Bars3Icon className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Mobile Sidebar Menu */}
        {isMenuToggled && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-0 right-0 h-full w-3/4 bg-gray-500 text-white shadow-lg z-50 p-6"
          >
            <div className="flex flex-col items-center justify-center gap-10 h-full">
              <button
                className="absolute top-5 right-5"
                onClick={() => setIsMenuToggled(false)}
              >
                <XMarkIcon className="h-6 w-6 text-white" />
              </button>

              {navItems.map((item) => (
                <NavLinks key={item.name} linkName={item.name} />
              ))}

              <AuthButton mobile />
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
