# Android 构建排障记录

本文记录 `jpvideo` 在本机执行 `npm run android:dev` 时遇到的几类问题，以及对应的排查结论和处理方式，方便后续复现时快速定位。

## 1. Gradle 依赖下载失败，TLS 握手报错

### 现象

构建过程中出现如下错误：

- `The server does not support the client's requested TLS protocol versions`
- `Received fatal alert: protocol_version`
- `Remote host terminated the handshake`

常见受影响仓库包括：

- `dl.google.com`
- `repo.maven.apache.org`
- `www.jitpack.io`

### 原因

这是 **Gradle/Java 在下载远程依赖时网络握手失败**，不是业务代码错误。  
本机浏览器可以正常访问相关站点，但终端里的 Gradle 进程未必走同一条代理链路。

### 处理

先在终端确认代理可用，再让 Gradle 明确使用代理：

```bash
export HTTP_PROXY=http://127.0.0.1:1082
export HTTPS_PROXY=http://127.0.0.1:1082
export ALL_PROXY=http://127.0.0.1:1082
```

然后在项目里补充 Gradle 代理配置：

```properties
systemProp.http.proxyHost=127.0.0.1
systemProp.http.proxyPort=1082
systemProp.https.proxyHost=127.0.0.1
systemProp.https.proxyPort=1082
systemProp.http.nonProxyHosts=localhost|127.0.0.1|*.local
systemProp.https.nonProxyHosts=localhost|127.0.0.1|*.local
```

## 2. Android SDK 未配置，Gradle 找不到 SDK

### 现象

构建报错：

- `SDK location not found`
- `Define a valid SDK location with an ANDROID_HOME environment variable or by setting the sdk.dir path in your project's local properties`

### 原因

`android/local.properties` 不存在，或者其中没有正确的 `sdk.dir`；同时 `ANDROID_HOME` / `ANDROID_SDK_ROOT` 没有设置。

### 处理

在 `android/local.properties` 中写入本机 SDK 路径，例如：

```properties
sdk.dir=/Users/lijp/Library/Android/sdk
```

## 3. 最终失败点只是“收尾错误”

### 现象

日志最后只看到：

- `BUILD FAILED`
- `Error: ... exited with non-zero code: 1`

### 原因

这只是 Gradle 退出码为 1 的外层包装，不是根因。真正原因通常在它前面几十行：

- 依赖下载失败
- TLS 握手失败
- SDK 路径缺失

### 处理

排查时优先看以下关键词所在的那一段：

- `FAILURE: Build failed with an exception.`
- `What went wrong:`
- `Could not download ...`
- `Could not resolve ...`
- `handshake`
- `TLS`
- `SDK location not found`

## 4. 这次问题的最终结论

本机环境最终能成功构建，关键是补齐了两件事：

1. Android SDK 路径配置正确
2. Gradle 进程明确走了可用代理

之后 `npm run android:dev` 可以继续正常执行。

