import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-10 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <img
            src="https://lh3.googleusercontent.com/aida/AEtjO1WIzBQkPNS1kbD22rUDUpG1rIhjc8k4UnCathTz-85RbcD_vpQlQBzmBrsuvKgGi4gi5KTlHZ7Ii8DYZ0P0NxhhqmrIaMBVo8aplY_nKLjuKyMhVPmjsBxQEHSp9FopAA8d1BjkRAsyOuaL2ZQWmqB0Z4ddPBzPLgL6l684iYDl8HvS4ls2db6x6SqEClLXBncFNbaFRDTaxAFUgvbVdBnXRpY-xpVSCmfT0UxVLvM2hXWay7VClVvDRJk"
            alt="МайстерДім"
            className="h-6 w-6 rounded-md object-contain"
          />
          <span className="text-sm text-black font-extrabold font-sans">МайстерДім</span>
          <span className="text-xs text-neutral-400 pl-2">© 2026</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-neutral-500 font-semibold">
          <a href="#katalog" className="hover:text-black transition-colors">
            Послуги
          </a>
          <a href="#steps" className="hover:text-black transition-colors">
            Як працює
          </a>
          <a href="#trust" className="hover:text-black transition-colors">
            Гарантія
          </a>
          <a href="tel:0800334050" className="text-black font-bold">
            +380 (800) 33-40-50
          </a>
        </div>
      </div>
    </footer>
  );
};
