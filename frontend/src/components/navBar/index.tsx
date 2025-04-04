import { Bars3Icon } from "@heroicons/react/24/solid";
import NavLinks from "./NavLinks";
import { useState } from "react";

type Props = {
  isTopOfPage: boolean;
};

const Navbar = ({ isTopOfPage }: Props) => {
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  const navBarBackground = isTopOfPage ? "" : "bg-black drop-shadow";

  return (
    <nav>
      <div
        className={`${navBarBackground} flex items-center justify-between fixed top-0 z-30 w-full py-6`}
      >
        <div className="flex items-center justify-between w-5/6 mx-auto">
          <div className="w-full flex items-center justify-between">
            {/* logo */}
            <h1 className="md:text-4xl sm:text-3xl text-2xl font-logo md:w-2/6">
              Uncharted Trails
            </h1>
            <button
              className="absolute top-4 right-4 flex md:hidden rounded-full bg-gray-500 p-2"
              onClick={() => setIsMenuToggled(!isMenuToggled)}
            >
              <Bars3Icon className="w-6 h-6 text-white" />
            </button>

            {/* web nav */}
            <div className="w-4/6 hidden md:flex items-center justify-between gap-2">
              <div className="flex w-3/4 items-center justify-evenly gap-7">
                {/* nav links */}
                <NavLinks linkName="About Us" />
                <NavLinks linkName="Featured Places" />
                <NavLinks linkName="Write a post" />
              </div>

              {/* sign in button */}
              <button className="bg-gray-500 text-white px-5 py-1.5 border-none rounded-xl">
                {token ? "Sign in" : "Sign Up"}
              </button>
            </div>

            {/* mobile nav */}
            <div className=""></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
