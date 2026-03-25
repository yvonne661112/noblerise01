# docs/ — 任務文件索引

> 本目錄存放所有任務文件、執行紀錄與待辦清單。
> 專案操作規範請見根目錄的 [`CLAUDE.md`](../CLAUDE.md)。

---

## 文件清單

| 檔案 | 用途 | 建立日期 | 狀態 |
|------|------|----------|------|
| [INDEX.md](./INDEX.md) | 本文件：目錄索引、進度總覽、注意事項 | 2026-03-26 | 持續更新 |
| [task01.md](./task01.md) | WordPress → Astro 遷移任務紀錄 | 2026-03-26 | ✅ 完成 |
| [task02.md](./task02.md) | DNS 切換與正式上線計畫、SEO 保護機制 | 2026-03-26 | ⏳ 待執行 |
| [TODO.md](./TODO.md) | 第二輪改善項目清單（SEO、設計、程式碼） | 2026-03-25 | ✅ 全部完成（2026-03-26）|
| [Process.md](./Process.md) | 第二輪 TODO 執行批次紀錄（中斷重啟依據） | 2026-03-26 | ✅ 全部完成（2026-03-26）|

---

## 整體執行進度

| 階段 | 內容 | 開始日期 | 完成日期 | 狀態 |
|------|------|----------|----------|------|
| task01 | WordPress → Astro 完整遷移 | 2026-03-23 | 2026-03-24 | ✅ 完成 |
| 第一輪 TODO | 高／中／低優先度改善（SEO、設計、元件重構） | 2026-03-25 | 2026-03-25 | ✅ 完成 |
| 第二輪 TODO Batch 1 | 遷移連貫性（M-1~M-4、A-3） | 2026-03-26 | 2026-03-26 | ✅ 完成 |
| 第二輪 TODO Batch 2 | SEO 改善（A-1/C-6、A-2/C-2、A-4、A-5） | 2026-03-26 | 2026-03-26 | ✅ 完成 |
| 第二輪 TODO Batch 3 | 設計改善（B-1~B-4） | 2026-03-26 | 2026-03-26 | ✅ 完成 |
| 第二輪 TODO Batch 4 | 程式碼低效（C-1、C-3、C-4、C-5） | 2026-03-26 | 2026-03-26 | ✅ 完成 |
| task02 | DNS 切換、robots.txt 開放、GSC 重新提交 | — | — | ⏳ 待執行 |

---

## 遇到的問題與解法

| 問題 | 原因 | 解法 |
|------|------|------|
| Build 錯誤：`Cannot access 'base' before initialization` | `Head.astro` 中 `base` 變數在宣告前被使用 | 調整宣告順序，`const base` 移至 `absoluteImageUrl` 之前 |
| `og:image` URL 在 GitHub Pages 上錯誤 | `new URL(image, Astro.site)` 未含 base path | 改用 `getAssetPath(image, base)` 後再傳入 `new URL()` |
| sitemap 檔名不符（連字號 vs 底線） | `@astrojs/sitemap` 固定輸出 `sitemap-index.xml`，舊 GSC 登錄為 `sitemap_index.xml` | `deploy.yml` 加入 `cp` 指令，每次部署自動產生底線版本 |
| Import 放在 frontmatter 中間導致語法錯誤 | 手動編輯時誤將 import 插入非頂端位置 | 將所有 import 移至 frontmatter 最上方 |

---

## 注意事項

### DNS 切換前必須維持
- `robots.txt` 的 `Disallow: /` **不可提前移除**（防止 Google 索引暫存網域）
- **不可**在 `public/CNAME` 加入自訂網域（讓 GitHub Pages 管理）

### 略過項目（需外部資源）
- **A-6**：聯絡頁電話欄位（需取得實際電話號碼後補入）
- **A-7**：Astro Image 元件最佳化（改動範圍大，留待評估）
- **B-5**：頭像視覺語言統一（需設計師確認方向）
- **C-7**：SakuraRain 效能最佳化（低優先度）
- **C-8**：ViewTransitions 相容性測試（需完整測試後再啟用）
- **M-5**：GSC 重新驗證（DNS 切換後執行，無程式碼改動）
