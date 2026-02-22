import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/colors';

interface EmptyViewProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
}

export function EmptyView({ icon = 'search-outline', title, subtitle }: EmptyViewProps) {
  return (
    <View style={styles.container} testID="empty-view">
      <Ionicons name={icon} size={48} color={Colors.textTertiary} />
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    padding: 30,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: Colors.textTertiary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
