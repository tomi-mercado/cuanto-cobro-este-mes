import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="container py-4">
      <Link href="/" className="flex items-center gap-4 w-fit">
        <div className="text-4xl">🪁</div>
        <div className="flex flex-col">
          <h1 className="text-xl sm:text-2xl font-bold">Cuánto cobro</h1>
          <p className="text-xs sm:text-sm">Mi sueldo en ARS este mes</p>
        </div>
      </Link>
    </header>
  );
};

export default Header;
