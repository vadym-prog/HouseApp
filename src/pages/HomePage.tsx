import React, { useState } from "react";
import { MainLayout } from "../layouts/MainLayout";
import { QuickBookingWidget } from "../features/booking/components/QuickBookingWidget";
import { ServiceList } from "../features/services/components/ServiceList";
import { MOCK_SERVICES } from "../features/services/data/mockServices";
import type { ServiceItem } from "../features/services/types";

export const HomePage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const handleOrder = (service: ServiceItem) => {
    setSelectedService(service);
    const bookingEl = document.getElementById("quick-booking-section");
    bookingEl?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col w-full gap-8">
          {/* FIGMA STYLE HERO WITH INTERACTIVE CURSORS & MINIMAL TEXT */}
          <section
            id="quick-booking-section"
            className="relative overflow-hidden rounded-3xl bg-white border border-neutral-200 p-6 md:p-12 shadow-sm"
          >
            {/* Subtle decorative canvas tags / markers */}
            <div className="absolute top-4 left-5 hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span>FRAME // 01 HERO</span>
              <span>•</span>
              <span className="text-vivid-emerald flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-vivid-emerald animate-pulse"></span>
                18 майстрів онлайн
              </span>
            </div>

            {/* Interactive Figma Floating Cursor 1: Master */}
            <div className="hidden md:flex items-start gap-1 absolute top-10 right-28 pointer-events-none select-none z-10">
              <svg
                className="w-5 h-5 text-electric-violet fill-current drop-shadow-md"
                viewBox="0 0 24 24"
              >
                <path d="M4 2l16 11-7 2-4 7z"></path>
              </svg>
              <div className="px-2.5 py-1 rounded-full bg-electric-violet text-white text-xs font-semibold shadow-md flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">handyman</span>
                <span>Олексій (майстер)</span>
              </div>
            </div>

            {/* Interactive Figma Floating Cursor 2: Client */}
            <div className="hidden md:flex items-start gap-1 absolute bottom-12 left-16 pointer-events-none select-none z-10">
              <svg
                className="w-5 h-5 text-vivid-emerald fill-current drop-shadow-md"
                viewBox="0 0 24 24"
              >
                <path d="M4 2l16 11-7 2-4 7z"></path>
              </svg>
              <div className="px-2.5 py-1 rounded-full bg-vivid-emerald text-white text-xs font-semibold shadow-md flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">location_on</span>
                <span>Марія (замовник)</span>
              </div>
            </div>

            <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-4 py-4 relative z-0">
              {/* Compact Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 text-neutral-800 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-vivid-emerald"></span>
                <span>Закарпатська область • Ужгород • Виїзд від 30 хв</span>
              </div>

              {/* Hero Title */}
              <h1 className="font-sans text-3xl sm:text-5xl md:text-6xl font-extrabold text-black tracking-tight leading-tight">
                Сервіс перевірених майстрів біля вас
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-neutral-600 font-medium max-w-xl">
                Ремонт, сантехніка та догляд за ділянкою з гарантією 30 днів.
              </p>

              {selectedService && (
                <div className="px-4 py-2 bg-blue-50 text-primary border border-blue-200 rounded-full text-xs font-semibold">
                  Обрано послугу: {selectedService.title} (від {selectedService.price} ₴)
                </div>
              )}

              {/* Quick Action Figma-Style Booking Widget */}
              <QuickBookingWidget />

              {/* Quick proof badges */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs font-semibold text-neutral-600">
                <span className="flex items-center gap-1">
                  <span
                    className="material-symbols-outlined text-sm text-amber-500"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  4.95 (8 400+ відгуків)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-vivid-emerald">
                    verified
                  </span>
                  Гарантія 30 днів
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-primary">
                    credit_card
                  </span>
                  Оплата після роботи
                </span>
              </div>
            </div>
          </section>

          {/* COMPACT SERVICES CATALOG */}
          <ServiceList services={MOCK_SERVICES} onOrder={handleOrder} />

          {/* CONCISE 3-STEP PROCESS */}
          <section className="flex flex-col gap-4 py-4" id="steps">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl sm:text-2xl font-extrabold text-black tracking-tight">
                Як це працює
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 font-medium">
                Простий процес без зайвих дзвінків
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-base shrink-0">
                  1
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold text-base text-black">Оберіть послугу</h3>
                  <p className="text-xs text-neutral-500 mt-1 font-medium">
                    Замовлення в 1 клік на сайті або за телефоном.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-base shrink-0">
                  2
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold text-base text-black">Прибуття за 30 хв</h3>
                  <p className="text-xs text-neutral-500 mt-1 font-medium">
                    Майстер поруч із потрібним інструментом.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-base shrink-0">
                  3
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold text-base text-black">Оплата після перевірки</h3>
                  <p className="text-xs text-neutral-500 mt-1 font-medium">
                    Карткою або готівкою з гарантією 30 днів.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CONCISE TRUST & METRICS STRIP */}
          <section
            className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm"
            id="trust"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-neutral-200">
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl font-extrabold text-black">15 000+</span>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 mt-1">
                  Виконаних замовлень
                </span>
              </div>
              <div className="flex flex-col items-center pt-4 sm:pt-0">
                <span className="text-3xl sm:text-4xl font-extrabold text-vivid-emerald">100%</span>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 mt-1">
                  Перевірені майстри
                </span>
              </div>
              <div className="flex flex-col items-center pt-4 sm:pt-0">
                <span className="text-3xl sm:text-4xl font-extrabold text-black">30 днів</span>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 mt-1">
                  Фіксована гарантія
                </span>
              </div>
            </div>
          </section>

          {/* CONCISE QUICK CALL BANNER */}
          <section className="bg-black text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col text-center md:text-left gap-1">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Потрібен майстер терміново?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-medium">
                Диспетчер направить найближчого майстра протягом 3 хвилин.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="tel:0800334050"
                className="bg-white text-black hover:bg-neutral-100 rounded-full px-6 py-3 font-semibold text-sm transition-all shadow-sm flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">call</span>
                <span>0 800 33-40-50</span>
              </a>
              <a
                href="#quick-booking-section"
                className="border border-neutral-700 text-white hover:bg-neutral-800 rounded-full px-6 py-3 font-semibold text-sm transition-all"
              >
                Замовити онлайн
              </a>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
};
