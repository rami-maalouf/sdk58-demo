import { useLoaderData, useTheme } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';

type Post = { id: number; title: string };

// runs on the server on each request, not in the app. the app gets only the returned json.
export async function loader() {
  // demo only: act like a slow server, so the suspense fallback stays on screen for a moment.
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
  if (!response.ok) throw new Error(`posts request failed: ${response.status}`);
  const posts: Post[] = await response.json();
  return { posts };
}

export default function LoadersScreen() {
  const { posts } = useLoaderData<typeof loader>();
  const { colors } = useTheme();

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.content}>
      {posts.map((post) => (
        <Text key={post.id} style={[styles.title, { color: colors.text }]}>
          {post.title}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, gap: 16 },
  title: { fontSize: 17 },
});
