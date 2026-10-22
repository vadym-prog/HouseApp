export type ServiceCategory = "lawn" | "garden" | "furniture" | "plumbing" | "electric";

export interface ServiceItem {
  id: string;
  title: string;
  category: ServiceCategory;
  categoryLabel: string;
  description: string;
  price: number;
  unit: string;
  imageUrl: string;
}
