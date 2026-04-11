# Graph Report - src  (2026-04-11)

## Corpus Check
- Corpus is ~11,152 words - fits in a single context window. You may not need a graph.

## Summary
- 144 nodes · 138 edges · 30 communities detected
- Extraction: 84% EXTRACTED · 16% INFERRED · 0% AMBIGUOUS · INFERRED: 22 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## God Nodes (most connected - your core abstractions)
1. `分類：財務規劃 (business-planning)` - 9 edges
2. `國民年金看這一篇就夠了` - 6 edges
3. `2025最低稅負制與美股海外所得稅務6大重點` - 5 edges
4. `張惠芳 CFP 作者` - 5 edges
5. `分類：傳承稅務 (tax-planning)` - 5 edges
6. `分類：投資理財 (investment)` - 5 edges
7. `私立中學學雜費33萬：教育費用差多少` - 4 edges
8. `打造千萬退休金實現財務自由的5步驟` - 4 edges
9. `買ETF選錯配息型態稅務結構會吃掉長期報酬` - 4 edges
10. `理財顧問私藏的財務盤點4步驟` - 4 edges

## Surprising Connections (you probably didn't know these)
- `content.config.ts Blog Collection Schema` --implements--> `國民年金看這一篇就夠了`  [INFERRED]
  src/content.config.ts → src/content/blog/716.md
- `2025最低稅負制與美股海外所得稅務6大重點` --semantically_similar_to--> `台美股稅務攻略：00940/台積電/TSM ADR`  [INFERRED] [semantically similar]
  src/content/blog/884.md → src/content/blog/474.md
- `2024低標&富養孩子費用是多少` --references--> `分類：財務規劃 (business-planning)`  [EXTRACTED]
  src/content/blog/264.md → src/data/categories.ts
- `2024低標&富養孩子費用是多少` --references--> `分類：投資理財 (investment)`  [EXTRACTED]
  src/content/blog/264.md → src/data/categories.ts
- `分享新科CFP考試策略和方法` --references--> `CFP 國際認證高級理財規劃顧問`  [EXTRACTED]
  src/content/blog/1107.md → src/data/author.ts

## Hyperedges (group relationships)
- **美股/海外稅務規劃文章群** — blog884_post, blog474_post, blog523_post [INFERRED 0.85]
- **退休規劃主題群** — blog1246_post, blog202_post, blog20260406_post [INFERRED 0.85]
- **信託與資產保護群** — blog839_post, blog546_post, blog20260406_elderly_trust [INFERRED 0.75]
- **文章資料轉換管線** — code_content_config_ts, code_post_ts, code_categories_ts [EXTRACTED 0.95]
- **退休規劃主題群** — blog_716_national_pension, blog_1210_retirement_withdrawal, blog_845_elderly_trust [INFERRED 0.85]
- **CFP/AFP 認證歷程** — blog_1126_afp_exam, blog_1107_cfp_exam, concept_fpat, concept_cfp [EXTRACTED 0.90]

## Communities

### Community 0 - "Personal Finance Fundamentals"
Cohesion: 0.15
Nodes (22): 退休金夠不夠？關鍵在提領策略, 小資族如何存到人生的第一桶金, 保險金一定免遺產稅嗎？5個保單稅務真相, IFA實務週記：美股、台股贈與移轉懶人包, 阻擋你財務自由的3個阻礙：開銷漏洞, 年薪150萬怎麼分配？理財金三角+三帳戶法, 2024低標&富養孩子費用是多少, 限定繼承一定要做這件事 (+14 more)

### Community 1 - "Tax & Overseas Investing"
Cohesion: 0.22
Nodes (9): 台美股稅務攻略：00940/台積電/TSM ADR, 台積電 vs TSM ADR vs 00940 ETF 稅務比較, 澳豐境外基金詐騙警示, 基金稅負（資本利得/股息/匯差）, 2024投資基金稅務完整解析, 最低稅負制（AMT）, 海外券商投資美股, 海外所得稅務 (+1 more)

