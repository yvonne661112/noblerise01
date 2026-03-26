import type { CollectionEntry } from 'astro:content';
import { categoryLabels } from '../data/categories';

export interface PostView {
  slug: string;
  title: string;
  image?: string;
  description: string;
  dateStr: string;
  catLabel: string;
  catUrl: string;
  tags: string[];
  catLabels: string[];
}

export function sortPostsByDate(
  posts: CollectionEntry<'blog'>[]
): CollectionEntry<'blog'>[] {
  return [...posts].sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );
}

export function transformPost(
  post: CollectionEntry<'blog'>,
  base: string
): PostView {
  const mainCat = post.data.categories?.find((c: string) => c !== 'blog') ?? '';
  const catLabels = (post.data.categories ?? [])
    .filter((c: string) => c !== 'blog' && categoryLabels[c])
    .map((c: string) => categoryLabels[c]);
  return {
    slug: post.data.numericSlug,
    title: post.data.title,
    image: post.data.image ?? 'images/og-default.jpg',
    description: post.data.description,
    dateStr: new Date(post.data.date).toLocaleDateString('zh-TW'),
    catLabel: categoryLabels[mainCat] ?? '理財新知',
    catUrl: mainCat ? `${base}blog/${mainCat}/` : `${base}blog/`,
    tags: post.data.tags ?? [],
    catLabels,
  };
}
