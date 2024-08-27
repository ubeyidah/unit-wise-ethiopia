import { whyChooseUs } from "@/data/landing";
import { GiCheckMark } from "react-icons/gi";
const WhyChooseUs = () => {
  return (
    <section className="container px-4 mb-6 lg:mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          <h2 className="text-3xl max-md:text-2xl max-sm:text-xl font-bold mb-10">
            <span className="text-orange-400">Why Choose</span> Unit Wise
            Ethiopia?
          </h2>
          {whyChooseUs.map((becuse) => (
            <div key={becuse.title} className="flex gap-3 items-start mb-5">
              <div>
                <GiCheckMark className="text-green-600 mt-2" />
              </div>
              <div>
                <h2 className="font-bold text-lg">{becuse.title}</h2>
                <p className="dark:text-gray-300 text-gray-700 text-md">
                  {becuse.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]">
            <div className="rounded-lg overflow-hidden h-[156px] md:h-[278px] bg-white dark:bg-gray-800">
              <img
                src="https://flowbite.s3.amazonaws.com/docs/device-mockups/laptop-screen.png"
                className="dark:hidden h-[156px] md:h-[278px] w-full rounded-lg"
                alt=""
              />
              <img
                src="https://flowbite.s3.amazonaws.com/docs/device-mockups/laptop-screen-dark.png"
                className="hidden dark:block h-[156px] md:h-[278px] w-full rounded-lg"
                alt=""
              />
            </div>
          </div>
          <div className="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] md:max-w-[597px]">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-gray-800"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
