import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

const Signin = () => {
  return (
    <section className="container px-4 py-7">
      <div className="container relative m-auto px-2 text-gray-500 md:px-12 xl:px-40">
        <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
          <div className="rounded-3xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="p-8 py-12 sm:p-16">
              <div className="space-y-4">
                <div className="flex justify-center items-center">
                  <img
                    src="logo.png"
                    loading="lazy"
                    className="w-44"
                    alt="tailus logo"
                  />
                </div>

                <h2 className="mb-8 text-2xl font-bold text-center text-gray-800 dark:text-white">
                  Sign Up for UnitWise Ethiopia
                </h2>
                <p className="text-sm">
                  Join UnitWise Ethiopia with your Google account to access
                  tailored study materials and tools designed for Ethiopian
                  grade 12 students. Start your journey to academic success
                  today!
                </p>
              </div>
              <div className="grid space-y-4 my-8">
                <Button
                  size="lg"
                  className="rounded-full flex items-center justify-center gap-4 bg-green-500"
                >
                  <FcGoogle className="size-6" />
                  Sign in with your Google account
                </Button>
              </div>

              <div className=" space-y-4 text-center text-gray-600 dark:text-gray-400 sm:-mb-8">
                <p className="text-xs">
                  By proceeding, you agree to our{" "}
                  <Link to="/terms" className="underline">
                    Terms of Use
                  </Link>{" "}
                  and confirm you have read our{" "}
                  <Link to="privacy-policy" className="underline">
                    Privacy and Cookie Statement
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
