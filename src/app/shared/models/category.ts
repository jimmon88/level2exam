export interface Category {
  id: number;
  name: string;
}
export interface CategoryApiResponse {
  trivia_categories: Category[];
}
