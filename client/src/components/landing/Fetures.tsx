import { futures } from "@/data/landing";

const Fetures = () => {
  return (
    <section className="container px-4 mb-14">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white md:text-4xl mb-6">
          What We <span className="text-orange-600">Offer</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {futures.map((future) => (
          <div
            key={future.title}
            className="group relative p-8 rounded-3xl bg-white dark:border-gray-700 dark:bg-transparent border border-gray-100  hover:border-gray-100 hover:shadow-md dark:shadow-none dark:hover:border-gray-700 dark:hover:bg-gray-800 shadow-md shadow-gray-600/10  transition duration-300 flex-col gap-0"
          >
            <div className="flex">
              <div className="bg-green-300/40 dark:bg-green-300/10 text-green-600 text-xl p-5 rounded-full">
                {future.icon}
              </div>
            </div>
            <div className="relative">
              <h3 className="mb-3 mt-2 text-2xl font-semibold text-green-800 transition dark:text-white">
                {future.title}
              </h3>
              <p className="text-gray-600 text-md dark:text-gray-300">
                {future.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Fetures;
