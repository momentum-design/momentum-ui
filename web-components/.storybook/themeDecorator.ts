import "@/components/theme/Theme";
import { themeManager } from "@/managers/ThemeManager";
import type { Decorator } from "@storybook/web-components";
import { html } from "lit";
import { classMap } from "lit/directives/class-map.js";

export const withThemeDecorator: Decorator = (story, context) => {
  const isDark = context.globals.isDark === true;
  const theme = context.globals.theme;
  const isVisualRebrand = context.globals.isVisualRebrand === true;
  const backgroundMode = context.globals.backgroundMode ?? "DEFAULT";

  themeManager.setDarkMode(isDark);
  themeManager.setThemeName(theme);
  themeManager.setVisualRebrandEnabled(isVisualRebrand);
  themeManager.setBackgroundMode(backgroundMode);

  const modeClasses = isVisualRebrand ? { [backgroundMode]: true } : {};

  return html` <md-theme
    class=${classMap({ "theme-toggle": true, "is-visual-rebrand": isVisualRebrand, ...modeClasses })}
    ?darkTheme=${themeManager.isDarkMode}
    theme=${themeManager.themeName}
  >
    ${story()}
  </md-theme>`;
};
