# Process.md — TODO 第二輪執行記錄

> 對應 TODO.md 第二輪（含遷移連貫性 M 批次）
> 此檔用於中斷後重啟的續接依據

---

## 批次總覽

| 批次 | 說明 | 狀態 |
|------|------|------|
| Batch 1 | M 遷移連貫性（M-1~M-4、A-3） | ✅ 完成 |
| Batch 2 | SEO 改善（A-1/C-6、A-2/C-2、A-4、A-5） | ✅ 完成 |
| Batch 3 | 設計改善（B-1~B-4） | ✅ 完成 |
| Batch 4 | 程式碼低效（C-1、C-3、C-4、C-5） | ⏳ 待處理 |

**略過項目**（需外部資料或低風險高成本）：
- A-6（聯絡頁電話：需取得實際號碼）
- A-7（Astro Image 元件：改動範圍大，留待 task02 後評估）
- B-5（頭像視覺語言：需設計師確認）
- C-7（SakuraRain 效能：低優先度）
- C-8（ViewTransitions：需測試相容性）
- M-5（GSC 重新驗證：文件記錄，無程式碼改動）

---

## Batch 1：遷移連貫性（M-1 ~ M-4、A-3）

| 子項 | 說明 | 步驟狀態 |
|------|------|---------|
| M-1 | robots.txt 加入 DNS 切換 SOP 說明 | ✅ |
| M-2 | Head.astro sitemap link 加入 base path；記錄 sitemap 檔名差異 | ✅ |
| M-3 | `[...slug].astro` JSON-LD `@type` 改為 `BlogPosting` | ✅ |
| M-4 | `[...slug].astro` datePublished/dateModified 加入 +08:00 時區 | ✅ |
| A-3 | `[...slug].astro` JSON-LD 加入 `inLanguage: "zh-TW"` | ✅ |

### 修改目標檔案
- `public/robots.txt`
- `src/components/Head.astro`（第 29 行 sitemap link）
- `src/pages/[...slug].astro`（jsonLd 物件）

---

## Batch 2：SEO 改善

| 子項 | 說明 | 步驟狀態 |
|------|------|---------|
| A-1/C-6 | Head.astro og:image 加入 base path（`getAssetPath`） | ✅ |
| A-2/C-2 | 刪除遺留元件：BaseHead.astro、BlogPost.astro、FormattedDate.astro、HeaderLink.astro | ✅ |
| A-4 | blog/index.astro 與 [category]/index.astro 加入 BreadcrumbList JSON-LD | ✅ |
| A-5 | 策略夥伴頁 JSON-LD Person 物件加入 image URL | ✅ |

---

## Batch 3：設計改善

| 子項 | 說明 | 步驟狀態 |
|------|------|---------|
| B-1 | 硬編碼色彩轉 CSS 變數（global.css、BlogList.astro、theme 檔） | ✅ |
| B-2 | 建立 CompanyName.astro 元件，取代 contact/footer 的內聯 style | ✅ |
| B-3 | PageHero.astro stats 加入 flex-wrap，小螢幕堆疊 | ✅ |
| B-4 | service/index.astro 服務卡片加入 aspect-ratio | ✅ |

---

## Batch 4：程式碼低效

| 子項 | 說明 | 步驟狀態 |
|------|------|---------|
| C-1 | data/categories.ts 加入 getCategoryNavItems()；BlogList.astro 使用 | ⏳ |
| C-3 | BlogList.astro 作者名稱改由 author.ts 提供 | ⏳ |
| C-4 | 擴充 src/utils/jsonld.ts 工廠函式，重構 blog/index 與 [category]/index | ⏳ |
| C-5 | src/utils/post.ts transformPost 加入缺失圖片備用值 | ⏳ |

---

## Commit 計劃
- Commit 1：Batch 1（遷移連貫性 M+A-3）
- Commit 2：Batch 2（SEO 改善）
- Commit 3：Batch 3（設計改善）
- Commit 4：Batch 4（程式碼低效）
