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
  fontDisplay: string;
  fontBody: string;
  cardClass: string;
};

export const THEME_PACKS: Record<string, ThemePack> = {
  "pop-mart": {
    id: "POPMART_THEME",
    label: "Pop Mart",
    universeSlug: "pop-mart",
    primary: "333 88% 58%",
    primaryForeground: "210 40% 98%",
    secondary: "197 80% 90%",
    secondaryForeground: "216 36% 16%",
    accent: "48 100% 58%",
    accentForeground: "210 40% 12%",
    background: "214 100% 98%",
    foreground: "222 47% 11%",
    muted: "213 78% 94%",
    mutedForeground: "220 19% 38%",
    card: "0 0% 100%",
    cardForeground: "222 47% 11%",
    border: "214 65% 88%",
    input: "214 65% 90%",
    ring: "333 88% 58%",
    destructive: "0 84% 60%",
    destructiveForeground: "0 0% 98%",
    radius: "22px",
    shadowCard: "0 18px 50px rgba(255, 77, 157, 0.15)",
    shadowGlow: "0 10px 40px rgba(255, 191, 0, 0.28)",
    bgStyle:
      "radial-gradient(circle at top left, rgba(255, 99, 183, 0.18), transparent 28%), radial-gradient(circle at 80% 20%, rgba(255, 205, 64, 0.22), transparent 24%), linear-gradient(135deg, rgba(255,255,255,0.96), rgba(232,245,255,0.92))",
    buttonStyle: "glossy",
    fontDisplay: "\"Avenir Next\", \"Trebuchet MS\", sans-serif",
    fontBody: "\"Segoe UI\", \"Helvetica Neue\", sans-serif",
    cardClass: "rounded-[24px] border-white/70 bg-white/85 backdrop-blur-xl"
  },
  "calico-critters": {
    id: "CALICO_THEME",
    label: "Calico Critters",
    universeSlug: "calico-critters",
    primary: "23 61% 46%",
    primaryForeground: "36 33% 97%",
    secondary: "96 33% 86%",
    secondaryForeground: "130 20% 22%",
    accent: "12 78% 72%",
    accentForeground: "0 0% 14%",
    background: "38 43% 96%",
    foreground: "26 20% 18%",
    muted: "45 31% 91%",
    mutedForeground: "32 11% 40%",
    card: "36 40% 98%",
    cardForeground: "26 20% 18%",
    border: "36 33% 85%",
    input: "36 30% 88%",
    ring: "23 61% 46%",
    destructive: "0 72% 56%",
    destructiveForeground: "0 0% 98%",
    radius: "20px",
    shadowCard: "0 18px 40px rgba(122, 86, 53, 0.12)",
    shadowGlow: "0 8px 30px rgba(251, 164, 124, 0.18)",
    bgStyle:
      "radial-gradient(circle at 20% 20%, rgba(236, 214, 189, 0.55), transparent 24%), radial-gradient(circle at 80% 0%, rgba(200, 228, 194, 0.42), transparent 22%), linear-gradient(180deg, rgba(252,248,240,0.98), rgba(245,238,228,0.94))",
    buttonStyle: "soft",
    fontDisplay: "\"Georgia\", \"Palatino Linotype\", serif",
    fontBody: "\"Trebuchet MS\", \"Gill Sans\", sans-serif",
    cardClass: "rounded-[26px] border-stone-200/80 bg-[#fffaf3]/88 backdrop-blur-lg"
  },
  other: {
    id: "GENERIC_THEME",
    label: "Other Collectibles",
    universeSlug: "other",
    primary: "218 70% 56%",
    primaryForeground: "210 40% 98%",
    secondary: "215 28% 91%",
    secondaryForeground: "222 29% 18%",
    accent: "189 80% 42%",
    accentForeground: "210 40% 98%",
    background: "220 27% 97%",
    foreground: "222 38% 12%",
    muted: "215 20% 92%",
    mutedForeground: "218 14% 35%",
    card: "0 0% 100%",
    cardForeground: "222 38% 12%",
    border: "214 22% 87%",
    input: "214 22% 89%",
    ring: "218 70% 56%",
    destructive: "0 84% 60%",
    destructiveForeground: "0 0% 98%",
    radius: "18px",
    shadowCard: "0 18px 48px rgba(21, 52, 96, 0.12)",
    shadowGlow: "0 8px 32px rgba(25, 179, 196, 0.18)",
    bgStyle:
      "radial-gradient(circle at 15% 25%, rgba(96, 133, 255, 0.16), transparent 20%), radial-gradient(circle at 84% 16%, rgba(44, 205, 196, 0.16), transparent 20%), linear-gradient(165deg, rgba(255,255,255,0.98), rgba(236,242,252,0.96))",
    buttonStyle: "sleek",
    fontDisplay: "\"Franklin Gothic Medium\", \"Arial Narrow\", sans-serif",
    fontBody: "\"Segoe UI\", \"Helvetica Neue\", sans-serif",
    cardClass: "rounded-[20px] border-white/70 bg-white/88 backdrop-blur-xl"
  }
};

