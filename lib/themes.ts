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

export const THEME_PACKS: Record<string, ThemePack> = {
  "pop-mart": {
    id: "POPMART_THEME",
    label: "Pop Mart",
    universeSlug: "pop-mart",
    primary: "329 90% 60%",
    primaryForeground: "0 0% 100%",
    secondary: "196 100% 92%",
    secondaryForeground: "221 39% 18%",
    accent: "47 100% 66%",
    accentForeground: "221 39% 18%",
    background: "208 100% 98%",
    foreground: "232 35% 16%",
    muted: "217 91% 95%",
    mutedForeground: "229 20% 38%",
    card: "0 0% 100%",
    cardForeground: "232 35% 16%",
    border: "212 80% 88%",
    input: "212 80% 90%",
    ring: "329 90% 60%",
    destructive: "0 82% 61%",
    destructiveForeground: "0 0% 98%",
    radius: "28px",
    shadowCard: "0 18px 48px rgba(255, 98, 171, 0.18)",
    shadowGlow: "0 12px 36px rgba(255, 212, 74, 0.28)",
    bgStyle:
      "radial-gradient(circle at 15% 18%, rgba(255, 132, 206, 0.30), transparent 21%), radial-gradient(circle at 80% 12%, rgba(255, 221, 128, 0.35), transparent 18%), radial-gradient(circle at 74% 72%, rgba(143, 221, 255, 0.22), transparent 20%), linear-gradient(180deg, rgba(250,252,255,0.98), rgba(235,246,255,0.96))",
    buttonStyle: "glossy",
    fontDisplayClass: "font-display",
    fontBodyClass: "font-body",
    stickerSet: "sparklepop",
    patternClass: "theme-stars",
    chartStroke: "hsl(329 90% 60%)",
    chartGrid: "rgba(255, 109, 172, 0.16)"
  },
  "calico-critters": {
    id: "CALICO_THEME",
    label: "Calico Critters",
    universeSlug: "calico-critters",
    primary: "24 57% 52%",
    primaryForeground: "40 33% 98%",
    secondary: "95 31% 88%",
    secondaryForeground: "138 18% 22%",
    accent: "339 72% 78%",
    accentForeground: "355 18% 18%",
    background: "37 45% 97%",
    foreground: "30 21% 18%",
    muted: "44 34% 92%",
    mutedForeground: "30 10% 38%",
    card: "37 52% 99%",
    cardForeground: "30 21% 18%",
    border: "34 38% 84%",
    input: "34 38% 88%",
    ring: "24 57% 52%",
    destructive: "0 72% 58%",
    destructiveForeground: "0 0% 98%",
    radius: "30px",
    shadowCard: "0 18px 40px rgba(128, 98, 68, 0.12)",
    shadowGlow: "0 12px 30px rgba(255, 201, 167, 0.24)",
    bgStyle:
      "radial-gradient(circle at 18% 16%, rgba(255, 224, 213, 0.38), transparent 21%), radial-gradient(circle at 78% 8%, rgba(212, 231, 195, 0.42), transparent 20%), linear-gradient(180deg, rgba(255,250,244,0.98), rgba(247,240,229,0.96))",
    buttonStyle: "soft",
    fontDisplayClass: "font-display",
    fontBodyClass: "font-body",
    stickerSet: "ginghamgarden",
    patternClass: "theme-gingham",
    chartStroke: "hsl(24 57% 52%)",
    chartGrid: "rgba(188, 145, 110, 0.15)"
  },
  other: {
    id: "GENERIC_THEME",
    label: "Other",
    universeSlug: "other",
    primary: "224 74% 61%",
    primaryForeground: "0 0% 100%",
    secondary: "216 52% 92%",
    secondaryForeground: "229 27% 20%",
    accent: "184 71% 48%",
    accentForeground: "0 0% 100%",
    background: "222 44% 98%",
    foreground: "228 28% 17%",
    muted: "219 34% 93%",
    mutedForeground: "226 16% 38%",
    card: "0 0% 100%",
    cardForeground: "228 28% 17%",
    border: "217 34% 87%",
    input: "217 34% 90%",
    ring: "224 74% 61%",
    destructive: "0 72% 58%",
    destructiveForeground: "0 0% 98%",
    radius: "26px",
    shadowCard: "0 18px 42px rgba(71, 96, 189, 0.14)",
    shadowGlow: "0 12px 30px rgba(96, 222, 214, 0.24)",
    bgStyle:
      "radial-gradient(circle at 15% 16%, rgba(166, 196, 255, 0.30), transparent 20%), radial-gradient(circle at 83% 10%, rgba(168, 255, 233, 0.28), transparent 18%), linear-gradient(180deg, rgba(249,251,255,0.98), rgba(236,244,255,0.96))",
    buttonStyle: "sleek",
    fontDisplayClass: "font-display",
    fontBodyClass: "font-body",
    stickerSet: "pixelparty",
    patternClass: "theme-clouds",
    chartStroke: "hsl(224 74% 61%)",
    chartGrid: "rgba(90, 117, 210, 0.14)"
  }
};

