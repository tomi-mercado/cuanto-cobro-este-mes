import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="container py-4">
      <Link href="/" className="flex items-center gap-4 w-fit">
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
          <p className="text-xs sm:text-sm">
            Mi sueldo en ARS este mes en Aero
          </p>
        </div>
      </Link>
    </header>
  );
};

export default Header;
