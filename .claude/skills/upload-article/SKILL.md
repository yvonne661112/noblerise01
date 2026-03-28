---
name: upload-article
description: 將文章上傳至諾昇理財部落格（src/content/blog/）。支援網頁連結、Word、Pages、HTML、PDF、Markdown 等格式。當使用者提供文章網址或檔案要求上傳時自動引用。
user-invocable: true
---

# upload-article — 諾昇理財文章上傳流程

當使用者提供文章（網址或本地檔案）要求上傳至部落格時，依照以下流程執行。

Arguments: `$ARGUMENTS`

---

## 階段一：依格式取得內容

依據來源格式選擇對應的擷取方式：

### A. 網頁連結（URL）

外部網站（Wix、WordPress 等）為 JS 動態渲染，**必須用 Playwright**，不可只用 WebFetch。

```
1. browser_navigate 至文章網址
2. browser_snapshot 取得頁面結構與完整文字
3. browser_evaluate 取得所有文章圖片 URL：
   () => Array.from(document.querySelectorAll('article img'))
         .map(img => ({ src: img.src, alt: img.alt }))
4. 從 snapshot 逐段抄錄原文（標題、段落、清單、引言、圖片位置）
```

若頁面圖片為縮圖（blur），修改 URL 中的尺寸參數取得原圖。

### B. Markdown（.md）

直接用 `Read` 工具讀取，保留原始內容，僅補齊 frontmatter 缺漏欄位。

### C. HTML（.html）

用 `Read` 讀取，解析 `<h1>`~`<h3>`、`<p>`、`<ul>`、`<ol>`、`<blockquote>`、`<img>` 等標籤轉為 Markdown。下載 `<img src>` 中的本地或外部圖片。

### D. PDF（.pdf）

用 `Read` 工具讀取 PDF（指定頁數範圍）。逐頁擷取文字，重建段落與標題層級（根據字體大小或段落結構判斷 h2/h3）。PDF 內嵌圖片若無法直接取得，請告知使用者手動提供。

### E. Word（.docx）/ Pages（.pages）

```bash
# Word：用 pandoc 轉換為 Markdown
pandoc input.docx -o /tmp/article.md --wrap=none

# Pages：先匯出為 docx，再用 pandoc
# （請使用者先在 Pages 中執行「檔案 > 匯出為 > Word」）
```

轉換後用 `Read` 讀取 `/tmp/article.md`，再依通用規則整理。

---

## 階段二：下載文章內嵌圖片

- 命名規則：`post-{numericSlug}.jpg`（封面）、`post-{numericSlug}-fig1.jpg`、`post-{numericSlug}-fig2.jpg`……
- 下載指令：`curl -sL "<url>" -o public/images/<filename>`
- 本地圖片：直接複製至 `public/images/`
- PDF/Word 內嵌圖片無法自動取得時：請使用者另行提供

---

## 階段三：決定 numericSlug

- 優先使用日期格式（如 `20260328`）
- 無日期則取現有最大 numericSlug + 1
- 確認 `src/content/blog/{numericSlug}.md` 尚未存在

---

## 階段四：撰寫 frontmatter

```yaml
---
title: "（原文標題，一字不改）"
description: "（原文描述或第一段摘要）"
date: YYYY-MM-DD
numericSlug: "20260328"
image: "images/post-20260328.jpg"   # 封面圖（使用者提供或原文首圖）
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

## 階段五：撰寫 Markdown 正文

### 通用嚴格規則（所有格式適用，違反即重做）

1. **原文一字不改**：正文文字完整保留，不改寫、不精簡、不重新組織段落
2. **封面不重複**：frontmatter `image` 已是封面，body 開頭不可再放相同首圖
3. **圖片依原始位置插入**：`![](/images/post-{numericSlug}-fig1.jpg)`
4. **移除延伸閱讀**：刪除原文中的「延伸閱讀」區塊
5. **不加作者 bio**：文末不加作者資訊，post 頁面已有 `AuthorCard` 元件
6. **置換舊站連結**：`https://noblerise.com.tw/xxx/` → `/xxx/`（相對路徑）
7. **內部連結用 `/` 開頭相對路徑**：remark 插件會自動補 `/noblerise01/` base path

### 排版規則（依 CLAUDE.md Blog 規範）

- h2（`##`）為主段，h3（`###`）為子段，不使用 h4 以下
- 有序清單（`1.`）用於步驟，無序（`-`）用於並列
- 重要名詞/金額用 `**粗體**`，引言用 `>`
- 數字比較用 Markdown 表格

---

## 階段六：build 驗證

```bash
npm run build
```

確認無錯誤再 commit。

---

## 階段七：commit & push

```bash
git add src/content/blog/{numericSlug}.md public/images/post-{numericSlug}*
git commit -m "content: 新增文章〈{標題}〉"
git push origin style/redesign
git push github style/redesign
```

Push 前須等使用者確認（除非使用者已預先授權）。

---

## 常見錯誤排除

| 問題 | 原因 | 解法 |
|------|------|------|
| 內部連結 404 | 未用 `/` 開頭相對路徑 | 確認路徑以 `/` 開頭，remark 插件會補 base |
| 圖片不顯示 | 圖片未下載至 `public/images/` | 重新下載並確認路徑 |
| 文章未出現 | numericSlug 衝突 | 檢查現有檔案，改用不同 slug |
| build 失敗 | frontmatter 格式錯誤 | 檢查 YAML 縮排與引號 |
| Word/Pages 無法轉換 | 未安裝 pandoc | `brew install pandoc`，或請使用者先手動複製文字 |
| PDF 圖片缺失 | PDF 內嵌圖片無法自動擷取 | 請使用者另行提供圖片檔案 |
