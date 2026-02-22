import { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Pressable, Platform, Keyboard } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import * as Haptics from 'expo-haptics';
import Colors from '@/constants/colors';
import { searchBooks } from '@/lib/api';
import { BookWithDetails } from '@/lib/types';
import { SearchResultItem } from '@/components/SearchResultItem';
import { LoadingView } from '@/components/LoadingView';
import { ErrorView } from '@/components/ErrorView';
import { EmptyView } from '@/components/EmptyView';

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const webTopInset = Platform.OS === 'web' ? 67 : 0;
  const webBottomInset = Platform.OS === 'web' ? 34 : 0;
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
  }, []);

  const { data: results, isLoading, error, refetch } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => searchBooks(debouncedQuery, 30),
    enabled: debouncedQuery.length >= 2,
    staleTime: 30 * 1000,
  });

  const handleBookPress = useCallback((book: BookWithDetails) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Keyboard.dismiss();
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

  const renderItem = useCallback(({ item }: { item: BookWithDetails }) => (
    <SearchResultItem book={item} onPress={() => handleBookPress(item)} />
  ), [handleBookPress]);

  const renderContent = () => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      return (
        <EmptyView
          icon="search-outline"
          title="Search for books"
          subtitle="Type a book title or author name to search"
        />
      );
    }

    if (isLoading) {
      return <LoadingView message="Searching..." />;
    }

    if (error) {
      return (
        <ErrorView
          message="Search failed. Please check your connection and try again."
          onRetry={() => refetch()}
        />
      );
    }

    if (!results || results.length === 0) {
      return (
        <EmptyView
          icon="book-outline"
          title="No results found"
          subtitle={`We couldn't find any books matching "${debouncedQuery}"`}
        />
      );
    }

    return (
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ paddingBottom: (insets.bottom || webBottomInset) + 20 }}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        scrollEnabled={!!(results && results.length > 0)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: (insets.top || webTopInset) + 10 }]}>
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.back();
          }}
          style={({ pressed }) => [pressed && { opacity: 0.6 }]}
          testID="back-button"
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Search Book</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <Ionicons name="search" size={18} color={Colors.textTertiary} />
          <TextInput
            ref={inputRef}
            style={styles.searchInput}
            placeholder="Book title or author"
            placeholderTextColor={Colors.textTertiary}
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
            testID="search-input"
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={18} color={Colors.textTertiary} />
            </Pressable>
          )}
        </View>
      </View>

      {renderContent()}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.text,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 46,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    color: Colors.text,
    height: '100%',
  },
});
