import { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Platform, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import Colors from '@/constants/colors';
import { fetchTrendingBooks } from '@/lib/api';
import { BookWithDetails } from '@/lib/types';
import { LoadingView } from '@/components/LoadingView';
import { ErrorView } from '@/components/ErrorView';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const webTopInset = Platform.OS === 'web' ? 67 : 0;
  const webBottomInset = Platform.OS === 'web' ? 34 : 0;

  const { data: books, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ['trending-books'],
    queryFn: fetchTrendingBooks,
    staleTime: 5 * 60 * 1000,
  });

  const handleBookPress = useCallback((book: BookWithDetails) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const workId = book.key.replace('/works/', '');
    router.push({
      pathname: '/book/[id]',
      params: {
        id: workId,
        title: book.title,
        authors: book.authors.join(', '),
        authorKeys: book.authorKeys?.join(',') || '',
        coverUrl: book.coverUrl || '',
        publishYear: book.publishYear?.toString() || '',
        ratingsAverage: book.ratingsAverage?.toString() || '',
        ratingsCount: book.ratingsCount?.toString() || '',
      },
    });
  }, []);

  const handleSearchPress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/search');
  }, []);

  const renderBookItem = useCallback(({ item }: { item: BookWithDetails }) => (
    <Pressable
      onPress={() => handleBookPress(item)}
      style={({ pressed }) => [
        styles.gridItem,
        pressed && styles.gridItemPressed,
      ]}
      testID="home-book-item"
    >
      <View style={styles.gridCoverContainer}>
        {item.coverUrl ? (
          <Image
            source={{ uri: item.coverUrl }}
            style={styles.gridCover}
            contentFit="cover"
            transition={300}
          />
        ) : (
          <View style={[styles.gridCover, styles.placeholderCover]}>
            <Ionicons name="book-outline" size={32} color={Colors.textTertiary} />
          </View>
        )}
      </View>
      <Text style={styles.gridTitle} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.gridAuthor} numberOfLines={1}>{item.authors[0]}</Text>
    </Pressable>
  ), [handleBookPress]);

  if (isLoading) {
    return (
      <View style={[styles.container, { paddingTop: (insets.top || webTopInset) }]}>
        <LoadingView message="Discovering books..." />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { paddingTop: (insets.top || webTopInset) }]}>
        <ErrorView
          message="Failed to load books. Please check your connection and try again."
          onRetry={() => refetch()}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: (insets.top || webTopInset) + 10 }]}>
        <View>
          <Text style={styles.headerGreeting}>Discover</Text>
          <Text style={styles.headerTitle}>Book Explorer</Text>
        </View>
        <Pressable
          onPress={handleSearchPress}
          style={({ pressed }) => [
            styles.searchButton,
            pressed && { opacity: 0.7 },
          ]}
          testID="search-button"
        >
          <Ionicons name="search" size={22} color={Colors.text} />
        </Pressable>
      </View>

      <FlatList
        data={books || []}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.key}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={[
          styles.gridContent,
          { paddingBottom: (insets.bottom || webBottomInset) + 20 },
        ]}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!!(books && books.length > 0)}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={() => refetch()}
            tintColor={Colors.primary}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 14,
    backgroundColor: Colors.background,
  },
  headerGreeting: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: Colors.textSecondary,
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: 'Inter_700Bold',
    color: Colors.text,
    marginTop: 2,
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridContent: {
    paddingHorizontal: 16,
    paddingTop: 6,
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  gridItem: {
    width: '48%',
  },
  gridItemPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  gridCoverContainer: {
    width: '100%',
    aspectRatio: 0.65,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  gridCover: {
    width: '100%',
    height: '100%',
  },
  placeholderCover: {
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.text,
    lineHeight: 18,
  },
  gridAuthor: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
