export type Theme = 'light' | 'dark' | 'system';

export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
}

export interface ThemeConfig {
  name: string;
  colors: ThemeColors|{};
}

export interface CustomThemeConfig {
    name: string;
    colors: {
        charcoalBrown: string,
        evergreen: string,
        lightCoral: string,
        lemonChiffon: string,
        seafoam: string,
    }
}

export const theme: CustomThemeConfig = {
    name: "Moss & Ember",
    colors: {
        charcoalBrown: "slate-700",
        evergreen: "neutral-900",
        lightCoral: "red-300",
        lemonChiffon: "amber-100",
        seafoam: "teal-300",  
    }  
}