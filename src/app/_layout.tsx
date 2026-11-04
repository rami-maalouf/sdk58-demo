import { ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import AppTabs from '@/components/app-tabs';
import { useNavigationTheme } from '@/hooks/use-navigation-theme';

export default function RootLayout() {
  return (
    <ThemeProvider value={useNavigationTheme()}>
      {/* dark status bar icons in light mode. android otherwise keeps them white on any screen. */}
      <StatusBar style="auto" />
      <AppTabs />
    </ThemeProvider>
  );
}
