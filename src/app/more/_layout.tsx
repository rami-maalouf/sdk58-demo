import { Stack } from 'expo-router';
import { Platform } from 'react-native';

import { stackScreenOptions } from '@/components/stack-screen-options';

export default function MoreLayout() {
  return (
    // nativetabs activityEnabled does not reach a tab that holds a stack (ENG-28857). `1` hides a
    // screen as soon as it loses focus: on a tab switch, and when a demo opens on top of it.
    <Stack screenOptions={stackScreenOptions} activityEnabled={1}>
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
