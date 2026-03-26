# TODO — 諾昇理財網站待辦事項

---

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
