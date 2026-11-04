import { StyleSheet, Text, View } from 'react-native';

import { useSystemColors } from '@/hooks/use-system-colors';
import { useVisibleTime } from '@/hooks/use-visible-time';

// a tab without a stack, so the activityEnabled of the native tabs reaches it.
export default function TimerScreen() {
  const colors = useSystemColors();
  const visibleTime = useVisibleTime();

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <Text style={[styles.time, { color: colors.label }]}>{visibleTime}</Text>
      <Text style={[styles.caption, { color: colors.secondaryLabel }]}>
        React activity pauses the timer while another tab is open.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 8 },
  // tabular digits keep the width the same as the seconds change.
  time: { fontSize: 72, fontWeight: '200', fontVariant: ['tabular-nums'] },
  caption: { fontSize: 15, textAlign: 'center' },
});
