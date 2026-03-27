# CLAUDE.md — 諾昇理財網站維護與修改指南

> 任務文件請參閱 [`docs/`](./docs/) 目錄，索引見 [`docs/INDEX.md`](./docs/INDEX.md)

---

## 專案概覽

- **網站名稱**：諾昇理財規劃顧問
- **框架**：Astro v6（靜態輸出）
- **部署**：GitHub Pages → `https://yvonne661112.github.io/noblerise01/`
- **目標網域**：`https://noblerise.com.tw/`（DNS 切換留待 task02）
- **Git remote**：`https://github.com/yvonne661112/noblerise01.git`
- **對標舊站**：`https://noblerise.com.tw/`（WordPress 舊版，修改時以此為視覺與內容參考基準）

---

## 技術架構

### 關鍵檔案位置

| 檔案 | 用途 |
|------|------|
| `src/data/siteConfig.ts` | 全站設定：主題切換（`activeTheme`）、功能開關、公司聯絡資訊 |
| `src/components/Head.astro` | SEO 標籤 + 動態載入主題 CSS + Google Fonts |
| `src/components/Header.astro` | 導覽列（含 active 狀態偵測） |
| `src/components/Footer.astro` | 頁尾 |
| `src/styles/global.css` | 全域樣式（使用 CSS 變數，無硬編碼色彩） |
| `public/styles/theme-classic.css` | Classic 主題 CSS 變數定義 |
| `public/styles/theme-premium.css` | Premium 主題 CSS 變數定義 |
| `src/content.config.ts` | Content Collections 設定（Astro v5+） |
| `astro.config.mjs` | Astro 設定（`base`、`site`、`trailingSlash`） |
| `.github/workflows/deploy.yml` | GitHub Actions 自動部署 |
| `src/data/categories.ts` | 分類 slug 與標籤對照（`categoryLabels`、`categorySlugs`） |
| `src/data/author.ts` | 作者姓名、頭銜、證照等固定資料 |
| `src/utils/post.ts` | 文章排序、資料轉換工具函式 |
| `src/utils/jsonld.ts` | JSON-LD 結構化資料產生（`blogListLd`、`breadcrumbLd`） |
| `src/utils/assets.ts` | 動態圖片路徑轉完整 URL 工具 |

### 可重用元件

| 元件 | Props | 用途 |
|------|-------|------|
| `PageHero.astro` | `eyebrow?` `title` `description?` `stats[]?` | 各頁面 Hero 區塊 |
| `SectionHeader.astro` | `eyebrow?` `title` `align?` | 各節標題 + 裝飾線 |
| `ContentCard.astro` | `title` `body` `tag?` `href?` | 通用內容卡片 |
| `TagBadge.astro` | `label` `variant?` | 標籤徽章 |
| `AuthorCard.astro` | — | 作者資訊卡（讀取 `src/data/author.ts`） |
| `BlogList.astro` | `posts[]` | 文章列表 |
| `CompanyName.astro` | — | 公司名稱（中英文格式，讀取 `siteConfig.CONTACT`） |
| `SakuraRain.astro` | — | 櫻花飄落特效（開關：`siteConfig.SHOW_SAKURA`） |

### 主題系統

切換主題：修改 `src/data/siteConfig.ts` 的 `activeTheme` 一行即可。

```ts
// 可選值：'classic' | 'premium' | 'prestige' | 'premium-dark' | 'kawazu' | 'kintsugi' | 'noble'
export const activeTheme: 'classic' | 'premium' | 'prestige' | 'premium-dark' | 'kawazu' | 'kintsugi' | 'noble' = 'classic';
```

新增主題：
1. 在 `public/styles/` 新增 `theme-xxx.css`，定義所有 CSS 變數（參考現有 theme 檔的變數清單）
2. 在 `siteConfig.ts` 型別擴充：`'classic' | 'premium' | ... | 'xxx'`
3. 在 `Head.astro` 的 `fontUrls` 物件新增對應字型 URL

**已驗證**：任意切換主題後，title、canonical、og:url、h1、hreflang、sitemap 完全相同，SEO 零影響。

### 功能開關

```ts
// src/data/siteConfig.ts
export const SHOW_BOOKING = false; // 預約諮詢功能（true = 顯示）
export const SHOW_CTA = false;     // 全站 CTA 區塊（true = 顯示）
export const SHOW_SAKURA = false;  // 櫻花飄落特效（true = 顯示）
```

---

## 禁止事項

### SEO
- ❌ 不可更改任何頁面的 URL slug
- ❌ canonical 不可硬編碼，必須用 `new URL(Astro.url.pathname, Astro.site)` 動態產生
- ❌ 不可將 `robots.txt` 設定為允許爬蟲索引（正式上線前必須維持 `Disallow: /`）
- ❌ 不可加入 `public/CNAME` 檔案或設定自訂網域（留待 task02）

