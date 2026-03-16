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
    "radial-gradient(circle at 18% 18%, rgba(234, 246, 255, 0.95), transparent 22%), radial-gradient(circle at 82% 12%, rgba(238, 233, 255, 0.62), transparent 18%), linear-gradient(180deg, rgba(255,255,255,0.99), rgba(247,251,255,0.98))",
  skyCandy:
    "radial-gradient(circle at 14% 16%, rgba(234, 246, 255, 0.95), transparent 21%), radial-gradient(circle at 84% 12%, rgba(232, 255, 246, 0.72), transparent 18%), linear-gradient(180deg, rgba(247,251,255,0.99), rgba(255,255,255,0.97))",
  meadowGingham:
    "radial-gradient(circle at 16% 18%, rgba(232, 255, 246, 0.82), transparent 21%), radial-gradient(circle at 80% 12%, rgba(234, 246, 255, 0.76), transparent 18%), linear-gradient(180deg, rgba(255,255,255,0.99), rgba(247,251,255,0.97))",
  forestPaper:
    "radial-gradient(circle at 16% 18%, rgba(232, 255, 246, 0.78), transparent 21%), radial-gradient(circle at 82% 12%, rgba(238, 233, 255, 0.52), transparent 18%), linear-gradient(180deg, rgba(255,255,255,0.99), rgba(247,251,255,0.97))"
};

