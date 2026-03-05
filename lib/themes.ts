export type ThemePack = {
  id: string;
  label: string;
  universeSlug: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  card: string;
  cardForeground: string;
  border: string;
  input: string;
  ring: string;
  destructive: string;
  destructiveForeground: string;
  radius: string;
  shadowCard: string;
  shadowGlow: string;
  bgStyle: string;
  buttonStyle: "glossy" | "soft" | "sleek";
  fontDisplayClass: string;
  fontBodyClass: string;
  stickerSet: string;
  patternClass: string;
  chartStroke: string;
  chartGrid: string;
};

export type ReleaseThemeOverride = {
  accent?: string;
  bgStyle?: string;
  primary?: string;
  stickerSet?: string;
  patternClass?: string;
};

export const ITEM_BACKGROUND_STYLES: Record<string, string> = {
  sparkleGradient:
    "radial-gradient(circle at 18% 18%, rgba(255, 180, 230, 0.34), transparent 22%), radial-gradient(circle at 82% 12%, rgba(249, 225, 149, 0.32), transparent 18%), linear-gradient(180deg, rgba(253,250,246,0.98), rgba(244,246,255,0.96))",
  skyCandy:
    "radial-gradient(circle at 14% 16%, rgba(170, 225, 255, 0.35), transparent 21%), radial-gradient(circle at 84% 12%, rgba(255, 222, 187, 0.34), transparent 18%), linear-gradient(180deg, rgba(247,252,255,0.98), rgba(239,244,255,0.96))",
  meadowGingham:
    "radial-gradient(circle at 16% 18%, rgba(245, 232, 198, 0.45), transparent 21%), radial-gradient(circle at 80% 12%, rgba(222, 238, 204, 0.36), transparent 18%), linear-gradient(180deg, rgba(255,252,246,0.99), rgba(247,242,229,0.96))",
  forestPaper:
    "radial-gradient(circle at 16% 18%, rgba(196, 224, 194, 0.42), transparent 21%), radial-gradient(circle at 82% 12%, rgba(255, 222, 191, 0.28), transparent 18%), linear-gradient(180deg, rgba(250,249,241,0.99), rgba(240,236,224,0.96))"
};

export const THEME_PACKS: Record<string, ThemePack> = {
  "pop-mart": {
    id: "TRINKET_POPMART",
    label: "Pop Mart",
    universeSlug: "pop-mart",
    primary: "329 91% 59%",
    primaryForeground: "0 0% 100%",
    secondary: "198 100% 93%",
    secondaryForeground: "231 35% 20%",
    accent: "43 100% 67%",
    accentForeground: "231 35% 20%",
    background: "41 58% 97%",
    foreground: "232 35% 16%",
    muted: "212 90% 95%",
    mutedForeground: "229 19% 38%",
    card: "0 0% 100%",
    cardForeground: "232 35% 16%",
    border: "213 72% 88%",
    input: "213 68% 90%",
    ring: "329 91% 59%",
    destructive: "0 78% 60%",
    destructiveForeground: "0 0% 98%",
    radius: "28px",
    shadowCard: "0 16px 42px rgba(255, 120, 177, 0.16)",
    shadowGlow: "0 10px 28px rgba(255, 214, 124, 0.28)",
    bgStyle:
      "radial-gradient(circle at 12% 14%, rgba(255, 178, 215, 0.34), transparent 22%), radial-gradient(circle at 78% 12%, rgba(156, 224, 255, 0.28), transparent 18%), radial-gradient(circle at 82% 74%, rgba(255, 223, 170, 0.33), transparent 20%), linear-gradient(180deg, rgba(251,253,255,0.98), rgba(241,248,255,0.96))",
    buttonStyle: "glossy",
    fontDisplayClass: "font-display",
    fontBodyClass: "font-body",
    stickerSet: "candywood",
    patternClass: "theme-stars",
    chartStroke: "hsl(329 91% 59%)",
    chartGrid: "rgba(255, 114, 173, 0.16)"
  },
  "calico-critters": {
    id: "TRINKET_CALICO",
    label: "Calico Critters",
    universeSlug: "calico-critters",
    primary: "28 52% 51%",
    primaryForeground: "40 33% 98%",
    secondary: "92 28% 89%",
    secondaryForeground: "125 19% 23%",
    accent: "337 66% 78%",
    accentForeground: "348 25% 22%",
    background: "41 56% 96%",
    foreground: "29 22% 19%",
    muted: "40 36% 91%",
    mutedForeground: "29 12% 37%",
    card: "41 53% 98%",
    cardForeground: "29 22% 19%",
    border: "36 35% 84%",
    input: "36 35% 88%",
    ring: "28 52% 51%",
    destructive: "0 72% 58%",
    destructiveForeground: "0 0% 98%",
    radius: "30px",
    shadowCard: "0 16px 38px rgba(137, 108, 77, 0.13)",
    shadowGlow: "0 10px 26px rgba(236, 188, 148, 0.24)",
    bgStyle:
      "radial-gradient(circle at 14% 14%, rgba(255, 228, 206, 0.34), transparent 20%), radial-gradient(circle at 80% 14%, rgba(205, 228, 185, 0.36), transparent 20%), linear-gradient(180deg, rgba(255,251,244,0.99), rgba(247,241,230,0.96))",
    buttonStyle: "soft",
    fontDisplayClass: "font-display",
    fontBodyClass: "font-body",
    stickerSet: "woodland",
    patternClass: "theme-gingham",
    chartStroke: "hsl(28 52% 51%)",
    chartGrid: "rgba(178, 136, 95, 0.15)"
  },
  neutral: {
    id: "TRINKET_NEUTRAL",
    label: "Neutral",
    universeSlug: "neutral",
    primary: "218 69% 59%",
    primaryForeground: "0 0% 100%",
    secondary: "217 52% 92%",
    secondaryForeground: "229 27% 20%",
    accent: "184 62% 50%",
    accentForeground: "0 0% 100%",
    background: "42 40% 97%",
    foreground: "226 26% 18%",
    muted: "219 34% 93%",
    mutedForeground: "226 16% 38%",
    card: "0 0% 100%",
    cardForeground: "228 28% 17%",
    border: "217 34% 87%",
    input: "217 34% 90%",
    ring: "218 69% 59%",
    destructive: "0 72% 58%",
    destructiveForeground: "0 0% 98%",
    radius: "26px",
    shadowCard: "0 16px 36px rgba(94, 118, 176, 0.14)",
    shadowGlow: "0 10px 24px rgba(125, 213, 206, 0.22)",
    bgStyle:
      "radial-gradient(circle at 15% 16%, rgba(166, 196, 255, 0.3), transparent 20%), linear-gradient(180deg, rgba(249,251,255,0.98), rgba(236,244,255,0.96))",
    buttonStyle: "sleek",
    fontDisplayClass: "font-display",
    fontBodyClass: "font-body",
    stickerSet: "woodland",
    patternClass: "theme-clouds",
    chartStroke: "hsl(218 69% 59%)",
    chartGrid: "rgba(90, 117, 210, 0.14)"
  }
};

