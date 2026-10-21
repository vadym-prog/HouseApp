export type ServiceCategory = "lawn" | "garden" | "furniture" | "plumbing" | "electric" | "repair";

export interface ServiceItem {
  id: string;
  title: string;
  category: ServiceCategory;
  categoryLabel: string;
  description: string;
  price: number;
  unit: string;
  imageUrl: string;
  duration?: string;
  rating?: number;
  reviewsCount?: number;
}
