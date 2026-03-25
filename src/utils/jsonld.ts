import { CONTACT } from '../data/siteConfig';

/** 各頁面 JSON-LD 共用的 publisher 物件 */
export const publisher = {
  "@type": "Organization",
  "name": CONTACT.companyNameZh,
  "url": CONTACT.siteUrl,
} as const;
