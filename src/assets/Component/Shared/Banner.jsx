import { Link } from "react-router-dom";

const Banner = ({ head, para, para2, btn1, btn2, img }) => {
  return (
    <section
      className="relative h-[70vh] lg:h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('${img}')`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-6 text-center text-white">
        <p className="mb-4 text-sm sm:text-base tracking-widest font-bold uppercase">
          {head}
        </p>

        <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
          {para} <br /> {para2}
        </h1>

        {/* Buttons */}
        {(btn1 || btn2) && (
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            {/* Button 1 */}
            <Link 
            to={'/collection'}
            className="group relative overflow-hidden border border-white px-7 py-2 md:px-20 font-semibold text-white transition-colors duration-300">
              <span className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <span className="relative font-normal group-hover:text-black transition-colors duration-300">
                {btn1}
              </span>
            </Link>

            {/* Button 2 */}
            {/* <button className="group relative overflow-hidden border border-white px-7 py-2 md:px-20 font-semibold text-white transition-colors duration-300">
              <span className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <span className="relative font-normal group-hover:text-black transition-colors duration-300">
                {btn2}
              </span>
            </button> */}
          </div>
        )}
      </div>
    </section>
  );
};

export default Banner;