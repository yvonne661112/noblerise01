# 全站主題系統建置計畫

**分支**：`style/redesign`
**目標**：建立可切換、可擴充的主題架構，並在此基礎上導入「策略夥伴」風格（Premium）作為新預設主題。

---

## 架構總覽

```
src/
  styles/
    global.css                 ← reset、排版結構（只引用 var，不含任何色彩或字型寫死值）
    themes/
      theme-classic.css        ← 原始 WordPress 風格 token 定義
      theme-premium.css        ← 策略夥伴風格 token 定義（新）
      theme-xxx.css            ← 未來新增：只加一個檔，其餘不動

  data/
    siteConfig.ts              ← activeTheme: 'classic' | 'premium'（切換主題改這一行）

  components/
    Head.astro                 ← 讀 activeTheme，import 對應 theme file + Google Fonts
    PageHero.astro             ← 可重用 Hero 區塊（只用 var，不含主題邏輯）
    SectionHeader.astro        ← 可重用 Section 標題（eyebrow + h2 + 橫線）
    ContentCard.astro          ← 可重用內容卡片
    TagBadge.astro             ← 可重用標籤
    Header.astro               ← 導覽列（只用 var）
    Footer.astro               ← 頁尾（只用 var）
```

**切換主題 = 改一行：**
```ts
// src/data/siteConfig.ts
export const activeTheme = 'premium'; // 改成 'classic' 即恢復原始風格
```

**新增 Style3 = 加一個檔：**
```
src/styles/themes/theme-style3.css  ← 定義相同的 token 名稱，填入新值
```

---

## Token 詞彙表（兩個主題共用同一套名稱）

| Token 名稱 | Classic 值 | Premium 值 | 用途 |
|-----------|-----------|-----------|------|
| `--color-primary` | `#0d383a` | `#014045` | 主色、標題、連結 hover |
| `--color-accent` | `#85a14f` | `#979660` | 強調色、按鈕、tag |
| `--color-accent-light` | `#a0bc6a` | `#B8B87A` | 淡化強調色 |
| `--color-accent-pale` | `#f5f8ee` | `#F2F2EA` | 強調色底色（背景填充） |
| `--color-bg-subtle` | `#f5f5f5` | `#F8FAF9` | 淡底色區塊 |
| `--color-border` | `#e5e5e5` | `#e0e4e0` | 一般邊框 |
| `--color-border-accent` | `rgba(133,161,79,0.18)` | `rgba(151,150,96,0.18)` | 卡片金色細線邊框 |
| `--color-footer-bg` | `#171717` | `#171717` | Footer 背景（兩者相同） |
| `--color-dark-section` | `#1d1d1d` | `#014045` | 深色區塊背景 |
| `--color-text` | `#000` | `#1a1a1a` | 主要文字 |
| `--color-text-mid` | `#555` | `#5A5A5A` | 次要文字 |
| `--font-heading` | `'Montserrat', sans-serif` | `'Noto Serif TC', serif` | 標題字型 |
| `--font-body` | `'Poppins','Open Sans',sans-serif` | `'Noto Sans TC',sans-serif` | 內文字型 |
| `--font-import` | Montserrat+Poppins URL | Noto Serif TC+Noto Sans TC URL | Google Fonts import URL |
| `--hero-overlay` | `rgba(0,0,0,0.5)` | `rgba(1,64,69,0.92)` | Hero 遮罩色 |
| `--hero-pattern` | `none` | 格紋 radial-gradient | Hero 背景紋路 |
| `--card-radius` | `8px` | `12px` | 卡片圓角 |
| `--card-shadow` | `0 2px 8px rgba(0,0,0,0.08)` | `0 16px 48px rgba(1,64,69,0.1)` | 卡片 hover 陰影 |
| `--heading-weight` | `700` | `300` | 標題字重（Serif 輕量感） |
| `--color-text-dark` | `#171717` | `#1a1a1a` | nav 文字、近黑色文字 |
| `--color-text-muted` | `#cccccc` | `rgba(255,255,255,0.5)` | 深色背景上的弱化文字 |
| `--card-shadow-hover` | `0 8px 24px rgba(0,0,0,0.14)` | `0 16px 48px rgba(1,64,69,0.1)` | 卡片 hover 陰影 |

---

## 可重用元件規格

### `PageHero.astro`
Props: `eyebrow`, `title`, `description`, `stats[]`（可選）
用於：所有頁面頂部 Hero 區塊
樣式：完全透過 CSS var 控制，Classic = 圖片 + 暗色遮罩，Premium = 深主色底 + 格紋

### `SectionHeader.astro`
Props: `eyebrow`（可選）, `title`, `align`（'left'|'center'，預設 left）
用於：首頁各區塊、關於、服務等 section 起始

### `ContentCard.astro`
Props: `title`, `body`, `tag`（可選）, `href`（可選）
用於：服務卡片、核心價值卡片

### `TagBadge.astro`
Props: `label`
用於：文章分類標籤、服務 tag、技能標籤

---

## 執行步驟

### Phase 0｜清查現有 hardcode（不修改，只列清單）

掃描 `global.css` 中所有未使用 var() 的色彩與字型值，建立替換清單。
預期發現：Header 的 `background: #fff`、`color: #171717`；Footer 的 `#66b966`；部分 `#555`、`#e5e5e5` 等。

---

### Phase 1｜建立主題架構（Theme Token System）

**1-1. `src/styles/themes/theme-classic.css`**

