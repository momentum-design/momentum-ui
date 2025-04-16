import "@/components/theme/Theme";
import { themeManager } from "@/managers/ThemeManager";
import { html } from "lit";
import { classMap } from "lit/directives/class-map.js";

export const withThemeDecorator = (story, context) => {
  const isDark = context.globals.isDark === true;
  const theme = context.globals.theme;
  const isVisualRebrand = context.globals.isVisualRebrand === true;

  themeManager.setDarkMode(isDark);
  themeManager.setThemeName(theme);
  themeManager.setVisualRebrandEnabled(isVisualRebrand);

  return html` <md-theme
    class=${classMap({ "theme-toggle": true, "is-visual-rebrand": isVisualRebrand })}
    ?darkTheme=${themeManager.isDarkMode}
    theme=${themeManager.themeName}
  >
    ${story()}
  </md-theme>`;
};
