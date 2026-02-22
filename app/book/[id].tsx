import { useCallback, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Platform, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import Colors from '@/constants/colors';
import { fetchFullBookDetails, extractDescription } from '@/lib/api';
import { StarRating } from '@/components/StarRating';
import { ErrorView } from '@/components/ErrorView';
import { toggleReadBook, isBookRead } from '@/lib/storage';

export default function BookDetailScreen() {
  const insets = useSafeAreaInsets();
  const webTopInset = Platform.OS === 'web' ? 67 : 0;
  const webBottomInset = Platform.OS === 'web' ? 34 : 0;
  const params = useLocalSearchParams<{
    id: string;
    title: string;
    authors: string;
    authorKeys: string;
    coverUrl: string;
    publishYear: string;
    ratingsAverage: string;
    ratingsCount: string;
  }>();

  const [isRead, setIsRead] = useState(false);
  const workKey = `/works/${params.id}`;
  const authorKeyList = params.authorKeys ? params.authorKeys.split(',').filter(Boolean) : [];

  useEffect(() => {
    isBookRead(workKey).then(setIsRead);
  }, [workKey]);

  const { data: details, isLoading, error, refetch } = useQuery({
    queryKey: ['book-detail', params.id],
    queryFn: () => fetchFullBookDetails(workKey, authorKeyList),
    enabled: !!params.id,
  });

  const handleToggleRead = useCallback(async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const newIsRead = await toggleReadBook(workKey);
    setIsRead(newIsRead);
  }, [workKey]);

  const ratingsAvg = details?.ratings?.summary?.average || (params.ratingsAverage ? parseFloat(params.ratingsAverage) : 0);
  const ratingsCount = details?.ratings?.summary?.count || (params.ratingsCount ? parseInt(params.ratingsCount) : 0);
  const description = details?.book ? extractDescription(details.book.description) : undefined;
  const authorBio = details?.author ? extractDescription(details.author.bio) : undefined;
  const authorName = details?.author?.name || params.authors;

  if (error && !details) {
    return (
      <View style={[styles.container, { paddingTop: (insets.top || webTopInset) }]}>
        <View style={styles.headerBar}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </Pressable>
        </View>
        <ErrorView
          message="Failed to load book details. Please check your connection."
          onRetry={() => refetch()}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.headerBar, { paddingTop: (insets.top || webTopInset) + 10 }]}>
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.back();
          }}
          style={({ pressed }) => [pressed && { opacity: 0.6 }]}
          testID="detail-back-button"
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </Pressable>
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.push('/search');
          }}
          style={({ pressed }) => [pressed && { opacity: 0.6 }]}
          testID="detail-search-button"
        >
          <Ionicons name="search" size={22} color={Colors.text} />
        </Pressable>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: (insets.bottom || webBottomInset) + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.coverSection}>
          <View style={styles.coverContainer}>
            {params.coverUrl ? (
              <Image
                source={{ uri: params.coverUrl }}
                style={styles.coverImage}
                contentFit="cover"
                transition={400}
              />
            ) : (
              <View style={[styles.coverImage, styles.placeholderCover]}>
                <Ionicons name="book-outline" size={48} color={Colors.textTertiary} />
              </View>
            )}
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.bookTitle}>{params.title}</Text>
          <Text style={styles.bookAuthor}>{authorName}</Text>
          {params.publishYear && (
            <Text style={styles.publishYear}>Published in {params.publishYear}</Text>
          )}
        </View>

        {(ratingsAvg > 0 || ratingsCount > 0) && (
          <View style={styles.ratingsSection}>
            <StarRating
              rating={ratingsAvg}
              count={ratingsCount}
              size={18}
            />
          </View>
        )}

        {isLoading && (
          <View style={styles.loadingDetails}>
            <ActivityIndicator size="small" color={Colors.primary} />
            <Text style={styles.loadingText}>Loading details...</Text>
          </View>
        )}

        {authorBio && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About the author</Text>
            <Text style={styles.sectionText}>{authorBio}</Text>
          </View>
        )}

        {description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.sectionText}>{description}</Text>
          </View>
        )}

        {details?.book?.subjects && details.book.subjects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Subjects</Text>
            <View style={styles.subjectsRow}>
              {details.book.subjects.slice(0, 6).map((subject, index) => (
                <View key={index} style={styles.subjectTag}>
                  <Text style={styles.subjectText}>{subject}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: (insets.bottom || webBottomInset) + 14 }]}>
        <Pressable
          onPress={handleToggleRead}
          style={({ pressed }) => [
            styles.readButton,
            isRead && styles.readButtonActive,
            pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
          ]}
          testID="read-button"
        >
          {isRead && <Ionicons name="checkmark" size={20} color={Colors.white} />}
          <Text style={[styles.readButtonText, isRead && styles.readButtonTextActive]}>
            {isRead ? 'Book Read' : 'Mark as Read'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  coverSection: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },
  coverContainer: {
    width: 180,
    height: 260,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.primary,
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  placeholderCover: {
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoSection: {
    alignItems: 'center',
    marginBottom: 14,
  },
  bookTitle: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 28,
  },
  bookAuthor: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    color: Colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  publishYear: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: Colors.textTertiary,
    marginTop: 4,
  },
  ratingsSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  loadingDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 20,
  },
  loadingText: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: Colors.textTertiary,
  },
  section: {
    marginBottom: 22,
  },
  sectionTitle: {
    fontSize: 17,
    fontFamily: 'Inter_700Bold',
    color: Colors.text,
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  subjectsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  subjectTag: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  subjectText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: Colors.primaryDark,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 14,
    backgroundColor: Colors.background,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.border,
  },
  readButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.accent,
    paddingVertical: 14,
    borderRadius: 28,
  },
  readButtonActive: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  readButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.accent,
  },
  readButtonTextActive: {
    color: Colors.white,
  },
});
