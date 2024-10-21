import "@/components/theme/Theme";
import { html } from "lit-html";

export const withThemeDecorator = (story, context) => {
  const isDark = context.globals.isDark === true;
  const theme = context.globals.theme;

  return html` <md-theme class="theme-toggle" ?darkTheme=${isDark} theme=${theme}> ${story()} </md-theme>`;
};
