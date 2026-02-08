# 番号标记+搜索按钮 + HD中文字幕高亮（更强健版）

[中文](README.md) | [English](README-EN.md)

![License](https://img.shields.io/github/license/jhihhe/BT-helper)
![Version](https://img.shields.io/badge/version-1.7-blue)
![Language](https://img.shields.io/badge/language-JavaScript-yellow)
![Platform](https://img.shields.io/badge/platform-Tampermonkey-green)
[![Install](https://img.shields.io/badge/Install-Click_Here-red)](https://github.com/jhihhe/BT-helper/raw/main/%E7%95%AA%E5%8F%B7%E6%A0%87%E8%AE%B0%2B%E6%90%9C%E7%B4%A2%E6%8C%89%E9%92%AE%2BHD%E4%B8%AD%E6%96%87%E5%AD%97%E5%B9%95%E9%AB%98%E4%BA%AE.user.js)

这是一个 Tampermonkey (油猴) 脚本，旨在优化浏览体验，自动识别页面上的番号并提供快速搜索功能，同时高亮显示包含 HD 和中文字幕的资源。

## 功能特性

### 1. 🔍 番号自动识别与搜索
*   **智能识别**：自动扫描网页内容，识别形如 `SSIS-924`、`ABP-123` 等格式的番号（支持 2-8 位字母 + 2-6 位数字）。
*   **一键搜索**：在识别到的番号旁边添加一个 "🔍" 搜索按钮。
*   **快速跳转**：点击搜索按钮即可在 Sukebei Nyaa 上搜索该番号。
*   **智能插入**：
    *   如果番号位于链接 (`<a>` 标签) 内部，搜索按钮会智能地添加到链接之后，不破坏原有链接结构。
    *   如果番号位于普通文本中，按钮会直接插入到番号旁边。
*   **安全防误触**：自动避开 `SCRIPT`、`STYLE`、`CODE`、`PRE` 等标签，防止破坏页面功能。

### 2. ✨ HD 中文字幕高亮
*   **表格行高亮**：自动扫描页面上的表格行 (`<tr>`)。
*   **条件匹配**：当一行中同时包含 **"HD"** (不区分大小写) 和 **"中文" / "中文字幕" / "中字"** 关键词时，该行背景色会变为淡黄色 (`rgba(255, 255, 150, 0.6)`), 方便快速定位高质量资源。

### 3. 🚀 动态兼容
*   **动态监听**：使用 `MutationObserver` 监听页面变化，支持动态加载的内容（如无限滚动页面）。
*   **延迟加载**：脚本启动时会有短暂延迟，确保兼容加载较慢的页面。

### 4. 🎨 UI/UX Pro Max 体验
*   **美化按钮**：全新的胶囊型搜索按钮，配色清爽，带有悬停交互效果。
*   **柔和高亮**：使用极淡的琥珀色背景 (`#fffbf0`) 配合左侧指示条，视觉更舒适，不再刺眼。
*   **配置菜单**：支持通过 Tampermonkey 菜单开关功能（例如切换高亮功能的开启/关闭）。

## 安装方法

1.  请确保您的浏览器已安装 [Tampermonkey](https://www.tampermonkey.net/) 扩展。
2.  在 Tampermonkey 管理面板中创建一个新脚本。
3.  将项目文件 `番号标记+搜索按钮+HD中文字幕高亮.user.js` 中的全部代码复制并覆盖到新脚本编辑器中。
4.  保存 (Ctrl+S) 即可生效。

## 使用说明

*   **生效范围**：脚本默认在所有网站 (`*://*/*`) 生效，主要用于资源列表页面。
*   **操作方式**：浏览网页时，脚本会自动运行，无需额外操作。看到 "🔍" 图标点击即可进行搜索。

## 版本信息

*   **当前版本**: 1.7
