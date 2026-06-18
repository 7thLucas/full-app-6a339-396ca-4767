import { useState } from "react";
import { X, ShoppingBag, Truck, Store as StoreIcon, CheckCircle2, MapPin } from "lucide-react";
import type { StoreQuote } from "~/lib/grocery/compare";
import { formatMoney } from "~/lib/grocery/compare";
import { cn } from "~/lib/utils";

type Method = "pickup" | "delivery" | "in-store";

const methodMeta: Record<Method, { label: string; icon: typeof Truck; desc: string }> = {
  pickup: { label: "Curbside pickup", icon: ShoppingBag, desc: "Ready in ~1 hour" },
  delivery: { label: "Home delivery", icon: Truck, desc: "Same-day available" },
  "in-store": { label: "Shop in store", icon: StoreIcon, desc: "Bring your list" },
};

/**
 * Smart-checkout FOUNDATION (MVP).
 * Captures fulfillment intent for the winning store and confirms. Real payment,
 * order placement, and the delivery marketplace are phase-2 — this lays the UI
 * and data foundation so they can be wired in without restructuring.
 */
export function CheckoutSheet({
  quote,
  currencySymbol,
  checkoutCtaLabel,
  onClose,
}: {
  quote: StoreQuote;
  currencySymbol: string;
  checkoutCtaLabel: string;
  onClose: () => void;
}) {
  const available = quote.store.fulfillment;
  const [method, setMethod] = useState<Method>(available[0] ?? "in-store");
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Close checkout"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-md rounded-t-2xl bg-white p-5 shadow-xl sm:rounded-2xl sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            {confirmed ? "Order confirmed" : "Checkout"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {confirmed ? (
          <div className="py-4 text-center">
            <CheckCircle2 className="mx-auto h-14 w-14 text-green-500" />
            <p className="mt-3 text-base font-semibold text-slate-900">
              You&apos;re all set at {quote.store.name}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {methodMeta[method].label} · {formatMoney(quote.subtotal, currencySymbol)}
            </p>
            <p className="mt-3 text-xs text-slate-400">
              Demo checkout — payment and live order placement arrive in a later phase.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-5 w-full rounded-xl bg-green-600 px-4 py-3 text-base font-semibold text-white hover:bg-green-700"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
              <span className="text-2xl">{quote.store.badge}</span>
              <div className="flex-1">
                <p className="font-semibold text-slate-900">{quote.store.name}</p>
                <p className="inline-flex items-center gap-1 text-xs text-slate-500">
                  <MapPin className="h-3.5 w-3.5" />
                  {quote.store.distanceMiles.toFixed(1)} mi away
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">Total</p>
                <p className="text-lg font-bold tabular-nums text-slate-900">
                  {formatMoney(quote.subtotal, currencySymbol)}
                </p>
              </div>
            </div>

            <p className="mb-2 mt-5 text-sm font-semibold text-slate-700">
              How would you like to get it?
            </p>
            <div className="space-y-2">
              {available.map((m) => {
                const meta = methodMeta[m];
                const Icon = meta.icon;
                const selected = method === m;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMethod(m)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors",
                      selected
                        ? "border-green-500 bg-green-50"
                        : "border-slate-200 bg-white hover:border-slate-300",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-5 w-5",
                        selected ? "text-green-600" : "text-slate-400",
                      )}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900">
                        {meta.label}
                      </p>
                      <p className="text-xs text-slate-500">{meta.desc}</p>
                    </div>
                    <span
                      className={cn(
                        "h-4 w-4 rounded-full border-2",
                        selected
                          ? "border-green-500 bg-green-500"
                          : "border-slate-300",
                      )}
                    />
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setConfirmed(true)}
              className="mt-5 w-full rounded-xl bg-green-600 px-4 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-green-700"
            >
              {checkoutCtaLabel}
            </button>
            <p className="mt-2 text-center text-xs text-slate-400">
              Demo flow — no payment is taken.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
