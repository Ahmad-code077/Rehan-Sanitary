export interface FetchParams {
  page: number;
  limit: number;
  search?: string;
  category?: string;
  brand?: string;
  availability?: boolean | null;
  sortBy: 'latest' | 'priceAsc' | 'priceDesc';
  minPrice: number;
  maxPrice: number;
}
