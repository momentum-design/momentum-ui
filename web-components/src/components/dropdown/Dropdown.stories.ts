import { withA11y } from "@storybook/addon-a11y";
import { boolean, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";

export default {
  title: "Dropdown",
  component: "md-dropdown",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-dropdown"
    }
  }
};

export const Dropdown = () => {
  const darkTheme = boolean("darkMode", false);
  const lumos = boolean("Lumos Theme", false);

  return html`
    <md-theme class="theme-toggle" id="datepicker" ?darkTheme="${darkTheme}" ?lumos="${lumos}">
      <md-dropdown></md-dropdown>
    </md-theme>
  `;
};
