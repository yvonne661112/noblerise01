export const categoryLabels: Record<string, string> = {
  investment:           '投資理財',
  insurance:            '保險權益',
  certification:        '證照進修',
  'business-planning':  '財務規劃',
  'elderly-care-trust': '信託規劃',
  'tax-planning':       '傳承稅務',
};

/** 所有分類的 slug 陣列，用於 getStaticPaths */
export const categorySlugs = Object.keys(categoryLabels);

/** 導覽列分類項目（含「全部文章」首項），用於 BlogList catBar */
export function getCategoryNavItems(base: string) {
  return [
    { slug: '', label: '全部文章', url: `${base}blog/` },
    ...Object.entries(categoryLabels).map(([slug, label]) => ({
      slug,
      label,
      url: `${base}blog/${slug}/`,
    })),
  ];
}