### 主題系統
- ❌ Theme 檔案（`public/styles/theme-*.css`）只能定義 **CSS 變數**，不可含任何 HTML 結構或 JavaScript
- ❌ 不可在 theme 檔內移除或覆蓋 `<h1>`、canonical、og、twitter 等 SEO 標籤
- ❌ 不可修改 `PageHero`、`SectionHeader` 等共用元件的 HTML 結構來達到主題差異，主題差異只能透過 CSS 變數實現
- ❌ 切換主題只能修改 `siteConfig.ts` 的 `activeTheme` 一行，不可同時更動其他檔案

### 圖片顯示（過去曾發生的錯誤，嚴禁重現）
- ❌ 不可對任何圖片套用圓形裁切（禁止 `border-radius: 50%`、`rounded-full`、`clip-path: circle()` 或任何圓形遮罩）
- ❌ 不可自行改變圖片的顯示尺寸或長寬比
- ❌ 不可將原本小尺寸圖片放大至全寬或大容器
- ❌ 不可使用固定高度容器搭配 `object-fit: cover` 裁切人物照片，除非原站即如此設計
- ❌ 不可自行為圖片加上陰影、濾鏡、外框等視覺效果，除非原站即有此效果

### 樣式撰寫
- ❌ 不可在 `global.css` 或頁面 `<style>` 中硬編碼色彩、字型值，一律使用 `var(--...)` CSS 變數
- ❌ 不可自行發揮設計創意，所有版面、元件以現有設計為依據

---

## Blog 文章 Markdown 規範

處理 `src/content/blog/` 下的文章時，必須遵守以下排版規則：

1. **Frontmatter**：每篇文章必須包含 `title`、`description`、`date`、`tags` 四個欄位
2. **標題層級**：h2（`##`）作為主要段落，h3（`###`）作為子項，不使用 h4 以下層級
3. **清單**：有序清單（`1.`）用於步驟流程，無序清單（`-`）用於並列項目
4. **強調**：重要名詞或金額用 `**粗體**`，警示或引言用 `>` 區塊引言
5. **表格**：數字比較類內容改為 Markdown 表格格式
6. **空行與斷行**：
   - 每個 h2 段落前空一行，內文段落間空一行
   - 連續兩個以上的空白行合併為一個空白行
   - 同一語意未結束即斷行者，合併回同一段落
7. **禁止偽標題**：不可用獨立一行的 `**粗體**` 代替標題，應升為對應 `##` / `###`，或合併為段落開頭粗體
8. **不修改中文文字內容**：僅調整排版格式，不改動任何正文文字

---

## 行為規範

- 收到用戶經由 Channels（如 Telegram）傳來的訊息時，**先立即回覆「收到」**，再繼續完成後續動作
- 遇到錯誤或不確定的決策點，**暫停並回報**，不自行假設
- 所有檔案操作前，**先確認路徑存在**，避免覆蓋或誤刪
- `docs/TODO.md` 中已完成的項目，完成後須移至 `docs/DONE.md` 存檔，不可留在 TODO 中
- 執行任何刪除操作前，**列出將被刪除的檔案清單並等待確認**
- **git push 前須等待使用者確認**

---

## 常用指令

```bash
# 本機開發
npm run dev

# 建置（輸出至 dist/）
npm run build

# 預覽建置結果
npm run preview
```

---

## 網站結構

### 頁面（6 頁）

| 頁面名稱 | URL | 檔案路徑 |
|----------|-----|---------|
| 首頁 | `/` | `src/pages/index.astro` |
| 關於諾昇 | `/about/` | `src/pages/about/index.astro` |
| 策略夥伴 | `/about/策略夥伴/` | `src/pages/about/策略夥伴/index.astro` |
| 服務項目 | `/service/` | `src/pages/service/index.astro` |
| 理財新知 | `/blog/` | `src/pages/blog/index.astro` |
| 聯繫我們 | `/contact/` | `src/pages/contact/index.astro` |

### 文章（34 篇）

動態路由：`src/pages/[...slug].astro`，透過 `numericSlug` frontmatter 產生數字 URL（如 `/123/`）。

### 分類頁面（6 個）

動態路由：`src/pages/blog/[category]/index.astro`，slug 清單定義於 `src/data/categories.ts`。

| 名稱 | URL |
|------|-----|
| 投資理財 | `/blog/investment/` |
| 保險權益 | `/blog/insurance/` |
| 證照進修 | `/blog/certification/` |
| 財務規劃 | `/blog/business-planning/` |
| 信託規劃 | `/blog/elderly-care-trust/` |
| 傳承稅務 | `/blog/tax-planning/` |

---

## 品牌色彩（供參考）

| 用途 | Classic（目前） | Premium | Prestige | Premium-Dark | Kawazu | Kintsugi | Noble |
|------|----------------|---------|----------|--------------|--------|----------|-------|
| 主色 | `#0d383a` | `#014045` | `#1a2744` | `#2d9daa` | `#3B2442` | `#2C2420` | `#1B3A4B` |
| 強調色 | `#85a14f` | `#979660` | `#c9956a` | `#c8c87a` | `#C95070` | `#C6A355` | `#C6923A` |
| 頁尾背景 | `#171717` | `#171717` | `#171717` | `#171717` | `#171717` | `#141110` | `#0A1520` |

完整色彩變數清單請參閱 `public/styles/theme-*.css`。
