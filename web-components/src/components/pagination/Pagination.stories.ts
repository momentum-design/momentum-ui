import { Args } from "@storybook/web-components";
import { html } from "lit";
import "./Pagination";

export default {
  title: "Components/Pagination",
  component: "md-pagination",
  argTypes: {
    visiblePage: { control: "number", defaultValue: 10 },
    dots: { control: "boolean", defaultValue: false },
    navigation: { control: "boolean", defaultValue: false },
    onlyDots: { control: "boolean", defaultValue: false }
  },
  parameters: {
    a11y: {
      element: "md-pagination"
    }
  }
};

export const Pagination = (args: Args) => {
  return html`
    <md-pagination
      total-page="20"
      current-page="10"
      visible-page=${args.visiblePage}
      ?dots=${args.dots}
      ?no-navigation=${args.navigation}
      ?only-dots=${args.onlyDots}
    ></md-pagination>
  `;
};
