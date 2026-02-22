import { View, Text, StyleSheet, Pressable } from 'react-native';
import Colors from '@/constants/colors';
import { BookWithDetails } from '@/lib/types';

interface SearchResultItemProps {
  book: BookWithDetails;
  onPress: () => void;
}

export function SearchResultItem({ book, onPress }: SearchResultItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
      testID="search-result-item"
    >
      <Text style={styles.title} numberOfLines={1}>{book.title}</Text>
      <Text style={styles.author} numberOfLines={1}>by {book.authors[0]}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  pressed: {
    backgroundColor: Colors.surface,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: Colors.primary,
    marginBottom: 3,
  },
  author: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: Colors.textSecondary,
  },
});
