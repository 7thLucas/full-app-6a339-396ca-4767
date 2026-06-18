/*
 * Default Configurable Data — seeded into Mongo on first boot.
 *
 * BEFORE EDITING: read ./RULES.md (especially R5: schema and defaults must
 * stay in sync) and ./configurables.schema.ts. For per-type schema and
 * default-value samples, see RULES.md §5 "Field Type Reference".
 */

export type TBrandColor = {
  primary: string;
  secondary: string;
  accent: string;
};

export type TValueProp = {
  title: string;
  description: string;
};

export type TDefaultConfigurableData = {
  appName: string;
  logoUrl: string;
  brandColor: TBrandColor;
  tagline?: string;
  heroHeadline?: string;
  heroSubheadline?: string;
  listInputPlaceholder?: string;
  compareCtaLabel?: string;
  checkoutCtaLabel?: string;
  searchRadiusMiles?: number;
  currencySymbol?: string;
  showDemoDataBadge?: boolean;
  enablePhotoInput?: boolean;
  enableVoiceInput?: boolean;
  starterListItems?: string[];
  valueProps?: TValueProp[];
  footerText?: string;
};

export const defaultConfigurablesData: TDefaultConfigurableData = {
  appName: "SmartCart AI",
  logoUrl: "FILL_LOGO_URL_HERE",
  brandColor: {
    primary: "#16A34A",
    secondary: "#0F172A",
    accent: "#F59E0B",
  },
  tagline: "The AI-powered grocery savings platform.",
  heroHeadline: "Find the cheapest place to buy your groceries.",
  heroSubheadline:
    "Add your list and let SmartCart AI compare real prices across nearby stores. We point you to the best total — and how much you save.",
  listInputPlaceholder: "Add an item (e.g. 2 lb chicken breast)",
  compareCtaLabel: "Compare Prices",
  checkoutCtaLabel: "Start Checkout",
  searchRadiusMiles: 15,
  currencySymbol: "$",
  showDemoDataBadge: true,
  enablePhotoInput: true,
  enableVoiceInput: true,
  starterListItems: [
    "Milk",
    "Eggs",
    "Bread",
    "Chicken breast",
    "Bananas",
    "Pasta",
    "Tomatoes",
    "Coffee",
  ],
  valueProps: [
    {
      title: "Compare every store at once",
      description:
        "One list, every nearby store priced instantly. No tab-juggling, no guesswork.",
    },
    {
      title: "Know your real savings",
      description:
        "See your total at each store and exactly how much the best option saves you.",
    },
    {
      title: "Built for your weekly run",
      description:
        "Distance, price, and promotions ranked together so the smart pick is obvious.",
    },
  ],
  footerText:
    "SmartCart AI compares grocery prices so you keep more of every dollar.",
};
