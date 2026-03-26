# TODO — 諾昇理財網站待辦事項

---

## [review] 全站程式碼檢視結果（2026-03-26）

> 來源：全面檢視網站程式碼、設計、建置設定
> 分類：SEO / 無障礙 / 樣式 / 效能 / 程式碼品質

### 高優先

| 編號 | 類別 | 問題 | 影響檔案 | 說明 |
|------|------|------|----------|------|
| R-01 | SEO | JSON-LD image 欄位可能為 undefined | `src/pages/[...slug].astro` | 文章無圖時 `image` 為 undefined，JSON.stringify 會產生 null，違反 Schema.org 規範。應條件式省略此欄位 |
| R-02 | 樣式 | global.css 及元件中硬編碼 `#fff` | `global.css`（行 102, 158, 181-183, 308, 322, 327-328）、`PageHero.astro`（行 39, 81, 90, 102, 115） | 違反主題系統規範，Premium-Dark 主題下文字顏色會出錯。應改用 CSS 變數 |
| R-03 | 樣式 | 頁面大量使用 inline style | `index.astro`（~29 處）、`contact/index.astro`（~13 處）、`about/index.astro`（~11 處）、`service/index.astro`（~18 處） | 不可維護、無法重用、增加 HTML 體積。應抽出為 CSS class |
| R-04 | 無障礙 | 互動元素缺少 `:focus-visible` 樣式 | `global.css`、各主題 CSS | 鍵盤導航時無可見焦點指示，影響無障礙合規 |
| R-05 | 安全 | 外部連結缺少 `noreferrer` | `src/pages/index.astro`（行 179-196） | 目前只有 `noopener nofollow`，應加上 `noreferrer` 防止 referrer 資訊洩漏 |
| R-06 | 無障礙 | SVG 圖示缺少 aria 屬性 | `src/pages/about/策略夥伴/index.astro`（行 68-71） | 星形 SVG 缺少 `aria-hidden="true"` 或 `role="img" aria-label` |
| R-07 | 內容 | 部落格卡片摘要截斷可能斷詞 | `src/components/BlogList.astro`（行 56） | `.slice(0, 60)` 硬截斷，可能切在詞中間。應改用 CSS `text-overflow` 或斷詞友善的截斷邏輯 |
| R-08 | 建置 | 未使用的 `@astrojs/rss` 依賴 | `package.json` | 已安裝但從未匯入使用，應移除以減少依賴 |
| R-09 | 無障礙 | Premium-Dark 主題色彩對比不足 | `theme-premium-dark.css`（行 32） | `--color-text-mid: #6fa0a4` 在深色背景上對比度約 2.8:1，WCAG AA 要求 4.5:1 |
| R-10 | 樣式 | SakuraRain 花瓣顏色硬編碼粉紅 | `src/components/SakuraRain.astro`（行 21） | 花瓣漸層色 `#ffb7c5` / `#e8799a` 不跟隨主題，在 Classic 綠色主題下視覺衝突 |

### 中優先

| 編號 | 類別 | 問題 | 影響檔案 | 說明 |
|------|------|------|----------|------|
| R-11 | 響應式 | 斷點使用不一致 | `global.css` | 混用 600px / 768px / 900px 三組斷點，grid 在平板尺寸缺少適配 |
| R-12 | 無障礙 | 聯絡表單缺少 placeholder 與 aria-describedby | `src/pages/contact/index.astro`（行 47-77） | 必填欄位無提示文字，LINE ID 欄位可能讓使用者困惑 |
| R-13 | 效能 | 服務頁圖片固定尺寸不響應 | `src/pages/service/index.astro`（行 43-59） | 圖片有固定 width/height，手機端 grid 變單欄但圖片尺寸不變。應改用 CSS aspect-ratio |
| R-14 | 效能 | 文章封面圖使用 eager loading | `src/pages/[...slug].astro`（行 83） | 封面圖不在首屏，應改為 `loading="lazy"` |
| R-15 | 效能 | 文章封面圖缺少 srcset/sizes | `src/pages/[...slug].astro`（行 83） | 固定 800x450 無響應式圖片，應加 `sizes` 屬性 |
| R-16 | 語意 | 部分頁面缺少 `<main>` 元素 | `about/index.astro`、`service/index.astro` | 應以 `<main>` 包裹主要內容，提升語意結構與無障礙 |
| R-17 | SEO | 缺少 `<meta name="robots">` 標籤 | `src/components/Head.astro` | 建議明確設定 robots meta 標籤 |
| R-18 | 響應式 | Google Maps iframe 高度固定 | `src/pages/contact/index.astro`（行 127-136） | `height="360"` 在手機端比例不佳，應改用 aspect-ratio 容器 |

### 低優先

