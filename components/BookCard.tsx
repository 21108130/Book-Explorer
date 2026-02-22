import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/colors';
import { BookWithDetails } from '@/lib/types';

interface BookCardProps {
  book: BookWithDetails;
  onPress: () => void;
}

export function BookCard({ book, onPress }: BookCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
      testID="book-card"
    >
      <View style={styles.coverContainer}>
        {book.coverUrl ? (
          <Image
            source={{ uri: book.coverUrl }}
            style={styles.cover}
            contentFit="cover"
            transition={300}
          />
        ) : (
          <View style={[styles.cover, styles.placeholderCover]}>
            <Ionicons name="book-outline" size={28} color={Colors.textTertiary} />
          </View>
        )}
      </View>
      <Text style={styles.title} numberOfLines={2}>{book.title}</Text>
      <Text style={styles.author} numberOfLines={1}>{book.authors[0]}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 140,
    marginRight: 14,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  coverContainer: {
    width: 140,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cover: {
    width: '100%',
    height: '100%',
  },
  placeholderCover: {
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.text,
    lineHeight: 18,
  },
  author: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
