import { StyleSheet, Text, View } from 'react-native';

// the web fallback of the native-only routes. web exists only so `expo export` can run the route
// loaders, and these screens use native-only modules that crash in the web build.
export function NativeOnlyScreen() {
  return (
    <View style={styles.screen}>
      <Text>This demo runs in the iOS and Android app.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
});
