import { Link, useTheme } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { StatusColors } from '@/constants/theme';
import type { Status } from '@/demos/registry';

// the web more tab, laid out like the ios list. it shows only the data loaders demo: the registry
// imports the other demos, which use native-only modules, so this row copies its registry entry.
const status: Status = 'Stable';
const badgeColor = StatusColors[status];

export default function MoreScreen() {
  const { colors } = useTheme();
  const text = { color: colors.text };

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.content}>
      <Text style={[styles.largeTitle, text]}>More</Text>
      <Text style={[styles.sectionTitle, text]}>Demos</Text>
      <View style={[styles.group, { backgroundColor: colors.card }]}>
        <Link href="/more/loaders" asChild>
          <Pressable style={styles.row}>
            <SymbolView name={{ web: 'dns' }} size={22} tintColor={colors.primary} />
            <View style={styles.labels}>
              <Text style={[styles.title, text]}>Data loaders</Text>
              <Text style={[styles.description, text]}>
                A route loader fetches posts on the server
              </Text>
            </View>
            {/* the label color at 15% opacity, as in the ios badge. */}
            <Text style={[styles.badge, { color: badgeColor, backgroundColor: `${badgeColor}26` }]}>
              {status}
            </Text>
            <SymbolView
              name={{ web: 'chevron_right' }}
              size={18}
              tintColor={colors.text}
              style={styles.chevron}
            />
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, gap: 8 },
  largeTitle: { fontSize: 34, fontWeight: '700', marginBottom: 12 },
  // the ios section header: smaller, and dimmed like a secondary label.
  sectionTitle: { fontSize: 15, fontWeight: '600', opacity: 0.6, marginLeft: 16 },
  group: { borderRadius: 26, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16 },
  labels: { flex: 1, gap: 2 },
  title: { fontSize: 17 },
  description: { fontSize: 13, opacity: 0.6 },
  badge: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    overflow: 'hidden',
  },
  chevron: { opacity: 0.3 },
});
