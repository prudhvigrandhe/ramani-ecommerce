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
    image_path?: string;
  
    stock: boolean;
  
    // Homepage Sections
    is_trending: boolean;
    is_best_seller: boolean;
    is_new_arrival: boolean;
  
    badge?: string;
  };
  
  export type Category = {
    id: number;
    name: string;
  };