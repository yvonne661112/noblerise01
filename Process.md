# Process.md — 高優先度 TODO 執行記錄

> 對應 TODO.md 的高優先度項目（★★★）
> 此檔用於中斷後重啟工作的續接依據

---

## 工作批次：高優先度項目

### 處理項目

| 項目 | 說明 | 狀態 |
|------|------|------|
| C-1 | 提取 `categoryLabels` → `src/data/categories.ts` | ✅ 完成（commit 7604181） |
| C-2 | 提取 `transformPost()` → `src/utils/post.ts` | ✅ 完成（commit e5c23f2） |
| A-4 | 移除策略夥伴頁重複 Google Fonts `<link>` | ✅ 完成（commit 8877684） |

---

## C-1：提取 categoryLabels

### 目標
建立 `src/data/categories.ts`，將 `categoryLabels` 從以下 4 個頁面的重複定義中統一：
- `src/pages/index.astro`（第 11–18 行）
- `src/pages/blog/index.astro`（第 11–18 行）
- `src/pages/blog/[category]/index.astro`（第 11–18 行）
- `src/pages/[...slug].astro`（第 25–32 行）

`[category]/index.astro` 的 `getStaticPaths` 也有重複的 slug 鍵名（第 22–29 行），一併由 `categories.ts` 匯出 `categorySlugs`。

### 步驟
1. [x] 建立 `src/data/categories.ts`
2. [x] 更新 `src/pages/index.astro`
3. [x] 更新 `src/pages/blog/index.astro`
4. [x] 更新 `src/pages/blog/[category]/index.astro`
5. [x] 更新 `src/pages/[...slug].astro`
6. [x] 驗證 build 無誤 → commit

---

## C-2：提取 transformPost()

### 目標
建立 `src/utils/post.ts`，將三個頁面重複的文章資料轉換邏輯統一：
- `src/pages/index.astro`（第 24–40 行）
- `src/pages/blog/index.astro`（第 38–54 行）
- `src/pages/blog/[category]/index.astro`（第 54–69 行）

### 步驟
1. [x] 建立 `src/utils/post.ts`（含 `transformPost`、`sortPostsByDate`）
2. [x] 更新 `src/pages/index.astro`
3. [x] 更新 `src/pages/blog/index.astro`
4. [x] 更新 `src/pages/blog/[category]/index.astro`
5. [x] 驗證 build 無誤 → commit

---

## A-4：移除策略夥伴頁重複字型

### 目標
`src/pages/about/策略夥伴/index.astro`（第 33–35 行）手動 `<link>` Google Fonts，
與 `Head.astro` 已統一載入的字型重複。

### 步驟
1. [x] 刪除第 33–35 行的三個 `<link>` 標籤
2. [x] 確認 `Head.astro` 的 premium 主題已包含相同字型
3. [x] 驗證頁面字型顯示正常 → commit

---

## Commit 計劃（高優先度）
- Commit 1：C-1（categories.ts + 4 頁面更新）✅
- Commit 2：C-2（post.ts + 3 頁面更新）✅
- Commit 3：A-4（策略夥伴頁字型清理）✅

---

## 工作批次：中優先度項目

### 處理項目

| 項目 | 說明 | 狀態 |
|------|------|------|
| A-2 | 文章 JSON-LD 補充 `mainEntityOfPage`、`dateModified` | ✅ 完成（commit 0ec559a） |
| A-3 | 分類頁 JSON-LD 補充 `hasPart` | ✅ 完成（commit 429bf0c） |
| B-4 | 策略夥伴頁響應式斷點 `540px` → `600px` | ✅ 完成（commit d05ea8a） |

---

## A-2：文章 JSON-LD 補充關鍵欄位

### 目標
`src/pages/[...slug].astro` 的 Article JSON-LD 補充：
- `mainEntityOfPage`：`{ "@type": "WebPage", "@id": canonicalUrl }`
- `dateModified`：使用 `post.data.date`（目前無獨立更新日期欄位）

