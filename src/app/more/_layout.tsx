import { Stack } from 'expo-router';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';

import { stackScreenOptions } from '@/components/stack-screen-options';

// shows while a screen in this stack waits for its loader data. on native, a loader screen always
// waits on its first render. only a layout can set this fallback.
export function SuspenseFallback() {
  return (
    <View style={styles.fallback}>
      <ActivityIndicator />
    </View>
  );
}

export default function MoreLayout() {
  return (
    <Stack screenOptions={stackScreenOptions}>
      {/* on android, the compose list draws its own large title. */}
      <Stack.Screen
        name="index"
        options={
          Platform.OS === 'ios' ? { title: 'More', headerLargeTitle: true } : { headerShown: false }
        }
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  fallback: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
