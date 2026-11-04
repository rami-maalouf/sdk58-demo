import { useLoaderData, useTheme } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

type Post = { id: number; title: string; body: string };

// runs on the server on each request, not in the app. the app gets only the returned json.
export async function loader() {
  // demo only: act like a slow server, so the suspense fallback stays on screen for a moment.
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5",
  );
  if (!response.ok) throw new Error(`posts request failed: ${response.status}`);
  const posts: Post[] = await response.json();
  // server-only env var: no EXPO_PUBLIC_ prefix, so it is never bundled into the app.
  // demo only: returning it sends it to the app. a real loader would use it here and not return it.
  return { posts, secretKey: process.env.SECRET_KEY };
}

export default function LoadersScreen() {
  const { posts, secretKey } = useLoaderData<typeof loader>();
  const { colors } = useTheme();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.secret, { color: colors.text }]}>
        SECRET_KEY from the server: {secretKey}
      </Text>
      {posts.map((post) => (
        <View
          key={post.id}
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.title, { color: colors.text }]}>
            {post.title}
          </Text>
          <Text style={[styles.body, { color: colors.text }]} numberOfLines={3}>
            {post.body}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, gap: 16 },
  secret: { fontSize: 15, opacity: 0.7 },
  card: {
    padding: 16,
    gap: 8,
    borderRadius: 16,
    borderCurve: "continuous",
    borderWidth: StyleSheet.hairlineWidth,
  },
  title: { fontSize: 17, fontWeight: "600", textTransform: "capitalize" },
  body: { fontSize: 15, lineHeight: 20, opacity: 0.7 },
});