### 步驟
1. [x] 更新 `[...slug].astro` 的 `jsonLd` 物件
2. [x] 驗證 build 無誤 → commit

---

## A-3：分類頁 JSON-LD 補充 hasPart

### 目標
`src/pages/blog/[category]/index.astro` 的 CollectionPage JSON-LD 補充 `hasPart` 陣列，
讓 Google 能理解該分類頁包含哪些文章。

### 步驟
1. [x] 將 posts 計算移至 jsonLd 之前（jsonLd 需引用 posts）
2. [x] 更新 `[category]/index.astro` 的 `jsonLd` 物件
3. [x] 驗證 build 無誤 → commit

---

## B-4：統一響應式斷點

### 目標
`src/pages/about/策略夥伴/index.astro` 的 `<style>` 區塊中，
將非標準斷點 `@media (max-width: 540px)` 改為全站標準 `600px`。

### 步驟
1. [x] 找出策略夥伴頁所有 `540px` 斷點並改為 `600px`
2. [x] 驗證 build 無誤 → commit

## Commit 計劃（中優先度）
- Commit 4：A-2（文章 JSON-LD 補強）✅
- Commit 5：A-3（分類頁 hasPart）✅
- Commit 6：B-4（斷點統一）✅

---

## 工作批次：低優先度項目

### 處理項目

| 項目 | 說明 | 狀態 |
|------|------|------|
| B-5 | AuthorCard 硬編碼色彩改為 CSS 變數 | ✅ 完成（commit 17a971c） |
| C-3 | JSON-LD publisher 物件提取至共用 utils | ✅ 完成（commit 0bc7af9） |
| C-4 | 建立圖片路徑工具，統一動態圖片路徑處理 | ✅ 完成（commit 3008956） |

---

## B-5：AuthorCard 去硬編碼

### 目標
`src/components/AuthorCard.astro`（第 25、29、48、63 行）中的硬編碼色彩：
- `background: #f7f9f4` → `var(--color-bg-subtle)`（兩主題皆已定義）
- `color: #333` → `var(--color-text)`
- `color: #555` → `var(--color-text-mid)`
- `color: #444` → `var(--color-text-mid)`

### 步驟
1. [ ] 修改 AuthorCard.astro 的 4 個硬編碼值
2. [ ] 驗證 build 無誤 → commit

---

## C-3：JSON-LD publisher 提取

### 目標
`publisher` 物件在 3 個頁面硬編碼相同內容：
- `src/pages/blog/index.astro`
- `src/pages/blog/[category]/index.astro`
- `src/pages/[...slug].astro`

建立 `src/utils/jsonld.ts`，匯出 `publisher` 常數。

### 步驟
1. [ ] 建立 `src/utils/jsonld.ts`
2. [ ] 更新 3 個頁面 import 並使用 `publisher`
3. [ ] 驗證 build 無誤 → commit

---

## C-4：圖片路徑工具

### 目標
建立 `src/utils/assets.ts`，解決動態圖片路徑需要手動 `.replace(/^\//, '')` 的問題，
應用於 `BlogList.astro` 與 `[...slug].astro`。
（靜態圖片 `BASE_URL + "images/..."` 模式保持不動，避免大量無謂 churn）

### 步驟
1. [ ] 建立 `src/utils/assets.ts`（含 `getAssetPath`）
2. [ ] 更新 `BlogList.astro` 的動態圖片路徑
3. [ ] 更新 `[...slug].astro` 的動態圖片路徑
4. [ ] 驗證 build 無誤 → commit

## Commit 計劃（低優先度）
- Commit 7：B-5（AuthorCard 去硬編碼）✅
- Commit 8：C-3（publisher 常數提取）✅
- Commit 9：C-4（圖片路徑工具）✅

---

## 全部 TODO 項目已完成

所有高／中／低優先度項目均已處理完畢。
如有新的改善需求，請更新 TODO.md 並開啟新批次。
