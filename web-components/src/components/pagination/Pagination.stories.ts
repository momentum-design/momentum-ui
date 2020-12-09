import "./Pagination";
import { withA11y } from "@storybook/addon-a11y";
import { html } from "lit-element";
import { withKnobs, number, boolean } from "@storybook/addon-knobs";

export default {
  title: "Pagination",
  component: "md-pagination",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-pagination"
    }
  }
};

export const Default = () => {
  return html`
    <md-pagination total-page="20" current-page="10" visible-page="3"></md-pagination>
  `;
};

export const Limit = () => {
  const visiblePage = number("Limit", 10);
  return html`
    <md-pagination total-page="20" current-page="10" .visible-page=${visiblePage}></md-pagination>
  `;
};

export const withDots = () => {
  const dots = boolean("Add Dots", true);
  return html`
    <md-pagination total-page="20" current-page="10" visible-page="3" ?dots=${dots}></md-pagination>
  `;
};

export const Navigation = () => {
  const navigation = boolean("No Navigation", true);
  return html`
    <md-pagination total-page="20" current-page="10" ?no-navigation=${navigation}></md-pagination>
  `;
};
export const onlyDots = () => {
  const onlyDots = boolean("Only Dots", true);
  return html`
    <md-pagination total-page="20" current-page="10" ?only-dots=${onlyDots}></md-pagination>
  `;
};
