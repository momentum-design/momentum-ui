import "./Pagination";
import { withA11y } from "@storybook/addon-a11y";
import { html } from "lit-element";
import { withKnobs } from "@storybook/addon-knobs";

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

export const paginationItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const Default = () => html`
  <md-pagination .items=${paginationItems}></md-pagination>
`;
export const Simple = () => html`
  <md-pagination simple .items=${paginationItems}></md-pagination>
`;

export const Arrows = () => html`
  <md-pagination arrows .items=${paginationItems}></md-pagination>
`;
export const Dots = () => html`
  <md-pagination dots .items=${paginationItems}></md-pagination>
`;
