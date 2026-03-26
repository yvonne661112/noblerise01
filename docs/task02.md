# task02.md — DNS 切換與正式上線計畫

## 任務目標

將網站從 GitHub Pages 子路徑切換至正式網域 `https://noblerise.com.tw/`，並確保 SEO 排名不中斷。

## 完成狀態：⏳ 待執行

---

## 已建立的 SEO 保護機制

### 1. URL 連貫性
- 文章 URL 維持數字 slug（`/123/`），與舊 WordPress 完全一致，Google 索引不中斷

### 2. JSON-LD 結構化資料對齊
- 文章 `@type` 改回 `BlogPosting`（與舊站一致）
- 日期格式加入 `+08:00` 時區（與舊站一致）
- 加入 `inLanguage: "zh-TW"`
- 各頁面加入 BreadcrumbList
- 策略夥伴 Person 加入 image URL

### 3. Sitemap 連貫性
- `deploy.yml` 自動複製 `sitemap_index.xml`（底線版本），確保舊 GSC 登錄不失效
- `robots.txt` 已預埋 sitemap 指向（切換時取消注解即可）
- 說明：`@astrojs/sitemap` 固定輸出連字號版，deploy.yml 的 cp 指令補齊底線版

### 4. SEO 標籤正確性
- canonical 動態產生（`new URL(pathname, site)`），不硬編碼
- `og:image` 修正 base path，確保圖片 URL 正確
- hreflang `zh-TW` 已設定
- `og:locale` `zh_TW` 已設定

### 5. 爬蟲封鎖（上線前保護）
- 目前 `robots.txt` 維持 `Disallow: /`，防止 Google 在正式切換前索引錯誤網域

---

## DNS 切換 SOP（執行當天）

### 步驟一：DNS 設定
1. 至 Cloudflare（或 DNS 服務商）將 `noblerise.com.tw` 的 A/CNAME 指向 GitHub Pages IP
2. 在 GitHub repo Settings → Pages → Custom domain 填入 `noblerise.com.tw`
3. 等待 HTTPS 憑證自動核發（通常 10–30 分鐘）

### 步驟二：確認網站正常
- 確認 `https://noblerise.com.tw/` 可正常載入
- 確認 HTTPS 憑證有效（瀏覽器無警告）

### 步驟三：更新 robots.txt
修改 `public/robots.txt`：
```
# 將此行：
Disallow: /

# 改為（或直接刪除，預設即允許）：
Allow: /
```
同時取消 Sitemap 行的注解：
```
Sitemap: https://noblerise.com.tw/sitemap-index.xml
```

### 步驟四：更新 astro.config.mjs
```js
base: '/',   // 從 '/noblerise01/' 改為 '/'
```

### 步驟五：推送並部署
```bash
git add public/robots.txt astro.config.mjs
git commit -m "chore: DNS 切換 — 開放爬蟲、更新 base path"
git push github main
```

### 步驟六：Google Search Console
1. 驗證 `https://noblerise.com.tw/` 的所有權
2. 提交 sitemap：`https://noblerise.com.tw/sitemap-index.xml`
3. 若舊 GSC 有 `sitemap_index.xml`（底線），可保留或重新提交（兩個都有效）

---

## 注意事項

| 項目 | 說明 |
|------|------|
| base path 變更 | `astro.config.mjs` 的 `base` 從 `/noblerise01/` 改為 `/` 後需重新 build |
| CNAME 衝突 | 不可在 `public/CNAME` 手動寫入（讓 GitHub Pages 自動管理） |
| 憑證等待 | HTTPS 憑證核發需時，不要在憑證未就緒前開放爬蟲 |
| GSC 重新驗證 | 舊 GSC 驗證是針對舊網域，切換後需重新驗證 |
