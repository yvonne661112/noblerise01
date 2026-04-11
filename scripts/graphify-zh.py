#!/usr/bin/env python3
"""
graphify-zh.py — 把 graphify 產生的 graph.html UI 字串後製為正體中文。

背景：graphify 套件的 to_html() 沒有語言參數，所有 UI 字串硬編碼在 f-string。
本腳本在 /graphify 跑完之後執行，以字串替換方式把介面改為中文。

用法：
    python3 scripts/graphify-zh.py
    python3 scripts/graphify-zh.py --file path/to/graph.html

設計原則：
- 冪等：重複執行不會壞事，已翻譯的字串會被偵測略過。
- 保守：只替換確定是 UI 字串的位置（靠上下文標記如 placeholder="..."、class="empty" 等）。
- 不改社群名：社群標籤的翻譯交由未來另一個步驟決定。
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

# (英文, 中文) — 順序會影響結果；由最具體到最一般
REPLACEMENTS: list[tuple[str, str]] = [
    # 1. 文件語言屬性
    ('<html lang="en">', '<html lang="zh-Hant">'),

    # 2. 搜尋框 placeholder
    ('placeholder="Search nodes..."', 'placeholder="搜尋節點..."'),

    # 3. 側欄標題 — Node Info
    ('<h3>Node Info</h3>', '<h3>節點資訊</h3>'),

    # 4. 側欄標題 — Communities
    ('<h3>Communities</h3>', '<h3>社群</h3>'),

    # 5. 空狀態提示（HTML 初始值 + JS 重置時的文字）
    (
        '<span class="empty">Click a node to inspect it</span>',
        '<span class="empty">點擊節點以檢視詳情</span>',
    ),
    (
        "'<span class=\"empty\">Click a node to inspect it</span>'",
        "'<span class=\"empty\">點擊節點以檢視詳情</span>'",
    ),

    # 6. 節點資訊欄位（都是 JS template literal 裡的字串）
    ('Type: ${esc(n._file_type', '類型：${esc(n._file_type'),
    ('Community: ${esc(n._community_name)', '所屬社群：${esc(n._community_name)'),
    ('Source: ${esc(n._source_file', '來源檔案：${esc(n._source_file'),
    ('Degree: ${n._degree}', '連結數：${n._degree}'),

    # 7. 鄰近節點計數
    ('Neighbors (${neighborIds.length})', '鄰近節點（${neighborIds.length}）'),

    # 8. 底部統計（HTML entity &middot; 對應原始碼）
    (' nodes &middot; ', ' 節點 &middot; '),
    (' edges &middot; ', ' 邊 &middot; '),
    (' communities</div>', ' 社群</div>'),
]

# 社群名稱翻譯 —— 英文 → 正體中文
#
# 用 JSON 引號包起來的精確匹配，避免與節點 label 內容衝突。
# 這些英文名來自 graphify skill 跑完後由人工在 Step 5 指定的 labels dict。
# 如果未來 --update 重跑後 clustering 變動、出現新社群名，可在這裡追加。
COMMUNITY_NAMES: dict[str, str] = {
    "Personal Finance Fundamentals": "家庭理財基礎",
    "Tax & Overseas Investing": "稅務與海外投資",
    "Investment Philosophy & Tools": "投資哲學與工具",
    "Retirement Planning": "退休規劃",
    "Education & Kids Finance": "教育與兒童財商",
    "ETF & Stock Investing": "ETF 與個股投資",
    "Household Budget Snapshot": "家計盤點",
    "Real Estate & Senior Housing": "不動產與安養規劃",
    "Content Utils (Categories/Posts)": "內容工具（分類/文章）",
    "Trust Planning": "信託規劃",
    "Site Config & Schema": "網站設定與 Schema",
    "About Placeholder Image": "About 頁封面圖",
    "Placeholder 3 Image": "部落格封面圖 3",
    "Astro Brand Placeholder": "Astro 品牌封面",
    "Placeholder 4 Image": "部落格封面圖 4",
    "Placeholder 5 Image": "部落格封面圖 5",
    "JSON-LD Structured Data": "JSON-LD 結構化資料",
    "Certification Exams (CFP/AFP)": "證照考試（CFP/AFP）",
    "Placeholder 2 Image": "部落格封面圖 2",
    "Mortgage vs Investing": "房貸提前還 vs 投資",
    "Financial Boundaries & Guarantor Risk": "財務界線與保證人風險",
    "Asset Path Util": "資產路徑工具",
    "Newborn Insurance": "新生兒保險",
    "Left vs Right Side Trading": "左側/右側交易",
    "Car Accident SOP": "車禍處理 SOP",
    "Contact Data in JSON-LD": "聯絡資訊 JSON-LD",
    "Theme Config": "主題切換設定",
    "Content Collection Config": "內容集合設定",
    "Author Data": "作者資料",
    "Nav Links": "導覽連結",
}

# 冪等檢查：若檔案已含任一「翻譯後」字串，就視為已翻譯過
ALREADY_TRANSLATED_MARKERS = [
    '<html lang="zh-Hant">',
    'placeholder="搜尋節點',
    '<h3>節點資訊</h3>',
]


def translate(html: str) -> tuple[str, int, int]:
    """Return translated html plus (ui_applied, community_applied) counts."""
    ui_applied = 0
    for en, zh in REPLACEMENTS:
        if en in html:
            html = html.replace(en, zh)
            ui_applied += 1

    # 社群名稱：精確匹配 JSON 字串值 "X" → "Y"
    # 這樣只會命中 label / community_name 等 JSON key 的值，
    # 不會意外替換到任何節點 label 或其他欄位。
    community_applied = 0
    for en, zh in COMMUNITY_NAMES.items():
        needle = f'"{en}"'
        if needle in html:
            replacement = f'"{zh}"'
            html = html.replace(needle, replacement)
            community_applied += 1

    return html, ui_applied, community_applied


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--file",
        default="graphify-out/graph.html",
        help="Path to graph.html (default: graphify-out/graph.html)",
    )
    parser.add_argument(
        "--check",
        action="store_true",
        help="Dry run — report what would change but don't write",
    )
    args = parser.parse_args()

    path = Path(args.file)
    if not path.exists():
        print(f"error: {path} not found — run /graphify src first", file=sys.stderr)
        return 1

    html = path.read_text(encoding="utf-8")

    if any(marker in html for marker in ALREADY_TRANSLATED_MARKERS):
        print(f"{path} already translated — nothing to do")
        return 0

    translated, ui_applied, community_applied = translate(html)
    if ui_applied == 0 and community_applied == 0:
        print("warning: no replacements applied — graphify HTML format may have changed")
        return 2

    summary = (
        f"UI {ui_applied}/{len(REPLACEMENTS)} · "
        f"communities {community_applied}/{len(COMMUNITY_NAMES)}"
    )

    if args.check:
        print(f"would apply ({summary}) to {path}")
        return 0

    path.write_text(translated, encoding="utf-8")
    print(f"translated {path} — applied {summary}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
