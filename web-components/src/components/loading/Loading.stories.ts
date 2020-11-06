import "./Loading";
import { withA11y } from "@storybook/addon-a11y";
import { select, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-html";

export default {
  title: "Loading",
  component: "md-loading",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-loading"
    }
  }
};

type LoadingSize = "small" | "middle" | "large" | "";

export const Default = () => {
  return html`
    <md-loading></md-loading>
  `;
};

export const Size = () => {
  const options = {
    Small: "small",
    Middle: "middle",
    Large: "large",
    None: ""
  };

  const size = select("Size", options, "small");

  return html`
    <md-loading .size=${size as LoadingSize}></md-loading>
  `;
};
