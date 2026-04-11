# Graphify 使用指南（諾昇理財網站）

> 本文件記錄 `/graphify src` 跑完之後，如何日常使用 graph 輸出。
> 產物位置：`graphify-out/`
> 建立日期：2026-04-11

---

## 產物清單

| 檔案 | 用途 |
|------|------|
| `graph.html` | 互動式視覺化圖，瀏覽器直接開，不需伺服器 |
| `GRAPH_REPORT.md` | 審計報告：god nodes、surprising connections、社群、knowledge gaps |
| `graph.json` | 原始 graph data（給 query / path / explain 子命令用） |
| `cost.json` | 累計 token 花費紀錄 |
| `USAGE.md` | 本文件 |

---

## 使用方式（依常用度排序）

### 1. 看圖：`graph.html`（視覺探索）

```bash
open graphify-out/graph.html
```

直接在瀏覽器開啟。每個社群用不同顏色，hover 節點看 metadata、拖拉調整佈局。

**最適合**：想一眼看出「哪些文章黏在一起、哪些是孤島、哪個節點是樞紐」。

#### 中文介面後製步驟

Graphify 的 `to_html()` 沒有語言參數，預設輸出英文 UI。每次 `/graphify` 或 `--update`
跑完後，執行以下腳本把介面與社群名稱改為正體中文：

```bash
python3 scripts/graphify-zh.py
```

特性：
- 冪等（重複執行會偵測到已翻譯並跳過）
- 支援 `--check` dry-run 模式
- UI 字串 + 30 個社群名稱一次處理完

若未來 `--update` 後 clustering 變動、產生新的社群名稱，需在
`scripts/graphify-zh.py` 的 `COMMUNITY_NAMES` dict 追加翻譯。

---

### 2. 問問題：`/graphify query "..."`

Graphify 的日常殺手級用法 —— 不必重新讀任何檔案就能查詢跨文章的語意關係。

```
/graphify query "哪些文章跟 CFP 考試相關"
/graphify query "退休規劃跟稅務如何交叉" --dfs
/graphify query "年金主題有哪些不同角度的文章" --budget 1500
```

| 模式 | 旗標 | 適合 |
|------|------|------|
| BFS（預設） | _(無)_ | 「X 連到哪些東西？」廣度優先 |
| DFS | `--dfs` | 「如何從 X 走到 Y？」追一條特定路徑 |
| 限制預算 | `--budget N` | 限制回答的 token 上限 |

---

### 3. 找路徑：`/graphify path "A" "B"`

找兩個概念之間的最短路徑 —— 非常適合發現「我沒想過會相連」的連結。

```
/graphify path "退休規劃" "最低稅負制"
/graphify path "CFP考試" "categories.ts"
/graphify path "新生兒保險" "張惠芳"
```

---

### 4. 解釋單一節點：`/graphify explain "..."`

```
/graphify explain "國民年金看這一篇就夠了"
/graphify explain "分類：財務規劃"
/graphify explain "content.config.ts Blog Collection Schema"
```

會列出這個節點的所有連結、來源檔案、信心等級 —— 像 wiki 條目一樣。

---

### 5. 增量更新：`/graphify src --update`

改了文章或新增 blog 之後，不用重跑整個 pipeline：

```
/graphify src --update
```

只會重新萃取**變動的檔案**，大幅節省 token。純 code 變更（改 `.ts`）會完全跳過 LLM。

---

## 針對諾昇理財 blog 建議優先試的三件事

根據 2026-04-11 這次 graph 分析的結果：

### a. 檢查「疑似重複」的稅務文章

Graph 標出 `2025最低稅負制與美股海外所得稅務6大重點` 跟 `台美股稅務攻略：00940/台積電/TSM ADR` 語意高度相似（INFERRED 0.85）。這可能是內容重複/SEO 互相稀釋的警訊：

```
/graphify query "最低稅負制與台美股稅務" --dfs
```

### b. 找出孤島文章（66 個弱連結節點）

很多文章只有 ≤1 個連結 —— 代表它們在主題網路裡是孤立的。可能是分類沒打好、或內容太獨特沒有 cross-link：

```
/graphify query "孤島文章沒有跨主題連結"
```

### c. 用路徑查 SEO 內鏈機會

```
/graphify path "退休實戰" "最低稅負制"
```

