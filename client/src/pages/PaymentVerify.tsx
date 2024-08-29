import { MdVerifiedUser } from "react-icons/md";

const PaymentVerify = () => {
  return (
    <section className="container px-4 flex items-center justify-center h-screen">
      <div className="flex-1 max-w-xl p-4 rounded-lg dark:bg-green-400/10 bg-green-500/5 border-slate-300 border dark:border-green-400/30">
        <div className="">
          <MdVerifiedUser />
        </div>
      </div>
    </section>
  );
};

export default PaymentVerify;
