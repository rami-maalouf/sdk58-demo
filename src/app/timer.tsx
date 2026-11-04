import { useTheme } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

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

// how long the screen has been visible, as `m:ss`.
function useVisibleTime() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    console.log('useVisibleTime mounted');
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => {
      console.log('useVisibleTime unmounted');
      clearInterval(interval);
    };
  }, []);

  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}
