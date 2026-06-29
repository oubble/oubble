import {
  createGlobalTheme,
  createGlobalThemeContract,
} from "@vanilla-extract/css";

/**
 * Design tokens for Oubble.
 *
 * Colors live in OKLCH. Neutrals share hue 264 (a faint cool tint) so light and
 * dark surfaces feel related. Semantic hues use the same chroma percentage of
 * their own max so they read equally vivid. Dark mode reverses lightness.
 */

const ref = "--ou";

export const vars = createGlobalThemeContract(
  {
    color: {
      // Surfaces, from page background up to the most elevated card.
      canvas: "",
      surface: "",
      surfaceRaised: "",
      surfaceSunken: "",
      // Text, strongest to faintest.
      text: "",
      textMuted: "",
      textFaint: "",
      textOnAccent: "",
      // Lines and separators.
      border: "",
      borderStrong: "",
      // Brand.
      accent: "",
      accentHover: "",
      accentSoft: "",
      // Lead temperature (opportunity heat).
      hot: "",
      hotSoft: "",
      warm: "",
      warmSoft: "",
      cold: "",
      coldSoft: "",
      // Feedback.
      success: "",
      successSoft: "",
      danger: "",
      dangerSoft: "",
      attention: "",
      attentionSoft: "",
      // Template variable token (Notion-style red).
      varToken: "",
      // Focus ring.
      focus: "",
    },
    radius: {
      sm: "",
      layer: "",
      md: "",
      lg: "",
      xl: "",
      full: "",
    },
    space: {
      "1": "",
      "2": "",
      "3": "",
      "4": "",
      "5": "",
      "6": "",
      "8": "",
      "10": "",
      "12": "",
      "16": "",
    },
    font: {
      sans: "",
      display: "",
    },
    text: {
      display: "",
      displayLh: "",
      h1: "",
      h1Lh: "",
      h2: "",
      h2Lh: "",
      h3: "",
      h3Lh: "",
      body: "",
      bodyLh: "",
      small: "",
      smallLh: "",
      micro: "",
      microLh: "",
    },
    weight: {
      regular: "",
      medium: "",
      semibold: "",
      bold: "",
    },
    shadow: {
      sm: "",
      md: "",
      lg: "",
      pressed: "",
    },
    z: {
      base: "",
      sticky: "",
      dropdown: "",
      overlay: "",
      modal: "",
      toast: "",
    },
  },
  (_value, path) => `${ref}-${path.join("-")}`,
);

const scale = {
  radius: {
    sm: "8px",
    layer: "11px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    full: "999px",
  },
  space: {
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "5": "20px",
    "6": "24px",
    "8": "32px",
    "10": "40px",
    "12": "48px",
    "16": "64px",
  },
  font: {
    sans: '"Nunito", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: '"Roboto Slab", Georgia, "Times New Roman", serif',
  },
  text: {
    display: "44px",
    displayLh: "48px",
    h1: "32px",
    h1Lh: "38px",
    h2: "24px",
    h2Lh: "30px",
    h3: "18px",
    h3Lh: "24px",
    body: "15px",
    bodyLh: "22px",
    small: "13px",
    smallLh: "18px",
    micro: "12px",
    microLh: "16px",
  },
  weight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  z: {
    base: "0",
    sticky: "10",
    dropdown: "20",
    overlay: "30",
    modal: "40",
    toast: "50",
  },
};

