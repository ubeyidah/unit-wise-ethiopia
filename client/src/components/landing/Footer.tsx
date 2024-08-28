import { Link } from "react-router-dom";
import { BiLogoYoutube } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="-mb-0.5 w-full"
        viewBox="0 0 1367.743 181.155"
      >
        <path
          className="fill-current text-gray-100 dark:text-gray-800"
          id="wave"
          data-name="wave"
          d="M0,0S166.91-56.211,405.877-49.5,715.838,14.48,955.869,26.854,1366,0,1366,0V115H0Z"
          transform="translate(1.743 66.155)"
        ></path>
      </svg>
      <div className="bg-gradient-to-b from-gray-100 to-transparent dark:from-gray-800 dark:to-transparent pt-1">
        <div className="container m-auto space-y-8 text-gray-600 dark:text-gray-400 px-4">
          <div className="grid grid-cols-8 gap-6 md:gap-0 items-end">
            <div className="col-span-8 border-r border-gray-100 dark:border-gray-800 md:col-span-2 lg:col-span-3">
              <div className="flex items-center justify-between gap-6 border-b border-white dark:border-gray-800 py-6 md:block md:space-y-6 md:border-none max-sm:flex-col max-sm:items-start ">
                <div className="flex items-start flex-col">
                  <Link to="/">
                    <img
                      src="/logo.png"
                      alt="logo uwe"
                      width="100"
                      height="42"
                      className="w-32"
                    />
                  </Link>
                  <h3 className="text-lg font-semibold text-green-500">
                    Unit Wise Ethiopia (UWE)
                  </h3>
                  <p>unitwiseethiopia@gmail.com</p>
                </div>

                <div className="flex flex-col">
                  <p>DEVELOPED BY UBEYID OUMER</p>
                  <p className="text-sm my-2">Follow us</p>

                  <div className="flex items-center gap-4">
                    <a href="https://www.github.com/ubeyidah" target="_blank">
                      <FaGithub className="size-5" />
                    </a>
                    <a
                      href="https://www.youtube.com/channel/UCNz48Kv8nkR-7wsv6R34s6g"
                      target="_blank"
                    >
                      <BiLogoYoutube className="text-red-800  size-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-8 md:col-span-6 lg:col-span-5">
              <div className="p-4">
                <h6 className="text-lg mb-3 font-medium text-gray-800 dark:text-gray-200">
                  Ressources
                </h6>
                <ul className=" flex  items-center  gap-4 ">
                  <li>
                    <Link to="/" className="transition hover:text-blue-600">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className="transition hover:text-blue-600"
                    >
                      About us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="transition hover:text-blue-600"
                    >
                      Contact us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className="transition hover:text-blue-600"
                    >
                      Sign Up
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex justify-between max-sm:flex-col max-sm:text-center max-sm:gap-3 border-t border-gray-100 dark:border-gray-800 py-4 pb-8 md:pl-16 flex-wrap">
                <span>
                  &copy; UnitWise Ethiopia {new Date().getFullYear()} - All
                  right reserved
                </span>
                <div>
                  <Link to="/terms" className="text-sm hover:underline">
                    Terms & Condition
                  </Link>
                  <Link
                    to="/privacy-policy"
                    className="text-sm hover:underline"
                  >
                    Privacy & Cookie Satement
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
