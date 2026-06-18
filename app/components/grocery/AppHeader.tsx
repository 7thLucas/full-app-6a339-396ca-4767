import { ShoppingCart, FlaskConical } from "lucide-react";

export function AppHeader({
  appName,
  logoUrl,
  searchRadiusMiles,
  showDemoDataBadge,
}: {
  appName: string;
  logoUrl?: string;
  searchRadiusMiles: number;
  showDemoDataBadge: boolean;
}) {
  const hasLogo =
    typeof logoUrl === "string" &&
    logoUrl.length > 0 &&
    !logoUrl.startsWith("FILL_");

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
          {hasLogo ? (
            <img
              src={logoUrl}
              alt={`${appName} logo`}
              className="h-8 w-8 rounded-lg object-contain"
            />
          ) : (
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-white">
              <ShoppingCart className="h-5 w-5" />
            </span>
          )}
          <span className="text-lg font-extrabold tracking-tight text-slate-900">
            {appName}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {showDemoDataBadge && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
              <FlaskConical className="h-3.5 w-3.5" />
              Demo data
            </span>
          )}
          <span className="hidden rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 sm:inline">
            within {searchRadiusMiles} mi
          </span>
        </div>
      </div>
    </header>
  );
}