### Community 2 - "Investment Philosophy & Tools"
Cohesion: 0.29
Nodes (7): 優雅投資哲學, 掌握投資極速成長秘訣：成功財務顧問必學的神技！, 時間的價值與複利效應, 理財好聲音投資工作坊, CFP實測RightCapital的5大功能, RightCapital 美國財務規劃系統, 理財好聲音投資工作坊

### Community 3 - "Retirement Planning"
Cohesion: 0.38
Nodes (7): 退休實戰：每月投資2.4萬打造1200萬退休金, 所得替代率, 退休安養規劃, 財務自由, 勞保老年給付, 打造千萬退休金實現財務自由的5步驟, 台灣超高齡社會（2025）

### Community 4 - "Education & Kids Finance"
Cohesion: 0.29
Nodes (7): 張惠芳 CFP（諾昇理財顧問）, 教育金理財與專戶, 私立中學學雜費33萬：教育費用差多少, 私立學校教育支出, ETF vs 個股 教學, 兒童財商教育, 5步驟教孩子聰明理財打造財商力

### Community 5 - "ETF & Stock Investing"
Cohesion: 0.29
Nodes (7): NVIDIA 個股投資, 被動投資大型美股ETF, 買NVIDIA下跌50%到賺46%報酬的7個投資理財心法, ETF連結基金, 買ETF選錯配息型態稅務結構會吃掉長期報酬, 投信投顧公會 SITCA, 台股ETF爆發成長 1202萬受益人

### Community 6 - "Household Budget Snapshot"
Cohesion: 0.33
Nodes (6): 資產負債盤點四步驟, 保險存摺, 理財顧問4步驟掌握現金投資勞退保險, 行政院主計總處家庭收支調查報告, 家庭儲蓄與消費指標, 台灣家庭收支調查：一年存不到27.5萬

### Community 7 - "Real Estate & Senior Housing"
Cohesion: 0.33
Nodes (6): 高配息保單, 房產增貸無本套利豪賭, 房產增貸購買高配息保單：房產活化變資產火化, 安養信託, 以房養老/留房養老/大房換小房：居住財務配置, 以房養老 / 留房養老 / 大房換小房

### Community 8 - "Content Utils (Categories/Posts)"
Cohesion: 0.4
Nodes (0): 

### Community 9 - "Trust Planning"
Cohesion: 0.5
Nodes (5): 員工福儲信託 / 員工持股信託, 員工福儲信託完整介紹, 保險金信託, 透過保險金信託做到資產保護專款專用, 沈殿霞案例（2億元信託）

### Community 10 - "Site Config & Schema"
Cohesion: 0.4
Nodes (5): assets.ts getAssetPath, categories.ts 分類對照, content.config.ts Blog Collection Schema, navLinks.ts 導覽連結, post.ts 文章排序與轉換

### Community 11 - "About Placeholder Image"
Cohesion: 0.5
Nodes (5): Dark Grid Background with Purple Glow, Blog Placeholder About Image, Neon Cyan-to-Purple Gradient Rounded Border, Blog Post Placeholder Cover Image, Smiling Screen/Monitor Mascot Character

### Community 12 - "Placeholder 3 Image"
Cohesion: 0.4
Nodes (5): Blog Placeholder 3 — Purple to Red Gradient, Dark Navy / Magenta / Crimson Palette, Blog Post Placeholder Cover, Grainy Noise Gradient Aesthetic, Abstract Gradient Background

### Community 13 - "Astro Brand Placeholder"
Cohesion: 0.5
Nodes (5): Astro Web Framework Brand, Dark Aurora Light-Ray Background, Houston Mascot (Astro robot face), Astro 'Build the web you want' Promotional Banner, Tagline: Build the web you want

### Community 14 - "Placeholder 4 Image"
Cohesion: 0.4
Nodes (5): Blog Placeholder 4 - Dark Gradient, Dark Navy, Olive Green, Warm Orange Palette, Blog Post Placeholder Cover, Grainy Noise Gradient Aesthetic, Abstract Gradient Background

### Community 15 - "Placeholder 5 Image"
Cohesion: 0.4
Nodes (5): Purple Blue Black Palette, Blog Placeholder 5 - Purple Blue Gradient, Blog Post Placeholder Image, Dark Grainy Gradient Style, Abstract Gradient Background

