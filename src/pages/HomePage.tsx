import React from "react";
import { MainLayout } from "../layouts/MainLayout";
import { QuickBookingWidget } from "../features/booking/components/QuickBookingWidget";
import { ServiceList } from "../features/services/components/ServiceList";

export const HomePage: React.FC = () => (
  <MainLayout>
    <h1>МайстерДім</h1>
    <ServiceList />
    <QuickBookingWidget />
  </MainLayout>
);
