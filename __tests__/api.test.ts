import { searchBooks, fetchBookDetail, fetchBookRatings, fetchAuthorDetail } from '../lib/api';

global.fetch = jest.fn();

describe('Book API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('searchBooks', () => {
    it('should return empty array for empty query', async () => {
      const result = await searchBooks('');
      expect(result).toEqual([]);
      expect(fetch).not.toHaveBeenCalled();
    });

    it('should return empty array for whitespace query', async () => {
      const result = await searchBooks('   ');
      expect(result).toEqual([]);
    });

    it('should fetch and transform search results', async () => {
      const mockResponse = {
        numFound: 1,
        docs: [
          {
            key: '/works/OL123W',
            title: 'The Lifeboat',
            author_name: ['Charlotte Rogan'],
            first_publish_year: 1951,
            cover_i: 12345,
            isbn: ['9780316185905'],
            author_key: ['OL456A'],
            ratings_average: 4.0,
            ratings_count: 350,
          },
        ],
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await searchBooks('lifeboat');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('openlibrary.org/search.json?q=lifeboat')
      );
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('The Lifeboat');
      expect(result[0].authors).toEqual(['Charlotte Rogan']);
      expect(result[0].publishYear).toBe(1951);
      expect(result[0].coverUrl).toContain('12345');
      expect(result[0].ratingsAverage).toBe(4.0);
      expect(result[0].ratingsCount).toBe(350);
    });

    it('should handle missing author_name', async () => {
      const mockResponse = {
        numFound: 1,
        docs: [{ key: '/works/OL1W', title: 'Test Book' }],
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await searchBooks('test');
      expect(result[0].authors).toEqual(['Unknown Author']);
    });

    it('should throw error on API failure', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Internal Server Error',
      });

      await expect(searchBooks('test')).rejects.toThrow('Search failed');
    });
  });

  describe('fetchBookDetail', () => {
    it('should fetch book details with full key', async () => {
      const mockBook = { key: '/works/OL123W', title: 'Test Book' };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockBook,
      });

      const result = await fetchBookDetail('/works/OL123W');
      expect(fetch).toHaveBeenCalledWith('https://openlibrary.org/works/OL123W.json');
      expect(result.title).toBe('Test Book');
    });

    it('should handle key without /works/ prefix', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ key: '/works/OL123W', title: 'Test' }),
      });

      await fetchBookDetail('OL123W');
      expect(fetch).toHaveBeenCalledWith('https://openlibrary.org/works/OL123W.json');
    });

    it('should throw on network error', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
      });

      await expect(fetchBookDetail('invalid')).rejects.toThrow('Failed to fetch book details');
    });
  });

  describe('fetchBookRatings', () => {
    it('should fetch ratings for a book', async () => {
      const mockRating = { summary: { average: 4.2, count: 150 } };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockRating,
      });

      const result = await fetchBookRatings('/works/OL123W');
      expect(fetch).toHaveBeenCalledWith('https://openlibrary.org/works/OL123W/ratings.json');
      expect(result.summary.average).toBe(4.2);
      expect(result.summary.count).toBe(150);
    });
  });

  describe('fetchAuthorDetail', () => {
    it('should fetch author details', async () => {
      const mockAuthor = {
        key: '/authors/OL456A',
        name: 'Charlotte Rogan',
        bio: 'American writer',
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockAuthor,
      });

      const result = await fetchAuthorDetail('/authors/OL456A');
      expect(result.name).toBe('Charlotte Rogan');
      expect(result.bio).toBe('American writer');
    });
  });
});