// Light theme. Neutrals on hue 264, very low chroma. Accent is an ink-blue.
createGlobalTheme(":root", vars, {
  color: {
    canvas: "oklch(0.985 0.002 264)",
    surface: "oklch(1 0 0)",
    surfaceRaised: "oklch(1 0 0)",
    surfaceSunken: "oklch(0.965 0.003 264)",
    text: "oklch(0.22 0.006 264)",
    textMuted: "oklch(0.5 0.008 264)",
    textFaint: "oklch(0.68 0.006 264)",
    textOnAccent: "oklch(0.99 0.002 264)",
    border: "oklch(0.925 0.004 264)",
    borderStrong: "oklch(0.87 0.006 264)",
    accent: "oklch(0.54 0.182 264)",
    accentHover: "oklch(0.48 0.182 264)",
    accentSoft: "oklch(0.95 0.03 264)",
    hot: "oklch(0.58 0.2 25)",
    hotSoft: "oklch(0.95 0.04 25)",
    warm: "oklch(0.7 0.16 65)",
    warmSoft: "oklch(0.95 0.04 65)",
    cold: "oklch(0.62 0.13 235)",
    coldSoft: "oklch(0.95 0.03 235)",
    success: "oklch(0.62 0.15 150)",
    successSoft: "oklch(0.95 0.04 150)",
    danger: "oklch(0.58 0.2 25)",
    dangerSoft: "oklch(0.95 0.04 25)",
    attention: "oklch(0.72 0.15 75)",
    attentionSoft: "oklch(0.96 0.04 75)",
    varToken: "oklch(0.62 0.17 25)",
    focus: "oklch(0.54 0.182 264)",
  },
  ...scale,
  shadow: {
    sm: "0 1px 2px oklch(0.22 0.006 264 / 0.06), 0 0 0 1px oklch(0.22 0.006 264 / 0.04)",
    md: "0 2px 4px oklch(0.22 0.006 264 / 0.05), 0 4px 12px oklch(0.22 0.006 264 / 0.06), 0 0 0 1px oklch(0.22 0.006 264 / 0.04)",
    lg: "0 8px 16px oklch(0.22 0.006 264 / 0.08), 0 16px 40px oklch(0.22 0.006 264 / 0.1), 0 0 0 1px oklch(0.22 0.006 264 / 0.04)",
    pressed: "inset 0 1px 2px oklch(0.22 0.006 264 / 0.12)",
  },
});

// Dark theme. Reverse lightness; accent lifts a touch for contrast on dark.
createGlobalTheme("[data-theme='dark']", vars, {
  color: {
    canvas: "oklch(0.17 0.006 264)",
    surface: "oklch(0.21 0.007 264)",
    surfaceRaised: "oklch(0.24 0.008 264)",
    surfaceSunken: "oklch(0.15 0.006 264)",
    text: "oklch(0.96 0.003 264)",
    textMuted: "oklch(0.72 0.008 264)",
    textFaint: "oklch(0.55 0.008 264)",
    textOnAccent: "oklch(0.99 0.002 264)",
    border: "oklch(0.28 0.008 264)",
    borderStrong: "oklch(0.36 0.01 264)",
    accent: "oklch(0.68 0.16 264)",
    accentHover: "oklch(0.74 0.16 264)",
    accentSoft: "oklch(0.3 0.06 264)",
    hot: "oklch(0.68 0.18 25)",
    hotSoft: "oklch(0.3 0.07 25)",
    warm: "oklch(0.76 0.15 65)",
    warmSoft: "oklch(0.32 0.06 65)",
    cold: "oklch(0.7 0.13 235)",
    coldSoft: "oklch(0.3 0.05 235)",
    success: "oklch(0.7 0.15 150)",
    successSoft: "oklch(0.3 0.06 150)",
    danger: "oklch(0.68 0.18 25)",
    dangerSoft: "oklch(0.3 0.07 25)",
    attention: "oklch(0.78 0.14 75)",
    attentionSoft: "oklch(0.32 0.06 75)",
    varToken: "oklch(0.7 0.16 25)",
    focus: "oklch(0.68 0.16 264)",
  },
  ...scale,
  shadow: {
    sm: "0 1px 2px oklch(0 0 0 / 0.3), 0 0 0 1px oklch(1 0 0 / 0.04)",
    md: "0 2px 4px oklch(0 0 0 / 0.3), 0 4px 12px oklch(0 0 0 / 0.4), 0 0 0 1px oklch(1 0 0 / 0.04)",
    lg: "0 8px 16px oklch(0 0 0 / 0.4), 0 16px 40px oklch(0 0 0 / 0.5), 0 0 0 1px oklch(1 0 0 / 0.05)",
    pressed: "inset 0 1px 2px oklch(0 0 0 / 0.4)",
  },
});
