import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/colors';

interface LoadingViewProps {
  message?: string;
}

export function LoadingView({ message = 'Loading...' }: LoadingViewProps) {
  return (
    <View style={styles.container} testID="loading-view">
      <ActivityIndicator size="large" color={Colors.primary} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    padding: 20,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: Colors.textSecondary,
  },
});
