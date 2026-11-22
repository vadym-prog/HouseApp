import { useState, useEffect, useCallback, useMemo } from "react";
import { API_BASE_URL } from "../../../config/api";
import { MOCK_SERVICES } from "../data/mockServices";
import type { ServiceItem } from "../types";

export interface UseServicesOptions {
  initialCategory?: string;
  initialSearch?: string;
  autoFetch?: boolean;
}

export interface UseServicesReturn {
  services: ServiceItem[];
  filteredServices: ServiceItem[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  refetch: () => Promise<void>;
}

/**
 * Custom hook to fetch and filter MasterDim services
 * Supports Node.js / Express backend with safe fallback to mock data
 */
export const useServices = (options: UseServicesOptions = {}): UseServicesReturn => {
  const { initialCategory = "all", initialSearch = "", autoFetch = true } = options;

  const [services, setServices] = useState<ServiceItem[]>(MOCK_SERVICES);
  const [isLoading, setIsLoading] = useState<boolean>(autoFetch);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);

  useEffect(() => {
    if (!autoFetch) return;

    let isMounted = true;
    const controller = new AbortController();

    const loadData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/services`, {
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (isMounted) {
          const list: ServiceItem[] = Array.isArray(data)
            ? data
            : Array.isArray(data?.services)
              ? data.services
              : MOCK_SERVICES;

          setServices(list);
          setError(null);
          setIsLoading(false);
        }
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }

        if (isMounted) {
          console.info(
            "Backend /api/services unavailable. Falling back to local mockServices.",
            err
          );
          setServices(MOCK_SERVICES);
          setError(null);
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [autoFetch]);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/services`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const list: ServiceItem[] = Array.isArray(data)
        ? data
        : Array.isArray(data?.services)
          ? data.services
          : MOCK_SERVICES;

      setServices(list);
    } catch (err: unknown) {
      console.info("Backend /api/services unavailable. Falling back to local mockServices.", err);
      setServices(MOCK_SERVICES);
      setError(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Business logic: Category & search filtering
  const filteredServices = useMemo(() => {
    let result = [...services];

    // Filter by category
    if (selectedCategory && selectedCategory !== "all") {
      if (selectedCategory === "lawn") {
        result = result.filter((s) => s.category === "lawn" || s.category === "garden");
      } else {
        result = result.filter((s) => s.category === selectedCategory);
      }
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(query) ||
          s.description.toLowerCase().includes(query) ||
          s.categoryLabel.toLowerCase().includes(query)
      );
    }

    return result;
  }, [services, selectedCategory, searchQuery]);

  return {
    services,
    filteredServices,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    refetch,
  };
};

export default useServices;
