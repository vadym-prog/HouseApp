import { useState, useCallback } from "react";
import { API_BASE_URL, getAuthHeaders, saveStoredBooking } from "../../../config/api";

export interface BookingData {
  clientName?: string;
  phone: string;
  serviceId?: string;
  serviceName?: string;
  category?: string;
  date?: string;
  timeSlot?: string;
  address?: string;
  description?: string;
  contactMethod?: "phone" | "telegram" | "viber";
}

export interface BookingResponse {
  id: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
  data: BookingData;
  message?: string;
}

export interface UseCreateBookingReturn {
  createBooking: (data: BookingData) => Promise<BookingResponse | null>;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  lastBooking: BookingResponse | null;
  resetState: () => void;
}

/**
 * Validates booking data before dispatching
 */
export const validateBookingData = (data: BookingData): { isValid: boolean; error?: string } => {
  const cleanPhone = (data.phone || "").replace(/\D/g, "");
  if (!cleanPhone || cleanPhone.length < 9) {
    return {
      isValid: false,
      error: "Введіть коректний номер телефону (мінімум 9 цифр)",
    };
  }

  if (
    data.clientName !== undefined &&
    data.clientName.trim().length > 0 &&
    data.clientName.trim().length < 2
  ) {
    return {
      isValid: false,
      error: "Ім’я повинно містити щонайменше 2 символи",
    };
  }

  return { isValid: true };
};

/**
 * Custom hook to submit booking requests
 * Dispatches to Node.js / Express backend with robust localStorage fallback
 */
export const useCreateBooking = (): UseCreateBookingReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [lastBooking, setLastBooking] = useState<BookingResponse | null>(null);

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setIsSuccess(false);
    setLastBooking(null);
  }, []);

  const createBooking = useCallback(async (data: BookingData): Promise<BookingResponse | null> => {
    // 1. Client-side validation
    const validation = validateBookingData(data);
    if (!validation.isValid) {
      setError(validation.error || "Помилка валідації форми");
      setIsSuccess(false);
      return null;
    }

    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Помилка сервера: ${response.status}`);
      }

      const result: BookingResponse = await response.json();
      setIsSuccess(true);
      setLastBooking(result);
      saveStoredBooking(result);
      return result;
    } catch (err: unknown) {
      // Fallback simulation for offline mode / before backend lab
      console.info(
        "Backend /api/bookings unavailable. Simulating successful booking locally in localStorage.",
        err
      );

      const fallbackBooking: BookingResponse = {
        id: `bk_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
        status: "pending",
        createdAt: new Date().toISOString(),
        data: {
          ...data,
          date: data.date || new Date().toISOString().split("T")[0],
        },
        message: "Заявку успішно прийнято (локальний режим)",
      };

      // Save to localStorage history
      saveStoredBooking(fallbackBooking);

      setIsSuccess(true);
      setLastBooking(fallbackBooking);
      setError(null);
      return fallbackBooking;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createBooking,
    isLoading,
    error,
    isSuccess,
    lastBooking,
    resetState,
  };
};

export default useCreateBooking;
