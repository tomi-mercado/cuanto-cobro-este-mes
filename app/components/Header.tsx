import Image from "next/image";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="container flex py-4 gap-4 items-center">
      <div>
        <Image
          src="https://aerolab.co/static/images/favicon-167.png"
          alt="Aerolab logo"
          width={36}
          height={36}
        />
      </div>
      <div className="flex flex-col">
        <h1 className="text-xl sm:text-2xl font-bold">Cuánto Aerocobro</h1>
        <p className="text-xs sm:text-sm">Mi sueldo en ARS este mes en Aero</p>
      </div>
    </header>
  );
};

export default Header;
