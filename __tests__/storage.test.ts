import { getReadBooks, toggleReadBook, isBookRead } from '../lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('Book Storage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getReadBooks', () => {
    it('should return empty array when no data stored', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);
      const result = await getReadBooks();
      expect(result).toEqual([]);
    });

    it('should return stored book keys', async () => {
      const stored = ['/works/OL1W', '/works/OL2W'];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(stored));
      const result = await getReadBooks();
      expect(result).toEqual(stored);
    });

    it('should handle storage errors gracefully', async () => {
      (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(new Error('Storage error'));
      const result = await getReadBooks();
      expect(result).toEqual([]);
    });
  });

  describe('toggleReadBook', () => {
    it('should add book when not in list', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify([]));
      const result = await toggleReadBook('/works/OL1W');
      expect(result).toBe(true);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@book_explorer_read_books',
        JSON.stringify(['/works/OL1W'])
      );
    });

    it('should remove book when already in list', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(['/works/OL1W', '/works/OL2W'])
      );
      const result = await toggleReadBook('/works/OL1W');
      expect(result).toBe(false);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@book_explorer_read_books',
        JSON.stringify(['/works/OL2W'])
      );
    });
  });

  describe('isBookRead', () => {
    it('should return true for read book', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(['/works/OL1W'])
      );
      const result = await isBookRead('/works/OL1W');
      expect(result).toBe(true);
    });

    it('should return false for unread book', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(['/works/OL1W'])
      );
      const result = await isBookRead('/works/OL99W');
      expect(result).toBe(false);
    });
  });
});
