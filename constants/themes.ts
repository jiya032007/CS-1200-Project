export const THEMES = {
  default: {
    name: 'default',
    backgroundColor: '#1a1a2e',
    textColor: '#ffffff',
    primary: '#001B58',
    statusBarStyle: 'light-content',
  },
  blue: {
    name: 'blue',
    backgroundColor: '#e8f0ff',
    textColor: '#00204a',
    primary: '#2B6CB0',
    statusBarStyle: 'dark-content',
  },
  green: {
    name: 'green',
    backgroundColor: '#f0fff4',
    textColor: '#0b3d2e',
    primary: '#2F855A',
    statusBarStyle: 'dark-content',
  },
};

export type ThemeName = keyof typeof THEMES;
export type ThemeObject = (typeof THEMES)[ThemeName];
