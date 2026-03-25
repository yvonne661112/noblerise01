# Process.md — 高優先度 TODO 執行記錄

> 對應 TODO.md 的高優先度項目（★★★）
> 此檔用於中斷後重啟工作的續接依據

---

## 工作批次：高優先度項目

### 處理項目

| 項目 | 說明 | 狀態 |
|------|------|------|
| C-1 | 提取 `categoryLabels` → `src/data/categories.ts` | 🔄 進行中 |
| C-2 | 提取 `transformPost()` → `src/utils/post.ts` | ⏳ 待處理 |
| A-4 | 移除策略夥伴頁重複 Google Fonts `<link>` | ⏳ 待處理 |

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
2. [ ] 更新 `src/pages/index.astro`
3. [ ] 更新 `src/pages/blog/index.astro`
4. [ ] 更新 `src/pages/blog/[category]/index.astro`
5. [ ] 更新 `src/pages/[...slug].astro`
6. [ ] 驗證 build 無誤 → commit

---

## C-2：提取 transformPost()

### 目標
建立 `src/utils/post.ts`，將三個頁面重複的文章資料轉換邏輯統一：
- `src/pages/index.astro`（第 24–40 行）
- `src/pages/blog/index.astro`（第 38–54 行）
- `src/pages/blog/[category]/index.astro`（第 54–69 行）

### 步驟
1. [ ] 建立 `src/utils/post.ts`（含 `transformPost`、`sortPostsByDate`）
2. [ ] 更新 `src/pages/index.astro`
3. [ ] 更新 `src/pages/blog/index.astro`
4. [ ] 更新 `src/pages/blog/[category]/index.astro`
5. [ ] 驗證 build 無誤 → commit

---

## A-4：移除策略夥伴頁重複字型

### 目標
`src/pages/about/策略夥伴/index.astro`（第 33–35 行）手動 `<link>` Google Fonts，
與 `Head.astro` 已統一載入的字型重複。

### 步驟
1. [ ] 刪除第 33–35 行的三個 `<link>` 標籤
2. [ ] 確認 `Head.astro` 的 premium 主題已包含相同字型
3. [ ] 驗證頁面字型顯示正常 → commit

---

## Commit 計劃
- Commit 1：C-1（categories.ts + 4 頁面更新）
- Commit 2：C-2（post.ts + 3 頁面更新）
- Commit 3：A-4（策略夥伴頁字型清理）
