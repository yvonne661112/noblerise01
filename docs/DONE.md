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

## [review] 全站程式碼檢視（R-01 ~ R-21）

> 完成日期：2026-03-26
> 來源：全面檢視網站程式碼、設計、建置設定

### 高優先（R-01 ~ R-10）

| 編號 | 類別 | 修復內容 | 狀態 |
|------|------|----------|------|
| R-01 | SEO | JSON-LD image 欄位條件式輸出，無圖時省略欄位 | ✅ 完成 |
| R-02 | 樣式 | 新增 `--color-on-primary` CSS 變數，取代 global.css / PageHero / BlogList 中硬編碼 `#fff` | ✅ 完成 |
| R-03 | 樣式 | 四個頁面 inline style 抽出為 CSS class（utility + 語意 class） | ✅ 完成 |
| R-04 | 無障礙 | 全域加入 `:focus-visible` 焦點樣式（使用 `--color-accent` 環） | ✅ 完成 |
| R-05 | 安全 | 首頁外部連結補 `noreferrer` | ✅ 完成 |
| R-06 | 無障礙 | 策略夥伴頁 SVG 補 `aria-hidden="true"` | ✅ 完成 |
| R-07 | 內容 | 部落格摘要改用 CSS `-webkit-line-clamp` 截斷，避免斷詞 | ✅ 完成 |
| R-08 | 建置 | 移除未使用的 `@astrojs/rss` 依賴 | ✅ 完成 |
| R-09 | 無障礙 | Premium-Dark `--color-text-mid` 提升至 `#8fbfc3`（符合 WCAG AA） | ✅ 完成 |
| R-10 | 樣式 | SakuraRain 花瓣改用 `--sakura-mid` / `--sakura-deep` 主題變數 | ✅ 完成 |

### 中優先（R-11 ~ R-18）

| 編號 | 類別 | 修復內容 | 狀態 |
|------|------|----------|------|
| R-11 | 響應式 | 統一斷點：contact layout 從 768px 改為 900px | ✅ 完成 |
| R-12 | 無障礙 | 聯絡表單加入 placeholder、LINE ID 加 aria-describedby | ✅ 完成 |
| R-13 | 效能 | 服務頁圖片移除固定 aspect-ratio，依賴原始比例自適應 | ✅ 完成 |
| R-14 | 效能 | 文章封面圖改為 `loading="lazy"` | ✅ 完成 |
| R-15 | 效能 | 文章封面圖加入 `sizes` 屬性 | ✅ 完成 |
| R-16 | 語意 | 確認所有頁面已有 `<main>` 元素（無需修改） | ✅ 已符合 |
| R-17 | SEO | Head.astro 加入 `<meta name="robots" content="noindex, nofollow">` | ✅ 完成 |
| R-18 | 響應式 | Google Maps iframe 改用 aspect-ratio 容器，移除固定 height | ✅ 完成 |

### 低優先（R-19 ~ R-21）

| 編號 | 類別 | 修復內容 | 狀態 |
|------|------|----------|------|
| R-19 | 效能 | preconnect crossorigin 改為 `crossorigin="anonymous"` | ✅ 完成 |
| R-20 | 樣式 | sub-menu box-shadow 改用 `--card-shadow` 主題變數 | ✅ 完成 |
| R-21 | 內容 | 首頁服務圖片 alt 改為實際服務名稱 | ✅ 完成 |

---

## [design-audit] 全站設計審查三階段（2026-03-27）

> 來源：2026-03-27 全站設計審查
> 分三階段執行：Phase 1（基礎架構）→ Phase 2（視覺提升）→ Phase 3（進階體驗）

### Phase 1：基礎架構修正 ✅ 完成（2026-03-27）

> 不影響現有視覺，解決維護性與一致性問題

| 編號 | 類別 | 項目 | 狀態 |
|------|------|------|------|
| P1-01 | 架構 | 建立共用 Layout 元件 `BaseLayout.astro` | ✅ 完成 — 8 個頁面全部改用 |
| P1-02 | 架構 | 策略夥伴頁改用 PageHero | ✅ 完成 — 刪除 `.sp-hero` 自訂 Hero，改用 PageHero + stats |
| P1-03 | 主題 | 策略夥伴頁清理硬編碼色值 | ✅ 完成 — `rgba(151,150,96,...)` 全部改為 `var(--color-*)` |
| P1-04 | 主題 | 策略夥伴頁 tag 背景硬編碼 | ✅ 完成 — `#F0F3F7` → `var(--color-bg-subtle)` |
| P1-05 | 主題 | Footer 硬編碼 rgba 色值 | ✅ 完成 — Footer.astro + global.css 全部改用 `var(--color-text-muted)` |
| P1-06 | 無障礙 | SakuraRain 加 prefers-reduced-motion | ✅ 完成 — 加入 `@media (prefers-reduced-motion: reduce)` |
| P1-07 | 效能 | 手機導覽改用 transform | ✅ 完成 — `right: -300px` → `transform: translateX(100%)` |
| P1-08 | 設計 | 修正 Font size 變數語義 | ✅ 完成 — `--fs-xl` 從 18px 調為 20px |