```css
:root {
  --color-primary: #0d383a;
  --color-accent: #85a14f;
  --color-accent-light: #a0bc6a;
  --color-accent-pale: #f5f8ee;
  --color-bg-subtle: #f5f5f5;
  --color-border: #e5e5e5;
  --color-border-accent: rgba(133,161,79,0.18);
  --color-footer-bg: #171717;
  --color-dark-section: #1d1d1d;
  --color-text: #000;
  --color-text-mid: #555;
  --font-heading: 'Montserrat', sans-serif;
  --font-body: 'Poppins', 'Open Sans', sans-serif;
  --hero-overlay: rgba(0,0,0,0.5);
  --hero-pattern: none;
  --card-radius: 8px;
  --card-shadow: 0 2px 8px rgba(0,0,0,0.08);
  --heading-weight: 700;
}
```

**1-2. `src/styles/themes/theme-premium.css`**

```css
:root {
  --color-primary: #014045;
  --color-accent: #979660;
  --color-accent-light: #B8B87A;
  --color-accent-pale: #F2F2EA;
  --color-bg-subtle: #F8FAF9;
  --color-border: #e0e4e0;
  --color-border-accent: rgba(151,150,96,0.18);
  --color-footer-bg: #171717;
  --color-dark-section: #014045;
  --color-text: #1a1a1a;
  --color-text-mid: #5A5A5A;
  --font-heading: 'Noto Serif TC', serif;
  --font-body: 'Noto Sans TC', sans-serif;
  --hero-overlay: rgba(1,64,69,0.92);
  --hero-pattern: radial-gradient(ellipse 60% 80% at 80% 50%, rgba(151,150,96,0.12) 0%, transparent 70%);
  --card-radius: 12px;
  --card-shadow: 0 16px 48px rgba(1,64,69,0.1);
  --heading-weight: 300;
}
```

**1-3. `src/data/siteConfig.ts`（新增 activeTheme）**

```ts
export const activeTheme: 'classic' | 'premium' = 'premium';
```

**1-4. `src/components/Head.astro`（動態載入主題 + 字型）**

根據 `activeTheme` import 對應 theme CSS，並載入對應 Google Fonts URL。

---

### Phase 2｜清理 global.css

將 `global.css` 中所有 hardcode 的顏色與字型值改為對應 CSS var。
`global.css` 保留：reset、layout 結構、component 類名（.card、.btn、.section 等）。
**不保留**：任何 `#` 色彩值、字型字串、固定 px 的主題相關間距。

---

### Phase 3｜建立可重用元件

按上方「可重用元件規格」建立：
- `PageHero.astro`
- `SectionHeader.astro`
- `ContentCard.astro`
- `TagBadge.astro`

所有元件只使用 `var(--...)` token，不寫死任何值。

---

### Phase 4｜更新 Header & Footer

- `Header.astro`：所有色彩改用 var，手機選單背景改用 `var(--color-primary)`
- `Footer.astro`：背景使用 `var(--color-footer-bg)`，accent 使用 `var(--color-accent)`

---

### Phase 5｜各頁面套用元件 + 清理 scoped style

依序更新以下頁面，以可重用元件取代重複程式碼，並移除頁面 scoped style 中與主題相關的寫死值：

1. `src/pages/index.astro`
2. `src/pages/about/index.astro`
3. `src/pages/service/index.astro`
4. `src/pages/blog/index.astro`
5. `src/pages/blog/[category]/index.astro`
6. `src/pages/contact/index.astro`
7. `src/layouts/BlogPost.astro`（含 `[...slug].astro`）

**特別處理**：`/about/策略夥伴/index.astro` 已完成，但其 scoped style 中仍有大量硬編碼值（`#014045`、`#979660` 等）。Phase 5 完成後，統一改為 `var(--color-primary)` 等 token，使其也能跟隨主題切換。

---

### Phase 6｜驗證主題切換

1. 設定 `activeTheme = 'premium'`，執行 `npm run build && npm run preview`，確認全站呈現新風格
2. 設定 `activeTheme = 'classic'`，重新 build，確認完整還原原始風格，無任何破版
3. 兩個主題均通過後，設回 `premium` 並 commit

---

### Phase 7｜Build 最終驗證

```bash
npm run build
```

確認：
- [ ] build 無錯誤
- [ ] 全站無任何 `#0d383a`、`#85a14f`、`#014045`、`#979660` 硬編碼殘留（全部改為 var）
- [ ] 切換 activeTheme 只需改一行，無需動其他任何檔案
- [ ] RWD 正常

---

## 執行順序

```
Phase 0（清查）
  → Phase 1（建主題檔 + siteConfig）
  → Phase 2（清理 global.css）
  → Phase 3（建可重用元件）
  → Phase 4（Header / Footer）
  → Phase 5（各頁面）
  → Phase 6（切換驗證）
  → Phase 7（最終 build）
```

**Phase 1–2 是所有後續工作的地基，必須先完成才能開始其他 Phase。**

---

## 注意事項

- 每個 Phase 完成後，執行 `npm run dev` 快速目測確認再繼續
- 禁止更動任何圖片的比例、尺寸或加入圓形裁切
- `策略夥伴/index.astro` 的 scoped style 不在 Phase 3–4 動，留至 Phase 5 統一處理
- 未來新增 Style3：只需建立 `theme-style3.css` 並在 `siteConfig.ts` 加入型別，其餘全站不需修改
