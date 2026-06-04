# jpvideo

基于 Expo Router 的 `jpvideo` 应用工程，支持 iOS / Android / Web。
当前已包含强制更新拦截页的基础实现，用于在旧版本时引导用户跳转 App Store 更新。

## 开发

安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npx expo start
```

## 应用变体（App Variants）

本项目通过 `APP_VARIANT` 支持 3 套应用变体（默认从 `.env` 加载）：

- `development`
- `preview`
- `production`

变体映射如下：

- `development`
  - 应用名：`jpvideo (Dev)`
  - iOS bundle id：`com.15158314786.jpvideo.dev`
  - Android package：`com.x15158314786.jpvideo.dev`
  - Scheme：`jpvideo-dev`
- `preview`
  - 应用名：`jpvideo (Preview)`
  - iOS bundle id：`com.15158314786.jpvideo.preview`
  - Android package：`com.x15158314786.jpvideo.preview`
  - Scheme：`jpvideo-preview`
- `production`
  - 应用名：`jpvideo`
  - iOS bundle id：`com.15158314786.jpvideo`
  - Android package：`com.x15158314786.jpvideo`
  - Scheme：`jpvideo`

默认 `.env`：

```bash
APP_VARIANT=development
```

你可以通过修改 `.env` 切换默认变体，也可以通过下面命令按次覆盖。

本地命令：

```bash
APP_VARIANT=development npx expo start
APP_VARIANT=preview npx expo start
APP_VARIANT=production npx expo start

APP_VARIANT=development npx expo run:android
APP_VARIANT=preview npx expo run:android
APP_VARIANT=production npx expo run:android

APP_VARIANT=development npx expo run:ios
APP_VARIANT=preview npx expo run:ios
APP_VARIANT=production npx expo run:ios
```

EAS 构建命令：

```bash
npx eas build --profile development
npx eas build --profile preview
npx eas build --profile production
```

## 关键目录结构

- `app/`：Expo Router 页面与布局
- `components/`：可复用 UI 组件
- `hooks/`：共享 React Hooks
- `constants/`：共享常量
- `assets/`：静态资源
- `docs/`：项目说明文档
- `metro.config.js`：Expo Metro 默认配置入口
- `ios/`、`android/`：原生工程
- `.claude/`：Claude 项目配置来源
- `.codex/`：Codex 迁移产物（当前包含迁移报告）
- `.agents/skills/`：Codex / agents 使用的本地技能

## 文档索引

- `docs/force-update.md`：强制更新说明
- `docs/testing-policy.md`：测试分层规则
- `docs/pr-template.md`：平台中立的 PR 模板正文
- `.github/PULL_REQUEST_TEMPLATE.md`：PR 检查项模板
- `maestro/force-update-ios.yaml`：iOS 强制更新 E2E 测试流
- `maestro/force-update-android.yaml`：Android 强制更新 E2E 测试流

## 备注

- `AGENTS.md` 当前通过迁移工具链接到 `CLAUDE.md`。
- 实现 Expo 相关功能前，优先参考版本化文档：<https://docs.expo.dev/versions/v54.0.0/>。
