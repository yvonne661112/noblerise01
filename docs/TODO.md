# TODO — 諾昇理財網站改善清單（第二輪）

> 產生日期：2026-03-26
> 前一輪（高/中/低優先度 9 項）已全數完成，本清單為新一輪檢視結果

---

## ⚠️ M. SEO 遷移連貫性（DNS 切換前必須完成）

> **背景**：目前 noblerise.com.tw 仍是 WordPress 舊站，Astro 新站部署於 GitHub Pages。
> Google 已索引舊站的 URL、結構化資料與 sitemap，DNS 切換後若技術細節不一致，會造成排名波動。
> 以下項目需在 **task02（DNS 切換）之前**全數確認或修正。

### M-1 🔴 robots.txt 切換計劃
- **問題**：目前新站 `public/robots.txt` 為 `Disallow: /`（開發保護），DNS 切換後若未即時更新，Google 會停止爬取整個新站，已有排名頁面將在數天內消失
- **建議**：DNS 切換時的 SOP：
  1. 切換前將 `public/robots.txt` 改為允許爬蟲
  2. 解除 sitemap 的註解，指向正確的 sitemap URL
  3. 確認改動已 push 並部署完成後，才進行 DNS 切換

### M-2 🔴 Sitemap 檔名不相容
- **問題**：舊站 Google Search Console 已登記 `https://noblerise.com.tw/sitemap_index.xml`（底線），Astro 預設產生的是 `sitemap-index.xml`（連字符）。切換後 GSC 找不到 sitemap，新頁面重新索引時間可能延誤數週
- **建議**：在 `astro.config.mjs` 的 `@astrojs/sitemap` 設定中自訂檔名，或 DNS 切換後立即至 GSC 重新提交正確的 sitemap URL

### M-3 🟠 文章 JSON-LD @type 由 BlogPosting 改為 Article
- **問題**：舊站所有文章使用 `@type: "BlogPosting"`（WordPress Yoast 預設），新站使用 `@type: "Article"`。雖然兩者均有效，但 Google 切換後會重新解析所有文章的 rich results，可能造成短暫排名波動
- **建議**：將 `src/pages/[...slug].astro` 的 JSON-LD 改回 `"@type": "BlogPosting"` 以維持一致性；BlogPosting 是 Article 的子類型，更精確描述部落格文章

### M-4 🟠 datePublished 缺少時區資訊
- **問題**：舊站文章 `datePublished` 格式為 `2026-03-15T00:00:00+08:00`（含時區），新站為 `2026-03-15`（裸日期）。Google 可能認定為不同日期，影響文章新鮮度信號
- **建議**：在 `src/pages/[...slug].astro` 的 jsonLd 中，將日期格式化為含時區的 ISO 8601：
  ```ts
  "datePublished": new Date(date).toISOString().replace('Z', '+08:00'),
  "dateModified": new Date(date).toISOString().replace('Z', '+08:00'),
  ```

### M-5 🟡 DNS 切換後需至 Google Search Console 重新驗證
- **問題**：新站部署架構（Astro 靜態 + GitHub Actions）與舊站（WordPress）不同，GSC 的驗證方式可能需要更新；且原有的 Search Console 資料（點擊、曝光、排名）需要在正確 property 下繼續追蹤
- **建議**：
  1. DNS 切換後確認 `https://noblerise.com.tw` property 仍有效
  2. 使用 GSC 的「URL 檢查」工具確認幾個重要頁面已被正確索引
  3. 觀察 Coverage 報告是否有新的 404 或 redirect 錯誤

### M-6 🟡 og:image 路徑在 DNS 切換前後的差異
- **問題**：舊站 og:image 指向 `wp-content/uploads/...`，新站指向 `/images/...`。社群平台（Facebook、LINE）有快取機制，分享舊連結時會顯示舊圖，分享新連結時顯示新圖；兩者並存期間外觀不一致
- **建議**：此為正常遷移現象，無需特別處理；確保新站所有頁面的 og:image 正確可訪問即可（參見 A-1）

---

## A. SEO 強化（新站改善）

### A-1 ★★★ og:image URL 路徑可能錯誤
- **問題**：`src/components/Head.astro`（第 12–13 行）使用 `new URL(image, Astro.site)` 產生 og:image，但 `astro.config.mjs` 的 `site` 為 `https://noblerise.com.tw`、`base` 為 `/noblerise01/`，實際圖片位於 `https://yvonne661112.github.io/noblerise01/images/...`，og:image URL 可能指向不存在的位置
- **建議**：確認 `Astro.site` 在 build 時的實際值，並驗證 og:image 可正常訪問；待正式域名切換後，統一將 `site` 改為 `https://noblerise.com.tw/noblerise01/` 或移除 `base`