### Phase 2：視覺提升 ✅ 完成（2026-03-27）

> 核心視覺改造，提升訪客情感共鳴與轉換

| 編號 | 類別 | 項目 | 狀態 |
|------|------|------|------|
| P2-01 | 首頁 | 重構 storytelling 敘事流 | ✅ 完成 — 加入 empathy block（共鳴問句），重新排序為：共鳴→價值→信任→服務→見證→媒體→文章→CTA |
| P2-02 | 首頁 | 客戶見證區升級 | ✅ 完成 — 大引號裝飾(72px)、avatar 放大至 72px + 邊框、拆分 name/role |
| P2-03 | 首頁 | 媒體影片區加播放按鈕 overlay | ✅ 完成 — SVG play button + hover scale 動畫 |
| P2-04 | 服務 | 六大服務卡圖片佔比 | ✅ 完成 — 從固定 200px 改為 `clamp(180px, 25%, 280px)` |
| P2-05 | 聯絡 | Contact 頁底部加 CTA 區塊 | ✅ 完成 — 加入 section-primary CTA（30分鐘免費諮詢） |
| P2-06 | 全站 | 加「回到頂部」浮動按鈕 | ✅ 完成 — BaseLayout.astro 加入固定按鈕，scroll > 400px 顯示 |
| P2-07 | 導覽 | Header active 狀態增強 | ✅ 完成 — 加入 `::after` 底線指示器（accent 色 2px） |

### Phase 3：進階體驗 ✅ 完成（2026-03-27）

> 錦上添花，提升互動感與精緻度

| 編號 | 類別 | 項目 | 狀態 |
|------|------|------|------|
| P3-01 | 動畫 | 頁面滾動淡入動畫 | ✅ 完成 — `ScrollReveal.astro` 元件 + Intersection Observer，首頁 6 個區塊加入 `.reveal` |
| P3-02 | 關於 | 獲獎區改為 timeline 設計 | ✅ 完成 — 垂直線 + dot + card，照片整合進 card 內，加入 reveal 動畫 |
| P3-03 | 首頁 | 數字區 count-up 動畫 | ✅ 完成 — `data-count` + easeOutCubic 動畫，1.2s 持續時間 |

---

## [theme] 主題審查改善（T-01 ~ T-05，2026-03-27）

> 來源：2026-03-27 全主題審查（7 個主題逐一比對）

| 編號 | 類別 | 修復內容 | 狀態 |
|------|------|----------|------|
| T-01 | 高 | Header 背景 `rgba(254,254,254,0.95)` 硬編碼 → `color-mix(in srgb, var(--color-white) 95%, transparent)`，修正 premium-dark 導覽文字不可見問題 | ✅ 完成 |
| T-02 | 中 | 表單 focus 陰影 `rgba(198,146,58,0.12)` → `color-mix(in srgb, var(--color-accent) 12%, transparent)`，各主題 focus 色自動匹配 | ✅ 完成 |
| T-03 | 中 | kawazu、prestige、premium-dark 補 `--color-line: #06c755` | ✅ 完成 |
| T-04 | 低 | prestige、premium-dark 補 `--color-line-light: #66b966` | ✅ 完成 |
| T-05 | 低 | kawazu、prestige、premium-dark 補 `--color-link`（各主題使用對應 accent 色） | ✅ 完成 |

---

## [article-redesign] 文章排版全面升級（2026-03-27）

| 項目 | 狀態 |
|------|------|
| 文章 CSS 重寫 — h2/h3/h4/h5/h6 視覺層級、行高 2.2→1.9、strong 主色突顯 | ✅ 完成 |
| 列表樣式 — 品牌色圓點（ul）、粉色圓底數字（ol） | ✅ 完成 |
| Blockquote 大引號裝飾、HR 漸層短線、Table 樣式 | ✅ 完成 |
| 文章模板 — 閱讀時間估算、分類徽章 badge、Meta 上下邊線 | ✅ 完成 |
| 前/後一篇導覽 — 依分類 + 時間序，?cat= 傳遞 context | ✅ 完成 |
| Footer 樣式統一 — 清除舊版死碼，global.css 單一管理 3 欄 grid | ✅ 完成 |

---

## [seo] SEO / E-E-A-T 結構化資料改善（2026-03-27）

> 來源：`docs/seo_改良建議.md` × 現況比對
> YMYL 領域強化專業信任度（E-E-A-T）與結構化資料

### 結構化資料（Schema Markup）

