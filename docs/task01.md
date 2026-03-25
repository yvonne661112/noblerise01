# task01.md — WordPress → Astro 遷移任務紀錄

## 任務目標

將舊有 WordPress 網站（noblerise.com.tw）完整重建為 Astro v6 靜態網站，部署至 GitHub Pages，並維持 SEO 排名不中斷。

## 完成狀態：✅ 完成

---

## 執行摘要

### 已完成項目

| 類別 | 內容 |
|------|------|
| 架構遷移 | Astro v6 靜態輸出、Content Collections、GitHub Pages 部署 |
| 頁面遷移 | 6 頁靜態頁面（首頁、關於、策略夥伴、服務、部落格、聯絡）|
| 文章遷移 | 34 篇 Markdown 文章，numericSlug 保留原 URL 結構 |
| 分類系統 | 6 個分類頁面（投資、保險、證照、財務、信託、傳承）|
| 主題系統 | CSS 變數雙主題（classic / premium），一行切換 |
| SEO 基礎 | canonical、og、hreflang、JSON-LD、sitemap |
| 元件重用 | PageHero、SectionHeader、ContentCard、TagBadge |

### 遺留問題（task02 處理）

- DNS 尚未切換：目前仍部署於 `yvonne661112.github.io/noblerise01/`
- robots.txt 維持 `Disallow: /`（正式切換前禁止爬蟲）
- GSC sitemap 需在切換後重新提交

---

## 重要技術決策

### URL 結構保留
文章使用 `numericSlug`（如 `/123/`）與舊 WordPress 完全相同，避免 Google 重新索引成本。

### Base Path 處理
`astro.config.mjs` 設 `base: '/noblerise01/'`，所有內部路徑透過 `import.meta.env.BASE_URL` 動態處理；切換正式網域時只需更新 `base` 與 `site`。

### Markdown 圖片修正
自訂 `remarkFixImageBase` plugin，修正 Markdown 內嵌圖片路徑的 base path 問題。
