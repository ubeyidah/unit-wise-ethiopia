import { CiWifiOff } from "react-icons/ci";
const ErrorPage = () => {
  return (
    <section className="h-screen w-full flex items-center justify-center flex-col gap-2 px-6">
      <CiWifiOff className="size-[20%] text-slate-500/40 dark:text-slate-300/40 md:size-[20%]" />
      <p className="text-center">
        Please check your internet connection and try agin
      </p>
    </section>
  );
};

export default ErrorPage;
