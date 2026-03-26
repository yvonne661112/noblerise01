# plan_website_test.md — 網站健康度驗測計畫

> 目標：在不依賴外部服務的前提下，使用本機工具對目前開發成果進行系統性驗測，找出重大問題。

---

## 一、測試範疇

| 層面 | 測試項目 |
|------|----------|
| 建置 | `npm run build` 是否零錯誤、零警告 |
| 連結有效性 | 全站內部連結、文章連結、分類頁連結是否回傳 200 |
| 頁面快照 | 6 個靜態頁面 + 抽樣文章頁的視覺截圖 |
| SEO 標籤 | `<title>`、canonical、og:url、hreflang、JSON-LD |
| 導覽列 | 每頁的 active 狀態是否正確 |
| 圖片 | 所有 `<img>` src 是否可存取、無 broken image |
| 行動裝置 | 375px 寬度下各頁面是否正常顯示 |
| robots.txt | 確認 `Disallow: /` 仍存在（DNS 切換前禁止開放） |

---

## 二、使用工具與理由

### 工具 1：`npm run build`（Astro CLI）

**用途**：靜態建置，找出 TypeScript 型別錯誤、import 路徑錯誤、frontmatter 格式錯誤、Content Collections schema 違規。

```bash
npm run build 2>&1 | tee /tmp/build_log.txt
grep -E "error|warning" /tmp/build_log.txt
```

**預期**：`dist/` 目錄完整產生，stdout 零 `error`。

---

### 工具 2：`npm run dev` + `curl`（HTTP 狀態碼批次檢查）

**用途**：逐一對所有已知 URL 發 GET 請求，確認 HTTP 回應碼為 200。

#### 已知 URL 清單（base = `http://localhost:4321/noblerise01`）

| 類型 | 路徑 |
|------|------|
| 靜態頁面（6） | `/` `/about/` `/about/策略夥伴/` `/service/` `/blog/` `/contact/` |
| 分類頁面（6） | `/blog/investment/` `/blog/insurance/` `/blog/certification/` `/blog/business-planning/` `/blog/elderly-care-trust/` `/blog/tax-planning/` |
| 文章頁（34） | `/1/` `/2/` … 由 frontmatter `numericSlug` 決定，需先從原始碼取得清單 |
| 系統檔案 | `/sitemap-index.xml` `/sitemap-0.xml` `/robots.txt` |

#### 取得所有文章 slug

```bash
grep -r "numericSlug:" src/content/ | \
  sed 's/.*numericSlug: //' | sort -n
```

#### 批次 curl 檢查

```bash
BASE="http://localhost:4321/noblerise01"
PAGES="/ /about/ /about/策略夥伴/ /service/ /blog/ /contact/
       /blog/investment/ /blog/insurance/ /blog/certification/
       /blog/business-planning/ /blog/elderly-care-trust/ /blog/tax-planning/
       /sitemap-index.xml /robots.txt"

for path in $PAGES; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "${BASE}${path}")
  echo "$code  $path"
done
```

**判斷標準**：全部應為 `200`。若出現 `404`，代表路由設定或 slug 有問題。

---

### 工具 3：Chrome Headless 截圖（視覺驗測）

**用途**：對每個關鍵頁面產生全頁截圖，人工目視確認版面、圖片、字型是否正常。

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
BASE="http://localhost:4321/noblerise01"
OUT="/tmp/snapshots"
mkdir -p $OUT

pages=(
  "index:/"
  "about:/about/"
  "partner:/about/策略夥伴/"
  "service:/service/"
  "blog:/blog/"
  "contact:/contact/"
  "blog-invest:/blog/investment/"
  "article-1:/1/"
)

for entry in "${pages[@]}"; do
  name="${entry%%:*}"
  path="${entry##*:}"
  "$CHROME" --headless --disable-gpu \
    --screenshot="$OUT/${name}_desktop.png" \
    --window-size=1440,900 "${BASE}${path}" 2>/dev/null
  "$CHROME" --headless --disable-gpu \
    --screenshot="$OUT/${name}_mobile.png" \
    --window-size=375,812 "${BASE}${path}" 2>/dev/null
  echo "截圖完成：$name"
done
```

**人工目視確認**：
- [ ] 首頁 Hero、SakuraRain 特效顯示正常
- [ ] 導覽列 logo 與選單項目完整
- [ ] 各頁 Hero 區塊標題與副標題顯示
- [ ] 文章頁排版、作者資訊、breadcrumb
- [ ] 行動版漢堡選單存在（375px）
- [ ] 頁尾三欄資訊完整

---

### 工具 4：`curl` + `grep` 抽查 SEO 標籤

**用途**：不開瀏覽器直接從 HTML 原始碼確認關鍵 SEO 標籤內容。

```bash
BASE="http://localhost:4321/noblerise01"

