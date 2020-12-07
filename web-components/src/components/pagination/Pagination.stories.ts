import "./Pagination";
import { withA11y } from "@storybook/addon-a11y";
import { html } from "lit-element";
import { withKnobs, number } from "@storybook/addon-knobs";

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
    <md-pagination page="1" total="101" limit="10" size="5"></md-pagination>
  `;
};

export const Limit = () => {
  const limit = number("Limit", 10);
  return html`
    <md-pagination page="1" total="101" .limit=${limit} size="5"></md-pagination>
  `;
};

export const Total = () => {
  const total = number("Total", 101);
  return html`
    <md-pagination .total=${total} page="1" limit="10" size="5"></md-pagination>
  `;
};

export const Size = () => {
  const size = number("Size", 5);
  return html`
    <md-pagination page="1" total="101" limit="10" .size=${size}></md-pagination>
  `;
};
