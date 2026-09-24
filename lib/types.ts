export type Product = {
  id: number;

  name: string;
  description: string;

  category: string;
  categoryId: number;

  price: number;
  originalPrice: number;

  rating: number;

  image: string;
  images: string[];

  stock: boolean;
  availableSizes: string[];

  // Inventory quantity for each size
  // Example: { S: 2, M: 5, L: 1, "Free Size": 10 }
  sizeStock: Record<string, number>;

  fabric: string;
  fit: string;
  occasion: string;
  sleeve: string;
  washCare: string;
  color: string;
  pattern: string;
  sku: string;

  is_trending: boolean;
  is_best_seller: boolean;
  is_new_arrival: boolean;

  badge?: string;
};

export type Category = {
  id: number;
  name: string;
};