import { CONTACT } from '../data/siteConfig';

/** 各頁面 JSON-LD 共用的 publisher 物件 */
export const publisher = {
  "@type": "Organization",
  "name": CONTACT.companyNameZh,
  "url": CONTACT.siteUrl,
} as const;

/** BreadcrumbList JSON-LD 工廠函式 */
export function breadcrumbLd(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((entry, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": entry.name,
      "item": entry.item,
    })),
  };
}

/** Blog 列表頁 JSON-LD 工廠函式（Blog 或 CollectionPage） */
export function blogListLd(params: {
  type: 'Blog' | 'CollectionPage';
  name: string;
  description: string;
  url: string;
  hasPart?: { url: string; headline: string; datePublished: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": params.type,
    "name": params.name,
    "description": params.description,
    "url": params.url,
    "publisher": publisher,
    ...(params.hasPart ? { "hasPart": params.hasPart.map(p => ({
      "@type": "Article",
      "url": p.url,
      "headline": p.headline,
      "datePublished": p.datePublished,
    })) } : {}),
  };
}
