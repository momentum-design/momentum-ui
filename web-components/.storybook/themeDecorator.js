import "@/components/theme/Theme";
import { themeManager } from "@/managers/ThemeManager";
import { html } from "lit-html";

export const withThemeDecorator = (story, context) => {
  const isDark = context.globals.isDark === true;
  const theme = context.globals.theme;

  themeManager.setDarkMode(isDark);
  themeManager.setThemeName(theme);  

  return html` <md-theme class="theme-toggle" ?darkTheme=${themeManager.isDarkMode} theme=${themeManager.themeName}> ${story()} </md-theme>`;
};
