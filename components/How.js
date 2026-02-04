import Card from "./Card";

const How = () => {
  return (
    <div className="m-6" id="how">
      <div className="hero bg-base-300 min-h-screen rounded-3xl py-5 md:py-0">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-center md:text-left pt-3 md:pt-0 text-primary">
            How it works
          </h1>
          <p className="px-6 md:px-0 py-4 md:py-6 md:w-[85%] md:text-lg text-center md:text-left">
            Get your link page up and running in just a few minutes.
          </p>

          <div className="flex gap-5 flex-col md:flex-row justify-center items-center p-4 md:p-0">
            <Card
              num={"1"}
              title={"Sign up"}
              content={"Create your free account using email or social login."}
            />

            <Card
              num={"2"}
              title={"Add your links"}
              content={
                "Customize your profile and add all the links you want to share."
              }
            />

            <Card
              num={"3"}
              title={"Share"}
              content={
                "Share your single link anywhere and let people explore everything you do."
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default How;
