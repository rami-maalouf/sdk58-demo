import { useTheme } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { useVisibleTime } from '@/hooks/use-visible-time';

// a tab without a stack, so the activityEnabled of the native tabs reaches it.
export default function TimerScreen() {
  const { colors } = useTheme();
  const visibleTime = useVisibleTime();

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <Text style={[styles.time, { color: colors.text }]}>{visibleTime}</Text>
      <Text style={[styles.caption, { color: colors.text }]}>
        React activity pauses the timer while another tab is open.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 8 },
  // tabular digits keep the width the same as the seconds change.
  time: { fontSize: 72, fontWeight: '200', fontVariant: ['tabular-nums'] },
  // the opacity of the ios secondary label.
  caption: { fontSize: 15, textAlign: 'center', opacity: 0.6 },
});
