// Animated Background Configuration
export const backgroundConfig = {
  // Default iridescent blue-purple theme
  default: {
    tint: [0.5, 0.6, 0.8] as [number, number, number],
    speed: 1.0,
    mouse: true
  },
  
  // Alternative color schemes
  themes: {
    aurora: {
      tint: [0.4, 0.8, 0.6] as [number, number, number],
      speed: 0.8,
      mouse: true
    },
    sunset: {
      tint: [0.8, 0.5, 0.4] as [number, number, number],
      speed: 1.2,
      mouse: true
    },
    cosmic: {
      tint: [0.6, 0.4, 0.9] as [number, number, number],
      speed: 0.7,
      mouse: true
    },
    minimal: {
      tint: [0.3, 0.3, 0.4] as [number, number, number],
      speed: 0.5,
      mouse: false
    }
  },
  
  // Performance settings
  performance: {
    low: {
      tint: [0.5, 0.6, 0.8] as [number, number, number],
      speed: 0.3,
      mouse: false
    },
    high: {
      tint: [0.5, 0.6, 0.8] as [number, number, number],
      speed: 1.5,
      mouse: true
    }
  }
};

// Utility function to get config by theme name
export const getBackgroundConfig = (theme: keyof typeof backgroundConfig.themes = 'default') => {
  if (theme === 'default') {
    return backgroundConfig.default;
  }
  return backgroundConfig.themes[theme] || backgroundConfig.default;
};

// Utility function to check if user prefers reduced motion
export const shouldUseReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mediaQuery.matches;
};

// Utility function to get performance-optimized config
export const getPerformanceConfig = (level: 'low' | 'high' = 'low') => {
  return backgroundConfig.performance[level];
};
