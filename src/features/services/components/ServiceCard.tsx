import React from "react";
import type { ServiceItem } from "../types";
import { Button } from "../../../components/ui/Button";

export interface ServiceCardProps {
  service: ServiceItem;
  onOrder?: (service: ServiceItem) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onOrder }) => {
  return (
    <div
      data-testid={`service-card-${service.id}`}
      className="bg-white rounded-2xl p-3 border border-neutral-200 shadow-sm flex flex-col justify-between hover:border-black transition-all group duration-200"
    >
      <div>
        <div className="relative h-40 w-full rounded-xl overflow-hidden bg-neutral-100 mb-3">
          <img
            src={service.imageUrl}
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/95 text-[11px] font-bold text-neutral-800 backdrop-blur-xs">
            {service.categoryLabel}
          </span>
        </div>
        <h3 className="font-bold text-sm sm:text-base text-black mb-1">{service.title}</h3>
        <p className="text-xs text-neutral-500 font-medium line-clamp-2">{service.description}</p>
      </div>

      <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
        <div>
          <span className="block text-[10px] uppercase font-bold text-neutral-400">Ціна</span>
          <span className="text-sm font-extrabold text-black">
            від {service.price} ₴{" "}
            <span className="text-xs font-normal text-neutral-500">/ {service.unit}</span>
          </span>
        </div>
        <Button
          size="sm"
          icon="arrow_forward"
          onClick={() => onOrder?.(service)}
          aria-label={`Замовити ${service.title}`}
        >
          Замовити
        </Button>
      </div>
    </div>
  );
};
