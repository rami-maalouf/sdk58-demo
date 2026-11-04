import { Redirect } from 'expo-router';

// this screen uses ios and android system colors (PlatformColor), so web goes to the more tab.
export default function NativeOnly() {
  return <Redirect href="/more" />;
}
