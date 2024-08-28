const Loading = () => {
  return (
    <section className="h-screen w-full flex items-center justify-center">
      <img
        src="/logo.png"
        alt="loading"
        className="w-[26%] md:w-[15%] animate-bounce"
      />
    </section>
  );
};

export default Loading;
