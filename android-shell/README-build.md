# Android Shell 构建说明

本目录为 AI Virtual Phone 的官方安卓壳（FloatShell）源码。

## 站点配置

- 站点地址：https://miraring.netlify.app/
- 配置位置：`.github/workflows/android-shell.yml` 中的 `SHELL_SITE_URL` 默认值

## 触发构建

- 手动触发：Actions → Build Android Shell APK → Run workflow
- 自动触发：push 修改本目录（android-shell/**）或 workflow 文件

## 构建产物

- `float-shell-debug`：debug 签名 APK（`app-debug.apk`），可直接安装
- `float-shell-release`：release APK（需配置签名 Secrets）
