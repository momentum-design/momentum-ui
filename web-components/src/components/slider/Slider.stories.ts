import "@/components/slider/Slider";
import { withA11y } from "@storybook/addon-a11y";
import { html } from "lit-element";
import { select, text, number, withKnobs } from "@storybook/addon-knobs";

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

export const Disabled = () => {
  return html`
    <md-slider disabled></md-slider>
  `;
};

export const Steps = () => {
  const step = number("step", 1);
  const min = number("min", 0);
  const max = number("max", 10);
  const now = number("now", 4);
  return html`
    <md-slider .min=${min} .max=${max} .step=${step} .now=${now}></md-slider>
  `;
};

export const NoPointer = () => {
  const now = number("now", 44);
  
  return html`
    <md-slider no-pointer .now=${now}></md-slider>
  `;
};