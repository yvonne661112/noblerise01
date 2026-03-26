# DONE — 諾昇理財網站已完成項目存檔

> 完成日期：2026-03-26
> 來源：第二輪改善清單（原 docs/TODO.md）

---

## 標題階層修正

| 項目 | 說明 | 狀態 |
|------|------|------|
| 首頁缺少 H1 | `src/pages/index.astro` slogan `<p>` 改為 `<h1>`，解決全頁無 H1 問題 | ✅ 完成 |

---

## M. SEO 遷移連貫性

| 項目 | 說明 | 狀態 |
|------|------|------|
| M-1 robots.txt 切換計劃 | 建立 DNS 切換 SOP，切換前改 Disallow → Allow | ✅ 已文件化 |
| M-2 Sitemap 檔名相容性 | deploy.yml 加入 cp 指令，自動產生底線版本 sitemap_index.xml | ✅ 完成 |
| M-3 JSON-LD 改回 BlogPosting | [...slug].astro 改為 `@type: BlogPosting` | ✅ 完成 |
| M-4 日期加時區 +08:00 | datePublished / dateModified 加入 +08:00 時區 | ✅ 完成 |
| M-6 og:image 路徑確認 | og:image 使用 getAssetPath 確認可正常訪問 | ✅ 完成 |

---

## A. SEO 強化

| 項目 | 說明 | 狀態 |
|------|------|------|
| A-1 og:image URL 路徑 | 改用 getAssetPath + new URL，確保 GitHub Pages base 正確 | ✅ 完成 |
| A-2 BaseHead/Head 統一 | 刪除 BaseHead.astro，全站統一使用 Head.astro | ✅ 完成 |
| A-3 文章 JSON-LD 加 inLanguage | 加入 `"inLanguage": "zh-TW"` | ✅ 完成 |
| A-4 BreadcrumbList JSON-LD | blog/index 與 [category]/index 加入 BreadcrumbList | ✅ 完成 |
| A-5 策略夥伴照片加入 JSON-LD | Person 物件補充 image 屬性 | ✅ 完成 |

---

## B. 設計改善

| 項目 | 說明 | 狀態 |
|------|------|------|
| B-1 硬編碼色彩轉 CSS 變數 | LINE 綠、外部連結色、tag 背景色改用 CSS 變數 | ✅ 完成 |
| B-2 CompanyName 元件化 | 建立 CompanyName.astro，contact 與 footer 統一引入 | ✅ 完成 |
| B-3 PageHero stats 手機版 flex-wrap | 加入 flex-wrap 與小螢幕 column 排列 | ✅ 完成 |
| B-4 服務頁 aspect-ratio | 服務卡片圖加入 aspect-ratio 防版面跳動 | ✅ 完成 |

---

## C. 程式碼低效

| 項目 | 說明 | 狀態 |
|------|------|------|
| C-1 BlogList categories 由 data/categories 產生 | 消除分類定義重複，改用 getCategoryNavItems() | ✅ 完成 |
| C-2 刪除遺留元件 | 刪除 BlogPost.astro、FormattedDate.astro、HeaderLink.astro | ✅ 完成 |
| C-3 BlogList 作者名稱由 author.ts 提供 | 改為 `{author.name}` | ✅ 完成 |
| C-4 擴充 JSON-LD 工廠函式 | blogListLd、breadcrumbLd 等工廠函式建立 | ✅ 完成 |
| C-5 transformPost 缺失圖片備用值 | 加入 DEFAULT_IMAGE fallback | ✅ 完成 |
| C-6 Head.astro og:image 使用 getAssetPath | 統一圖片路徑邏輯 | ✅ 完成 |

---

## 執行批次記錄

> 來源：原 docs/Process.md，完成日期 2026-03-26

### Batch 1：遷移連貫性（M-1 ~ M-4、A-3）

| 子項 | 實際修改 |
|------|---------|
| M-1 | `public/robots.txt` 加入 DNS 切換 SOP 說明 |
| M-2 | `src/components/Head.astro` sitemap link 加入 base path；`deploy.yml` 加入底線版本 cp 指令 |
| M-3 | `src/pages/[...slug].astro` JSON-LD `@type` 改為 `BlogPosting` |
| M-4 | `src/pages/[...slug].astro` datePublished/dateModified 加入 +08:00 時區 |
| A-3 | `src/pages/[...slug].astro` JSON-LD 加入 `inLanguage: "zh-TW"` |

### Batch 2：SEO 改善（A-1/C-6、A-2/C-2、A-4、A-5）

| 子項 | 實際修改 |
|------|---------|
| A-1/C-6 | `src/components/Head.astro` og:image 改用 `getAssetPath` 加入 base path |
| A-2/C-2 | 刪除 `BaseHead.astro`、`BlogPost.astro`、`FormattedDate.astro`、`HeaderLink.astro` |
| A-4 | `src/pages/blog/index.astro` 與 `src/pages/blog/[category]/index.astro` 加入 BreadcrumbList JSON-LD |
| A-5 | `src/pages/about/策略夥伴/index.astro` JSON-LD Person 物件加入 image URL |

### Batch 3：設計改善（B-1 ~ B-4）

| 子項 | 實際修改 |
|------|---------|
| B-1 | `src/styles/global.css`、`src/components/BlogList.astro`、`public/styles/theme-*.css` 硬編碼色彩改為 CSS 變數 |
| B-2 | 建立 `src/components/CompanyName.astro`，取代 contact/footer 的內聯 style |
| B-3 | `src/components/PageHero.astro` stats 加入 `flex-wrap`，小螢幕堆疊 |
| B-4 | `src/pages/service/index.astro` 服務卡片加入 `aspect-ratio` |

### Batch 4：程式碼低效（C-1、C-3、C-4、C-5）

| 子項 | 實際修改 |
|------|---------|
| C-1 | `src/data/categories.ts` 加入 `getCategoryNavItems()`；`src/components/BlogList.astro` 使用 |
| C-3 | `src/components/BlogList.astro` 作者名稱改由 `src/data/author.ts` 提供 |
| C-4 | 擴充 `src/utils/jsonld.ts` 工廠函式，重構 blog/index 與 [category]/index |
| C-5 | `src/utils/post.ts` `transformPost` 加入缺失圖片備用值 `DEFAULT_IMAGE` |
