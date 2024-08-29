const Loading = () => {
  return (
    <section className="h-screen w-full flex items-center justify-center">
      <img
        src="/logo.png"
        alt="loading"
        className="w-[20%] md:w-[13%] animate-bounce"
      />
    </section>
  );
};

export default Loading;
