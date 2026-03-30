# 諾昇理財規劃顧問 — 官方網站

**諾昇理財規劃顧問股份有限公司**的官方網站，由 CFP® 張惠芳領軍，提供獨立、中立、以客戶利益優先的財務規劃服務。

- 線上網址：[https://yvonne661112.github.io/noblerise01/](https://yvonne661112.github.io/noblerise01/)
- 目標網域：[https://noblerise.com.tw/](https://noblerise.com.tw/)（DNS 切換留待 task02）
- 對標舊站：[https://noblerise.com.tw/](https://noblerise.com.tw/)（WordPress 版本，視覺與內容參考基準）

> 任務進度與文件索引請見 [docs/INDEX.md](./docs/INDEX.md)

---

## 技術架構

| 項目 | 說明 |
|------|------|
| 框架 | [Astro v6](https://astro.build/)（靜態輸出） |
| Node.js | `>=22.12.0` |
| 輸出模式 | Static（`dist/` 目錄，無 SSR） |
| 文章格式 | Markdown（Content Collections） |
| 整合套件 | `@astrojs/mdx`、`@astrojs/sitemap` |
| 語言 | TypeScript + Astro 元件語法 |
| 樣式 | 純 CSS（CSS 變數主題系統，無 CSS 框架） |

### 主題系統

網站採用可切換的多主題設計，目前啟用 **classic**：

| 主題 | 說明 | 主色 |
|------|------|------|
| `classic` ★ | 清雅綠色風格（目前啟用） | `#0d383a` |
| `premium` | 深翠精緻風格 | `#014045` |
| `prestige` | 深藍銅金風格 | `#1a2744` |
| `premium-dark` | 深色模式 | `#2d9daa` |
| `kawazu` | 河津桜色系 | `#3B2442` |
| `kintsugi` | 金繼黃金修復風格 | `#2C2420` |
| `noble` | 高雅信賴，深邃藍灰×溫潤金 | `#1B3A4B` |

切換方式：修改 `src/data/siteConfig.ts` 的 `activeTheme` 一行，SEO 標籤不受影響。

### 設計理念

- **CSS 變數驅動**：所有色彩、字型均以 `var(--...)` 定義，主題切換零衝突
- **語意化 HTML**：使用正確的 `<header>`、`<nav>`、`<main>`、`<footer>` 結構
- **SEO 優先**：canonical 動態產生、完整 OG / Twitter Card、JSON-LD 結構化資料、sitemap 自動生成
- **效能優先**：靜態輸出、懶載入、CLS 防護
- **可重用元件**：`PageHero`、`SectionHeader`、`ContentCard`、`TagBadge` 等共用元件

### 自訂 Remark Plugin

`remarkFixImageBase`（定義於 `astro.config.mjs`）：將 Markdown 文章內嵌圖片路徑（如 `/images/foo.jpg`）自動補上 base path（`/noblerise01/images/foo.jpg`），解決 GitHub Pages 子路徑部署時圖片 404 的問題。

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

- **34 篇** Markdown 文章，存放於 `src/content/blog/`
- 動態路由：`src/pages/[...slug].astro`，透過 `numericSlug` frontmatter 產生數字 URL（如 `/123/`）
- 6 個分類頁面（動態路由 `src/pages/blog/[category]/index.astro`）：投資理財、保險權益、證照進修、財務規劃、信託規劃、傳承稅務

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

推送至 `main` 分支即自動觸發：

```bash
git push github main
```

> **Git Remote 說明**：本專案設有兩個 remote。`github` 指向 GitHub 遠端（自動部署觸發點），`origin` 指向本機 bare repo（本地備份用）。部署時請使用 `git push github main`。

GitHub Actions 工作流程（`.github/workflows/deploy.yml`）：

1. Checkout 程式碼
2. 安裝 Node.js 22 + `npm ci`
3. 執行 `npm run build` 產生 `dist/`
4. 複製 `sitemap-index.xml` → `sitemap_index.xml`（確保舊 GSC 底線版相容）
5. 部署至 GitHub Pages

### Base Path 設定

部署在 `github.io/noblerise01/` 子路徑，`astro.config.mjs` 設定：

```js
site: 'https://noblerise.com.tw',
base: '/noblerise01/',
trailingSlash: 'always',
```

所有內部連結與圖片路徑透過 `import.meta.env.BASE_URL` 動態處理。切換正式網域時，更新 `site` 與 `base` 即可。

---

## 儲存庫結構

```
src/
├── components/
│   ├── Head.astro          # SEO 標籤 + 主題 CSS 動態載入
│   ├── Header.astro        # 導覽列（active 狀態偵測）
│   ├── Footer.astro        # 頁尾
│   ├── PageHero.astro      # 各頁面 Hero 區塊
│   ├── SectionHeader.astro # 各節標題 + 裝飾線
│   ├── ContentCard.astro   # 通用內容卡片
│   ├── TagBadge.astro      # 標籤徽章
│   ├── BlogList.astro      # 文章列表
│   ├── AuthorCard.astro    # 作者資訊卡
│   ├── CompanyName.astro   # 公司名稱（中英文格式）
│   └── SakuraRain.astro    # 櫻花飄落特效
├── content/blog/           # Markdown 文章（34 篇）
├── data/
│   ├── siteConfig.ts       # 全站設定（主題、功能開關、聯絡資訊）
│   ├── categories.ts       # 分類 slug 與標籤對照
│   └── author.ts           # 作者固定資料
├── pages/
│   ├── index.astro
│   ├── about/
│   ├── service/
│   ├── blog/
│   │   ├── index.astro
│   │   └── [category]/index.astro
│   ├── contact/
│   └── [...slug].astro     # 文章動態路由
├── content.config.ts       # Content Collections 型別設定
├── styles/
│   └── global.css          # 全域樣式（CSS 變數）
└── utils/
    ├── assets.ts            # 圖片路徑工具
    ├── jsonld.ts            # JSON-LD 結構化資料工廠函式
    └── post.ts              # 文章排序、資料轉換
public/
├── favicon.ico / favicon.svg
├── robots.txt              # 爬蟲封鎖（DNS 切換前維持 Disallow: /）
├── images/                 # 靜態圖片
└── styles/
    ├── theme-classic.css
    ├── theme-premium.css
    ├── theme-prestige.css
    ├── theme-premium-dark.css
    ├── theme-kawazu.css
    ├── theme-kintsugi.css
    └── theme-noble.css
.github/workflows/
└── deploy.yml              # GitHub Actions 部署設定
docs/
├── INDEX.md                # 任務文件索引與進度總覽
├── TODO.md                 # 待辦事項（字型改善、DNS 切換等）
├── DONE.md                 # 已完成項目存檔
├── task01.md               # WordPress → Astro 遷移紀錄
├── task02.md               # DNS 切換與正式上線計畫
└── Process.md              # 執行批次記錄
```

---

## 功能開關

```ts
// src/data/siteConfig.ts
export const SHOW_BOOKING = false;  // 預約諮詢功能
export const SHOW_CTA     = false;  // 全站 CTA 區塊（LINE 預約諮詢）
export const SHOW_SAKURA  = false;  // 櫻花飄落特效
```

---

## 注意事項

- `robots.txt` 目前維持 `Disallow: /`，DNS 切換至正式網域前請勿變更
- 不可在 `public/CNAME` 手動加入自訂網域（由 GitHub Pages 管理）
- 詳細操作規範請見 [CLAUDE.md](./CLAUDE.md)