### A-2 ★★★ BaseHead.astro 與 Head.astro 共存造成 SEO 信號分裂
- **問題**：`src/components/BaseHead.astro` 與 `src/components/Head.astro` 並存，主要頁面用 Head.astro，但可能遺留頁面或 layouts 仍用 BaseHead（無主題、無 og:locale、無 hreflang）
- **建議**：
  1. 確認所有頁面均使用 `Head.astro`
  2. 若 `BaseHead.astro` 已無用，直接刪除；若 `src/layouts/BlogPost.astro` 仍引用則一併廢棄或合併

### A-3 ★★☆ 文章 JSON-LD 缺少 `inLanguage`
- **問題**：`src/pages/[...slug].astro`（第 33–47 行）的 Article JSON-LD 未含 `inLanguage: "zh-TW"`，搜尋引擎無法確認文章語言
- **建議**：在 jsonLd 物件加入 `"inLanguage": "zh-TW"`

### A-4 ★★☆ Blog 索引頁與分類頁缺少 BreadcrumbList JSON-LD
- **問題**：`src/pages/blog/index.astro` 與 `src/pages/blog/[category]/index.astro` 均無 BreadcrumbList 結構化資料，Google 無法在搜尋結果展示麵包屑
- **建議**：在各頁面的 jsonLd 中加入：
  ```ts
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "首頁", "item": CONTACT.siteUrl },
      { "@type": "ListItem", "position": 2, "name": "知識文章", "item": `${CONTACT.siteUrl}/blog/` }
    ]
  }
  ```

### A-5 ★★☆ 策略夥伴頁 JSON-LD 缺少成員照片 URL
- **問題**：`src/pages/about/策略夥伴/index.astro`（第 17–20 行）Person 物件只有 `name` 與 `jobTitle`，缺少 `image` 屬性，Google People Card 無法顯示照片
- **建議**：為每位夥伴補充 `"image": "${CONTACT.siteUrl}/images/partner-xxx.jpg"`

### A-6 ★☆☆ 聯絡頁 JSON-LD 缺少電話欄位
- **問題**：`src/pages/contact/index.astro`（第 8–26 行）Organization 物件未含 `telephone`，影響本地商業搜尋結果
- **建議**：待確認實際電話號碼後，在 siteConfig.ts 加入 `phone` 欄位，並同步至 contact 頁 JSON-LD

### A-7 ★☆☆ 圖片未使用 Astro Image 元件最佳化
- **問題**：全站所有 `<img>` 均為裸 HTML 標籤，未透過 `astro:assets` 的 `Image` 元件，無 WebP 轉換、無 srcset、無 LCP 優化，PageSpeed 圖片分數偏低
- **建議**：選擇性將重要 LCP 圖片（首頁 hero、張惠芳照、服務頁首圖）改用 `<Image>`；其餘靜態小圖維持現狀以避免大量改動

---

## B. 設計改善

### B-1 ★★★ global.css 仍有多處硬編碼色彩
- **問題**：以下色彩未使用 CSS 變數：
  - `src/styles/global.css`：`.btn-line` 的 `#06c755`（LINE 綠）、`.footer-line-id` 的 `#66b966`、`.media-list a` 的 `#0000ff`（純藍外部連結色）
  - `src/components/BlogList.astro`（第 96 行）：`.tax-tag` 的 `#f0f4ee`，僅適用 classic 主題，premium 主題偏色
- **建議**：
  1. 在兩份 theme CSS 補充：
     ```css
     --color-line:         #06c755;
     --color-link-ext:     var(--color-primary);
     ```
  2. global.css 改為：
     ```css
     .btn-line { background: var(--color-line); }
     .footer-line-id { color: var(--color-accent); }
     .media-list a { color: var(--color-link-ext); }
     ```
  3. BlogList.astro 第 96 行：`background: var(--color-accent-pale);`

### B-2 ★★☆ 公司名稱樣式重複在聯絡頁與頁尾
- **問題**：`contact/index.astro`（第 89–93 行）與 `Footer.astro`（第 15–16 行）均以內聯 style 實作「兩行文字 justify 對齊」的公司名稱，邏輯完全相同但各自撰寫
- **建議**：建立 `src/components/CompanyName.astro`，在 contact 與 footer 引入，並在 global.css 定義 `.company-name`、`.company-name-zh`、`.company-name-en` 樣式

### B-3 ★★☆ PageHero stats 在手機版可能溢出
- **問題**：`src/components/PageHero.astro` 的 `.page-hero-stats`（若頁面有傳 stats）使用 flex row 排列，`@media (max-width: 900px)` 只縮減 gap，未設 `flex-wrap` 或 `flex-direction: column`，小螢幕三欄可能溢出
- **建議**：
  ```css
  .page-hero-stats { flex-wrap: wrap; }
  @media (max-width: 600px) {
    .page-hero-stats { flex-direction: column; gap: 1.5rem; }
  }
  ```

