---
name: health-check
description: 對諾昇理財網站進行系統性健康度驗測，包含 build、連結有效性、SEO 標籤、JSON-LD、截圖、robots.txt。適合在重大改版或上線前執行。
user-invocable: true
---

# health-check — 網站健康度驗測

系統性驗測網站狀態，依照以下 10 步驟順序執行。

Arguments: `$ARGUMENTS`（無參數則執行完整驗測）

---

## 執行順序

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
步驟 10 停止 dev server
```

---

## 步驟 1：Build 驗證

```bash
npm run build 2>&1 | tee /tmp/build_log.txt
grep -E "error|warning" /tmp/build_log.txt
```

**判斷標準**：零 `error`。有錯誤立即停止，修復後重新執行。

---

## 步驟 2：啟動本機伺服器

```bash
npm run dev &
sleep 3  # 等待伺服器就緒
```

BASE = `http://localhost:4321/noblerise01`

---

## 步驟 3：批次 curl 連結檢查

```bash
BASE="http://localhost:4321/noblerise01"

# 取得所有文章 slug
SLUGS=$(grep -r "numericSlug:" src/content/ | sed 's/.*numericSlug: "//' | sed 's/".*//' | sort -n)

PAGES="/ /about/ /service/ /blog/ /contact/
       /blog/investment/ /blog/insurance/ /blog/certification/
       /blog/business-planning/ /blog/elderly-care-trust/ /blog/tax-planning/
       /sitemap-index.xml /robots.txt"

echo "=== 靜態頁面 ==="
for path in $PAGES; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "${BASE}${path}")
  [[ "$code" != "200" ]] && echo "❌ $code  $path" || echo "✅ $code  $path"
done

echo "=== 文章頁 ==="
for slug in $SLUGS; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "${BASE}/${slug}/")
  [[ "$code" != "200" ]] && echo "❌ $code  /${slug}/" || echo "✅ $code  /${slug}/"
done
```

---

## 步驟 4：HTML 連結萃取驗測

```bash
BASE="http://localhost:4321/noblerise01"

curl -s "${BASE}/" | \
  grep -oE 'href="(/noblerise01[^"]*)"' | \
  sed 's/href="//;s/"//' | \
  sort -u | \
while read path; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:4321${path}")
  [[ "$code" != "200" ]] && echo "❌ $code  $path"
done
```

---

## 步驟 5：SEO 標籤抽查

```bash
BASE="http://localhost:4321/noblerise01"

check_seo() {
  local url="$1"
  echo "=== $url ==="
  html=$(curl -s "${BASE}${url}")
  echo "[title]"      && echo "$html" | grep -o '<title>[^<]*</title>'
  echo "[canonical]"  && echo "$html" | grep -o '<link rel="canonical"[^>]*>'
  echo "[og:url]"     && echo "$html" | grep -o '<meta property="og:url"[^>]*>'
  echo "[h1]"         && echo "$html" | grep -o '<h1[^>]*>[^<]*</h1>'
  echo "[robots]"     && echo "$html" | grep -o '<meta name="robots"[^>]*>'
  echo ""
}

check_seo "/"
check_seo "/about/"
check_seo "/blog/"
check_seo "/contact/"
check_seo "/1/"
```

**確認重點**：
- `canonical` 動態產生，不可硬編碼
- DNS 切換前 `robots` meta 應為 `noindex`
- 每頁 `<h1>` 只出現一次

---

## 步驟 6：JSON-LD 驗測

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

## 步驟 7：robots.txt 確認

```bash
curl -s http://localhost:4321/noblerise01/robots.txt
```

**DNS 切換前必須包含**：
```
User-agent: *
Disallow: /
```

---

## 步驟 8 & 9：Chrome 截圖（桌機 + 手機）

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
BASE="http://localhost:4321/noblerise01"
OUT="/tmp/snapshots"
mkdir -p $OUT

pages=("index:/" "about:/about/" "service:/service/" "blog:/blog/" "contact:/contact/" "article-1:/1/")

for entry in "${pages[@]}"; do
  name="${entry%%:*}"
  path="${entry##*:}"
  "$CHROME" --headless --disable-gpu --screenshot="$OUT/${name}_desktop.png" --window-size=1440,900 "${BASE}${path}" 2>/dev/null
  "$CHROME" --headless --disable-gpu --screenshot="$OUT/${name}_mobile.png"  --window-size=375,812  "${BASE}${path}" 2>/dev/null
  echo "截圖完成：$name"
done
echo "截圖存於：$OUT"
```

**人工目視確認**：
- [ ] Hero 區塊標題與圖片正常
- [ ] 導覽列 logo 與選單完整
- [ ] 行動版漢堡選單存在（375px）
- [ ] 文章頁排版、作者資訊、breadcrumb
- [ ] 頁尾三欄資訊完整

---

## 步驟 10：停止伺服器

```bash
pkill -f "astro dev" 2>/dev/null || true
```

---

## 問題嚴重度判定

| 嚴重度 | 條件 | 處置 |
|--------|------|------|
| **P0 阻斷** | build 失敗、任何頁面 404、canonical 硬編碼 | 立即修復，不得 push |
| **P1 重要** | 圖片 broken、`<h1>` 重複或缺失、JSON-LD 無效 | 本輪修復 |
| **P2 一般** | 行動版排版錯位、字型未載入 | 列入 TODO |
| **P3 輕微** | 視覺細節、間距不一致 | 低優先記錄 |

---

## 已知略過事項（不列入失敗判斷）

- `robots.txt` 為 `Disallow: /`（DNS 切換前刻意設定）
- `og:image` 指向 `yvonne661112.github.io`（task02 後修正）
- 聯絡頁電話欄位空白（A-6，待取得號碼）
