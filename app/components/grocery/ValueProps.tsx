import { TrendingDown, Scale, CalendarCheck } from "lucide-react";
import type { TValueProp } from "~/modules/configurables";

const icons = [Scale, TrendingDown, CalendarCheck];

export function ValueProps({ valueProps }: { valueProps: TValueProp[] }) {
  if (!valueProps || valueProps.length === 0) return null;

  return (
    <section className="grid gap-3 sm:grid-cols-3">
      {valueProps.map((vp, i) => {
        const Icon = icons[i % icons.length];
        return (
          <div
            key={`${vp.title}-${i}`}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-3 text-sm font-bold text-slate-900">
              {vp.title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-500">
              {vp.description}
            </p>
          </div>
        );
      })}
    </section>
  );
}