| 編號 | 類別 | 問題 | 影響檔案 | 說明 |
|------|------|------|----------|------|
| R-19 | 效能 | Google Fonts preconnect 缺少明確 crossorigin | `src/components/Head.astro`（行 46） | `crossorigin` 應改為 `crossorigin="anonymous"` |
| R-20 | 樣式 | box-shadow 硬編碼 rgba | `global.css`（行 81, 431） | 陰影色應為主題變數，方便主題切換 |
| R-21 | 內容 | 首頁服務圖片 alt 描述過於通用 | `src/pages/index.astro`（行 139-145） | `alt="財務規劃服務項目 1"` 應改為實際服務名稱，如「收支管理與財務盤點」 |

---

## [deferred] 延後處理項目

> 來源：第二輪改善清單略過項目，需外部資源或條件未到

| 項目 | 說明 | 條件 |
|------|------|------|
| A-6 聯絡頁加電話欄位 | siteConfig 加 phone，補入 JSON-LD | 需取得實際電話號碼 |
| A-7 重要圖片改用 Astro Image | LCP 圖片改用 `<Image>` 元件，提升 PageSpeed | 改動範圍大，留待評估 |
| B-5 頭像視覺語言統一 | testimonial 圓形與策略夥伴矩形不一致 | 需設計師確認規範 |
| C-7 SakuraRain 效能優化 | 改用 requestAnimationFrame + prefers-reduced-motion | 低優先，低效能裝置才有感 |
| C-8 ViewTransitions 跨頁動畫 | `<ViewTransitions />` 一行啟用 | 需先確認與 SakuraRain 等動畫無衝突 |

---

## [task02] DNS 切換待辦

> 詳見 `docs/task02.md`

| 步驟 | 說明 |
|------|------|
| 1 | `public/robots.txt` 改為允許爬蟲索引 |
| 2 | sitemap URL 確認指向正式網域 |
| 3 | DNS 切換，確認部署完成 |
| 4 | M-5：Google Search Console 重新驗證與提交 sitemap |

---

## [typography] 字型與字體大小改善（擱置）

> 來源：2026-03-26 字型審查
> 影響檔案：`src/styles/global.css`、`public/styles/theme-classic.css`
> **狀態：已擱置，待條件成熟再處理**

### 問題一：字型比例尺（scale）命名混亂、有重複值【高】

**現狀（`global.css` :root）**

| token | 值 | 問題 |
|-------|----|------|
| `--fs-xs` | 12px | 與 `--fs-sm` 相同，重複 |
| `--fs-sm` | 12px | 與 `--fs-xs` 相同，重複 |
| `--fs-base` | 14px | 中文內文偏小 |
| `--fs-md` | 16px | 數值小於 `--fs-body`，命名順序錯誤 |
| `--fs-lg` | 17px | 數值小於 `--fs-body`，命名順序錯誤 |
| `--fs-body` | 18px | 語意 token 混入比例尺，且與 `--fs-xl` 相同 |
| `--fs-xl` | 18px | 與 `--fs-body` 相同，重複 |
| `--fs-2xl` | 22px | 正常 |
| `--fs-3xl` | 24px | 正常 |

**改善方案**

```css
--fs-xs:   11px;   /* 極小標籤 */
--fs-sm:   13px;   /* meta、tag、麵包屑 */
--fs-base: 15px;   /* 次要內文、表單、卡片說明（中文建議不低於 15px）*/
--fs-md:   16px;   /* 一般強調、摘要 */
--fs-lg:   17px;   /* 小標、footer 標題 */
--fs-xl:   18px;   /* 導覽列、標準內文（合併 --fs-body 至此）*/
--fs-2xl:  22px;   /* 卡片標題、列表標題 */
--fs-3xl:  26px;   /* 次級標題（略放大）*/
/* 移除 --fs-body，全域替換為 --fs-xl（約 8 處）*/
```

### 問題二：`.post-content` 行高過大【高】

**現狀**：`line-height: 2.5`（文章內文）
中文閱讀建議 1.8～2.0，2.5 行距過鬆，段落結構不清晰。

```css
.post-content { line-height: 1.95; }  /* 2.5 → 1.95 */
```

### 問題三：卡片說明、文章摘要 14px 偏小【中】

受影響：`.card-body p`、`.blog-card-excerpt`、`.partner-title`、`.form-group input`
→ 隨問題一將 `--fs-base` 調為 15px 後自動解決。

### 問題四：Classic 主題無中文字型【低】

`theme-classic.css` 使用純拉丁字型（Montserrat / Poppins），中文 fallback 至系統字型，顯示不一致。

```css
/* theme-classic.css */
--font-heading: 'Montserrat', 'Noto Serif TC', serif;
--font-body:    'Poppins', 'Open Sans', 'Noto Sans TC', sans-serif;
```

> 目前 `activeTheme = 'kawazu'`，切換至 Classic 前再處理亦可。

### 問題五：聯絡頁 inline `line-height:2.2`【低】

`src/pages/contact/index.astro` 有 inline `line-height:2.2`，應改為 CSS class 管理。

---

## 注意事項

- `robots.txt` 的 `Disallow: /` **DNS 切換前不可移除**
- **不可**在 `public/CNAME` 加入自訂網域（留待 task02）
