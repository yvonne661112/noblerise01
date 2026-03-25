/**
 * 將動態圖片路徑（frontmatter 中的 image 欄位）轉為正確的完整 URL。
 * 圖片路徑可能含有或不含前置斜線，統一處理後串接 BASE_URL。
 *
 * @example
 * getAssetPath('images/foo.jpg', base)  // → '/noblerise01/images/foo.jpg'
 * getAssetPath('/images/foo.jpg', base) // → '/noblerise01/images/foo.jpg'
 */
export function getAssetPath(imagePath: string, base: string): string {
  return `${base}${imagePath.replace(/^\//, '')}`;
}