### B-4 ★★☆ 服務頁圖片未定義 aspect-ratio，各圖尺寸不統一
- **問題**：`src/pages/service/index.astro`（第 40–93 行）服務卡片圖片標示 494×398，六步驟圖未標尺寸，首頁服務項目圖為 405-424×294-329，三組圖片比例不一致，無 CSS aspect-ratio 保護
- **建議**：在 global.css 為 `.service-img-card` 加入 `aspect-ratio: 494 / 398`，六步驟圖容器加入 `aspect-ratio: 16 / 9`，確保圖片載入前版面不跳動

### B-5 ★☆☆ 測試向頭像使用圓形，與策略夥伴照片視覺語言不統一
- **問題**：`global.css` 的 `.testimonial-avatar` 套用 `border-radius: 50%`（圓形），策略夥伴、AuthorCard 照片為矩形，視覺語言不一致
- **建議**：此為設計規格確認問題，建議向設計師確認頭像一致規範後統一處理；目前 `.testimonial-avatar` 圓形是刻意設計，可暫時維持

---

## C. 程式碼低效

### C-1 ★★★ BlogList.astro categories 陣列與 data/categories.ts 重複定義
- **問題**：`src/components/BlogList.astro`（第 25–33 行）手動建立與 `src/data/categories.ts` 完全對應的分類陣列（多一個「全部文章」項目）。新增分類需同時更新兩處
- **建議**：在 `src/data/categories.ts` 加入工廠函式：
  ```ts
  export function getCategoryNavItems(base: string) {
    return [
      { slug: '', label: '全部文章', url: base + 'blog/' },
      ...categorySlugs.map(slug => ({
        slug,
        label: categoryLabels[slug],
        url: base + `blog/${slug}/`,
      })),
    ];
  }
  ```
  BlogList.astro 改為：
  ```ts
  import { getCategoryNavItems } from '../data/categories';
  const categories = getCategoryNavItems(base);
  ```

### C-2 ★★★ 遺留元件未清理（BlogPost.astro、FormattedDate.astro、HeaderLink.astro）
- **問題**：
  - `src/layouts/BlogPost.astro`：已被 `[...slug].astro` 取代，但仍佔用空間且容易混淆
  - `src/components/FormattedDate.astro`：只被 BlogPost 引用，使用英文 `en-us` 日期格式，與主站中文格式不一致
  - `src/components/HeaderLink.astro`：若未在任何頁面引用，為遺留死碼
- **建議**：確認無引用後，刪除這三個遺留檔案；日期格式化邏輯集中至 `src/utils/date.ts`

### C-3 ★★☆ BlogList.astro 作者名稱硬編碼
- **問題**：`src/components/BlogList.astro`（第 55 行）直接寫 `<span>張惠芳 CFP®</span>`，未從 `src/data/author.ts` 引入
- **建議**：
  ```ts
  import { author } from '../data/author';
  // ...
  <span>{author.name}</span>
  ```

### C-4 ★★☆ JSON-LD 工廠函式未擴充，各頁面仍手寫結構化資料
- **問題**：`src/utils/jsonld.ts` 目前僅匯出 `publisher` 常數，各頁面（blog/index、[category]/index、[...slug]、contact、about）的 JSON-LD 物件仍手動構建，`@context`、`inLanguage` 等欄位重複且易漏填
- **建議**：擴充 `src/utils/jsonld.ts`，加入：
  ```ts
  export function createBlogJsonLD(name: string, description: string, url: string) { ... }
  export function createArticleJsonLD(title, description, date, canonicalUrl, image?) { ... }
  export function createCollectionPageJsonLD(label, category, posts) { ... }
  ```

### C-5 ★★☆ transformPost 未提供缺少圖片的備用值
- **問題**：`src/utils/post.ts`（第 36 行）`image: post.data.image` 可能為 undefined，BlogList 與 [...slug] 需各自處理 undefined，分散了防禦邏輯
- **建議**：在 `src/utils/post.ts` 定義預設圖，統一在 transformPost 內處理：
  ```ts
  const DEFAULT_IMAGE = 'images/og-default.jpg';
  // ...
  image: post.data.image ?? DEFAULT_IMAGE,
  ```

