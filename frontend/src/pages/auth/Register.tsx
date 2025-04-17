import { Link } from "react-router-dom";

type Props = {};

const Register = ({}: Props) => {
  return (
    <div className="flex w-full bg-background h-[calc(100vh-64px)] overflow-auto p-8">
      <div className="md:w-1/3 hidden md:flex md:flex-col md:items-center justify-center border-r-2">
        <div className="">
          <span className="text-textLight text-2xl font-serif">
            Join our community
          </span>
        </div>
      </div>
      <div className="md:w-2/3 w-full ">
        {/* not a member ? sign up */}
        <div className="absolute md:top-[64px] md:right-8 bottom-6 ">
          <span className="text-textLight">
            Already a member ?{" "}
            <Link to="/login" className="underline">
              Login
            </Link>
          </span>
        </div>

        <div className="sm:w-2/3 md:w-1/3 w-full mx-auto flex flex-col gap-4 md:mt-[15%] mt-[35%]">
          {/* Title */}
          <h1 className="lg:text-3xl md:text-2xl sm:text-2xl text-textLight">
            Create Your Account.
          </h1>
          {/* form */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="text-mutetColor">
                User Name
              </label>
              <input
                type="text"
                className="px-4 py-2 rounded-md border-none focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-mutetColor">
                Password
              </label>
              <input
                type="text"
                className="px-4 py-2 rounded-md border-none focus:outline-none"
              />
            </div>
          </div>
          {/* button */}
          <button className="w-full mt-2 bg-primary hover:bg-secondary text-textLight font-semibold py-2 rounded-md transition">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
