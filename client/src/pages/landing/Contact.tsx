import { Separator } from "@/components/ui/separator";

const Contact = () => {
  return (
    <section className="py-8 container px-4">
      <div>
        <div className="max-w-3xl mb-4 lg:mb-4">
          <h2 className="dark:text-white  font-semibold text-2xl md:text-4xl md:leading-tight">
            Contact us
          </h2>
          <p className="mt-1 text-neutral-400">
            Whatever your goal - we will get you there.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16">
          <div className="md:order-2 pb-4 mb-1 md:pb-0 md:mb-0">
            <form className="flex flex-col gap-5">
              <div className="relative">
                <input
                  type="text"
                  id="hs-tac-input-name"
                  className="peer p-4 block w-full dark:bg-neutral-800 border border-gray-300 bg-neutral-100 rounded-lg text-sm dark:text-white text-black placeholder:text-transparent focus:outline-none focus:ring-0 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not:placeholder-shown)]:pb-2  autofill:pt-6     autofill:pb-2"
                  placeholder="Name"
                  name="name"
                />
                <label
                  htmlFor="hs-tac-input-name"
                  className="absolute top-0 start-0 p-4 h-full text-neutral-400 text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
            peer-focus:text-xs
            peer-focus:-translate-y-1.5
            peer-focus:text-neutral-400
            peer-[:not(:placeholder-shown)]:text-xs
            peer-[:not(:placeholder-shown)]:-translate-y-1.5
            peer-[:not(:placeholder-shown)]:text-neutral-400"
                >
                  Name
                </label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  id="hs-tac-input-school"
                  className="peer p-4 block w-full dark:bg-neutral-800 border border-gray-300 bg-neutral-100 rounded-lg text-sm dark:text-white text-black placeholder:text-transparent focus:outline-none focus:ring-0 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                  placeholder="School"
                  name="school"
                />
                <label
                  htmlFor="hs-tac-input-school"
                  className="absolute top-0 start-0 p-4 h-full text-neutral-400 text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
            peer-focus:text-xs
            peer-focus:-translate-y-1.5
            peer-focus:text-neutral-400
            peer-[:not(:placeholder-shown)]:text-xs
            peer-[:not(:placeholder-shown)]:-translate-y-1.5
            peer-[:not(:placeholder-shown)]:text-neutral-400"
                >
                  School
                </label>
              </div>
              <div className="relative">
                <input
                  type="email"
                  id="hs-tac-input-email"
                  className="peer p-4 block w-full dark:bg-neutral-800 border border-gray-300 bg-neutral-100  rounded-lg text-sm dark:text-white text-black placeholder:text-transparent focus:outline-none focus:ring-0 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none
          focus:pt-6 dark:border-gray-700
          focus:pb-2
          [&:not(:placeholder-shown)]:pt-6
          [&:not(:placeholder-shown)]:pb-2
          autofill:pt-6
          autofill:pb-2"
                  placeholder="Email"
                  name="email"
                />
                <label
                  htmlFor="hs-tac-input-email"
                  className="absolute top-0 start-0 p-4 h-full text-neutral-400 text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
            peer-focus:text-xs
            peer-focus:-translate-y-1.5
            peer-focus:text-neutral-400
            peer-[:not(:placeholder-shown)]:text-xs
            peer-[:not(:placeholder-shown)]:-translate-y-1.5
            peer-[:not(:placeholder-shown)]:text-neutral-400"
                >
                  Email
                </label>
              </div>

              <div className="relative">
                <textarea
                  id="hs-tac-message"
                  className="peer p-4 block w-full dark:bg-neutral-800 border border-gray-300 bg-neutral-100 rounded-lg text-sm dark:text-white text-black placeholder:text-transparent focus:outline-none focus:ring-0 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none min-h-48
          focus:pt-6 dark:border-gray-700
          focus:pb-2
          [&:not(:placeholder-shown)]:pt-6
          [&:not(:placeholder-shown)]:pb-2
          autofill:pt-6
          autofill:pb-2"
                  placeholder="This is a textarea placeholder"
                  name="message"
                ></textarea>
                <label
                  htmlFor="hs-tac-message"
                  className="absolute top-0 start-0 p-4 h-full text-neutral-400 text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
            peer-focus:text-xs
            peer-focus:-translate-y-1.5
            peer-focus:text-neutral-400
            peer-[:not(:placeholder-shown)]:text-xs
            peer-[:not(:placeholder-shown)]:-translate-y-1.5
            peer-[:not(:placeholder-shown)]:text-neutral-400"
                >
                  your message
                </label>
              </div>

              <div className="mt-2">
                <p className="text-xs text-neutral-500">
                  All fields are required
                </p>

                <button className="group inline-flex mt-4 items-center gap-x-2 py-2 px-8 bg-green-500 font-medium text-sm text-neutral-800 rounded-full focus:outline-none">
                  Submit
                  <svg
                    className="shrink-0 size-4 transition  group-hover:translate-x-0 group-focus:translate-x-0.5 "
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </div>
              <Separator className="w-full md:hidden" />
            </form>
          </div>

          <div className="mb-8">
            <div className="max-sm:hidden">
              <img
                src="/contact.png"
                className="max-w-[400px]"
                alt="contact us"
              />
            </div>
            <div className="flex gap-x-5">
              <svg
                className="shrink-0 size-6 text-neutral-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
                <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
              </svg>
              <div className="grow">
                <h4 className="dark:text-white font-semibold">Email us:</h4>

                <a
                  className="mt-1 text-neutral-400 text-sm hover:text-neutral-200 focus:outline-none focus:text-neutral-200"
                  href="#mailto:unitwiseethiopia@gmail.com"
                  target="_blank"
                >
                  unitwiseethiopia@gamil.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
