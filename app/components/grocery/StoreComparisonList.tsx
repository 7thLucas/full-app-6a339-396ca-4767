import { useState } from "react";
import { MapPin, Star, ChevronDown, ChevronUp } from "lucide-react";
import type { ComparisonResult, StoreQuote } from "~/lib/grocery/compare";
import { formatMoney } from "~/lib/grocery/compare";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";

type SortKey = "price" | "distance";

function AlternativeRow({
  quote,
  currencySymbol,
}: {
  quote: StoreQuote;
  currencySymbol: string;
}) {
  const [open, setOpen] = useState(false);
  const { store, subtotal, savingsVsHighest, savingsPercent } = quote;

  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-lg">
          {store.badge}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate font-semibold text-slate-900">
              {store.name}
            </span>
            {store.promo && <Badge tone="savings">Promo</Badge>}
          </div>
          <div className="mt-0.5 flex items-center gap-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {store.distanceMiles.toFixed(1)} mi
            </span>
            <span className="inline-flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              {store.rating.toFixed(1)}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold tabular-nums text-slate-900">
            {formatMoney(subtotal, currencySymbol)}
          </p>
          {savingsVsHighest > 0 ? (
            <p className="text-xs font-medium text-green-600">
              save {formatMoney(savingsVsHighest, currencySymbol)} ·{" "}
              {savingsPercent.toFixed(0)}%
            </p>
          ) : (
            <p className="text-xs font-medium text-slate-400">priciest</p>
          )}
        </div>
        {open ? (
          <ChevronUp className="h-4 w-4 shrink-0 text-slate-400" />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
        )}
      </button>

      {open && (
        <div className="border-t border-slate-100 px-4 py-3">
          <ul className="space-y-1.5">
            {quote.lineItems.map((li) => (
              <li
                key={li.itemId}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-slate-600">
                  {li.name}
                  {li.qty > 1 && (
                    <span className="text-slate-400"> ×{li.qty}</span>
                  )}
                  {!li.known && (
                    <span className="ml-1 text-xs text-amber-600">(est.)</span>
                  )}
                </span>
                <span className="font-medium tabular-nums text-slate-800">
                  {formatMoney(li.lineTotal, currencySymbol)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function StoreComparisonList({
  result,
  currencySymbol,
}: {
  result: ComparisonResult;
  currencySymbol: string;
}) {
  const [sort, setSort] = useState<SortKey>("price");

  // The best store is rendered separately in the hero card; here we show the
  // ranked alternatives.
  const alternatives = result.quotes.filter((q) => !q.isBest);

  const sorted = [...alternatives].sort((a, b) =>
    sort === "price"
      ? a.subtotal - b.subtotal
      : a.store.distanceMiles - b.store.distanceMiles,
  );

  if (alternatives.length === 0) return null;

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900">
          Other stores nearby
        </h3>
        <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
          {(["price", "distance"] as SortKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setSort(key)}
              className={cn(
                "rounded-md px-3 py-1 text-xs font-semibold capitalize transition-colors",
                sort === key
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700",
              )}
            >
              {key}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        {sorted.map((quote) => (
          <AlternativeRow
            key={quote.store.id}
            quote={quote}
            currencySymbol={currencySymbol}
          />
        ))}
      </div>
    </section>
  );
}
