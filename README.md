# 諾昇理財規劃顧問 — 官方網站

**諾昇理財規劃顧問股份有限公司**的官方網站，由 CFP® 張惠芳領軍，提供獨立、中立、以客戶利益優先的財務規劃服務。

線上網址：[https://yvonne661112.github.io/noblerise01/](https://yvonne661112.github.io/noblerise01/)
目標網域：[https://noblerise.com.tw/](https://noblerise.com.tw/)（DNS 切換留待 task02）

---

## 技術架構

| 項目 | 說明 |
|------|------|
| 框架 | [Astro v6](https://astro.build/)（靜態輸出） |
| 輸出模式 | Static（`dist/` 目錄，無 SSR） |
| 文章格式 | Markdown（Content Collections） |
| 整合套件 | `@astrojs/mdx`、`@astrojs/sitemap` |
| 語言 | TypeScript + Astro 元件語法 |
| 樣式 | 純 CSS（CSS 變數主題系統，無 CSS 框架） |

### 主題系統

網站採用可切換的雙主題設計：

- `theme-classic.css` — 清雅風格（主色 `#0d383a`）
- `theme-premium.css` — 精緻深色風格（主色 `#014045`）

切換方式：修改 `src/data/siteConfig.ts` 的 `activeTheme` 一行即可，SEO 標籤不受影響。

### 設計理念

- **CSS 變數驅動**：所有色彩、字型均以 `var(--...)` 定義，避免硬編碼，主題切換零衝突
- **語意化 HTML**：使用正確的 `<header>`、`<nav>`、`<main>`、`<footer>` 標籤結構
- **SEO 優先**：canonical URL 動態產生、完整 Open Graph / Twitter Card、JSON-LD 結構化資料、sitemap 自動生成
- **效能優先**：靜態輸出無 JavaScript 執行負擔，圖片加上 `width`/`height` 防止 CLS，懶載入非關鍵圖片
- **可重用元件**：`PageHero`、`SectionHeader`、`ContentCard`、`TagBadge` 等共用元件保持一致性

---

## 網站結構

### 頁面（6 頁）

| 頁面 | URL |
|------|-----|
| 首頁 | `/` |
| 關於諾昇 | `/about/` |
| 策略夥伴 | `/about/策略夥伴/` |
| 服務項目 | `/service/` |
| 理財新知 | `/blog/` |
| 聯繫我們 | `/contact/` |

### 文章系統

- 34 篇 Markdown 文章，存放於 `src/content/blog/`
- 動態路由：`src/pages/[...slug].astro`，透過 `numericSlug` frontmatter 產生數字 URL（如 `/123/`）
- 6 個分類頁面：投資理財、保險權益、證照進修、財務規劃、信託規劃、傳承稅務

---

## 本機開發

```bash
# 安裝相依套件
npm install

# 啟動開發伺服器（http://localhost:4321/noblerise01/）
npm run dev

# 建置靜態檔案（輸出至 dist/）
npm run build

# 預覽建置結果
npm run preview
```

---

## 部署流程

本專案透過 **GitHub Actions** 自動部署至 **GitHub Pages**。

### 自動部署（推薦）

推送至 `main` 分支即自動觸發：

```
git push github main
```

GitHub Actions 工作流程（`.github/workflows/deploy.yml`）：

1. Checkout 程式碼
2. 安裝 Node.js 22 + `npm ci`
3. 執行 `npm run build` 產生 `dist/`
4. 上傳 `dist/` 為 Pages artifact
5. 部署至 GitHub Pages

### 手動觸發

在 GitHub 儲存庫的 **Actions** 頁面，選擇 `Deploy Astro to GitHub Pages` → `Run workflow`。

### Base Path 設定

由於部署在 `github.io/noblerise01/` 子路徑，`astro.config.mjs` 設定：

```js
base: '/noblerise01/',
site: 'https://noblerise.com.tw',
trailingSlash: 'always',
```

所有內部連結與圖片路徑均透過 `import.meta.env.BASE_URL` 動態處理，切換正式網域時僅需更新 `site` 與 `base`。

---

## 儲存庫結構

```
src/
├── components/        # 可重用 Astro 元件
│   ├── Head.astro     # SEO 標籤 + 主題 CSS 動態載入
│   ├── Header.astro   # 導覽列
│   ├── Footer.astro   # 頁尾
│   ├── PageHero.astro # Hero 區塊
│   └── ...
├── content/blog/      # Markdown 文章（34 篇）
├── data/
│   └── siteConfig.ts  # 全站設定（主題、功能開關、聯絡資訊）
├── pages/             # 路由頁面
└── styles/
    └── global.css     # 全域樣式（CSS 變數）
public/
├── images/            # 靜態圖片
└── styles/
    ├── theme-classic.css
    └── theme-premium.css
.github/workflows/
└── deploy.yml         # GitHub Actions 部署設定
```
