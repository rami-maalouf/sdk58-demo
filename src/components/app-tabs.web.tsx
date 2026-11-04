import { NativeTabs } from 'expo-router/native-tabs';

// the web tabs: mail and duo use native-only modules, so web shows only more and timer. more is
// first, so routes without a web tab (`/`, `/duo`) open it.
export default function AppTabs() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="more">
        <NativeTabs.Trigger.Label>More</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="timer">
        <NativeTabs.Trigger.Label>Timer</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