### C-6 ★★☆ Head.astro og:image 未使用 getAssetPath，與其他地方不一致
- **問題**：`src/components/Head.astro`（第 13 行）用 `new URL(image, Astro.site)` 產生絕對圖片 URL，而其他頁面用 `getAssetPath`，兩套邏輯並存
- **建議**：在 `src/utils/assets.ts` 補充：
  ```ts
  export function getAbsoluteImageUrl(imagePath: string, base: string, site: URL): string {
    return new URL(getAssetPath(imagePath, base), site).href;
  }
  ```
  Head.astro 改用此函式

### C-7 ★☆☆ SakuraRain 動畫使用 setTimeout，低效能裝置可能卡頓
- **問題**：`src/components/SakuraRain.astro` 的 JavaScript 同時啟動 12 個 setTimeout，並用 setInterval 持續產生花瓣，未考慮 `prefers-reduced-motion` 媒體查詢，也未使用 requestAnimationFrame
- **建議**：
  1. 在元件頂端加入 `prefers-reduced-motion` 檢查，若使用者設定減少動畫則完全不渲染
  2. 改用 requestAnimationFrame 控制花瓣間隔

### C-8 ★☆☆ 未啟用 Astro ViewTransitions 跨頁過渡動畫
- **問題**：全站頁面切換無過渡效果，UX 略顯生硬；Astro v5+ 內建 `<ViewTransitions />` 可一行啟用
- **建議**：評估是否對現有動畫（SakuraRain、CSS transition）有衝突，若無則在 Head.astro 加入：
  ```astro
  import { ViewTransitions } from 'astro:transitions';
  // 在 <head> 內：
  <ViewTransitions />
  ```

---

## 優先順序摘要

### 🚨 DNS 切換前必須完成（遷移連貫性）

| 緊急度 | 項目 | 後果（若未處理）|
|--------|------|----------------|
| 🔴 緊急 | M-1 robots.txt 切換計劃 | 新站被 Google 完全停止爬取，排名歸零 |
| 🔴 緊急 | M-2 Sitemap 檔名相容性 | 新頁面索引延誤數週 |
| 🟠 重要 | M-3 JSON-LD 改回 BlogPosting | 文章 rich results 短暫中斷 |
| 🟠 重要 | M-4 日期加時區 +08:00 | 文章新鮮度信號偏差 |
| 🟡 建議 | M-5 GSC 重新驗證計劃 | 無法追蹤排名變化 |
| 🟡 建議 | M-6 og:image 路徑確認 | 社群分享預覽圖破圖 |

### 一般改善項目

| 優先度 | 項目 | 預計影響 |
|--------|------|---------|
| ★★★ 高 | A-1 og:image URL 確認 | 修正 OG 預覽圖錯誤，社群分享立即可見 |
| ★★★ 高 | A-2 BaseHead/Head 統一 | 消除 SEO 信號分裂 |
| ★★★ 高 | B-1 硬編碼色彩轉 CSS 變數 | 主題切換完整性 |
| ★★★ 高 | C-1 BlogList categories 由 data/categories 產生 | 消除分類定義重複 |
| ★★★ 高 | C-2 刪除遺留元件 | 清理死碼，降低維護混淆 |
| ★★☆ 中 | A-3 文章 JSON-LD 加 inLanguage | SEO 語言明確化 |
| ★★☆ 中 | A-4 BreadcrumbList JSON-LD | Google 搜尋麵包屑展示 |
| ★★☆ 中 | A-5 策略夥伴照片加入 JSON-LD | 強化 Person 結構化資料 |
| ★★☆ 中 | B-2 CompanyName 元件化 | 消除 contact/footer 重複樣式 |
| ★★☆ 中 | B-3 PageHero stats 手機版 flex-wrap | 修正小螢幕溢出風險 |
| ★★☆ 中 | B-4 服務頁 aspect-ratio | 防止圖片載入時版面跳動 |
| ★★☆ 中 | C-3 BlogList 作者名稱改由 author.ts 提供 | 維護單一來源 |
| ★★☆ 中 | C-4 擴充 JSON-LD 工廠函式 | 減少手寫結構化資料 |
| ★★☆ 中 | C-5 transformPost 缺失圖片備用值 | 防禦性程式設計 |
| ★★☆ 中 | C-6 Head.astro og:image 使用 getAssetPath | 統一圖片路徑邏輯 |
| ★☆☆ 低 | A-6 聯絡頁加電話欄位 | 本地 SEO 強化 |
| ★☆☆ 低 | A-7 重要圖片改用 Astro Image 元件 | PageSpeed 圖片分數 |
| ★☆☆ 低 | B-5 頭像視覺語言一致性 | 設計規格確認後再處理 |
| ★☆☆ 低 | C-7 SakuraRain 效能優化 | 低效能裝置流暢度 |
| ★☆☆ 低 | C-8 啟用 ViewTransitions | UX 過渡效果 |
