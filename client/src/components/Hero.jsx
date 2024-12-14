import heroimg from "../assets/hero.png";

const Hero = () => {
  return (
    <section className="flex justify-center" id="hero">
      {/* Flex Container */}
      <div className="container flex flex-col-reverse items-center px-6 mx-auto mt-10 ml-12 space-y-0 md:space-y-0 md:flex-row">
        {/* Left Item */}
        <div className="flex flex-col mb-32">
          <h2 className="max-w-md text-2xl font-bold text-center md:text-left mb-2">
            Vishwakarma Institute of Technology
          </h2>
          <p className="w-fit text-center text-darkGrayishBlue md:text-left">
            Since its inception in 1983, Vishwakarma Institute of Technology, Pune (VIT, Pune) has believed in providing
            education that empowers its students. A rigorous focus on academic excellence, a culture of research and
            innovation and a thriving learning environment have made it a top engineering college in Pune. VIT, Pune,
            has had an illustrious track record of achievements and achievers in leadership positions worldwide.
          </p>
        </div>
      </div>
      <div className="w-full h-1/2 m-12 flex justify-center">
        <img to="/" src={heroimg} alt="Indian Aviation Academy" />
      </div>
    </section>
  );
};

export default Hero;
