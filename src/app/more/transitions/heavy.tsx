import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useSystemColors } from '@/hooks/use-system-colors';

// about two seconds of render in total, split into many small components, so react can pause
// between them when the screen renders in a transition.
const TILE_COUNT = 1000;
const TILE_RENDER_MS = 2;

// demo only: keeps the javascript thread busy, as a large real screen would.
function busyWait(ms: number) {
  const end = performance.now() + ms;
  while (performance.now() < end) {
    // wait
  }
}

function SlowTile({ index }: { index: number }) {
  busyWait(TILE_RENDER_MS);
  return <View style={[styles.tile, { backgroundColor: `hsl(${(index * 7) % 360}, 70%, 55%)` }]} />;
}

export default function HeavyScreen() {
  const insets = useSafeAreaInsets();
  const colors = useSystemColors();

  return (
    <>
      <Stack.Screen options={{ title: `${TILE_COUNT} slow tiles` }} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={[styles.screen, { backgroundColor: colors.background }]}
        contentContainerStyle={[
          styles.grid,
          { paddingLeft: 20 + insets.left, paddingRight: 20 + insets.right },
        ]}>
        {Array.from({ length: TILE_COUNT }, (_, index) => (
          <SlowTile key={index} index={index} />
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, paddingVertical: 20 },
  tile: { width: 24, height: 24, borderRadius: 4 },
});
