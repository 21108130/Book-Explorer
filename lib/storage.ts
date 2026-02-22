import AsyncStorage from '@react-native-async-storage/async-storage';

const READ_BOOKS_KEY = '@book_explorer_read_books';

export async function getReadBooks(): Promise<string[]> {
  try {
    const data = await AsyncStorage.getItem(READ_BOOKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export async function toggleReadBook(bookKey: string): Promise<boolean> {
  const readBooks = await getReadBooks();
  const index = readBooks.indexOf(bookKey);
  let isRead: boolean;

  if (index > -1) {
    readBooks.splice(index, 1);
    isRead = false;
  } else {
    readBooks.push(bookKey);
    isRead = true;
  }

  await AsyncStorage.setItem(READ_BOOKS_KEY, JSON.stringify(readBooks));
  return isRead;
}

export async function isBookRead(bookKey: string): Promise<boolean> {
  const readBooks = await getReadBooks();
  return readBooks.includes(bookKey);
}
