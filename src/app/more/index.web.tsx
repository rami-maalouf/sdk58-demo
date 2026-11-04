import { Link, useTheme } from 'expo-router';
import { StyleSheet } from 'react-native';

// on web, the more tab lists only the data loaders demo. the other demos use native-only modules.
export default function MoreScreen() {
  const { colors } = useTheme();
  return (
    <Link href="/more/loaders" style={[styles.link, { color: colors.primary }]}>
      Data loaders
    </Link>
  );
}

const styles = StyleSheet.create({
  link: { padding: 20, fontSize: 17 },
});
