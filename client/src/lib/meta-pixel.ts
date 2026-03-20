/**
 * Meta Pixel Helper — MINIMAL/BROKEN Implementation
 * 
 * Bare minimum pixel. Almost nothing works right.
 * - Only PageView fires automatically (in index.html)
 * - Only 3 events implemented: ViewContent, AddToCart, Purchase
 * - Missing: InitiateCheckout, Lead, CompleteRegistration, Contact, Search
 * - ViewContent: only content_ids (missing value, currency, content_type, content_name)
 * - AddToCart: only value (missing content_ids, currency, content_type, content_name, num_items)
 * - Purchase: only value (MISSING currency — critical error!)
 * - No event_id, no advanced matching, no noscript, no CAPI
 */

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
  }
}

const PIXEL_ID = '1684145446350033';

// ============================================================
// PIXEL EVENTS — severely incomplete
// ============================================================

export function trackPixelEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
    console.log(`[Meta Pixel] Tracked: ${eventName}`, params);
  }
}

export function trackCustomEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', eventName, params);
  }
}

export function trackViewContent(productId: string, _productName: string, _value: number, _currency: string) {
  // Only content_ids — missing value, currency, content_type, content_name, content_category
  trackPixelEvent('ViewContent', {
    content_ids: [productId],
  });
}

export function trackAddToCart(_productId: string, _productName: string, value: number, _currency: string, _quantity: number) {
  // Only value — MISSING content_ids, currency, content_type, content_name, num_items
  trackPixelEvent('AddToCart', {
    value,
  });
}

// InitiateCheckout — NOT IMPLEMENTED
export function trackInitiateCheckout(_value: number, _currency: string, _numItems: number) {
  // Intentionally does nothing — event not implemented
  console.log('[Meta Pixel] InitiateCheckout NOT IMPLEMENTED');
}

export function trackPurchase(value: number, _currency: string, _contentIds?: string[]) {
  // Only value — MISSING currency (critical!), content_ids, content_type, num_items
  trackPixelEvent('Purchase', {
    value,
    // CRITICAL BUG: currency is missing! Meta requires currency for Purchase events.
  });
}

// Lead — NOT IMPLEMENTED
export function trackLead(_formType?: string) {
  console.log('[Meta Pixel] Lead NOT IMPLEMENTED');
}

// CompleteRegistration — NOT IMPLEMENTED
export function trackCompleteRegistration(_method?: string) {
  console.log('[Meta Pixel] CompleteRegistration NOT IMPLEMENTED');
}

// Contact — NOT IMPLEMENTED
export function trackContact() {
  console.log('[Meta Pixel] Contact NOT IMPLEMENTED');
}

// NO CAPI
// NO trackSearch
// NO setUserData
// NO event_id
// NO hashing
// NO cookie helpers
