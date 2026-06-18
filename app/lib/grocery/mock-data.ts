/* =============================================================================
 * SmartCart AI — MOCK / DEMO DATA LAYER
 * -----------------------------------------------------------------------------
 * ⚠️  THIS IS SEEDED DEMO DATA, NOT LIVE PRICING.
 *
 * There is no public, free, real-time multi-retailer grocery price API, so the
 * MVP ships with realistic seeded store + catalog data. The comparison engine
 * (see ./compare.ts) is intentionally decoupled from this file: it consumes the
 * `Store[]` and a price-lookup function. To go live, replace `getMockStores()`
 * and `priceForItem()` with calls to a real retailer pricing API that returns
 * the same shapes — the UI and ranking logic do not need to change.
 *
 * Search for "MOCK" across the codebase to find every swap point.
 * ========================================================================== */

export interface Store {
  id: string;
  name: string;
  /** Short retailer descriptor shown under the name. */
  blurb: string;
  /** Distance from the user's home, in miles (seeded). */
  distanceMiles: number;
  /** A relative price index; 1.0 == baseline. Lower = cheaper overall. */
  priceIndex: number;
  /** Customer rating out of 5 (seeded). */
  rating: number;
  /** Fulfillment options available at this store. */
  fulfillment: Array<"pickup" | "delivery" | "in-store">;
  /** Optional active promotion shown as a pill. */
  promo?: string;
  /** Emoji/badge used as a lightweight store avatar. */
  badge: string;
}

/**
 * MOCK: participating stores within the user's radius.
 * Replace with a real "nearby stores" lookup keyed by user location + radius.
 */
export function getMockStores(): Store[] {
  return [
    {
      id: "freshmart",
      name: "FreshMart",
      blurb: "Everyday low prices",
      distanceMiles: 2.4,
      priceIndex: 0.92,
      rating: 4.6,
      fulfillment: ["pickup", "delivery", "in-store"],
      promo: "10% off produce this week",
      badge: "🥬",
    },
    {
      id: "valuegrocer",
      name: "Value Grocer",
      blurb: "Warehouse savings",
      distanceMiles: 6.1,
      priceIndex: 0.88,
      rating: 4.3,
      fulfillment: ["pickup", "in-store"],
      promo: "Bulk pricing",
      badge: "📦",
    },
    {
      id: "greenbasket",
      name: "Green Basket",
      blurb: "Organic & fresh",
      distanceMiles: 3.8,
      priceIndex: 1.12,
      rating: 4.8,
      fulfillment: ["pickup", "delivery", "in-store"],
      badge: "🌿",
    },
    {
      id: "cornerstop",
      name: "Corner Stop",
      blurb: "Quick & nearby",
      distanceMiles: 0.9,
      priceIndex: 1.18,
      rating: 4.1,
      fulfillment: ["in-store"],
      badge: "🏪",
    },
    {
      id: "metrofoods",
      name: "Metro Foods",
      blurb: "Big selection",
      distanceMiles: 8.7,
      priceIndex: 0.97,
      rating: 4.4,
      fulfillment: ["pickup", "delivery", "in-store"],
      promo: "Free delivery over $35",
      badge: "🛒",
    },
  ];
}

/**
 * MOCK: a small catalog of base prices keyed by normalized item name.
 * The comparison engine multiplies these by each store's priceIndex.
 * Replace with a real per-store SKU price lookup.
 */
const MOCK_BASE_PRICES: Record<string, number> = {
  milk: 3.49,
  eggs: 3.99,
  bread: 2.79,
  "chicken breast": 6.49,
  bananas: 1.29,
  pasta: 1.59,
  tomatoes: 2.89,
  coffee: 8.99,
  rice: 4.49,
  apples: 3.19,
  cheese: 5.29,
  butter: 4.19,
  cereal: 4.59,
  yogurt: 3.69,
  onions: 1.79,
  potatoes: 3.29,
  "orange juice": 4.29,
  "olive oil": 9.49,
  sugar: 2.99,
  flour: 2.49,
  "ground beef": 7.29,
  salmon: 11.99,
  lettuce: 1.99,
  carrots: 1.49,
  "peanut butter": 4.79,
};

const DEFAULT_BASE_PRICE = 3.5;

/** Normalize a free-text item into a catalog key (strips quantities/units). */
export function normalizeItemName(raw: string): string {
  return raw
    .toLowerCase()
    .replace(
      /\b\d+(\.\d+)?\s*(lb|lbs|oz|kg|g|ct|count|pack|packs|x|dozen|gal|gallon|l|ml)?\b/g,
      "",
    )
    .replace(/[^a-z\s]/g, "")
    .trim()
    .replace(/\s+/g, " ");
}

/**
 * MOCK: deterministic base price for a free-text grocery item.
 * Falls back to a stable pseudo-price derived from the item name so unknown
 * items still produce sensible, repeatable comparisons in the demo.
 */
export function basePriceForItem(rawItem: string): number {
  const key = normalizeItemName(rawItem);
  if (key in MOCK_BASE_PRICES) return MOCK_BASE_PRICES[key];

  // Stable fallback: hash the name into a price between $1.50 and $9.50.
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  const fraction = (hash % 800) / 100; // 0.00 – 7.99
  return Math.round((1.5 + fraction) * 100) / 100;
}

/** True when the catalog has a known price for this item (vs. estimated). */
export function isKnownItem(rawItem: string): boolean {
  return normalizeItemName(rawItem) in MOCK_BASE_PRICES;
}
