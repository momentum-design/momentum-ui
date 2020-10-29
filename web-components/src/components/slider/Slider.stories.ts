import "@/components/slider/Slider";
import { withA11y } from "@storybook/addon-a11y";
import { withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";

export default {
  title: "Slider",
  component: "md-slider",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-slider"
    }
  }
};

export const Default = () => html`
  <md-slider></md-slider>
`;
