<!-- readme-visuals:header:start -->
<p align="center"><img src="readme-assets/banner.svg" alt="Code Assistant — Code recognition, search shortcuts and row highlights" width="100%"></p>

<p align="center">
  <a href="https://github.com/jhihhe/Release-Code-Video-ID-BT-helper/commits/main"><img src="https://img.shields.io/github/last-commit/jhihhe/Release-Code-Video-ID-BT-helper?style=flat-square&amp;color=818cf8" alt="Last commit"></a>
  <a href="https://github.com/jhihhe/Release-Code-Video-ID-BT-helper/stargazers"><img src="https://img.shields.io/github/stars/jhihhe/Release-Code-Video-ID-BT-helper?style=flat-square&amp;color=818cf8" alt="GitHub stars"></a>
  <a href="https://github.com/jhihhe"><img src="https://img.shields.io/badge/Maintainer-%40Jhih%20he-818cf8?style=flat-square" alt="Maintainer: @Jhih he"></a>
</p>
<!-- readme-visuals:header:end -->

# 🚀 番号助手：自动识别网页番号并一键搜索 ➕ HD中文字幕高亮指示器 (UI/UX Pro Max)

[![Version](https://img.shields.io/badge/Version-2.0-blue.svg)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)]()

> 💡 **核心理念**：让寻找高质量资源变得前所未有的简单、优雅！

这是一个致力于提供 **极致浏览体验 (UI/UX Pro Max)** 的 Tampermonkey (油猴) 脚本。它能智能扫描网页中的番号，提供美观的**一键搜索**胶囊按钮，并自动**高亮显示**包含“HD”和“中文字幕”的资源行，助您在一秒内锁定最佳资源！

---

<!-- readme-visuals:overview:start -->

## 项目速览

<table>
<tr>
<td width="33%"><strong>编号识别</strong><br><br>扫描网页中的编号并添加搜索入口。</td>
<td width="33%"><strong>结果高亮</strong><br><br>突出同时包含 HD 与中文字幕标识的表格行。</td>
<td width="33%"><strong>动态页面</strong><br><br>监听动态内容，提供菜单高亮开关。</td>
</tr>
</table>

### 流程概览

```mermaid
flowchart LR
    S0["安装并启用脚本"] --> S1
    S1["打开适用网页"] --> S2
    S2["识别编号与表格标识"] --> S3
    S3["使用搜索入口或查看高亮"]
```

<!-- readme-visuals:overview:end -->

## ✨ 核心功能 (Features)

### 🔍 1. 智能番号识别与一键搜索
- **精准识别**：自动扫描网页内容，智能提取形如 `SSIS-924`、`ssis-924` 等格式的番号。
- **胶囊按钮**：在番号旁自动添加一枚现代感十足的“🔍 搜 XXX”胶囊按钮。
- **安全防误触**：智能避开 `SCRIPT`、`STYLE`、`CODE`、链接内部等特殊标签，**绝对不破坏网页原有结构**。
- **动态加载支持**：采用 `MutationObserver` 技术，完美兼容瀑布流、无限滚动等动态加载页面。

### 🌟 2. HD 中文字幕专属高亮
- **视觉引导**：自动扫描表格行 (`<tr>`)，当检测到同时包含“**HD**”与“**中文/中文字幕/中字**”时，将该行高亮为显眼的琥珀色 (`#ffecb3`)。
- **沉浸式交互**：高亮行配有左侧指示条与鼠标悬停(`hover`)效果，让优质资源在茫茫列表中脱颖而出。

### 🎨 3. UI/UX Pro Max 体验
- **现代化设计**：摒弃传统丑陋的按钮，采用精心调配的“极淡蓝背景 + 品牌蓝文字”胶囊设计。
- **丝滑过渡**：添加了按钮悬停上浮与阴影变化的动画效果，点击手感极佳。
- **菜单控制**：支持通过 Tampermonkey 扩展菜单一键开启/关闭高亮功能，即时生效。

---

## 🛠️ 安装与使用 (Usage)

1. **安装环境**：请确保您的浏览器已安装 [Tampermonkey](https://www.tampermonkey.net/) 或类似的用户脚本管理器。
2. **安装脚本**：点击本页面的“安装此脚本”按钮。
3. **开始使用**：无需任何配置，打开任意资源网站（如各类磁力站、BT站、Sukebei、论坛等），脚本将自动在后台默默为您服务！

---

## 📝 更新日志 (Changelog)

- **v2.0 (当前版本)**
  - 🚀 全面升级名称与描述，增加多语言支持，走向国际化。
  - 🎨 UI/UX 体验进一步优化，按钮交互更丝滑。
  - 🔍 增加搜索引擎爬虫友好的 SEO 关键词。
- **v1.9**
  - ✨ 增强版发布，优化 DOM 解析逻辑，不破坏原有链接。

---
*❤️ 如果觉得好用，请在 GreasyFork 给个好评支持一下哦！您的支持是我更新的最大动力！*
