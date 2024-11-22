export interface Font {
  id: string;
  family: string;
  category: string;
  variants: string[];
  preview: string;
  script?: 'latin' | 'thaana';
  description?: string;
}

export interface SearchFilters {
  category: string;
  variant: string;
  script: string;
}