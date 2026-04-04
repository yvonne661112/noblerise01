/**
 * 全站導覽連結（Header + Footer 共用）
 * 修改此處，頁首與頁尾自動同步。
 */

export interface NavLink {
  label: string;
  /** 相對於 base 的路徑，空字串代表首頁 */
  href: string;
  children?: NavLink[];
  /** 設為 true 時在導覽列與頁尾隱藏此項目 */
  hidden?: boolean;
}

export const mainNav: NavLink[] = [
  { label: '首頁', href: '', hidden: true },
  {
    label: '關於諾昇',
    href: 'about/',
    children: [
      { label: '策略夥伴', href: 'about/策略夥伴/' },
    ],
  },
  {
    label: '服務項目',
    href: 'service/',
    children: [
      { label: '客戶回饋', href: 'service/feedback/' },
    ],
  },
  {
    label: '理財新知',
    href: 'blog/',
    children: [
      { label: '投資理財', href: 'blog/investment/' },
      { label: '財務規劃', href: 'blog/business-planning/' },
      { label: '信託規劃', href: 'blog/elderly-care-trust/' },
      { label: '傳承稅務', href: 'blog/tax-planning/' },
      { label: '保險權益', href: 'blog/insurance/' },
      { label: '證照進修', href: 'blog/certification/' },
    ],
  },
  { label: '最新消息', href: 'news/' },
  { label: '聯絡我們', href: 'contact/' },
];