check_seo() {
  local url="$1"
  echo "=== $url ==="
  html=$(curl -s "${BASE}${url}")

  echo "[title]"
  echo "$html" | grep -o '<title>[^<]*</title>'

  echo "[canonical]"
  echo "$html" | grep -o '<link rel="canonical"[^>]*>'

  echo "[og:url]"
  echo "$html" | grep -o '<meta property="og:url"[^>]*>'

  echo "[h1]"
  echo "$html" | grep -o '<h1[^>]*>[^<]*</h1>'

  echo "[robots meta]"
  echo "$html" | grep -o '<meta name="robots"[^>]*>'
  echo ""
}

check_seo "/"
check_seo "/about/"
check_seo "/blog/"
check_seo "/contact/"
check_seo "/1/"
```

**確認重點**：
- `canonical` URL 必須動態產生（含 base path），不可硬編碼
- `robots` meta 是否為 `noindex`（DNS 切換前應為 noindex）
- 每頁 `<h1>` 只出現一次

---

### 工具 5：HTML 連結萃取 + 批次驗證

**用途**：從首頁 HTML 抽取所有 `<a href>` 內部連結，自動化驗測是否全部 200。

```bash
BASE="http://localhost:4321/noblerise01"

# 從首頁萃取所有內部連結
curl -s "${BASE}/" | \
  grep -oE 'href="(/noblerise01[^"]*)"' | \
  sed 's/href="//;s/"//' | \
  sort -u | \
while read path; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:4321${path}")
  echo "$code  $path"
done
```

---

### 工具 6：JSON-LD 結構化資料驗測

**用途**：抓取頁面的 JSON-LD 並確認其格式正確、欄位齊全。

```bash
BASE="http://localhost:4321/noblerise01"

extract_jsonld() {
  local url="$1"
  echo "=== JSON-LD: $url ==="
  curl -s "${BASE}${url}" | \
    grep -o '<script type="application/ld+json">[^<]*</script>' | \
    sed 's/<[^>]*>//g' | \
    python3 -m json.tool 2>/dev/null || echo "[ERROR] 無效 JSON"
  echo ""
}

extract_jsonld "/"
extract_jsonld "/blog/"
extract_jsonld "/1/"
```

---

### 工具 7：robots.txt 確認

```bash
curl -s http://localhost:4321/noblerise01/robots.txt
```

**預期輸出必須包含**：
```
User-agent: *
Disallow: /
```

---

## 三、執行順序建議

```
步驟 1  npm run build          → 確認零錯誤後才繼續
步驟 2  npm run dev（背景執行）→ 啟動本機伺服器
步驟 3  批次 curl 連結檢查     → 找出 404
步驟 4  HTML 連結萃取驗測      → 補抓動態連結
步驟 5  SEO 標籤抽查           → 確認 canonical、h1
步驟 6  JSON-LD 驗測           → 確認結構化資料
步驟 7  robots.txt 確認        → 確保 Disallow: /
步驟 8  Chrome 截圖（桌機）    → 視覺目視 6 頁 + 抽樣文章
步驟 9  Chrome 截圖（手機）    → 行動版 375px
步驟 10 pkill astro dev        → 關閉伺服器
```

---

## 四、重大問題判定標準

| 嚴重度 | 條件 | 處置 |
|--------|------|------|
| **P0 阻斷** | `npm run build` 失敗、任何頁面 404、canonical 硬編碼 | 立即修復，不得 push |
| **P1 重要** | 圖片 broken、`<h1>` 重複或缺失、JSON-LD 格式錯誤 | 本輪修復 |
| **P2 一般** | 行動版排版錯位、字型未載入、SEO meta 內容不完整 | 列入 TODO |
| **P3 輕微** | 視覺細節、間距不一致、非關鍵文字截斷 | 低優先記錄 |

---

## 五、已知略過事項

以下項目因外部條件限制，測試時不列入失敗判斷：

- `robots.txt` 為 `Disallow: /`（DNS 切換前刻意設定）
- `og:image` 指向 `yvonne661112.github.io` 而非 `noblerise.com.tw`（task02 後修正）
- 聯絡頁電話欄位空白（A-6，待取得號碼）

---

*建立日期：2026-03-26*
