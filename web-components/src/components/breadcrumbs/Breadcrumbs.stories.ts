import "@/components/breadcrumbs/Breadcrumbs";
import { withA11y } from "@storybook/addon-a11y";
import { html } from "lit-element";
import { withKnobs } from "@storybook/addon-knobs";

export default {
  title: "Breadcrumbs",
  component: "md-breadcrumbs",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-breadcrumbs"
    }
  }
};

const breadCrumbs = [
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
  <md-breadcrumbs .navCrumbs="${breadCrumbs}"></md-breadcrumbs>
`;
