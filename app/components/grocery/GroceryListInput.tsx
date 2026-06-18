import { useState } from "react";
import { Camera, Mic, Plus, X, Trash2, Sparkles } from "lucide-react";
import { cn } from "~/lib/utils";
import type { GroceryItem } from "~/lib/grocery/compare";

interface GroceryListInputProps {
  items: GroceryItem[];
  placeholder: string;
  starterSuggestions: string[];
  enablePhotoInput: boolean;
  enableVoiceInput: boolean;
  compareCtaLabel: string;
  onAdd: (name: string) => void;
  onRemove: (id: string) => void;
  onSetQty: (id: string, qty: number) => void;
  onClear: () => void;
  onCompare: () => void;
}

export function GroceryListInput({
  items,
  placeholder,
  starterSuggestions,
  enablePhotoInput,
  enableVoiceInput,
  compareCtaLabel,
  onAdd,
  onRemove,
  onSetQty,
  onClear,
  onCompare,
}: GroceryListInputProps) {
  const [draft, setDraft] = useState("");
  const [stubNote, setStubNote] = useState<string | null>(null);

  function submitDraft() {
    const value = draft.trim();
    if (!value) return;
    onAdd(value);
    setDraft("");
  }

  const availableSuggestions = starterSuggestions.filter(
    (s) =>
      !items.some(
        (i) => i.name.trim().toLowerCase() === s.trim().toLowerCase(),
      ),
  );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold tracking-tight text-slate-900">
          Your grocery list
        </h2>
        {items.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex flex-1 items-center rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-green-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-green-500/20">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                submitDraft();
              }
            }}
            placeholder={placeholder}
            aria-label="Add a grocery item"
            className="w-full bg-transparent py-3 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={submitDraft}
            aria-label="Add item"
            className="ml-2 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-600 text-white transition-colors hover:bg-green-700"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        {(enablePhotoInput || enableVoiceInput) && (
          <div className="flex gap-2">
            {enablePhotoInput && (
              <button
                type="button"
                onClick={() =>
                  setStubNote("Photo list scanning is coming soon.")
                }
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 sm:flex-none"
              >
                <Camera className="h-4 w-4" />
                <span className="sm:hidden md:inline">Photo</span>
              </button>
            )}
            {enableVoiceInput && (
              <button
                type="button"
                onClick={() => setStubNote("Voice input is coming soon.")}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 sm:flex-none"
              >
                <Mic className="h-4 w-4" />
                <span className="sm:hidden md:inline">Voice</span>
              </button>
            )}
          </div>
        )}
      </div>

      {stubNote && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          {stubNote}
        </p>
      )}

      {availableSuggestions.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
            Quick add
          </p>
          <div className="flex flex-wrap gap-2">
            {availableSuggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onAdd(s)}
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-green-400 hover:bg-green-50 hover:text-green-700"
              >
                <Plus className="h-3.5 w-3.5" />
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5">
        {items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/60 px-4 py-8 text-center">
            <p className="text-sm font-medium text-slate-600">
              Your list is empty
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Add items above, then compare prices across nearby stores.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-100">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 bg-white px-4 py-3"
              >
                <span className="flex-1 truncate text-sm font-medium text-slate-800">
                  {item.name}
                </span>
                <div className="flex items-center gap-1 rounded-lg border border-slate-200">
                  <button
                    type="button"
                    aria-label={`Decrease quantity of ${item.name}`}
                    onClick={() => onSetQty(item.id, Math.max(1, item.qty - 1))}
                    className="h-7 w-7 text-slate-500 transition-colors hover:bg-slate-100"
                  >
                    –
                  </button>
                  <span className="w-7 text-center text-sm font-semibold tabular-nums text-slate-800">
                    {item.qty}
                  </span>
                  <button
                    type="button"
                    aria-label={`Increase quantity of ${item.name}`}
                    onClick={() => onSetQty(item.id, item.qty + 1)}
                    className="h-7 w-7 text-slate-500 transition-colors hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  aria-label={`Remove ${item.name}`}
                  onClick={() => onRemove(item.id)}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="button"
        disabled={items.length === 0}
        onClick={onCompare}
        className={cn(
          "mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-base font-semibold transition-all",
          items.length === 0
            ? "cursor-not-allowed bg-slate-100 text-slate-400"
            : "bg-green-600 text-white shadow-sm hover:bg-green-700 active:scale-[0.99]",
        )}
      >
        <Sparkles className="h-5 w-5" />
        {compareCtaLabel}
        {items.length > 0 && (
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-sm">
            {items.length}
          </span>
        )}
      </button>
    </section>
  );
}
