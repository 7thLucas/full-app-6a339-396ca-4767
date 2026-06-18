## Design Guidelines — SmartCart AI

### Brand Personality
Smart, clean, trustworthy, and frictionless. Feels like a premium fintech/travel-comparison product (Google Flights energy) applied to groceries. Confident whitespace, clear hierarchy, savings highlighted.

### Color Palette
- Primary (Fresh Green): #16A34A — savings, freshness, "go", positive actions
- Primary Dark: #15803D — hover/active states
- Accent (Savings Gold): #F59E0B — highlight best deals, savings badges, CTA emphasis
- Ink / Text: #0F172A (slate-900) primary text, #475569 (slate-600) secondary
- Surface: #FFFFFF cards, #F8FAFC (slate-50) app background
- Border: #E2E8F0 (slate-200)
- Success: #16A34A | Warning: #F59E0B | Danger: #DC2626

### Typography
- Font: Inter (or system sans-serif fallback)
- Headings: bold, tight tracking. H1 ~32-40px, H2 ~24px, H3 ~18px
- Body: 14-16px, slate-600/900. Numbers/prices: tabular, slightly heavier weight to emphasize totals
- Best-store totals get the largest, boldest treatment

### Layout & Elevation
- Generous spacing, 16-24px gutters. Rounded corners: cards 12-16px, buttons 8-10px
- Soft shadows for elevation on cards (subtle, not heavy). Best-store recommendation card gets a slightly stronger elevation + green/gold accent border
- Mobile-first responsive; comfortable tap targets

### Components
- Grocery list input: prominent text field with "add item" affordance; chips/rows for added items. Photo & voice entry shown as secondary buttons (stubbed).
- Store comparison: ranked list/cards, each showing store name, distance, total price, and savings vs. most expensive. Top card = "Best Value" badge in savings gold.
- Recommendation: hero card with the winning store, its total, estimated savings, and CTA ("Shop here" / "Start checkout").
- Badges & pills for distance, savings %, promotions.
- Clear empty states and a visible "mock/demo data" indicator where seeded data is used.

### Tone in UI copy
Plain, encouraging, savings-forward. e.g. "You save $14.30 by shopping at FreshMart." Avoid jargon and gimmicks.