### Community 16 - "JSON-LD Structured Data"
Cohesion: 0.5
Nodes (0): 

### Community 17 - "Certification Exams (CFP/AFP)"
Cohesion: 0.83
Nodes (4): 分享新科CFP考試策略和方法, 分享AFP考試心得和方法, 分類：證照進修 (certification), FPAT 臺灣理財顧問認證協會

### Community 18 - "Placeholder 2 Image"
Cohesion: 0.5
Nodes (4): Blog Placeholder 2 — Teal to Blue Gradient, Color Palette: Teal & Deep Blue, Purpose: Blog Cover Placeholder, Visual Style: Abstract Grainy Gradient

### Community 19 - "Mortgage vs Investing"
Cohesion: 1.0
Nodes (3): 房貸提前還款 vs 投資決策, 手握800萬還房貸是解脫還是錯失稅務套利, 高所得族稅務套利策略

### Community 20 - "Financial Boundaries & Guarantor Risk"
Cohesion: 0.67
Nodes (3): 建立財務界線/轉嫁風險, 連帶保證人風險, 如何避免財務土石流

### Community 21 - "Asset Path Util"
Cohesion: 1.0
Nodes (0): 

### Community 22 - "Newborn Insurance"
Cohesion: 1.0
Nodes (2): 新生兒保險, 新生兒保險投保攻略

### Community 23 - "Left vs Right Side Trading"
Cohesion: 1.0
Nodes (2): 左側右側交易投資人測試, 左側交易 vs 右側交易

### Community 24 - "Car Accident SOP"
Cohesion: 1.0
Nodes (2): 車禍處理SOP與強制險理賠, 車禍處理6步驟SOP

### Community 25 - "Contact Data in JSON-LD"
Cohesion: 1.0
Nodes (2): CONTACT 公司聯絡資訊, jsonld.ts JSON-LD 工廠函式

### Community 26 - "Theme Config"
Cohesion: 1.0
Nodes (2): activeTheme 主題切換設定, siteConfig.ts 全站設定

### Community 27 - "Content Collection Config"
Cohesion: 1.0
Nodes (0): 

### Community 28 - "Author Data"
Cohesion: 1.0
Nodes (0): 

### Community 29 - "Nav Links"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **66 isolated node(s):** `優雅投資哲學`, `時間的價值與複利效應`, `教育金理財與專戶`, `私立學校教育支出`, `新生兒保險投保攻略` (+61 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Asset Path Util`** (2 nodes): `assets.ts`, `getAssetPath()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Newborn Insurance`** (2 nodes): `新生兒保險`, `新生兒保險投保攻略`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Left vs Right Side Trading`** (2 nodes): `左側右側交易投資人測試`, `左側交易 vs 右側交易`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Car Accident SOP`** (2 nodes): `車禍處理SOP與強制險理賠`, `車禍處理6步驟SOP`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Contact Data in JSON-LD`** (2 nodes): `CONTACT 公司聯絡資訊`, `jsonld.ts JSON-LD 工廠函式`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Theme Config`** (2 nodes): `activeTheme 主題切換設定`, `siteConfig.ts 全站設定`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Content Collection Config`** (1 nodes): `content.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Author Data`** (1 nodes): `author.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Nav Links`** (1 nodes): `navLinks.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `國民年金看這一篇就夠了` connect `Personal Finance Fundamentals` to `Site Config & Schema`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `國民年金看這一篇就夠了` (e.g. with `退休金夠不夠？關鍵在提領策略` and `content.config.ts Blog Collection Schema`) actually correct?**
  _`國民年金看這一篇就夠了` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `2025最低稅負制與美股海外所得稅務6大重點` (e.g. with `台美股稅務攻略：00940/台積電/TSM ADR` and `2024投資基金稅務完整解析`) actually correct?**
  _`2025最低稅負制與美股海外所得稅務6大重點` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `優雅投資哲學`, `時間的價值與複利效應`, `教育金理財與專戶` to the rest of the system?**
  _66 weakly-connected nodes found - possible documentation gaps or missing edges._