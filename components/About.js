const About = () => {
  return (
    <div className="flex-1" id="about">
      <div className="hero glass md:min-h-screen rounded-3xl">
        <div className="p-6 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold text-center md:text-left text-primary">
            About Lynko
          </h1>
          <p className="py-6 md:w-[85%] md:text-lg">
            Sharing your work, profiles, and content often means juggling
            multiple links across different platforms. We built Lynko to make
            that easier. Instead of sending people to several places, Lynko
            gives you one clean, customizable page where everything comes
            together.
          </p>
          <p className="pb-6 md:w-[85%] md:text-lg">
            Whether you’re a creator, developer, student, or just someone who
            wants a simple online presence, Lynko helps you organize and share
            what matters without distractions. You stay in control of how your
            page looks, what you share, and when you update it — all through a
            single link you can use anywhere.
          </p>
          <p className="md:w-[85%] text-lg md:text-xl font-bold">
            Simple by design. Flexible by choice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
