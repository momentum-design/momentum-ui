import "./Pagination";
import { withA11y } from "@storybook/addon-a11y";
import { html } from "lit-element";
import { withKnobs, select, number, boolean } from "@storybook/addon-knobs";
import { ThemeNameValues } from "@/components/theme/Theme";

export default {
  title: "Components/Pagination",
  component: "md-pagination",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-pagination"
    }
  }
};

export const Pagination = () => {
  const darkTheme = boolean("darkMode", false);
  const lumos = boolean("Lumos Theme", false);
  const theme = select("Theme name", ThemeNameValues, "");
  const visiblePage = number("Limit", 10);
  const dots = boolean("Add Dots", false);
  const navigation = boolean("No Navigation", false);
  const onlyDots = boolean("Only Dots", false);

  return html`
    <md-theme class="theme-toggle" id="pagination" ?darkTheme=${darkTheme} ?lumos=${lumos} theme=${theme}>
      <md-pagination
        total-page="20"
        current-page="10"
        .visible-page=${visiblePage}
        ?dots=${dots}
        ?no-navigation=${navigation}
        ?only-dots=${onlyDots}
      ></md-pagination>
    </md-theme>
  `;
};
