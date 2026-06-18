import { MapPin, Star, Trophy, ArrowRight, Truck, Store as StoreIcon, ShoppingBag } from "lucide-react";
import type { StoreQuote } from "~/lib/grocery/compare";
import { formatMoney } from "~/lib/grocery/compare";
import { Badge } from "~/components/ui/badge";

const fulfillmentMeta: Record<
  string,
  { label: string; icon: typeof Truck }
> = {
  pickup: { label: "Pickup", icon: ShoppingBag },
  delivery: { label: "Delivery", icon: Truck },
  "in-store": { label: "In-store", icon: StoreIcon },
};

export function BestStoreCard({
  quote,
  currencySymbol,
  checkoutCtaLabel,
  onCheckout,
}: {
  quote: StoreQuote;
  currencySymbol: string;
  checkoutCtaLabel: string;
  onCheckout: (quote: StoreQuote) => void;
}) {
  const { store, subtotal, savingsVsHighest, savingsPercent } = quote;
  const saves = savingsVsHighest > 0;

  return (
    <section className="overflow-hidden rounded-2xl border-2 border-green-500/60 bg-white shadow-md">
      <div className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-500 px-5 py-2.5">
        <Trophy className="h-4 w-4 text-amber-300" />
        <span className="text-sm font-bold uppercase tracking-wide text-white">
          Best value
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-2xl">
              {store.badge}
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-slate-900">
                {store.name}
              </h3>
              <p className="text-sm text-slate-500">{store.blurb}</p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  {store.distanceMiles.toFixed(1)} mi
                </span>
                <span className="inline-flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  {store.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Total
            </p>
            <p className="text-3xl font-extrabold tabular-nums tracking-tight text-slate-900">
              {formatMoney(subtotal, currencySymbol)}
            </p>
          </div>
        </div>

        {store.promo && (
          <div className="mt-4">
            <Badge tone="success">{store.promo}</Badge>
          </div>
        )}

        {saves && (
          <div className="mt-4 rounded-xl bg-amber-50 px-4 py-3">
            <p className="text-sm font-semibold text-amber-800">
              You save {formatMoney(savingsVsHighest, currencySymbol)} (
              {savingsPercent.toFixed(0)}%) versus the priciest store nearby.
            </p>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {store.fulfillment.map((f) => {
            const meta = fulfillmentMeta[f];
            if (!meta) return null;
            const Icon = meta.icon;
            return (
              <Badge key={f} tone="outline">
                <Icon className="h-3.5 w-3.5" />
                {meta.label}
              </Badge>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => onCheckout(quote)}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-green-700 active:scale-[0.99]"
        >
          {checkoutCtaLabel}
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
