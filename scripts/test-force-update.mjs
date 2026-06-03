import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';

const filePath = path.resolve('constants/force-update.ts');
const source = fs.readFileSync(filePath, 'utf8');
const transpiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
  },
}).outputText;

function loadModule(env = {}) {
  const exports = {};
  const context = {
    exports,
    module: { exports },
    require: (specifier) => {
      if (specifier === 'node:process') {
        return { env: { ...process.env, ...env } };
      }
      return require(specifier);
    },
    process: { env: { ...process.env, ...env } },
    console,
  };

  vm.runInNewContext(transpiled, context, { filename: filePath });
  return context.module.exports;
}

function testCompareVersions() {
  const { compareVersions } = loadModule();

  assert.equal(compareVersions('1.0.0', '1.0.5'), -1);
  assert.equal(compareVersions('1.0.5', '1.0.5'), 0);
  assert.equal(compareVersions('1.0.6', '1.0.5'), 1);
  assert.equal(compareVersions('1.0', '1.0.1'), -1);
  assert.equal(compareVersions('2.0.0', '1.9.9'), 1);
}

function testConfigDefaults() {
  const { forceUpdateConfigByVariant } = loadModule({
    EXPO_PUBLIC_FORCE_UPDATE_ENABLED: 'false',
  });

  assert.equal(forceUpdateConfigByVariant.production.enabled, false);
  assert.equal(forceUpdateConfigByVariant.production.minVersion, '1.0.0');
  assert.equal(forceUpdateConfigByVariant.production.iosStoreUrl, 'https://apps.apple.com/');
  assert.equal(forceUpdateConfigByVariant.production.androidStoreUrl, 'https://play.google.com/store');
}

function testConfigOverrides() {
  const { forceUpdateConfigByVariant } = loadModule({
    EXPO_PUBLIC_FORCE_UPDATE_ENABLED: 'true',
    EXPO_PUBLIC_FORCE_UPDATE_MIN_VERSION: '1.0.5',
    EXPO_PUBLIC_FORCE_UPDATE_MESSAGE: '当前版本过旧，请先更新后继续使用。',
    EXPO_PUBLIC_IOS_APP_STORE_URL: 'https://apps.apple.com/app/id1234567890',
    EXPO_PUBLIC_ANDROID_PLAY_STORE_URL: 'https://play.google.com/store/apps/details?id=com.example.app',
  });

  assert.equal(forceUpdateConfigByVariant.production.enabled, true);
  assert.equal(forceUpdateConfigByVariant.production.minVersion, '1.0.5');
  assert.equal(
    forceUpdateConfigByVariant.production.message,
    '当前版本过旧，请先更新后继续使用。',
  );
  assert.equal(
    forceUpdateConfigByVariant.production.iosStoreUrl,
    'https://apps.apple.com/app/id1234567890',
  );
  assert.equal(
    forceUpdateConfigByVariant.production.androidStoreUrl,
    'https://play.google.com/store/apps/details?id=com.example.app',
  );
}

testCompareVersions();
testConfigDefaults();
testConfigOverrides();

console.log('force-update checks passed');