export type ReleaseThemeOverride = {
  accent?: string;
  bgStyle?: string;
  primary?: string;
};

export const RELEASE_THEME_OVERRIDES: Record<string, ReleaseThemeOverride> = {
  skullpanda: {
    accent: "276 76% 61%",
    primary: "252 70% 54%",
    bgStyle:
      "radial-gradient(circle at 20% 15%, rgba(115, 86, 255, 0.22), transparent 25%), radial-gradient(circle at 85% 10%, rgba(255, 128, 234, 0.18), transparent 22%), linear-gradient(160deg, rgba(246,241,255,0.98), rgba(228,235,255,0.96))"
  },
  dimoo: {
    accent: "199 91% 52%",
    bgStyle:
      "radial-gradient(circle at 18% 20%, rgba(91, 200, 250, 0.22), transparent 28%), radial-gradient(circle at 80% 0%, rgba(255, 214, 102, 0.24), transparent 18%), linear-gradient(180deg, rgba(241,252,255,0.98), rgba(234,241,255,0.95))"
  },
  "baby-series": {
    accent: "338 76% 80%",
    primary: "28 56% 54%",
    bgStyle:
      "radial-gradient(circle at 15% 20%, rgba(255, 221, 232, 0.36), transparent 26%), radial-gradient(circle at 85% 0%, rgba(253, 244, 193, 0.24), transparent 18%), linear-gradient(180deg, rgba(255,250,248,0.99), rgba(249,242,234,0.95))"
  },
  "village-garden": {
    accent: "115 28% 59%",
    bgStyle:
      "radial-gradient(circle at 20% 15%, rgba(189, 214, 166, 0.34), transparent 26%), radial-gradient(circle at 80% 10%, rgba(247, 204, 170, 0.22), transparent 20%), linear-gradient(180deg, rgba(252,249,242,0.98), rgba(243,238,228,0.95))"
  }
};

export function getThemePack(universeSlug: string) {
  return THEME_PACKS[universeSlug] ?? THEME_PACKS.other;
}

export function buildThemeVariables(universeSlug: string, releaseSlug?: string) {
  const base = getThemePack(universeSlug);
  const release = releaseSlug ? RELEASE_THEME_OVERRIDES[releaseSlug] : undefined;

  return {
    "--background": base.background,
    "--foreground": base.foreground,
    "--card": base.card,
    "--card-foreground": base.cardForeground,
    "--primary": release?.primary ?? base.primary,
    "--primary-foreground": base.primaryForeground,
    "--secondary": base.secondary,
    "--secondary-foreground": base.secondaryForeground,
    "--accent": release?.accent ?? base.accent,
    "--accent-foreground": base.accentForeground,
    "--muted": base.muted,
    "--muted-foreground": base.mutedForeground,
    "--border": base.border,
    "--input": base.input,
    "--ring": release?.primary ?? base.ring,
    "--destructive": base.destructive,
    "--destructive-foreground": base.destructiveForeground,
    "--radius": base.radius,
    "--shadow-card": base.shadowCard,
    "--shadow-glow": base.shadowGlow,
    "--bg-style": release?.bgStyle ?? base.bgStyle,
    "--font-display": base.fontDisplay,
    "--font-body": base.fontBody
  } as Record<string, string>;
}
