import { ThemeType } from '../../@types/theme';

interface Themes {
  dark: ThemeType;
  light: ThemeType;
}

// TODO: decide color palette and update colors in theme

export const themes: Themes = {
  dark: {
    colors: {
      secondary: '#0F3460',
      text: '#ffffff',
      background: '#121212',
      primary: '#d1990d',
      accent: '#035397',
    },
    fontBase: '"Montserrat", sans-serif',
    fontAlt: '"Open Sans", sans-serif',
  },
  light: {
    colors: {
      // background: '#1A1A2E',
      // primary: '#16213E',
      secondary: '#0F3460',
      text: '#121212',
      background: '#ffffff',
      primary: '#d1990d',
      accent: '#035397',
    },
    fontBase: '"Montserrat", sans-serif',
    fontAlt: '"Open Sans", sans-serif',
  },
};
