/* =============================================================================
 * SmartCart AI — Price Comparison Engine
 * -----------------------------------------------------------------------------
 * Pure, deterministic ranking logic. Decoupled from the MOCK data layer so it
 * can be reused unchanged once real retailer pricing is wired in: feed it a
 * list of stores and a price-lookup function and it returns a ranked,
 * savings-annotated comparison.
 * ========================================================================== */

import {
  basePriceForItem,
  getMockStores,
  isKnownItem,
  type Store,
} from "./mock-data";

export interface GroceryItem {
  id: string;
  name: string;
  /** Quantity multiplier (defaults to 1). */
  qty: number;
}

export interface LineItemPrice {
  itemId: string;
  name: string;
  qty: number;
  unitPrice: number;
  lineTotal: number;
  /** False when the price is estimated (item not in the catalog). */
  known: boolean;
}

export interface StoreQuote {
  store: Store;
  lineItems: LineItemPrice[];
  subtotal: number;
  /** Savings vs. the most expensive store in the set (>= 0). */
  savingsVsHighest: number;
  /** Savings as a percentage of the most expensive store. */
  savingsPercent: number;
  /** Rank, 1 = best value. */
  rank: number;
  isBest: boolean;
}

export interface ComparisonResult {
  quotes: StoreQuote[];
  best: StoreQuote | null;
  highestTotal: number;
  itemCount: number;
  /** True if any line item used an estimated (non-catalog) price. */
  hasEstimatedPrices: boolean;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * Compute a full price comparison across stores for a grocery list.
 *
 * @param items   The user's grocery list.
 * @param stores  Stores to compare (defaults to the MOCK nearby stores).
 * @param priceFn Base unit-price lookup (defaults to the MOCK catalog).
 */
export function compareStores(
  items: GroceryItem[],
  stores: Store[] = getMockStores(),
  priceFn: (name: string) => number = basePriceForItem,
): ComparisonResult {
  const cleanItems = items.filter((i) => i.name.trim().length > 0);

  if (cleanItems.length === 0 || stores.length === 0) {
    return {
      quotes: [],
      best: null,
      highestTotal: 0,
      itemCount: cleanItems.length,
      hasEstimatedPrices: false,
    };
  }

  let hasEstimatedPrices = false;

  const rawQuotes = stores.map((store) => {
    const lineItems: LineItemPrice[] = cleanItems.map((item) => {
      const qty = item.qty > 0 ? item.qty : 1;
      const unitPrice = round2(priceFn(item.name) * store.priceIndex);
      const known = isKnownItem(item.name);
      if (!known) hasEstimatedPrices = true;
      return {
        itemId: item.id,
        name: item.name,
        qty,
        unitPrice,
        lineTotal: round2(unitPrice * qty),
        known,
      };
    });

    const subtotal = round2(
      lineItems.reduce((sum, li) => sum + li.lineTotal, 0),
    );

    return { store, lineItems, subtotal };
  });

  const highestTotal = Math.max(...rawQuotes.map((q) => q.subtotal));

  // Sort by subtotal, tie-break by distance, then rating.
  const sorted = [...rawQuotes].sort((a, b) => {
    if (a.subtotal !== b.subtotal) return a.subtotal - b.subtotal;
    if (a.store.distanceMiles !== b.store.distanceMiles)
      return a.store.distanceMiles - b.store.distanceMiles;
    return b.store.rating - a.store.rating;
  });

  const quotes: StoreQuote[] = sorted.map((q, idx) => {
    const savingsVsHighest = round2(highestTotal - q.subtotal);
    const savingsPercent =
      highestTotal > 0 ? round2((savingsVsHighest / highestTotal) * 100) : 0;
    return {
      ...q,
      savingsVsHighest,
      savingsPercent,
      rank: idx + 1,
      isBest: idx === 0,
    };
  });

  return {
    quotes,
    best: quotes[0] ?? null,
    highestTotal,
    itemCount: cleanItems.length,
    hasEstimatedPrices,
  };
}

/** Format a number as a currency string with the configured symbol. */
export function formatMoney(amount: number, symbol = "$"): string {
  return `${symbol}${amount.toFixed(2)}`;
}
