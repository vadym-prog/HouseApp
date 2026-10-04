import React from "react";
import { Badge } from "../components/ui/Badge";

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-xl border-b border-surface-border">
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <a href="#" className="flex items-center gap-2.5 group">
            <img
              src="https://lh3.googleusercontent.com/aida/AEtjO1WIzBQkPNS1kbD22rUDUpG1rIhjc8k4UnCathTz-85RbcD_vpQlQBzmBrsuvKgGi4gi5KTlHZ7Ii8DYZ0P0NxhhqmrIaMBVo8aplY_nKLjuKyMhVPmjsBxQEHSp9FopAA8d1BjkRAsyOuaL2ZQWmqB0Z4ddPBzPLgL6l684iYDl8HvS4ls2db6x6SqEClLXBncFNbaFRDTaxAFUgvbVdBnXRpY-xpVSCmfT0UxVLvM2hXWay7VClVvDRJk"
              alt="МайстерДім"
              className="h-8 w-8 rounded-xl object-contain shadow-sm"
            />
            <span className="font-extrabold text-lg text-black tracking-tight font-sans">
              МайстерДім
            </span>
          </a>
          <Badge variant="pro">PRO</Badge>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-neutral-100/90 p-1 rounded-full">
          <a
            href="#"
            className="px-4 py-1.5 rounded-full text-black font-semibold text-sm bg-white shadow-xs"
          >
            Головна
          </a>
          <a
            href="#katalog"
            className="px-4 py-1.5 rounded-full text-neutral-600 font-medium text-sm hover:text-black hover:bg-neutral-200/60 transition-all"
          >
            Послуги
          </a>
          <a
            href="#steps"
            className="px-4 py-1.5 rounded-full text-neutral-600 font-medium text-sm hover:text-black hover:bg-neutral-200/60 transition-all"
          >
            Як працює
          </a>
          <a
            href="#trust"
            className="px-4 py-1.5 rounded-full text-neutral-600 font-medium text-sm hover:text-black hover:bg-neutral-200/60 transition-all"
          >
            Гарантія
          </a>
        </nav>

        {/* Contacts & User Status */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="tel:0800334050"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-neutral-300 text-black text-sm font-semibold hover:bg-neutral-100 transition-colors"
          >
            <span className="material-symbols-outlined text-base text-black">call</span>
            <span>0 800 33-40-50</span>
          </a>
          <div className="flex items-center gap-2 pl-1">
            <div className="relative">
              <img
                src="https://lh3.googleusercontent.com/aida/AEtjO1Xvsc_93oFqSnauAp5IVQNZ060MQM2fk7ENYui9h9Doqrms9Q1An_AyUnNX0QafrbPqs3xDSqOHbxhZkumc8EZlidbsxNBitNlvTQX45B5nelOhjI2EAFDQzMWtUMO-XsLjhimgdCEMoMR2EudWXzn8o89qqYMAXS_XWChKLqJrK57sibKH_TKMEd9j7p2KEitcWNexrWHyL-5xO7PYqqX11JnqaoWxaz679trS2V-jOx4YQJoRKk8q0mU"
                alt="Профіль"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-neutral-200"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-vivid-emerald ring-2 ring-white" />
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-black leading-tight">Олександр</span>
              <span className="text-[11px] font-medium text-neutral-500">Київ</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
