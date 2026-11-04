import { router, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import AppTabs from '@/components/app-tabs';
import { useNavigationTheme } from '@/hooks/use-navigation-theme';

// every navigation runs in a react transition. the transition demos opt out per push with
// `inTransition: false`. must run before the root layout renders.
router.setTransitionMode('always');

export default function RootLayout() {
  return (
    <ThemeProvider value={useNavigationTheme()}>
      {/* dark status bar icons in light mode. android otherwise keeps them white on any screen. */}
      <StatusBar style="auto" />
      <AppTabs />
    </ThemeProvider>
  );
}
