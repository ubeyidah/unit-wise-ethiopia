import AccountSwitcher from "@/components/AccountSwitcher";
import { Button } from "@/components/ui/button";
import { MdVerifiedUser } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoReload } from "react-icons/io5";
import { useAuthContext } from "@/context/AuthProvider";

const PaymentVerify = () => {
  const auth = useAuthContext();
  const checkStatus = () => {
    auth?.reloadUser();
  };

  return (
    <section className="container px-4 flex items-center justify-center h-screen">
      <div className="flex-1 max-w-xl p-4 rounded-lg dark:bg-green-400/10 bg-green-500/5 border-slate-300 border dark:border-green-400/30 relative">
        <div className="absolute top-3 right-3">
          <AccountSwitcher />
        </div>
        <div className="p-6 bg-green-500/20 mx-auto -mt-16 w-fit rounded-full">
          <MdVerifiedUser className="text-6xl text-green-600" />
        </div>
        <h2 className="text-center text-xl font-semibold mt-3">
          Payment Verification
        </h2>
        <p className="text-center mb-3 text-sm">
          Our team will verify your payment within 24 hours.
        </p>
        <p className="dark:text-slate-300 text-slate-800">
          Please be patient as we complete the verification. We'll notify you
          once it's done by sending email. You can close this page and check
          back later.
        </p>
        <div className="my-4 mt-7 flex justify-center gap-4 flex-wrap">
          <Button
            variant="outline"
            className="flex items-center gap-3 rounded-full"
            size="lg"
            onClick={checkStatus}
          >
            <IoReload /> Check my verification
          </Button>
        </div>
        <div className="flex items-center justify-between text-sm text-blue-400 flex-wrap">
          <Link to="/" className="hover:underline">
            <div className="flex items-center gap-2 text-black dark:text-white max-sm:text-xs">
              <img src="/logo.png" alt="logo" className="size-4" />
              <p>Unit Wise Ethiopia</p>
            </div>
          </Link>
          <div className="flex gap-4 max-sm:text-xs">
            <a href="https://gmail.com" target="_self">
              Check Email
            </a>

            <Link to="/contact" className="hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentVerify;
