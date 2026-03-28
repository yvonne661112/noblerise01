---
name: upload-article
description: 將外部網址或本地文章上傳至諾昇理財部落格（src/content/blog/）。當使用者提供文章網址或要求上傳文章時自動引用。
user-invocable: true
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
  - mcp__plugin_playwright_playwright__browser_navigate
  - mcp__plugin_playwright_playwright__browser_snapshot
  - mcp__plugin_playwright_playwright__browser_evaluate
  - mcp__plugin_telegram_telegram__reply
---

# upload-article — 諾昇理財文章上傳流程

當使用者提供文章網址（或本地檔案）要求上傳至部落格時，依照以下流程執行。

Arguments: `$ARGUMENTS`

---

## 步驟一：取得完整文章內容

**必須使用 Playwright**，不可只用 WebFetch。原因：Wix、WordPress 等網站為 JS 動態渲染，WebFetch 只能取得 metadata，無法取得完整正文與圖片。

```
1. browser_navigate 至文章網址
2. browser_snapshot 確認頁面結構
3. browser_evaluate 取得所有 img 的 src：
   () => Array.from(document.querySelectorAll('article img')).map(img => ({ src: img.src, alt: img.alt }))
4. 從 snapshot 中逐段抄錄原文（標題、段落、清單、引言、圖片位置）
```

---

## 步驟二：下載文章內嵌圖片

- 用 `curl -sL <url> -o public/images/<filename>` 下載每一張內嵌圖片
- 命名規則：`post-{numericSlug}-hero.png`、`post-{numericSlug}-fig1.jpg`……依序
- 若使用者另外提供封面圖，封面另存為 `post-{numericSlug}.jpg`（或對應格式）

---

## 步驟三：決定 numericSlug

- 優先使用日期格式（如 `20260328`），若原網址無日期則使用現有最大 numericSlug + 1
- 確認 `src/content/blog/{numericSlug}.md` 尚未存在

---

## 步驟四：撰寫 frontmatter

```yaml
---
title: "（原文標題，一字不改）"
description: "（原文描述或第一段摘要）"
date: YYYY-MM-DD
numericSlug: "20260328"
image: "images/post-20260328.jpg"   # 封面圖
categories:
  - "blog"
  - "（對應分類 slug）"
tags:
  - "（原文標籤）"
  - "諾昇理財規劃"
---
```

分類 slug 對照（參考 `src/data/categories.ts`）：
| 主題 | slug |
|------|------|
| 投資理財 | investment |
| 保險權益 | insurance |
| 證照進修 | certification |
| 財務規劃 | business-planning |
| 信託規劃 | elderly-care-trust |
| 傳承稅務 | tax-planning |

---

## 步驟五：撰寫 Markdown 正文

### 嚴格規則（違反即重做）

1. **原文一字不改**：正文文字須完整保留，不得改寫、精簡、重新組織段落
2. **封面不重複**：frontmatter `image` 已是封面，body 開頭不可再放相同或功能重複的首圖
3. **圖片依原始位置插入**：`![](/images/post-{numericSlug}-fig1.jpg)`
4. **移除延伸閱讀**：刪除原文中的「延伸閱讀」區塊
5. **不加作者 bio**：文末不加作者資訊，post 頁面已有 `AuthorCard` 元件
6. **置換舊站連結**：將 `https://noblerise.com.tw/xxx/` 置換為新站對應相對路徑（如 `/service/`、`/about/`、`/123/`）
7. **內部連結用相對路徑**：`/service/` 等，remark 插件會自動補 base path（`/noblerise01/`）。不可用絕對路徑如 `https://yvonne661112.github.io/noblerise01/service/`

### 排版規則（依 CLAUDE.md Blog 規範）

- h2（`##`）為主段，h3（`###`）為子段
- 有序清單用於步驟，無序清單用於並列
- 重要名詞/金額用 `**粗體**`，引言用 `>`
- 數字比較用 Markdown 表格

---

## 步驟六：build 驗證

```bash
npm run build
```

確認無錯誤後再 commit。

---

## 步驟七：commit & push

```bash
git add src/content/blog/{numericSlug}.md public/images/post-{numericSlug}*.{jpg,png}
git commit -m "content: 新增文章〈{標題}〉"
git push origin style/redesign
git push github style/redesign
```

Push 前須等使用者確認（除非使用者已預先授權）。

---

## 常見錯誤與排除

| 問題 | 原因 | 解法 |
|------|------|------|
| 內部連結 404 | `/service/` 未補 base path | remark 插件已處理，確認路徑以 `/` 開頭即可 |
| 圖片顯示錯誤 | 圖片 URL 未轉換 | 確認已下載至 `public/images/` 並使用 `/images/xxx` 路徑 |
| 文章未出現 | numericSlug 衝突 | 檢查現有檔案，改用不同 slug |
| build 失敗 | frontmatter 格式錯誤 | 檢查 YAML 縮排、引號 |
