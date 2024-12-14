import { Link } from "react-router-dom";
import { Rocket } from "lucide-react"; // Import new icon

const CallToAction = () => {
  return (
    <section id="cta" className="bg-[#22409A]">
      {/* Flex Container */}
      <div className="container flex flex-col items-center justify-between px-6 py-24 mx-auto space-y-12 md:py-12 md:flex-row md:space-y-0">
        {/* Heading */}
        <h2 className="flex items-center text-5xl font-bold leading-tight text-center text-white md:text-4xl md:max-w-xl md:text-left">
          <Rocket className="h-10 w-10 mr-2" /> We train present and future leaders of aviation
        </h2>
        {/* Button */}
        <div>
          <Link
            to="#"
            className="p-3 px-6 pt-2 text-[#22409A] bg-white rounded-full shadow-2xl baseline hover:bg-gray-900"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
