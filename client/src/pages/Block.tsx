import { Link } from "react-router-dom";
import { ImBlocked } from "react-icons/im";

const Block = () => {
  return (
    <section className="container px-4 flex items-center justify-center h-screen">
      <div className="flex-1 max-w-xl p-4 rounded-lg dark:bg-red-400/10 bg-red-500/5 border-slate-300 border dark:border-red-400/30">
        <div className="p-6 bg-red-500/20 mx-auto -mt-16 w-fit rounded-full">
          <ImBlocked className="text-6xl text-red-600" />
        </div>
        <h2 className="text-center text-xl font-semibold mt-3">
          Account Blocked
        </h2>
        <p className="text-center mb-3 text-sm">
          Your access has been restricted
        </p>
        <p className="dark:text-slate-300 text-slate-800">
          Your account has been blocked due to a violation of our rules or
          terms. This can include misuse of our platform or other issues. For
          more information or if you think this is a mistake, please contact our
          support team.
        </p>

        <div className="flex items-center justify-end text-sm text-blue-400 mt-4">
          <div className="flex gap-4">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Block;
