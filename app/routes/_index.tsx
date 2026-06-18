import { useMemo, useState } from "react";
import { FlaskConical, Sparkles } from "lucide-react";
import { useConfigurables } from "~/modules/configurables";
import {
  compareStores,
  type ComparisonResult,
  type GroceryItem,
  type StoreQuote,
} from "~/lib/grocery/compare";
import { AppHeader } from "~/components/grocery/AppHeader";
import { ValueProps } from "~/components/grocery/ValueProps";
import { GroceryListInput } from "~/components/grocery/GroceryListInput";
import { BestStoreCard } from "~/components/grocery/BestStoreCard";
import { StoreComparisonList } from "~/components/grocery/StoreComparisonList";
import { CheckoutSheet } from "~/components/grocery/CheckoutSheet";

let idSeq = 0;
function nextId() {
  idSeq += 1;
  return `item-${Date.now()}-${idSeq}`;
}

export function meta() {
  return [
    { title: "SmartCart AI — Grocery Price Comparison" },
    {
      name: "description",
      content:
        "Add your grocery list and let SmartCart AI find the cheapest store nearby.",
    },
  ];
}

export default function IndexPage() {
  const { config, loading } = useConfigurables();

  // ── Configurable values (with safe fallbacks while loading) ───────────────
  const appName = config?.appName || "SmartCart AI";
  const tagline =
    config?.tagline || "The AI-powered grocery savings platform.";
  const heroHeadline =
    config?.heroHeadline ||
    "Find the cheapest place to buy your groceries.";
  const heroSubheadline =
    config?.heroSubheadline ||
    "Add your list and let SmartCart AI compare real prices across nearby stores.";
  const listInputPlaceholder = config?.listInputPlaceholder || "Add an item";
  const compareCtaLabel = config?.compareCtaLabel || "Compare Prices";
  const checkoutCtaLabel = config?.checkoutCtaLabel || "Start Checkout";
  const currencySymbol = config?.currencySymbol || "$";
  const searchRadiusMiles = config?.searchRadiusMiles ?? 15;
  const showDemoDataBadge = config?.showDemoDataBadge ?? true;
  const enablePhotoInput = config?.enablePhotoInput ?? true;
  const enableVoiceInput = config?.enableVoiceInput ?? true;
  const starterListItems = config?.starterListItems ?? [];
  const valueProps = config?.valueProps ?? [];
  const footerText = config?.footerText || "";

  // ── List + comparison state ───────────────────────────────────────────────
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [checkoutQuote, setCheckoutQuote] = useState<StoreQuote | null>(null);

  function addItem(name: string) {
    const value = name.trim();
    if (!value) return;
    setItems((prev) => {
      if (prev.some((i) => i.name.toLowerCase() === value.toLowerCase())) {
        return prev;
      }
      return [...prev, { id: nextId(), name: value, qty: 1 }];
    });
    setResult(null);
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
    setResult(null);
  }

  function setQty(id: string, qty: number) {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty } : i)),
    );
    setResult(null);
  }

  function clearList() {
    setItems([]);
    setResult(null);
  }

  function runComparison() {
    setResult(compareStores(items));
  }

  const hasResults = result !== null && result.quotes.length > 0;
  const best = result?.best ?? null;

  const headingId = useMemo(() => "hero-heading", []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <AppHeader
        appName={appName}
        logoUrl={config?.logoUrl}
        searchRadiusMiles={searchRadiusMiles}
        showDemoDataBadge={showDemoDataBadge}
      />

      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Hero */}
        <section className="mb-6 text-center sm:mb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            <Sparkles className="h-3.5 w-3.5" />
            {tagline}
          </span>
          <h1
            id={headingId}
            className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl"
          >
            {heroHeadline}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">
            {heroSubheadline}
          </p>
        </section>

        {!hasResults && (
          <div className="mb-6">
            <ValueProps valueProps={valueProps} />
          </div>
        )}

        <div className="space-y-6">
          <GroceryListInput
            items={items}
            placeholder={listInputPlaceholder}
            starterSuggestions={starterListItems}
            enablePhotoInput={enablePhotoInput}
            enableVoiceInput={enableVoiceInput}
            compareCtaLabel={compareCtaLabel}
            onAdd={addItem}
            onRemove={removeItem}
            onSetQty={setQty}
            onClear={clearList}
            onCompare={runComparison}
          />

          {hasResults && best && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold tracking-tight text-slate-900">
                  Best places to shop
                </h2>
                <span className="text-sm text-slate-500">
                  {result?.itemCount} item
                  {result && result.itemCount === 1 ? "" : "s"} ·{" "}
                  {result?.quotes.length} stores
                </span>
              </div>

              <BestStoreCard
                quote={best}
                currencySymbol={currencySymbol}
                checkoutCtaLabel={checkoutCtaLabel}
                onCheckout={setCheckoutQuote}
              />

              <StoreComparisonList
                result={result!}
                currencySymbol={currencySymbol}
              />

              {(result?.hasEstimatedPrices || showDemoDataBadge) && (
                <p className="flex items-start gap-2 rounded-xl bg-slate-100 px-4 py-3 text-xs leading-relaxed text-slate-500">
                  <FlaskConical className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                  <span>
                    Prices use seeded demo data
                    {result?.hasEstimatedPrices
                      ? "; items not in our sample catalog are estimated"
                      : ""}
                    . Live retailer pricing plugs in without changing this view.
                  </span>
                </p>
              )}
            </div>
          )}
        </div>
      </main>

      {footerText && (
        <footer className="mx-auto max-w-3xl px-4 py-8 text-center text-xs text-slate-400 sm:px-6">
          {footerText}
        </footer>
      )}

      {checkoutQuote && (
        <CheckoutSheet
          quote={checkoutQuote}
          currencySymbol={currencySymbol}
          checkoutCtaLabel={checkoutCtaLabel}
          onClose={() => setCheckoutQuote(null)}
        />
      )}

      {loading && (
        <div className="pointer-events-none fixed bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-slate-900/80 px-3 py-1 text-xs text-white">
          Loading…
        </div>
      )}
    </div>
  );
}
