import * as Sentry from '@sentry/react-native';

const dsn = process.env.EXPO_PUBLIC_SENTRY_DSN;
const environment = process.env.APP_VARIANT ?? 'production';

if (dsn) {
  Sentry.init({
    dsn,
    environment,
    tracesSampleRate: 1.0,
  });
}