export const THEME_PACKS: Record<string, ThemePack> = {
  "pop-mart": {
    id: "TRINKET_POPMART",
    label: "Pop Mart",
    universeSlug: "pop-mart",
    primary: "203 100% 96%",
    primaryForeground: "210 24% 16%",
    secondary: "0 0% 100%",
    secondaryForeground: "210 24% 16%",
    accent: "160 100% 95%",
    accentForeground: "210 24% 16%",
    background: "207 100% 99%",
    foreground: "210 24% 16%",
    muted: "210 60% 98%",
    mutedForeground: "215 16% 32%",
    card: "0 0% 100%",
    cardForeground: "210 24% 16%",
    border: "210 37% 89%",
    input: "210 53% 93%",
    ring: "203 100% 91%",
    destructive: "0 78% 60%",
    destructiveForeground: "0 0% 98%",
    radius: "28px",
    shadowCard: "0 24px 60px rgba(31, 41, 51, 0.08)",
    shadowGlow: "0 18px 44px rgba(234, 246, 255, 0.95)",
    bgStyle:
      "radial-gradient(circle at 12% 14%, rgba(234, 246, 255, 0.95), transparent 22%), radial-gradient(circle at 78% 12%, rgba(203, 233, 255, 0.65), transparent 18%), radial-gradient(circle at 82% 74%, rgba(238, 233, 255, 0.5), transparent 20%), linear-gradient(180deg, rgba(247,251,255,0.99), rgba(255,255,255,0.97))",
    buttonStyle: "glossy",
    fontDisplayClass: "font-display",
    fontBodyClass: "font-body",
    stickerSet: "candywood",
    patternClass: "theme-stars",
    chartStroke: "#9bc9f7",
    chartGrid: "rgba(155, 201, 247, 0.22)"
  },
  "calico-critters": {
    id: "TRINKET_CALICO",
    label: "Calico Critters",
    universeSlug: "calico-critters",
    primary: "160 100% 95%",
    primaryForeground: "210 24% 16%",
    secondary: "0 0% 100%",
    secondaryForeground: "210 24% 16%",
    accent: "264 100% 96%",
    accentForeground: "210 24% 16%",
    background: "207 100% 99%",
    foreground: "210 24% 16%",
    muted: "210 60% 98%",
    mutedForeground: "215 16% 32%",
    card: "0 0% 100%",
    cardForeground: "210 24% 16%",
    border: "210 37% 89%",
    input: "210 53% 93%",
    ring: "160 100% 95%",
    destructive: "0 72% 58%",
    destructiveForeground: "0 0% 98%",
    radius: "30px",
    shadowCard: "0 24px 60px rgba(31, 41, 51, 0.08)",
    shadowGlow: "0 18px 44px rgba(232, 255, 246, 0.95)",
    bgStyle:
      "radial-gradient(circle at 14% 14%, rgba(232, 255, 246, 0.92), transparent 20%), radial-gradient(circle at 80% 14%, rgba(234, 246, 255, 0.65), transparent 20%), linear-gradient(180deg, rgba(255,255,255,0.99), rgba(247,251,255,0.97))",
    buttonStyle: "soft",
    fontDisplayClass: "font-display",
    fontBodyClass: "font-body",
    stickerSet: "woodland",
    patternClass: "theme-gingham",
    chartStroke: "#84d6bc",
    chartGrid: "rgba(132, 214, 188, 0.24)"
  },
  pop: {
    id: "TRINKET_POP",
    label: "POP",
    universeSlug: "pop",
    primary: "264 100% 96%",
    primaryForeground: "210 24% 16%",
    secondary: "0 0% 100%",
    secondaryForeground: "210 24% 16%",
    accent: "203 100% 96%",
    accentForeground: "210 24% 16%",
    background: "207 100% 99%",
    foreground: "210 24% 16%",
    muted: "210 60% 98%",
    mutedForeground: "215 16% 32%",
    card: "0 0% 100%",
    cardForeground: "210 24% 16%",
    border: "210 37% 89%",
    input: "210 53% 93%",
    ring: "264 100% 96%",
    destructive: "0 72% 58%",
    destructiveForeground: "0 0% 98%",
    radius: "28px",
    shadowCard: "0 24px 60px rgba(31, 41, 51, 0.08)",
    shadowGlow: "0 18px 44px rgba(238, 233, 255, 0.92)",
    bgStyle:
      "radial-gradient(circle at 12% 16%, rgba(238, 233, 255, 0.85), transparent 23%), radial-gradient(circle at 82% 12%, rgba(234, 246, 255, 0.7), transparent 21%), radial-gradient(circle at 82% 74%, rgba(255, 255, 255, 0.78), transparent 22%), linear-gradient(180deg, rgba(247,251,255,0.99), rgba(255,255,255,0.97))",
    buttonStyle: "soft",
    fontDisplayClass: "font-display",
    fontBodyClass: "font-body",
    stickerSet: "moonpetal",
    patternClass: "theme-clouds",
    chartStroke: "#c0b4ee",
    chartGrid: "rgba(192, 180, 238, 0.24)"
  },
  neutral: {
    id: "TRINKET_NEUTRAL",
    label: "Neutral",
    universeSlug: "neutral",
    primary: "203 100% 96%",
    primaryForeground: "210 24% 16%",
    secondary: "0 0% 100%",
    secondaryForeground: "210 24% 16%",
    accent: "160 100% 95%",
    accentForeground: "210 24% 16%",
    background: "207 100% 99%",
    foreground: "210 24% 16%",
    muted: "210 60% 98%",
    mutedForeground: "215 16% 32%",
    card: "0 0% 100%",
    cardForeground: "210 24% 16%",
    border: "210 37% 89%",
    input: "210 53% 93%",
    ring: "203 100% 91%",
    destructive: "0 72% 58%",
    destructiveForeground: "0 0% 98%",
    radius: "26px",
    shadowCard: "0 24px 60px rgba(31, 41, 51, 0.08)",
    shadowGlow: "0 18px 44px rgba(234, 246, 255, 0.9)",
    bgStyle:
      "radial-gradient(circle at 15% 16%, rgba(234, 246, 255, 0.9), transparent 20%), linear-gradient(180deg, rgba(247,251,255,0.99), rgba(255,255,255,0.97))",
    buttonStyle: "soft",
    fontDisplayClass: "font-display",
    fontBodyClass: "font-body",
    stickerSet: "woodland",
    patternClass: "theme-clouds",
    chartStroke: "#9bc9f7",
    chartGrid: "rgba(155, 201, 247, 0.24)"
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
  const brandAccent = "264 100% 96%";
  const deepMoss = "210 24% 16%";
  const unifiedBackgroundStyle =
    "radial-gradient(circle at 16% 16%, rgba(234, 246, 255, 0.88), transparent 22%), radial-gradient(circle at 82% 11%, rgba(232, 255, 246, 0.78), transparent 18%), linear-gradient(180deg, rgba(247,251,255,0.99), rgba(255,255,255,0.98))";

  return {
    "--background": theme.background,
    "--foreground": theme.foreground,
    "--card": theme.card,
    "--card-foreground": theme.cardForeground,
    "--primary": deepMoss,
    "--primary-foreground": "0 0% 100%",
    "--secondary": theme.secondary,
    "--secondary-foreground": theme.secondaryForeground,
    "--accent": brandAccent,
    "--accent-foreground": deepMoss,
    "--muted": theme.muted,
    "--muted-foreground": theme.mutedForeground,
    "--border": theme.border,
    "--input": theme.input,
    "--ring": deepMoss,
    "--destructive": theme.destructive,
    "--destructive-foreground": theme.destructiveForeground,
    "--radius": theme.radius,
    "--shadow-card": theme.shadowCard,
    "--shadow-glow": theme.shadowGlow,
    "--bg-style": unifiedBackgroundStyle,
    "--chart-stroke": theme.chartStroke,
    "--chart-grid": theme.chartGrid
  } as Record<string, string>;
}
