import { Redirect } from 'expo-router';

// this demo uses native-only modules, so web goes to the more tab.
export default function NativeOnly() {
  return <Redirect href="/more" />;
}
