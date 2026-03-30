---
name: dns-switch
description: 諾昇理財網站 DNS 切換 SOP — 將網站從 GitHub Pages 子路徑切換至正式網域 noblerise.com.tw，確保 SEO 排名不中斷。執行當天依步驟操作。
user-invocable: true
---

# dns-switch — DNS 切換與正式上線 SOP

將網站從 `https://yvonne661112.github.io/noblerise01/` 切換至 `https://noblerise.com.tw/`。

**執行前提**：確認網站已通過 `/health-check` 驗測，無 P0/P1 問題。

Arguments: `$ARGUMENTS`

---

## 已建立的 SEO 保護機制（切換前確認）

| 項目 | 狀態 | 說明 |
|------|------|------|
| URL 連貫性 | ✅ | 文章 numericSlug 與舊 WordPress 完全一致 |
| JSON-LD 對齊 | ✅ | BlogPosting、日期 +08:00、inLanguage、BreadcrumbList |
| Sitemap 連貫性 | ✅ | deploy.yml 自動同時產生 `sitemap-index.xml` 與 `sitemap_index.xml` |
| canonical 動態產生 | ✅ | `new URL(pathname, site)`，不硬編碼 |
| hreflang / og:locale | ✅ | `zh-TW` / `zh_TW` 已設定 |
| robots.txt | ✅ | `Disallow: /` 封鎖中（切換當天才開放） |

---

## 步驟一：DNS 設定

1. 登入 Cloudflare（或 DNS 服務商）
2. 將 `noblerise.com.tw` 的 A/CNAME 指向 GitHub Pages IP
3. 在 GitHub repo **Settings → Pages → Custom domain** 填入 `noblerise.com.tw`
4. 等待 HTTPS 憑證自動核發（通常 10–30 分鐘）

> ⚠️ 憑證核發完成、瀏覽器無警告後，才繼續後續步驟。

---

## 步驟二：確認網站可正常載入

```bash
curl -I https://noblerise.com.tw/
# 預期：HTTP/2 200，無憑證警告
```

---

## 步驟三：更新 robots.txt

修改 `public/robots.txt`：

```
# 將此行：
Disallow: /

# 改為：
Allow: /

# 同時取消 Sitemap 注解：
Sitemap: https://noblerise.com.tw/sitemap-index.xml
```

---

## 步驟四：更新 astro.config.mjs

```js
// 修改 base：
const BASE = '/';   // 從 '/noblerise01/' 改為 '/'
```

> ⚠️ base 改變後，所有內部路徑（圖片、連結）需重新 build 才能生效。

---

## 步驟五：build 驗證

```bash
npm run build
```

確認無錯誤再繼續。

---

## 步驟六：推送並部署

```bash
git add public/robots.txt astro.config.mjs
git commit -m "chore: DNS 切換 — 開放爬蟲、更新 base path"
git push github main
```

等待 GitHub Actions 部署完成（約 2–3 分鐘）。

---

## 步驟七：Google Search Console

1. 驗證 `https://noblerise.com.tw/` 的所有權
2. 提交 sitemap：`https://noblerise.com.tw/sitemap-index.xml`
3. 若舊 GSC 有 `sitemap_index.xml`（底線版），可保留（兩個都有效）

---

## 注意事項

| 項目 | 說明 |
|------|------|
| base path 變更 | `astro.config.mjs` 的 `base` 從 `/noblerise01/` 改為 `/` 後，Markdown 內部連結 remark 插件也會對應調整 |
| CNAME 衝突 | 不可在 `public/CNAME` 手動寫入（讓 GitHub Pages 自動管理） |
| 憑證等待 | HTTPS 憑證核發需時，憑證未就緒前不要開放爬蟲 |
| GSC 重新驗證 | 舊 GSC 驗證針對舊網域，切換後需重新驗證 |
| og:image | base 改為 `/` 後，`og:image` URL 需確認正確指向 `noblerise.com.tw` |
