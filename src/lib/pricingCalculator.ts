export const HOME_BASE_AFTER = {
  variants: {
    "1 BHK": 1299,
    "2 BHK": 1899,
    "3 BHK": 2499,
  },
} as const;

export type HomeCleaningVariant = keyof typeof HOME_BASE_AFTER.variants;

export const HOME_AREA_SLABS = [
  { range: "0-500", mult: 0.85 },
  { range: "501-700", mult: 1.0 },
  { range: "701-900", mult: 1.15 },
  { range: "901-1200", mult: 1.3 },
  { range: "1201-1500", mult: 1.5 },
  { range: "1501-2000", mult: 1.8 },
  { range: "2001-2500", mult: 2.1 },
  { range: "2501-3000", mult: 2.4 },
] as const;

export type SlabRange = (typeof HOME_AREA_SLABS)[number]["range"];

export const DEFAULT_HOME_AREA_RANGE = HOME_AREA_SLABS[1].range;

export const roundRule = (x: number) => Math.ceil(x / 50) * 50 - 1;

export function displayedMrpForTarget(targetAfter: number): number {
  const k = Math.ceil((targetAfter + 1) / 50);
  const lower = ((k - 1) * 50) / 0.7;
  const upper = (k * 50) / 0.7;
  const m = Math.ceil((lower + 1) / 50);
  const disp = m * 50 - 1;
  if (disp > upper) return roundRule(targetAfter / 0.7);
  return disp;
}

export function slabFromArea(area: number | string | null | undefined): SlabRange {
  const parsed = typeof area === "string" ? Number(area) : area ?? 0;
  if (!parsed || parsed <= 0) return DEFAULT_HOME_AREA_RANGE;
  for (const slab of HOME_AREA_SLABS) {
    const [min, max] = slab.range.split("-").map(Number);
    if (parsed >= min && parsed <= max) return slab.range;
  }
  return HOME_AREA_SLABS[HOME_AREA_SLABS.length - 1].range;
}

export function multiplierFor(range: string): number {
  return HOME_AREA_SLABS.find((slab) => slab.range === range)?.mult ?? 1;
}

type CalculateHomeCleaningPriceInput = {
  variant: HomeCleaningVariant;
  areaSqft?: string | number | null;
  areaRange?: string;
};

export function calculateHomeCleaningPrice({
  variant,
  areaSqft,
  areaRange,
}: CalculateHomeCleaningPriceInput) {
  const baseAfter =
    HOME_BASE_AFTER.variants[variant] ?? HOME_BASE_AFTER.variants["1 BHK"];
  const range = areaSqft && String(areaSqft).trim()
    ? slabFromArea(areaSqft)
    : areaRange ?? DEFAULT_HOME_AREA_RANGE;
  const targetAfter = baseAfter * multiplierFor(range);
  const unitMrp = displayedMrpForTarget(targetAfter);
  const unitFinal = roundRule(0.7 * unitMrp);
  const unitSave = unitMrp - unitFinal;

  return {
    targetAfter,
    areaRange: range,
    unitMrp,
    unitFinal,
    unitSave,
  };
}

