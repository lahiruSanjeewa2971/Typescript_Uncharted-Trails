const HeroSection = () => {
  return (
    <section className="relative h-[50vh] w-full text-textLight">
      {/* <img
        src={""}
        alt="HeroSection"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" /> */}

      {/* Contect */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Explore the world, One Journey at a Time.
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl">
          Discover hidden gems, local stories, and travel tips from every corner
          of the globe.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
