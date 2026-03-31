/**
 * 全站主題設定
 * 切換主題只需修改 activeTheme 的值，其餘全站自動同步。
 * 可選值：'classic'（原始 WordPress 風格）| 'premium'（策略夥伴風格）| 'prestige'（深藍銅金風格）| 'premium-dark'（Premium 深色模式）| 'kawazu'（河津桜色系）| 'kintsugi'（金繼黃金修復）| 'noble'（高雅信賴，深邃藍灰×溫潤金）
 * 新增主題：在 public/styles/ 新增 theme-xxx.css，並在此擴充型別即可。
 */
export const activeTheme: 'classic' | 'premium' | 'prestige' | 'premium-dark' | 'kawazu' | 'kintsugi' | 'noble' = 'classic';

/**
 * 全站功能開關
 *
 * SHOW_BOOKING：預約諮詢功能
 *   true  — 顯示服務頁「30分鐘免費諮詢」區塊、聯絡頁預約表單
 *   false — 隱藏以上所有元素，不留空白
 */
export const SHOW_BOOKING = false;

/**
 * CTA 區塊（全站）
 *   true  — 顯示各頁面底部的 CTA（LINE 預約諮詢）
 *   false — 隱藏所有 CTA 區塊，不留空白
 */
export const SHOW_CTA = false;

/**
 * 櫻花飄落特效（全站）
 *   true  — 顯示
 *   false — 關閉
 */
export const SHOW_SAKURA = false;

/**
 * 浮動聯絡按鈕（全站右下角 LINE / YouTube / Email）
 *   true  — 顯示
 *   false — 隱藏
 */
export const SHOW_FLOATING_BUTTONS = true;

/**
 * 頁尾導覽子選單（hover 向上展開）
 *   true  — 顯示子選單（策略夥伴、文章分類）
 *   false — 僅顯示頂層連結
 */
export const SHOW_FOOTER_SUB_NAV = false;

/**
 * Dev 開發工具頁（導覽列最右側）
 *   true  — 顯示 Dev 分頁（可切換主題、功能開關）
 *   false — 隱藏
 */
export const SHOW_DEV_PAGE = true;

/**
 * 公司聯絡資訊（統一管理，修改此處全站自動同步）
 */
export const CONTACT = {
  companyNameZh: '諾昇理財規劃顧問股份有限公司',
  companyNameEn: 'Noblerise Financial Consultant co., LTD',
  siteUrl: 'https://noblerise.com.tw',
  email: 'contact@noblerise.com.tw',
  line: '@noblerise',
  lineUrl: 'https://line.me/ti/p/~@noblerise',
  address: '106 台北市大安區復興南路一段222號2樓',
  // JSON-LD PostalAddress 細分（Schema.org 用）
  postalCode: '106',
  streetAddress: '復興南路一段222號2樓',
  addressLocality: '大安區',
  addressRegion: '台北市',
  addressCountry: 'TW',
};
