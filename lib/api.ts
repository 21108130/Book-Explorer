import { SearchResult, BookDetail, AuthorDetail, BookRating, BookWithDetails, Book } from './types';

const BASE_URL = 'https://openlibrary.org';

function getCoverUrl(coverId?: number, size: 'S' | 'M' | 'L' = 'M'): string | undefined {
  if (!coverId) return undefined;
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}

function extractDescription(desc?: string | { value: string }): string | undefined {
  if (!desc) return undefined;
  if (typeof desc === 'string') return desc;
  return desc.value;
}

export async function searchBooks(query: string, limit: number = 20): Promise<BookWithDetails[]> {
  if (!query.trim()) return [];

  const encodedQuery = encodeURIComponent(query.trim());
  const url = `${BASE_URL}/search.json?q=${encodedQuery}&limit=${limit}&fields=key,title,author_name,first_publish_year,cover_i,isbn,subject,edition_count,ratings_average,ratings_count,author_key`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Search failed: ${response.statusText}`);
  }

  const data: SearchResult = await response.json();

  return data.docs.map((book: Book) => ({
    key: book.key,
    title: book.title,
    authors: book.author_name || ['Unknown Author'],
    authorKeys: book.author_key || [],
    publishYear: book.first_publish_year,
    coverUrl: getCoverUrl(book.cover_i, 'M'),
    subjects: book.subject?.slice(0, 5),
    ratingsAverage: book.ratings_average,
    ratingsCount: book.ratings_count,
    isbn: book.isbn?.[0],
  }));
}

export async function fetchBookDetail(workKey: string): Promise<BookDetail> {
  const cleanKey = workKey.startsWith('/works/') ? workKey : `/works/${workKey}`;
  const url = `${BASE_URL}${cleanKey}.json`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch book details: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchAuthorDetail(authorKey: string): Promise<AuthorDetail> {
  const cleanKey = authorKey.startsWith('/authors/') ? authorKey : `/authors/${authorKey}`;
  const url = `${BASE_URL}${cleanKey}.json`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch author details: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchBookRatings(workKey: string): Promise<BookRating> {
  const cleanKey = workKey.startsWith('/works/') ? workKey : `/works/${workKey}`;
  const url = `${BASE_URL}${cleanKey}/ratings.json`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ratings: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchTrendingBooks(): Promise<BookWithDetails[]> {
  const url = `${BASE_URL}/trending/daily.json?limit=20`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch trending books: ${response.statusText}`);
  }

  const data = await response.json();

  return (data.works || []).map((work: any) => ({
    key: work.key,
    title: work.title,
    authors: work.author_name || (work.authors?.map((a: any) => a.name)) || ['Unknown Author'],
    authorKeys: work.author_key || [],
    publishYear: work.first_publish_year,
    coverUrl: getCoverUrl(work.cover_i, 'M'),
    ratingsAverage: work.ratings_average,
    ratingsCount: work.ratings_count,
  }));
}

export async function fetchFullBookDetails(workKey: string, authorKeys: string[]): Promise<{
  book: BookDetail;
  author?: AuthorDetail;
  ratings: BookRating;
}> {
  const cleanKey = workKey.startsWith('/works/') ? workKey : `/works/${workKey}`;

  const [book, ratings] = await Promise.all([
    fetchBookDetail(cleanKey),
    fetchBookRatings(cleanKey),
  ]);

  let author: AuthorDetail | undefined;
  if (authorKeys.length > 0) {
    try {
      author = await fetchAuthorDetail(authorKeys[0]);
    } catch {
      // author fetch is optional
    }
  }

  return { book, author, ratings };
}

export { getCoverUrl, extractDescription };
