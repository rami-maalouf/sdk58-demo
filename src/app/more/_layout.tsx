import { Stack } from 'expo-router';
import { Platform } from 'react-native';

import { stackScreenOptions } from '@/components/stack-screen-options';

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
