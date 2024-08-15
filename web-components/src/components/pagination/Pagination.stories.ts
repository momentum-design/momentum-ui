import { ThemeNameValues } from "@/components/theme/Theme";
import { boolean, number, select } from "@storybook/addon-knobs";
import { html } from "lit-element";
import "./Pagination";

export default {
  title: "Components/Pagination",
  component: "md-pagination",
  parameters: {
    a11y: {
      element: "md-pagination"
    }
  }
};

export const Pagination = () => {
  const darkTheme = boolean("darkMode", false);
  const theme = select("Theme name", ThemeNameValues, "lumos");
  const visiblePage = number("Limit", 10);
  const dots = boolean("Add Dots", false);
  const navigation = boolean("No Navigation", false);
  const onlyDots = boolean("Only Dots", false);

  return html`
    <md-theme class="theme-toggle" id="pagination" ?darkTheme=${darkTheme} theme=${theme}>
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
