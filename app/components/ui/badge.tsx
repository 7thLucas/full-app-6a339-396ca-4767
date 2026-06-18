import { cn } from "~/lib/utils";

type BadgeTone = "neutral" | "savings" | "success" | "muted" | "outline";

const toneStyles: Record<BadgeTone, string> = {
  neutral: "bg-slate-100 text-slate-700",
  savings: "bg-amber-100 text-amber-800",
  success: "bg-green-100 text-green-800",
  muted: "bg-slate-50 text-slate-500",
  outline: "border border-slate-200 text-slate-600 bg-white",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold leading-5",
        toneStyles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
