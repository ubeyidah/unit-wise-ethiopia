import { CiWifiOff } from "react-icons/ci";
const ErrorPage = () => {
  return (
    <section className="h-screen w-full flex items-center justify-center flex-col gap-2">
      <CiWifiOff className="size-[10%] text-slate-500 dark:text-slate-300 md:size-[20%]" />
      <p>Please check your internet connection and try agin</p>
    </section>
  );
};

export default ErrorPage;
