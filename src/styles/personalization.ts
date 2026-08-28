export type UserPreferences = {
  // Display density
  density: "compact" | "comfortable" | "spacious";

  // Font size preference
  fontSize: "small" | "medium" | "large" | "extra-large";

  // Contrast mode
  contrastMode: "normal" | "high";

  // Motion preference (auto-detected or manual)
  reduceMotion?: boolean;

  // Custom primary color (optional)
  customPrimaryColor?: string;

  // Custom accent color (optional)
  customAccentColor?: string;
};

/**
 * Create User Personalization Layer
 *
 * Purpose: Apply user-specific preferences Inherits: All previous layers Overrides:
 * Spacing, typography, colors based on preferences
 *
 * @param preferences User's preferences object
 *
 * @returns Theme layer with user customizations
 */
function createUserPersonalizationLayer(preferences: UserPreferences) {
  // Density multipliers
  const densityConfig = {
    compact: {
      spacingMultiplier: 0.75,
      paddingMultiplier: 0.8
    },
    comfortable: {
      spacingMultiplier: 1,
      paddingMultiplier: 1
    },
    spacious: {
      spacingMultiplier: 1.5,
      paddingMultiplier: 1.25
    }
  };

  // Font size multipliers
  const fontSizeConfig = {
    small: 0.875,
    medium: 1,
    large: 1.125,
    "extra-large": 1.25
  };

  const { spacingMultiplier, paddingMultiplier } = densityConfig[preferences.density];
  const fontMultiplier = fontSizeConfig[preferences.fontSize];

  return {
    tokens: {
      // Apply spacing density
      spacing: {
        1: `${0.25 * spacingMultiplier}rem`,
        2: `${0.5 * spacingMultiplier}rem`,
        3: `${0.75 * spacingMultiplier}rem`,
        4: `${1 * spacingMultiplier}rem`,
        5: `${1.25 * spacingMultiplier}rem`,
        6: `${1.5 * spacingMultiplier}rem`,
        8: `${2 * spacingMultiplier}rem`,
        10: `${2.5 * spacingMultiplier}rem`,
        12: `${3 * spacingMultiplier}rem`
      },

      // Apply font size preference
      typography: {
        fontSize: {
          xs: `${0.75 * fontMultiplier}rem`,
          sm: `${0.875 * fontMultiplier}rem`,
          base: `${1 * fontMultiplier}rem`,
          lg: `${1.125 * fontMultiplier}rem`,
          xl: `${1.25 * fontMultiplier}rem`,
          "2xl": `${1.5 * fontMultiplier}rem`,
          "3xl": `${1.875 * fontMultiplier}rem`,
          "4xl": `${2.25 * fontMultiplier}rem`
        }
      },

      // Apply custom colors if provided
      ...(preferences.customPrimaryColor && {
        color: {
          primary: preferences.customPrimaryColor,
          primaryHover: preferences.customPrimaryColor
        }
      }),

      ...(preferences.customAccentColor && {
        color: {
          accent: preferences.customAccentColor,
          accentHover: preferences.customAccentColor
        }
      })
    },

    // Apply high contrast if requested
    ...(preferences.contrastMode === "high" && {
      accessibility: {
        highContrast: {
          colorMap: {
            "text-gray-600": "text-black",
            "text-gray-500": "text-black",
            "text-gray-400": "text-gray-900",
            "bg-gray-50": "bg-white",
            "bg-gray-100": "bg-white",
            "bg-gray-200": "bg-gray-50",
            "border-gray-200": "border-black",
            "border-gray-300": "border-black"
          },
          auto: true
        }
      }
    }),

    // Apply reduced motion if specified
    ...(preferences.reduceMotion && {
      accessibility: {
        reducedMotion: {
          replace: {
            transition: "transition-none",
            animate: "animate-none"
          },
          auto: true
        }
      }
    }),

    cssVariables: {
      "--user-density": String(spacingMultiplier),
      "--user-font-scale": String(fontMultiplier),
      "--user-padding-scale": String(paddingMultiplier)
    }
  };
}
