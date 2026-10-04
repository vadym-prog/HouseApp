import React from "react";
import type { ServiceItem } from "../types";
import { ServiceCard } from "./ServiceCard";

export interface ServiceListProps {
  services: ServiceItem[];
  onOrder?: (service: ServiceItem) => void;
}

export const ServiceList: React.FC<ServiceListProps> = ({ services, onOrder }) => {
  return (
    <section className="flex flex-col gap-4" id="katalog">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-black tracking-tight">
            Популярні послуги
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 font-medium">
            Фіксований тариф без прихованих платежів
          </p>
        </div>
        <a
          href="#katalog"
          className="hidden sm:inline-flex text-xs font-bold text-neutral-700 hover:text-black items-center gap-1"
        >
          <span>Усі послуги</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} onOrder={onOrder} />
        ))}
      </div>
    </section>
  );
};
