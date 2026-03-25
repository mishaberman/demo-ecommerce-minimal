# Meta Pixel & CAPI Demo: Minimal Variant <img src="https://img.shields.io/badge/Grade-D---red" alt="Grade D-" />

This variant demonstrates a minimal, pixel-only implementation of Meta tracking. It's a step below "Poor" because it includes a redundant, explicit `PageView` event, which is already automatically tracked by the `fbq('init')` call. This leads to duplicated PageView events, wasted bandwidth, and illustrates a common misunderstanding by developers who may copy boilerplate code without fully understanding its function.

### Quick Facts

| Attribute | Details |
| :--- | :--- |
| **Pixel ID** | `1684145446350033` |
| **CAPI Method** | None |
| **Grade** | D- |
| **Live Site** | [https://mishaberman.github.io/demo-ecommerce-minimal/](https://mishaberman.github.io/demo-ecommerce-minimal/) |
| **GitHub Repo** | [https://github.com/mishaberman/demo-ecommerce-minimal](https://github.com/mishaberman/demo-ecommerce-minimal) |

### What's Implemented

- ✅ Meta Pixel Base Code
- ✅ Standard Events (ViewContent, AddToCart, etc.)
- ✅ Basic Product & Transaction Data (value, currency, etc.)

### What's Missing or Broken

- ❌ **Redundant PageView Event:** Explicitly fires `fbq('track', 'PageView')` on every page, causing duplicate PageView events because the base code already handles this automatically.
- ❌ **No Conversions API:** All events are browser-only, offering poor reliability.
- ❌ **No Advanced Matching:** No user data (email, phone, etc.) is sent to improve matching.
- ❌ **No `fbp` or `fbc` Parameters:** Click and browser IDs are not sent, hurting attribution.
- ❌ **No Event Deduplication:** No `event_id` is used, so CAPI events cannot be added without creating duplicates.
- ❌ **No Data Processing Options (DPO):** Fails to respect user privacy choices in applicable regions.
- ❌ **No User Data Hashing:** All data is sent in plaintext, a security risk.

### Event Coverage

This table shows which events are firing from the Pixel (client-side) and/or CAPI (server-side).

| Event | Pixel | CAPI |
| :--- | :---: | :--: |
| PageView | ✅ (Duplicate) | ❌ |
| ViewContent | ✅ | ❌ |
| AddToCart | ✅ | ❌ |
| InitiateCheckout | ✅ | ❌ |
| Purchase | ✅ | ❌ |
| Search | ✅ | ❌ |
| Lead | ✅ | ❌ |
| CompleteRegistration | ✅ | ❌ |

### Parameter Completeness

This table shows which key parameters are sent with each event.

| Event | `content_type` | `content_ids` | `value` | `currency` | `content_name` | `num_items` |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| ViewContent | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| AddToCart | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| InitiateCheckout | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Purchase | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

### Architecture

The tracking is implemented entirely in the frontend JavaScript (`/js/tracking.js`). A single `track` function is called from various pages to fire pixel events. The `PageView` event is incorrectly fired explicitly on each page load, in addition to the automatic `PageView` event from `fbq('init')`. No server-side tracking exists.

### How to Use This Variant

1.  **Browse the site:** Navigate through the homepage, product pages, add items to the cart, and complete a purchase.
2.  **Use Meta Pixel Helper:** Observe the standard events firing in the browser. Notice the duplicate `PageView` events on every page load.
3.  **Check Events Manager:** See how the browser-only events are received. Note the low Event Match Quality score due to the lack of Advanced Matching.
4.  **Review the code:** Examine `/js/tracking.js` to see the simple, client-side-only implementation and the redundant `PageView` call.
