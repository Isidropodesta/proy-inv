import { FaGithub, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const Year = new Date().getFullYear();

  return (
    <footer className="relative  ">
      <div className="absolute bg-gray-100 text-black top-0 left-0 w-[100%] overflow-hidden">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,
                        250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,
                        3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="relative block h-[600px] fill-white"
          ></path>
        </svg>
        <div className="grid lg:grid-cols-4 gap-20 sm:grid-cols-1 p-20">
            
          <div className="flex flex-col gap-5">
              <h2 className="text-[22px] font-semibold text-pink-500 py-2 px-20 uppercase">
                    iManaging </h2>
            <img
              src="/images/logo-limpio.png"
              className="h-[200px] w-[300px]"
            />
          </div>

        <div>
  <h2 className="text-[22px] font-semibold text-pink-500 py-2 uppercase">
    Ubicación
  </h2>
  <div className="w-full h-[180px] rounded-xl overflow-hidden shadow-md">
    <iframe
      title="Ubicación UTN Mendoza"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.0571451134438!2d-68.85393213121948!3d-32.89665734765926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e0908d5e865c5%3A0xb5ec70786453a73!2sUTN%20Facultad%20Regional%20Mendoza!5e0!3m2!1ses-419!2sar!4v1748016431390!5m2!1ses-419!2sar"
      width="100%"
      height="200"
      allowFullScreen=""
      loading="lazy"
      className="border-none"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</div>

          <div>
            <li className="text-[22px] list-none font-semibold text-pink-500 py-2 uppercase">
              Redes
            </li>
            <div className="flex space-x-4 color-red-500 ">
              <a
                className="text-3xl text-gray-600 hover:text-pink-500 transform hover:scale-150 
                            transition-all duration-150 ease-in-out"
                href=""
              >
                <FaGithub />
              </a>
              <a
                className="text-3xl text-gray-600 hover:text-pink-500 transform hover:scale-150
                             transition-all duration-150 ease-in-out"
                href=""
              >
                <FaLinkedinIn />
              </a>
              <a
                className=" text-3xl text-gray-600 hover:text-pink-500 transform hover:scale-150
                             transition-all duration-150 ease-in-out"
                href=""
              >
                <FaTwitter />
              </a>
              <a
                className="text-3xl text-gray-600 hover:text-pink-500 transform hover:scale-150
                             transition-all duration-150 ease-in-out"
                href=""
              >
                <FaInstagram />
              </a>
            </div>
          </div>
          <div className="mb-4 md:mb-0">
            <h2 className="text-[22px] font-semibold text-pink-500 py-2 uppercase">
              Contacto
            </h2>
           <p className="text-[16px] my-4">
  Email:{" "}
 <a
  href="mailto:imanaging.contacto@gmail.com?subject=Consulta%20desde%20la%20web&body=Hola%20iManaging%2C%20quiero%20hacer%20una%20consulta%3A"
  target="_blank"
  rel="noopener noreferrer"
  className="text-pink-500 underline hover:text-pink-400"
>
  imanaging.contacto@gmail.com
</a>
</p>

            <p className="text-[16px] my-4">Phone: 2612071048 </p>
            
          </div>
        </div>

        <div className="mt-5">
          <div className="h-full flex items-center justify-center mb-5"></div>
        </div>
        <h6 className="text-center">&copy;Copyright {Year} Grupo iManaging</h6>
      </div>
    </footer>
  );
};

export default Footer;