export const RELEASE_THEME_OVERRIDES: Record<string, ReleaseThemeOverride> = {
  "labubu-forest-party": {
    accent: "327 87% 63%",
    primary: "315 78% 58%",
    patternClass: "theme-stars",
    stickerSet: "candywood",
    bgStyle: ITEM_BACKGROUND_STYLES.sparkleGradient
  },
  "hirono-garden-daydream": {
    accent: "201 87% 56%",
    primary: "203 82% 58%",
    patternClass: "theme-clouds",
    stickerSet: "moonpetal",
    bgStyle: ITEM_BACKGROUND_STYLES.skyCandy
  },
  "mokoko-sweet-bloom": {
    accent: "36 93% 62%",
    primary: "329 84% 61%",
    patternClass: "theme-stars",
    stickerSet: "candywood",
    bgStyle: ITEM_BACKGROUND_STYLES.sparkleGradient
  },
  "baby-treat-cart": {
    accent: "339 73% 78%",
    primary: "29 55% 53%",
    patternClass: "theme-bows",
    stickerSet: "meadowmilk",
    bgStyle: ITEM_BACKGROUND_STYLES.meadowGingham
  },
  "flora-rabbit-bakery-set": {
    accent: "26 54% 56%",
    primary: "35 57% 52%",
    patternClass: "theme-gingham",
    stickerSet: "woodland",
    bgStyle: ITEM_BACKGROUND_STYLES.forestPaper
  },
  "maple-cat-forest-swing": {
    accent: "130 30% 48%",
    primary: "31 50% 53%",
    patternClass: "theme-gingham",
    stickerSet: "woodland",
    bgStyle: ITEM_BACKGROUND_STYLES.forestPaper
  }
};

export function getThemePack(universeSlug: string) {
  return THEME_PACKS[universeSlug] ?? THEME_PACKS.neutral;
}

export function getResolvedTheme(universeSlug: string, releaseSlug?: string) {
  const base = getThemePack(universeSlug);
  const release = releaseSlug ? RELEASE_THEME_OVERRIDES[releaseSlug] : undefined;

  return {
    ...base,
    primary: release?.primary ?? base.primary,
    accent: release?.accent ?? base.accent,
    bgStyle: release?.bgStyle ?? base.bgStyle,
    stickerSet: release?.stickerSet ?? base.stickerSet,
    patternClass: release?.patternClass ?? base.patternClass
  };
}

export function buildThemeVariables(universeSlug: string, releaseSlug?: string, itemOverride?: { accent?: string; bgStyle?: string }) {
  const theme = getResolvedTheme(universeSlug, releaseSlug);

  return {
    "--background": theme.background,
    "--foreground": theme.foreground,
    "--card": theme.card,
    "--card-foreground": theme.cardForeground,
    "--primary": theme.primary,
    "--primary-foreground": theme.primaryForeground,
    "--secondary": theme.secondary,
    "--secondary-foreground": theme.secondaryForeground,
    "--accent": itemOverride?.accent ?? theme.accent,
    "--accent-foreground": theme.accentForeground,
    "--muted": theme.muted,
    "--muted-foreground": theme.mutedForeground,
    "--border": theme.border,
    "--input": theme.input,
    "--ring": theme.primary,
    "--destructive": theme.destructive,
    "--destructive-foreground": theme.destructiveForeground,
    "--radius": theme.radius,
    "--shadow-card": theme.shadowCard,
    "--shadow-glow": theme.shadowGlow,
    "--bg-style": itemOverride?.bgStyle ?? theme.bgStyle,
    "--chart-stroke": theme.chartStroke,
    "--chart-grid": theme.chartGrid
  } as Record<string, string>;
}
