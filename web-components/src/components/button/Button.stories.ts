import "@/components/button/Button";
import "@/components/icon/Icon";
import "@/components/theme/Theme";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, select, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { buttonColor, buttonSize, buttonTag, buttonType, buttonVariant } from "./Button";

export default {
  title: "Button",
  component: "md-button",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-button"
    }
  }
};

export const Default = () => {
  const darkTheme = boolean("darkMode", false);
  const defaultVariant = "secondary";
  return html`
    <md-theme class="theme-toggle" id="button" ?darkTheme=${darkTheme}>
      <md-button variant=${defaultVariant} ariaLabel="Button Storybook">Button</md-button>
    </md-theme>
  `;
};

export const Circle = () => {
  const darkTheme = boolean("darkMode", false);
  const defaultVariant = "secondary";
  return html`
    <md-theme class="theme-toggle" id="button" ?darkTheme=${darkTheme}>
      <md-button variant=${defaultVariant} ariaLabel="Button Storybook" circle
        ><md-icon name="icon-search_12"></md-icon
      ></md-button>
    </md-theme>
  `;
};

export const Variant = () => {
  const label = "Variant";
  const defaultValue = "secondary";
  const variant = select(label, buttonVariant, defaultValue);
  const darkTheme = boolean("darkMode", false);

  return html`
    <md-theme class="theme-toggle" id="button" ?darkTheme=${darkTheme}>
      <md-button ariaLabel="Button Storybook" variant=${variant}>Button Variant</md-button>
    </md-theme>
  `;
};

export const Color = () => {
  const label = "Color";
  const defaultValue = "";
  const color = select(label, buttonColor, defaultValue);

  return html`
    <md-button ariaLabel="Button Storybook" color=${color}>Color Button</md-button>
  `;
};

export const Disabled = () => {
  const defaultValue = "secondary";
  const darkTheme = boolean("darkMode", false);

  return html`
    <md-theme class="theme-toggle" id="button" ?darkTheme=${darkTheme}>
      <md-button ariaLabel="Button Storybook" variant=${defaultValue} disabled>Disabled Button</md-button>
    </md-theme>
  `;
};

export const Loading = () =>
  html`
    <md-button ariaLabel="Button Storybook" loading color="blue"><span slot="text">Loading Button</span></md-button>
  `;

export const Size = () => {
  const labelSize = "Size";
  const labelCircle = "Circle";
  const defaultSizeValue = 32;
  const defaultCircleValue = false;
  const size = select(labelSize, buttonSize, defaultSizeValue);
  const circle = boolean(labelCircle, defaultCircleValue);

  return html`
    <md-button ariaLabel="Button Storybook" size=${size} ?circle=${circle}>Button Size</md-button>
  `;
};

export const Tag = () => {
  const label = "Tag";
  const defaultValue = "button";
  const tag = select(label, buttonTag, defaultValue);
  return html`
    <md-button ariaLabel="Button Storybook" tag=${tag} value="Input Button Tag">Button tag</md-button>
  `;
};

export const Type = () => {
  const label = "Type";
  const defaultValue = "button";
  const type = select(label, buttonType, defaultValue);
  return html`
    <md-button ariaLabel="Button Storybook" type=${type}>Button tag</md-button>
  `;
};
