"use client";

const Loader = () => {
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-1.5 h-7 bg-primary rounded-full animate-[scale-up4_1s_ease-in-out_infinite]" />
      <div className="w-1.5 h-12 bg-primary rounded-full animate-[scale-up4_1s_ease-in-out_infinite_0.2s] mx-1" />
      <div className="w-1.5 h-7 bg-primary rounded-full animate-[scale-up4_1s_ease-in-out_infinite_0.4s]" />
    </div>
  );
};

export default Loader;
