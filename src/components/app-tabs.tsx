import { NativeTabs } from 'expo-router/native-tabs';
import { Platform } from 'react-native';

// expo router native tabs, stable in sdk 58: sf symbols on ios, material symbols on android.
export default function AppTabs() {
  return (
    // activityEnabled: a tab you leave stops its effects and keeps its state. it only reaches tabs
    // without a stack, such as timer, not duo or more.
    <NativeTabs sidebarAdaptable activityEnabled>
      {/* mail stays active: it handles siri drafts and the android widget's "mark all read". */}
      <NativeTabs.Trigger name="index" activityEnabled={false}>
        <NativeTabs.Trigger.Label>Mail</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'envelope', selected: 'envelope.fill' }}
          md="mail"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="duo">
        {/* the hinge tab runs on the iphone duo and on android foldables. */}
        <NativeTabs.Trigger.Label>
          {Platform.OS === 'ios' ? 'Duo' : 'Fold'}
        </NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="rectangle.split.2x1" md="devices_fold" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="timer">
        <NativeTabs.Trigger.Label>Timer</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'clock', selected: 'clock.fill' }} md="schedule" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="more">
        <NativeTabs.Trigger.Label>More</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="square.grid.2x2" md="grid_view" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
