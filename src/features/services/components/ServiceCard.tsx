import React from "react";
import type { ServiceItem } from "../types";

export interface ServiceCardProps {
  service: ServiceItem;
  onOrder?: (service: ServiceItem) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div>
      <h2>{service.title}</h2>
      <p>Ціна: {service.price}</p>
    </div>
  );
};
