import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section className="container px-4 max-md:px-2 grid grid-cols-1 md:grid-cols-2 gap-4 max-sm:my-10 md:my-32">
      <div className="relative ms-4 md:h-[60vh] ">
        <img
          className="w-full rounded-md h-full object-cover object-center"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDUyU8ctpHEDJCzQRs63sPHoNyfjtCyJ_rZA&s"
          alt="Hero Image"
        />
        <div className="absolute inset-0 -z-[1] bg-gradient-to-tr from-gray-200 via-white/0 to-white/0 size-full rounded-md mt-4 -mb-4 me-4 -ms-4 lg:mt-6 lg:-mb-6 lg:me-6 lg:-ms-6 dark:from-neutral-800 dark:via-neutral-900/0 dark:to-neutral-900/0"></div>
      </div>
      <div className="max-md:mt-8">
        <h2 className="mb-4 font-bold max-sm:text-2xl md:text-3xl ">
          <span className="text-green-600">About</span> Unit Wise Ethiopia
        </h2>
        <p className="mb-4 dark:text-slate-300 text-slate-800">
          Unit Wise Ethiopia is a student-created platform designed to
          streamline exam preparation for students across Ethiopia. Born out of
          a personal need for better study tools, our app provides a
          comprehensive curriculum structure, progress tracking, and interactive
          features to help students excel.
        </p>
        <p className="mb-4 dark:text-slate-300 text-slate-800">
          As a grade 12 student myself, I understand the challenges and
          pressures of preparing for entrance exams. That’s why I’ve developed
          this app to support students in managing their study schedules,
          tracking their progress, and accessing valuable resources.
        </p>
        <Link to="/about">
          <button className="inline-flex py-3 px-7  items-center justify-center rounded-full bg-slate-600/20 font-medium text-neutral-900  hover:bg-slate-600/30 active:bg-slate-600/20 max-sm:text-sm dark:text-slate-300">
            Learn More
          </button>
        </Link>
      </div>
    </section>
  );
};

export default AboutSection;
