# 强制更新说明

这份文档讲的是：当 App 版本太旧时，如何让用户必须先去 App Store 更新，更新后才能继续使用。

## 这件事是怎么工作的

1. App 启动后，先去请求一个版本配置。
2. App 把“当前版本”跟“最低可用版本”做比较。
3. 如果当前版本太旧，就不让用户进入首页。
4. 页面只保留一个“去更新”的按钮，点击后跳 App Store。

## 用户会看到什么

- 版本正常：直接进入 App
- 版本过旧：先看到更新提示页
- 更新提示页：只能去更新，不能继续使用旧版本

## 需要哪些信息

最少准备这几个字段：

- `enabled`：是否开启强制更新
- `minVersion`：最低可用版本
- `message`：提示文案
- `appStoreUrl`：App Store 链接
- `androidStoreUrl`：Google Play 链接

## 适合放在哪里

- 版本检查：放在 App 启动阶段
- 更新拦截页：放在根布局外层
- 配置来源：优先从后端拉取，必要时可以先用静态配置

## 当前代码怎么做的

- 现在先用了本地配置，方便直接跑通流程
- 强制更新页已经接到根布局里
- 以后只要把本地配置替换成后端接口，就能变成线上可控版本

## 现在怎么开关

当前实现支持这几个环境变量：

- `EXPO_PUBLIC_FORCE_UPDATE_ENABLED`
- `EXPO_PUBLIC_FORCE_UPDATE_MIN_VERSION`
- `EXPO_PUBLIC_FORCE_UPDATE_MESSAGE`
- `EXPO_PUBLIC_IOS_APP_STORE_URL`
- `EXPO_PUBLIC_ANDROID_PLAY_STORE_URL`

例如：

```bash
EXPO_PUBLIC_FORCE_UPDATE_ENABLED=true
EXPO_PUBLIC_FORCE_UPDATE_MIN_VERSION=1.0.5
EXPO_PUBLIC_FORCE_UPDATE_MESSAGE=当前版本过旧，请先更新。
EXPO_PUBLIC_IOS_APP_STORE_URL=https://apps.apple.com/app/id1234567890
EXPO_PUBLIC_ANDROID_PLAY_STORE_URL=https://play.google.com/store/apps/details?id=com.example.app
```

## 失败时怎么处理

建议是：

- 配置接口失败时，先放行
- 不要因为配置接口挂了，就把所有用户都锁住

## 和 expo-updates 的区别

- `expo-updates`：更新 JS 和静态资源，通常不需要重新安装 App
- 强制更新：要求用户安装新的 App 包，通常跳 App Store

## 一句话总结

强制更新不是让 App 自己“偷偷更新”，而是让旧版本先停下来，再引导用户去 App Store 安装新包。
