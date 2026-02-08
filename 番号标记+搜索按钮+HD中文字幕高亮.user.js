// ==UserScript==
// @name         番号标记+搜索按钮 + HD中文字幕高亮（更强健版）
// @namespace    http://tampermonkey.net/
// @version      1.8
// @description  更稳健地识别番号并添加搜索按钮；仅高亮表格行中同时含HD与中文字幕的行（不破坏DOM）
// @author       Jhih He
// @license      MIT
// @homepage     https://github.com/jhihhe/BT-helper
// @match        *://*/*
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    // ================= 配置区域 =================
    const CONFIG = {
        enableHighlight: GM_getValue('enableHighlight', true),
        searchBase: "https://sukebei.nyaa.si/?f=0&c=0_0&q="
    };

    // ================= 样式定义 (UI/UX Pro Max) =================
    const STYLES = `
        /* 搜索按钮样式 - Pill Shape, 现代感蓝色调 */
        .bt-helper-search-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-left: 6px;
            padding: 2px 8px;
            background-color: #f0f7ff; /* 极淡蓝背景 */
            color: #0066cc !important; /* 品牌蓝文字 */
            border: 1px solid #cce5ff; /* 淡蓝边框 */
            border-radius: 12px; /* 圆角胶囊 */
            font-size: 11px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            font-weight: 500;
            text-decoration: none !important;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            line-height: 1.2;
            vertical-align: middle;
            box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }

        /* 悬停效果 - 提升交互感 */
        .bt-helper-search-btn:hover {
            background-color: #0066cc;
            color: white !important;
            border-color: #005bb5;
            transform: translateY(-1px);
            box-shadow: 0 3px 6px rgba(0, 102, 204, 0.2);
        }

        /* 点击效果 */
        .bt-helper-search-btn:active {
            transform: translateY(0);
            box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }

        /* 图标微调 */
        .bt-helper-icon {
            margin-right: 3px;
            font-size: 10px;
        }

        /* 高亮行样式 - 柔和的琥珀色，带有左侧指示条 */
        .bt-helper-highlight-row {
            background-color: #fffbf0 !important; /* 极淡琥珀色，不刺眼 */
            position: relative;
            transition: background-color 0.3s ease;
        }
        
        /* 鼠标悬停高亮行增强 */
        .bt-helper-highlight-row:hover {
            background-color: #fff3cd !important;
        }

        /* 左侧指示条 - 视觉引导 */
        .bt-helper-highlight-row td:first-child {
            box-shadow: inset 4px 0 0 #ffc107; /* 使用内阴影模拟边框，避免布局抖动 */
        }
    `;
    GM_addStyle(STYLES);

    // ================= 菜单命令 =================
    GM_registerMenuCommand(`✨ 高亮 HD+中字: ${CONFIG.enableHighlight ? '已开启 ✅' : '已关闭 ❌'}`, () => {
        GM_setValue('enableHighlight', !CONFIG.enableHighlight);
        location.reload();
    });

    // ================= 核心逻辑 =================
    
    // 更宽松：允许大小写、比如 [SSIS-924]、ssIs-924 等
    const codeRegex = /([A-Za-z]{2,8}-\d{2,6})/gi;

    // 禁止深入修改的标签
    const FORBIDDEN_TAGS = new Set(['SCRIPT','STYLE','NOSCRIPT','CODE','PRE','TEXTAREA','INPUT']);

    // 检查是否已存在按钮
    function hasExistingSearchNearby(node, match) {
        if (!node) return false;
        let p = node;
        for (let i=0; i<4 && p; i++) {
            if (p.querySelector) {
                const anchors = p.querySelectorAll(`a[data-bt-helper-search="${match}"]`);
                if (anchors.length > 0) return true;
            }
            p = p.parentNode;
        }
        return false;
    }

    function nearestAnchorAncestor(node) {
        let p = node.parentNode;
        while (p && p.nodeType === 1) {
            if (p.tagName === 'A') return p;
            p = p.parentNode;
        }
        return null;
    }

    // 创建美化后的搜索按钮
    function createSearchButton(match) {
        const a = document.createElement('a');
        a.className = 'bt-helper-search-btn';
        a.href = `${CONFIG.searchBase}${encodeURIComponent(match)}`;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.title = `在 Sukebei Nyaa 搜索 ${match}`;
        a.setAttribute('data-bt-helper-search', match);
        
        // 内容：图标 + 文本
        a.innerHTML = `<span class="bt-helper-icon">🔍</span>搜 ${match}`;
        
        return a;
    }

    function insertSearchAfterElement(el, match) {
        if (!el || hasExistingSearchNearby(el, match)) return;
        const btn = createSearchButton(match);
        if (el.nextSibling) el.parentNode.insertBefore(btn, el.nextSibling);
        else el.parentNode.appendChild(btn);
    }

    function replaceTextNodeWithButtons(textNode) {
        const text = textNode.nodeValue;
        if (!text) return;
        
        codeRegex.lastIndex = 0;
        if (!codeRegex.test(text)) return;
        codeRegex.lastIndex = 0;

        const parent = textNode.parentNode;
        if (!parent || FORBIDDEN_TAGS.has(parent.tagName)) return;

        const frag = document.createDocumentFragment();
        let lastIndex = 0;
        let m;

        while ((m = codeRegex.exec(text)) !== null) {
            const match = m[1];
            const offset = m.index;

            if (offset > lastIndex) {
                frag.appendChild(document.createTextNode(text.slice(lastIndex, offset)));
            }

            if (hasExistingSearchNearby(parent, match)) {
                frag.appendChild(document.createTextNode(match));
            } else {
                const span = document.createElement('span');
                span.textContent = match;
                frag.appendChild(span);
                frag.appendChild(createSearchButton(match));
            }

            lastIndex = offset + match.length;
        }

        if (lastIndex < text.length) {
            frag.appendChild(document.createTextNode(text.slice(lastIndex)));
        }

        parent.replaceChild(frag, textNode);
    }

    function walkAndAddButtons(root) {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
        const nodes = [];
        let n;
        while ((n = walker.nextNode())) nodes.push(n);

        for (const node of nodes) {
            if (!node.nodeValue) continue;
            if (!/[A-Za-z]{2,}-\d/.test(node.nodeValue)) continue;

            const aAncestor = nearestAnchorAncestor(node);
            if (aAncestor) {
                let m;
                codeRegex.lastIndex = 0;
                const seen = new Set();
                while ((m = codeRegex.exec(aAncestor.innerText || '')) !== null) {
                    const match = m[1];
                    if (seen.has(match)) continue;
                    seen.add(match);
                    if (!hasExistingSearchNearby(aAncestor, match)) {
                        insertSearchAfterElement(aAncestor, match);
                    }
                }
                codeRegex.lastIndex = 0;
                continue;
            }

            replaceTextNodeWithButtons(node);
        }
    }

    function highlightRows() {
        if (!CONFIG.enableHighlight) return;
        
        const rows = document.querySelectorAll('tr');
        rows.forEach(tr => {
            // 如果已经处理过，跳过 (可选优化，这里直接重新检查以支持动态变化)
            const text = (tr.innerText || '').replace(/\s+/g, ' ');
            if (/HD/i.test(text) && /(中文|中文字幕|中字)/.test(text)) {
                tr.classList.add('bt-helper-highlight-row');
            } else {
                tr.classList.remove('bt-helper-highlight-row');
            }
        });
    }

    // ================= 初始化 =================
    function initialRun() {
        try {
            walkAndAddButtons(document.body);
            highlightRows();
        } catch (e) {
            console.error('[BT-Helper] Error:', e);
        }
    }
    
    // 启动延迟
    setTimeout(initialRun, 600);

    // 观察者
    const observer = new MutationObserver(mutations => {
        let shouldHighlight = false;
        for (const m of mutations) {
            if (m.addedNodes.length > 0) shouldHighlight = true;
            for (const node of m.addedNodes) {
                if (node.nodeType !== 1) continue;
                try {
                    walkAndAddButtons(node);
                } catch (e) {
                    console.error('[BT-Helper] Observer Error:', e);
                }
            }
        }
        if (shouldHighlight) highlightRows();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // 再次保险
    window.addEventListener('load', () => {
        setTimeout(() => {
            walkAndAddButtons(document.body);
            highlightRows();
        }, 300);
    });

})();
