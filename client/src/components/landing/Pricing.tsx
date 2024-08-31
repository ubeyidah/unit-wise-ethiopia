import { Link } from "react-router-dom";
import { pricingAccess, pricing } from "@/data/landing";
import { GiCheckMark } from "react-icons/gi";

const Pricing = () => {
  return (
    <section className="container px-4 py-3 mt-20 mb-10">
      <div className="m-auto text-center lg:w-7/12 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white md:text-4xl mb-4">
          Simple and Affordable <span className="text-orange-500">Pricing</span>
        </h2>
      </div>
      <div className="mt-10 grid-cols-1 justify-center grid items-center lg:flex  max-w-lg mx-auto">
        <div className="group relative ">
          <div
            aria-hidden="true"
            className="absolute top-0 h-full w-full rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-2xl shadow-gray-600/10 dark:shadow-none transition duration-500 group-hover:scale-105 lg:group-hover:scale-110"
          ></div>
          <div className="relative space-y-8 p-8">
            <h3 className="text-center text-3xl font-semibold text-gray-700 dark:text-white">
              Lifetime Plan
            </h3>
            <div className="overflow-hidden">
              <div className="-mr-20 flex items-end justify-center">
                <div className="flex">
                  <span className="-ml-6 mt-2 text-3xl font-bold text-primary">
                    ETB
                  </span>
                  <span className="leading-0 text-8xl font-bold text-gray-800 dark:text-white">
                    {pricing.price - pricing.discount}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="block text-xl font-bold text-gray-500 dark:text-gray-400">
                    .00
                  </span>
                </div>
              </div>
              <div className="text-center text-2xl font-medium">
                <span className="text-gray-400 line-through">
                  ETB {pricing.price}
                </span>
                <span className="font-semibold text-gray-700 dark:text-white ml-3">
                  ETB {pricing.price - pricing.discount}
                </span>
              </div>
              <span className="m-auto mt-4 block w-max rounded-full bg-gradient-to-r from-yellow-300 to-pink-300 px-4 py-1 text-sm font-medium text-yellow-900">
                one-time payment
              </span>
            </div>
            <ul
              role="list"
              className="m-auto w-max space-y-4 pb-6 text-gray-600 dark:text-gray-300"
            >
              {pricingAccess.map((list) => (
                <li key={list} className="flex items-center gap-3">
                  <span className="font-semibold text-primary">
                    <GiCheckMark className="text-green-600 mt-2" />
                  </span>
                  <span className="max-sm:text-sm text-wrap max-sm:max-w-[300px]">
                    {list}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex w-full items-center justify-between">
              <Link to="/signin" className="w-full">
                <button className="inline-flex h-12 animate-background-shine items-center justify-center border border-gray-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 w-full hover:opacity-80 active:opacity-100 rounded-full">
                  Start Plan
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