如果路徑很長或繞遠路 → 代表兩篇文章「應該相關但沒互相引用」，是內鏈（internal linking）的候選。

---

## 長期工作流建議

因為諾昇理財是 SEO/內容驅動的網站，最自然的 graphify 工作流是：

1. **每次寫完新 blog** → `/graphify src --update && python3 scripts/graphify-zh.py`
   （增量更新 + 中文後製）
2. **每月一次** → `/graphify query "..."` 檢查內容孤島、重複主題、內鏈機會
3. **改版前** → 看 `graph.html` 確認資訊架構沒退化

---

## 這次 graph 的基本面（2026-04-11 建立）

- **規模**：144 節點、138 邊、30 個社群
- **萃取品質**：84% EXTRACTED、16% INFERRED、0% AMBIGUOUS
- **語料**：50 個檔案、11,152 字（來自 `src/`）
  - 8 個 code 檔（`.ts` 工具與設定）
  - 36 個 markdown 檔（blog 文章 + CLAUDE.md）
  - 6 個 image 檔（blog placeholder 圖）

### Top 5 God Nodes（核心抽象）

1. `分類：財務規劃 (business-planning)` — 9 edges
2. `國民年金看這一篇就夠了` — 6 edges
3. `2025最低稅負制與美股海外所得稅務6大重點` — 5 edges
4. `張惠芳 CFP 作者` — 5 edges
5. `分類：傳承稅務 (tax-planning)` — 5 edges

完整清單見 `GRAPH_REPORT.md`。

### 主要社群（超過 5 個節點）

| 社群 | 大小 | 主題 |
|------|------|------|
| Personal Finance Fundamentals | 22 | 家庭理財、遺產、財務自由基礎 |
| Tax & Overseas Investing | 9 | 海外所得稅、AMT、境外基金 |
| Investment Philosophy & Tools | 7 | 投資哲學、RightCapital |
| Retirement Planning | 7 | 退休提領策略、勞保 |
| Education & Kids Finance | 7 | 教育金、兒童財商 |
| ETF & Stock Investing | 7 | ETF、NVIDIA、配息結構 |
| Household Budget Snapshot | 6 | 家計盤點、保險存摺 |
| Real Estate & Senior Housing | 6 | 以房養老、安養信託 |

### 知識缺口

- 66 個弱連結節點（≤1 邊）—— 文章內容之間的 cross-link 可能還有優化空間
- 多個 2-node thin communities（新生兒保險、車禍 SOP、左右側交易...）—— 這些主題目前在 blog 裡只有 1-2 篇文章，可考慮擴充或整併

---

## 常見問題

### Q: 重新跑 graphify 會把舊的 graph.json 覆蓋掉嗎？

A: 會。如果想保留歷史版本，先 `cp graphify-out/graph.json graphify-out/graph-$(date +%Y%m%d).json` 再跑。

### Q: `--update` 跟重跑有什麼差別？

A: `--update` 只會重新處理**自上次執行以來新增或修改的檔案**（透過 manifest 比對），其他檔案從 cache 直接取回，省 token 也省時間。第一次跑完 graphify 之後，日常工作都應該用 `--update`。

### Q: 如果我想只針對 blog 文章（不含 code）建 graph？

A: 直接指定子路徑：`/graphify src/content/blog`。這會跳過 `.ts` 檔案和 AST 萃取，只做語意萃取。

### Q: query 答案不夠準怎麼辦？

A: 三種調整：
1. `--budget 3000`（增加 token 預算，回答會更完整）
2. `--dfs`（改用深度優先，追特定路徑）
3. 直接 `/graphify explain "節點名"` 看該節點的原始連結

### Q: graph 過期了怎麼判斷？

A: 如果 blog 新增超過 5 篇、或有大規模重構，就該跑 `--update`。`graph.json` 本身沒有 TTL，但資訊會越來越跟實際狀態脫節。

---

## 相關文件

- `GRAPH_REPORT.md` — 完整審計報告（本次建立時的所有社群、god nodes、surprising connections、knowledge gaps、suggested questions）
- `../CLAUDE.md` — 諾昇理財網站主要維護指南
- `~/.claude/skills/graphify/SKILL.md` — graphify skill 原始定義（所有指令與旗標完整清單）
