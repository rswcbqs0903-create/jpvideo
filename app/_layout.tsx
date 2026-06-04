import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AppMetrics, AppMetricsRoot } from 'expo-observe';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { ForceUpdateScreen } from '@/components/force-update-screen';
import { useForceUpdate } from '@/hooks/use-force-update';
import { useColorScheme } from '@/hooks/use-color-scheme';
import '../sentry';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayout() {
  const colorScheme = useColorScheme();
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    if (!forceUpdate.checking && !forceUpdate.shouldForceUpdate) {
      AppMetrics.markInteractive();
    }
  }, [forceUpdate.checking, forceUpdate.shouldForceUpdate]);

  if (forceUpdate.checking) {
    return null;
  }

  if (forceUpdate.shouldForceUpdate) {
      return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <ForceUpdateScreen
          message={forceUpdate.message}
          iosStoreUrl={forceUpdate.iosStoreUrl}
          androidStoreUrl={forceUpdate.androidStoreUrl}
        />
        <StatusBar style="auto" />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default AppMetricsRoot.wrap(RootLayout);
