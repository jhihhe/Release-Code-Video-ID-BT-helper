# ID Highlighter + Search Button + HD Chinese Subtitle Highlight (Robust Version)

[中文](README.md) | [English](README-EN.md)

This is a Tampermonkey script designed to optimize the browsing experience by automatically identifying IDs (designations) on web pages, providing quick search functionality, and highlighting resources containing "HD" and "Chinese Subtitles".

## Features

### 1. 🔍 ID Automatic Identification & Search
*   **Smart Recognition**: Automatically scans web content to identify IDs in formats like `SSIS-924`, `ABP-123` (supports 2-8 letters + 2-6 digits).
*   **One-Click Search**: Adds a "🔍" search button next to the identified ID.
*   **Quick Jump**: Clicking the search button searches for the ID on Sukebei Nyaa.
*   **Smart Insertion**:
    *   If the ID is inside a link (`<a>` tag), the search button is smartly added after the link without breaking the original link structure.
    *   If the ID is in plain text, the button is inserted directly next to the ID.
*   **Safety**: Automatically avoids `SCRIPT`, `STYLE`, `CODE`, `PRE` and other tags to prevent breaking page functionality.

### 2. ✨ HD Chinese Subtitle Highlight
*   **Table Row Highlighting**: Automatically scans table rows (`<tr>`) on the page.
*   **Conditional Matching**: When a row contains both **"HD"** (case-insensitive) and **"中文" / "中文字幕" / "中字"** (Chinese/Chinese Subtitles) keywords, the row's background color turns pale yellow (`rgba(255, 255, 150, 0.6)`) for easy identification of high-quality resources.

### 3. 🚀 Dynamic Compatibility
*   **Dynamic Monitoring**: Uses `MutationObserver` to monitor page changes, supporting dynamically loaded content (e.g., infinite scroll pages).
*   **Lazy Loading**: The script has a brief delay at startup to ensure compatibility with slower-loading pages.

## Installation

1.  Ensure you have the [Tampermonkey](https://www.tampermonkey.net/) extension installed in your browser.
2.  Create a new script in the Tampermonkey dashboard.
3.  Copy and paste the entire code from the project file `番号标记+搜索按钮+HD中文字幕高亮.user.js` into the new script editor.
4.  Save (Ctrl+S) to take effect.

## Usage

*   **Scope**: The script works on all websites (`*://*/*`) by default, primarily intended for resource list pages.
*   **Operation**: The script runs automatically when browsing. Click the "🔍" icon to search when you see it.

## Version Info

*   **Current Version**: 1.6
