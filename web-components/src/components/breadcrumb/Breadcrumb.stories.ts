import "./Breadcrumb";
import { withA11y } from "@storybook/addon-a11y";
import { html } from "lit-element";
import { withKnobs } from "@storybook/addon-knobs";

export default {
  title: "Breadcrumb",
  component: "md-breadcrumb",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-breadcrumb"
    }
  }
};

const breadCrumb = [
  {
    link: "/one",
    label: "One"
  },
  {
    link: "/two",
    label: "Two"
  },
  {
    link: "/three",
    label: "Three"
  },
  {
    link: "/four",
    label: "Four"
  }
];

export const Default = () => html`
  <md-breadcrumb .navCrumbs="${breadCrumb}"></md-breadcrumb>
`;
