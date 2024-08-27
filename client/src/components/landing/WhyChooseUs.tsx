import { whyChooseUs } from "@/data/landing";
import { GiCheckMark } from "react-icons/gi";
const WhyChooseUs = () => {
  return (
    <section className="container px-4 mb-6 lg:mb-28">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-3xl max-md:text-2xl max-sm:text-xl font-bold mb-10">
            <span className="text-orange-400">Why Choose</span> Unit Wise
            Ethiopia?
          </h2>
          {whyChooseUs.map((becuse) => (
            <div className="flex gap-3 items-start mb-3">
              <div>
                <GiCheckMark className="text-green-600 mt-2" />
              </div>
              <div>
                <h2 className="font-bold">{becuse.title}</h2>
                <p className="dark:text-gray-300 text-gray-700 text-sm">
                  {becuse.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[454px] max-w-[341px] md:h-[682px] md:max-w-[512px]">
            <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
            <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
            <div className="rounded-[2rem] overflow-hidden h-[426px] md:h-[654px] bg-white dark:bg-gray-800">
              <img
                src="https://flowbite.s3.amazonaws.com/docs/device-mockups/tablet-mockup-image.png"
                className="dark:hidden h-[426px] md:h-[654px]"
                alt=""
              />
              <img
                src="https://flowbite.s3.amazonaws.com/docs/device-mockups/tablet-mockup-image-dark.png"
                className="hidden dark:block h-[426px] md:h-[654px]"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
