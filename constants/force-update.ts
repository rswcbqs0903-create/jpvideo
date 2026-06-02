export type ForceUpdateConfig = {
  enabled: boolean;
  minVersion: string;
  message: string;
  iosStoreUrl: string;
  androidStoreUrl: string;
};

export const forceUpdateConfigByVariant: Record<string, ForceUpdateConfig> = {
  development: {
    enabled: process.env.EXPO_PUBLIC_FORCE_UPDATE_ENABLED === 'true',
    minVersion: process.env.EXPO_PUBLIC_FORCE_UPDATE_MIN_VERSION ?? '1.0.0',
    message:
      process.env.EXPO_PUBLIC_FORCE_UPDATE_MESSAGE ??
      '有新版本可用，请更新后继续使用。',
    iosStoreUrl:
      process.env.EXPO_PUBLIC_IOS_APP_STORE_URL ?? 'https://apps.apple.com/',
    androidStoreUrl:
      process.env.EXPO_PUBLIC_ANDROID_PLAY_STORE_URL ??
      'https://play.google.com/store',
  },
  preview: {
    enabled: process.env.EXPO_PUBLIC_FORCE_UPDATE_ENABLED === 'true',
    minVersion: process.env.EXPO_PUBLIC_FORCE_UPDATE_MIN_VERSION ?? '1.0.0',
    message:
      process.env.EXPO_PUBLIC_FORCE_UPDATE_MESSAGE ??
      '有新版本可用，请更新后继续使用。',
    iosStoreUrl:
      process.env.EXPO_PUBLIC_IOS_APP_STORE_URL ?? 'https://apps.apple.com/',
    androidStoreUrl:
      process.env.EXPO_PUBLIC_ANDROID_PLAY_STORE_URL ??
      'https://play.google.com/store',
  },
  production: {
    enabled: process.env.EXPO_PUBLIC_FORCE_UPDATE_ENABLED === 'true',
    minVersion: process.env.EXPO_PUBLIC_FORCE_UPDATE_MIN_VERSION ?? '1.0.0',
    message:
      process.env.EXPO_PUBLIC_FORCE_UPDATE_MESSAGE ??
      '当前版本过旧，请先更新到最新版本。',
    iosStoreUrl:
      process.env.EXPO_PUBLIC_IOS_APP_STORE_URL ?? 'https://apps.apple.com/',
    androidStoreUrl:
      process.env.EXPO_PUBLIC_ANDROID_PLAY_STORE_URL ??
      'https://play.google.com/store',
  },
};

export function compareVersions(currentVersion: string, minVersion: string) {
  const currentParts = currentVersion.split('.').map(Number);
  const minParts = minVersion.split('.').map(Number);
  const maxLength = Math.max(currentParts.length, minParts.length);

  for (let index = 0; index < maxLength; index += 1) {
    const currentPart = currentParts[index] ?? 0;
    const minPart = minParts[index] ?? 0;

    if (currentPart > minPart) {
      return 1;
    }

    if (currentPart < minPart) {
      return -1;
    }
  }

  return 0;
}
