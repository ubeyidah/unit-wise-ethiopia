import { ReactNode } from "react";

const IconButton = ({
  icon,
  className,
}: {
  icon: ReactNode;
  className?: string;
}) => {
  return (
    <button
      className={
        "group relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border bg-slate-100/50 font-medium text-green-700 hover:bg-slate-300/40 active:bg-slate-300/60 transition-all duration-100 " +
        className
      }
    >
      <div className="translate-x-0 transition group-hover:translate-x-[300%]">
        {icon}
      </div>
      <div className="absolute -translate-x-[300%] transition group-hover:translate-x-0">
        {icon}
      </div>
    </button>
  );
};

export default IconButton;
