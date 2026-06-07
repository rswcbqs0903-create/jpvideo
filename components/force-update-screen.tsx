import { Linking, Platform, Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type ForceUpdateScreenProps = {
  message: string;
  iosStoreUrl: string;
  androidStoreUrl: string;
};

export function ForceUpdateScreen({
  message,
  iosStoreUrl,
  androidStoreUrl,
}: ForceUpdateScreenProps) {
  const handleUpdate = async () => {
    const storeUrl = Platform.OS === 'android' ? androidStoreUrl : iosStoreUrl;
    await Linking.openURL(storeUrl);
  };

  const buttonLabel = Platform.OS === 'android' ? '去 Google Play 更新' : '去 App Store 更新';

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">需要更新</ThemedText>
      <ThemedText style={styles.message}>{message}</ThemedText>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={buttonLabel}
        testID="force-update-button"
        style={styles.button}
        onPress={handleUpdate}>
        <ThemedText type="defaultSemiBold" style={styles.buttonText}>
          {buttonLabel}
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },
  message: {
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    marginTop: 8,
    borderRadius: 12,
    backgroundColor: '#0A84FF',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  buttonText: {
    color: '#FFFFFF',
  },
});