| 編號 | 項目 | 狀態 |
|------|------|------|
| S-01 | 首頁 Organization → FinancialService，加入 areaServed、serviceType、founder | ✅ 完成 |
| S-02 | 首頁客戶見證加 Review Schema（3 則） | ✅ 完成 |
| S-03 | 關於頁 Person Schema 補完（sameAs、image、award、url、description） | ✅ 完成 |
| S-04 | BlogPosting author 加 url 連結至 /about/ | ✅ 完成 |
| S-05 | 服務頁加 Service Schema（6 大服務） | ✅ 完成 |
| S-06 | 聯絡頁 Organization → LocalBusiness，加入 geo、openingHours | ✅ 完成 |

### E-E-A-T 強化

| 編號 | 項目 | 狀態 |
|------|------|------|
| S-07 | AuthorCard 加「了解更多」連結至 /about/ | ✅ 完成 |
| S-08 | BlogPosting 加 keywords（由 frontmatter tags 帶入） | ✅ 完成 |
| S-09 | BlogPosting 加 articleSection（由主要分類帶入） | ✅ 完成 |

### 已達成 / 無需處理

| 建議項目 | 現狀 |
|----------|------|
| Meta Title / Description 優化 | ✅ 6 個頁面均已設定，品質良好 |
| Open Graph / Twitter Card | ✅ Head.astro 完整實作 |
| 作者標註（BlogPosting author） | ✅ 已有 Person JSON-LD + AuthorCard |
| Google 地圖嵌入 | ✅ 聯絡頁已嵌入 iframe |
| robots noindex | ⏸ DNS 切換前須維持，已列於 task02 |

---

## [session-2026-03-28] 視覺設計修改（Telegram 指令批次）

> 完成日期：2026-03-28
> 來源：Telegram chat_id 8747758312 指令批次

| 項目 | 說明 | 狀態 |
|------|------|------|
| 首頁 FPAT Podcast 連結文字 | 改為「投資不是賺更多，是規劃更好-優雅轉身CFP®張惠芳」 | ✅ 完成 |
| 首頁客戶見證區塊 | 移除英文 eyebrow「Testimonials」；名字與職稱移至照片旁 | ✅ 完成 |
| 首頁首席顧問圖片外框 | 移除白色外框（section-subtle → section，解決 JPEG 白角問題） | ✅ 完成 |
| 首頁 Header logo 放大 | logo 60→88px、導覽文字 16→20px、header 高度 80→108px | ✅ 完成（兩輪調整） |
| 聯絡我們 QR code 移除 | 移除 LINE QR code 圖片，文字放大（--fs-body→--fs-xl），icon 與文字對齊 | ✅ 完成 |
| 首頁 Hero 文案與底色 | 文案改「諾昇理財規劃成為您人生的底氣」、移除英文 eyebrow、底色改企業主色（深綠） | ✅ 完成 |
| 首頁 Hero 標題換行調整 | 分三行：「諾昇理財規劃 / 成為您人生的底氣 / 陪您走向財務幸福」 | ✅ 完成 |
| 首頁客戶見證文案更新 | 三則見證全部換新文案，字體放大（--fs-base→--fs-body），底色改 #014045 | ✅ 完成 |
| 首頁服務項目卡片 | 移除黑色說明 `<p>` 文字，只保留圖片與綠色 h3 標題 | ✅ 完成 |
| Stats bar 尺寸優化 | 數字 clamp(28→36px,40→52px)、標籤 --fs-sm→--fs-body、間距 4→12px | ✅ 完成 |
| Stats bar CFP® 改圖 | CFP® 文字換為 CFP logo 圖片（cfp-logo.png） | ✅ 完成 |
| Stats bar label 對齊 | 加 `.stat-cfp-wrap` wrapper（min-height: 65px），四個 label 統一底部對齊 | ✅ 完成 |
| Stats bar CFP label 更名 | 「國際認證理財規劃顧問」→「國際認證高級理財規劃顧問」 | ✅ 完成 |
| 首頁疑問區塊 | 三個問題各自換行，移除英文 eyebrow「The Challenge」，文案更新 | ✅ 完成 |
| 首頁 empathy 回答文案 | 「不是保險公司」加逗號，改為兩行顯示 | ✅ 完成 |
| 首頁理財新知數量 | 只顯示最新三則（slice(0,6)→slice(0,3)） | ✅ 完成 |
| 首頁服務卡片改 SVG icon | 六張插圖換為內嵌 SVG icon，品牌色（淡綠底 + 深綠圖），hover 反白效果 | ✅ 完成 |
| 頁尾 logo 放大 | footer-logo.jpg 130→180px | ✅ 完成 |
| 頁尾文字改微軟黑體粗體 | footer-desc / footer-section-title / footer-nav-list / footer-contact-list 改 Microsoft JhengHei 700，字級 15→16px | ✅ 完成 |
| 關於諾昇頁文字加粗放大 | about-mission +bold +20px；advisor-bio +bold +18px；detail-list li +bold +17px | ✅ 完成 |
| 服務項目六大服務改版 | service-detail-card（圖文橫排）→ service-icon-card（SVG icon + 綠色標題 + 黑色說明） | ✅ 完成 |

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
