import { MutatingDots } from "react-loader-spinner";

const Loading = () => {
  return (
    <section className="h-screen max-h-full w-full flex items-center flex-col justify-center">
      <img
        src="/logo.png"
        alt="loading"
        className="w-[16%] md:w-[10%] animate-bounce"
      />
      <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        secondaryColor="#4fa94d"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </section>
  );
};

export default Loading;
