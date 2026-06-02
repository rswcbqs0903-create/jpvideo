import Constants from 'expo-constants';
import { useMemo } from 'react';

import {
  compareVersions,
  forceUpdateConfigByVariant,
} from '@/constants/force-update';

type ForceUpdateState = {
  checking: boolean;
  shouldForceUpdate: boolean;
  currentVersion: string;
  minVersion: string;
  message: string;
  iosStoreUrl: string;
  androidStoreUrl: string;
};

export function useForceUpdate(): ForceUpdateState {
  return useMemo(() => {
    const variant =
      (process.env.APP_VARIANT as keyof typeof forceUpdateConfigByVariant | undefined) ??
      'production';
    const config = forceUpdateConfigByVariant[variant] ?? forceUpdateConfigByVariant.production;
    const currentVersion = Constants.expoConfig?.version ?? '0.0.0';
    const shouldForceUpdate =
      config.enabled && compareVersions(currentVersion, config.minVersion) < 0;

    return {
      checking: false,
      shouldForceUpdate,
      currentVersion,
      minVersion: config.minVersion,
      message: config.message,
      iosStoreUrl: config.iosStoreUrl,
      androidStoreUrl: config.androidStoreUrl,
    };
  }, []);
}