export const RELEASE_THEME_OVERRIDES: Record<string, ReleaseThemeOverride> = {
  skullpanda: {
    accent: "270 83% 66%",
    primary: "258 73% 58%",
    bgStyle:
      "radial-gradient(circle at 18% 16%, rgba(149, 112, 255, 0.28), transparent 20%), radial-gradient(circle at 82% 12%, rgba(255, 149, 207, 0.28), transparent 18%), linear-gradient(180deg, rgba(247,243,255,0.98), rgba(235,242,255,0.96))",
    stickerSet: "moonparade",
    patternClass: "theme-stars"
  },
  dimoo: {
    accent: "197 91% 55%",
    primary: "203 90% 57%",
    bgStyle:
      "radial-gradient(circle at 18% 18%, rgba(136, 223, 255, 0.30), transparent 22%), radial-gradient(circle at 80% 10%, rgba(255, 232, 148, 0.28), transparent 18%), linear-gradient(180deg, rgba(242,252,255,0.98), rgba(236,244,255,0.96))",
    stickerSet: "sparklepop",
    patternClass: "theme-clouds"
  },
  "baby-series": {
    accent: "338 81% 82%",
    primary: "24 60% 58%",
    bgStyle:
      "radial-gradient(circle at 18% 18%, rgba(255, 226, 234, 0.42), transparent 22%), radial-gradient(circle at 82% 12%, rgba(255, 244, 180, 0.30), transparent 18%), linear-gradient(180deg, rgba(255,250,247,0.99), rgba(250,243,232,0.96))",
    stickerSet: "pastelplayroom",
    patternClass: "theme-bows"
  },
  "village-garden": {
    accent: "110 29% 60%",
    primary: "30 46% 52%",
    bgStyle:
      "radial-gradient(circle at 18% 18%, rgba(212, 233, 186, 0.40), transparent 22%), radial-gradient(circle at 80% 12%, rgba(255, 219, 191, 0.26), transparent 18%), linear-gradient(180deg, rgba(252,249,242,0.99), rgba(242,239,229,0.96))",
    stickerSet: "ginghamgarden",
    patternClass: "theme-gingham"
  },
  "retro-handhelds": {
    accent: "186 75% 55%",
    primary: "226 78% 62%",
    bgStyle:
      "radial-gradient(circle at 14% 16%, rgba(137, 198, 255, 0.30), transparent 22%), radial-gradient(circle at 84% 10%, rgba(188, 255, 236, 0.28), transparent 18%), linear-gradient(180deg, rgba(247,251,255,0.98), rgba(231,240,255,0.96))",
    stickerSet: "pixelparty",
    patternClass: "theme-pixels"
  },
  "designer-vinyl": {
    accent: "315 84% 72%",
    primary: "252 69% 65%",
    bgStyle:
      "radial-gradient(circle at 14% 16%, rgba(196, 182, 255, 0.28), transparent 22%), radial-gradient(circle at 84% 10%, rgba(255, 202, 228, 0.28), transparent 18%), linear-gradient(180deg, rgba(248,247,255,0.98), rgba(239,241,255,0.96))",
    stickerSet: "glossghost",
    patternClass: "theme-stars"
  }
};

export function getThemePack(universeSlug: string) {
  return THEME_PACKS[universeSlug] ?? THEME_PACKS.other;
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

export function buildThemeVariables(universeSlug: string, releaseSlug?: string) {
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
    "--accent": theme.accent,
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
    "--bg-style": theme.bgStyle,
    "--chart-stroke": theme.chartStroke,
    "--chart-grid": theme.chartGrid
  } as Record<string, string>;
}
