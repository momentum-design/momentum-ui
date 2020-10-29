import { withA11y } from "@storybook/addon-a11y";
import { withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import "@/components/spinner/Spinner";

export default {
  title: "Spinner",
  component: "md-spinner",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-spinner"
    }
  }
};

export const Default = () => html`
  <md-spinner></md-spinner>
`;

export const Size = () => html`
  <md-spinner size="20"></md-spinner>
`;


