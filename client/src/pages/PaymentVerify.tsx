import AccountSwitcher from "@/components/AccountSwitcher";
import { Button } from "@/components/ui/button";
import { MdVerifiedUser } from "react-icons/md";
import { Link } from "react-router-dom";

const PaymentVerify = () => {
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
          Please wait until our team verify your account. once we verified your
          account, we will send you a welcome email, and you will gain access to
          the platform. Feel free to close this page. You can return later to
          check the status.
        </p>
        <div className="my-4 flex justify-center">
          <a href="https://gmail.com" target="_self">
            <Button variant="outline" size="lg" className="rounded-full">
              Check My Email
            </Button>
          </a>
        </div>
        <div className="flex items-center justify-between text-sm text-blue-400">
          <div className="flex items-center gap-2 text-black dark:text-white max-sm:text-xs">
            <img src="/logo.png" alt="logo" className="size-4" />
            <p>Unit Wise Ethiopia</p>
          </div>
          <div className="flex gap-4 max-sm:text-xs">
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

export default PaymentVerify;
