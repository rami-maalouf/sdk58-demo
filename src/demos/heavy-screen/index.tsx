import { Button, Host, Switch } from '@expo/ui';
import { router, unstable_useIsNavigating } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useSystemColors } from '@/hooks/use-system-colors';

export default function HeavyScreenDemo() {
  const [inTransition, setInTransition] = useState(true);
  const [taps, setTaps] = useState(0);
  // true while the heavy screen renders in a transition. a normal push never shows it.
  const isNavigating = unstable_useIsNavigating();
  const insets = useSafeAreaInsets();
  const colors = useSystemColors();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={[styles.screen, { backgroundColor: colors.background }]}
      // on the duo, the tab bar is a rail at the right edge, inside the safe area.
      contentContainerStyle={[
        styles.content,
        { paddingLeft: 20 + insets.left, paddingRight: 20 + insets.right },
      ]}>
      <Text style={[styles.caption, { color: colors.secondaryLabel }]}>
        The next screen takes about two seconds to render. Open it, then tap the counter. Without a
        transition, the render blocks JavaScript and taps wait. In a transition, React pauses the
        render for each tap.
      </Text>
      {/* a tap is plain react state, so it counts only when javascript is free. */}
      <Pressable
        onPress={() => setTaps((count) => count + 1)}
        style={({ pressed }) => pressed && styles.pressed}>
        <Text style={[styles.counter, { color: colors.label }]}>{taps}</Text>
        <Text style={[styles.hint, { color: colors.secondaryLabel }]}>Tap to count</Text>
      </Pressable>
      <View style={styles.switchRow}>
        <Host matchContents={{ vertical: true }} style={styles.switch}>
          <Switch label="Use a transition" value={inTransition} onValueChange={setInTransition} />
        </Host>
        <ActivityIndicator animating={isNavigating} />
      </View>
      <Host matchContents={{ vertical: true }}>
        <Button
          label="Open the heavy screen"
          onPress={() => router.push('/more/transitions/heavy', { inTransition })}
        />
      </Host>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingVertical: 20, gap: 20 },
  caption: { fontSize: 15, lineHeight: 20 },
  counter: { fontSize: 64, fontVariant: ['tabular-nums'], textAlign: 'center' },
  hint: { fontSize: 15, textAlign: 'center' },
  pressed: { opacity: 0.5 },
  switchRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  switch: { flex: 1 },
});
