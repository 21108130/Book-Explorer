export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  isbn?: string[];
  subject?: string[];
  edition_count?: number;
  ratings_average?: number;
  ratings_count?: number;
  author_key?: string[];
}

export interface BookDetail {
  key: string;
  title: string;
  description?: string | { value: string };
  covers?: number[];
  subjects?: string[];
  first_publish_date?: string;
  created?: { value: string };
}

export interface AuthorDetail {
  key: string;
  name: string;
  bio?: string | { value: string };
  birth_date?: string;
  death_date?: string;
  photos?: number[];
}

export interface BookRating {
  summary: {
    average?: number;
    count?: number;
  };
}

export interface SearchResult {
  numFound: number;
  docs: Book[];
}

export interface BookWithDetails {
  key: string;
  title: string;
  authors: string[];
  authorKeys: string[];
  publishYear?: number;
  coverUrl?: string;
  description?: string;
  subjects?: string[];
  ratingsAverage?: number;
  ratingsCount?: number;
  isbn?: string;
}
