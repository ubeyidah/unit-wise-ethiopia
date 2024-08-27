function heroButtons() {
  return (
    <>
      <p className="text-xl mb-8 leading-8 text-slate-600  max-w-2xl mx-auto dark:text-slate-300 max-sm:text-[18px] max-sm:leading-6">
        meticulously designed by student for students. We are here to support
        you in preparing for entrance exams, providing resources and more for
        your achievement.
      </p>
      <div className="flex items-center gap-6 max-md:justify-center max-sm:justify-start">
        <button className="inline-flex py-3 px-7  items-center justify-center rounded-full bg-slate-600/20 font-medium text-neutral-900  hover:bg-slate-600/30 active:bg-slate-600/20 max-sm:text-sm dark:text-slate-300">
          Learn More
        </button>
        <button className="group relative inline-flex h-[calc(40px+8px)] items-center justify-center rounded-full max-sm:text-sm bg-green-600 py-1 pl-6 pr-14 font-medium text-neutral-50">
          <span className="z-10 pr-2">GET STARTED</span>
          <div className="absolute right-1 inline-flex h-10 w-10 items-center justify-end rounded-full bg-neutral-700/40 transition-[width] group-hover:w-[calc(100%-8px)]">
            <div className="mr-2.5 flex items-center justify-center">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-neutral-50"
              >
                <path
                  d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
        </button>
      </div>
    </>
  );
}

const Hero = () => {
  return (
    <section className="container px-3 md:px-5 grid gap-8 grid-cols-1 md:grid-cols-2 md:mt-5 md:items-center max-md:py-9 max-sm:gap-5">
      <div>
        <h1
          className="text-5xl leading-tight font-semibold  text-slate-600 mb-7 max-lg:text-4xl max-md:text-center max-sm:text-3xl dark:text-slate-300 max-sm:text-left
        max-sm:mb-4"
        >
          <span className="text-green-500">Unit Wise Ethiopia</span> is the
          ultimate platform for Grade 12 students.
        </h1>

        <div className="max-md:hidden">{heroButtons()}</div>
      </div>
      <div className="relative ms-4 md:h-[80vh] ">
        <img
          className="w-full rounded-md h-full object-cover object-center"
          src="/students.webp"
          alt="Hero Image"
        />
        <div className="absolute inset-0 -z-[1] bg-gradient-to-tr from-gray-200 via-white/0 to-white/0 size-full rounded-md mt-4 -mb-4 me-4 -ms-4 lg:mt-6 lg:-mb-6 lg:me-6 lg:-ms-6 dark:from-neutral-800 dark:via-neutral-900/0 dark:to-neutral-900/0"></div>
      </div>
      <div className="md:hidden mt-4">{heroButtons()}</div>
    </section>
  );
};

export default Hero;
