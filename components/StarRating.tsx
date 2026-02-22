import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/colors';

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: number;
  showCount?: boolean;
}

export function StarRating({ rating, count, size = 16, showCount = true }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <View style={styles.container}>
      <View style={styles.stars}>
        {Array.from({ length: fullStars }).map((_, i) => (
          <Ionicons key={`full-${i}`} name="star" size={size} color={Colors.star} />
        ))}
        {hasHalf && <Ionicons name="star-half" size={size} color={Colors.star} />}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Ionicons key={`empty-${i}`} name="star-outline" size={size} color={Colors.star} />
        ))}
      </View>
      {showCount && (
        <Text style={styles.ratingText}>
          {rating.toFixed(1)}
          {count !== undefined && ` (${count} reviews)`}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontFamily: 'Inter_400Regular',
  },
});
