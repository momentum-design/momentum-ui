import "@/components/button/Button";
import "@/components/icon/Icon";
import "@/components/theme/Theme";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, select, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { action } from '@storybook/addon-actions';
import { buttonColor, buttonSize, buttonTag, buttonType, buttonVariant } from "@/components/button/Button";

export default {
  title: "Button",
  component: "md-button",
  decorators: [withKnobs, withA11y],
  argTypes: {
    renderWidth: { table: { disable: true } },
    renderMaxWidth: { table: { disable: true } },
    buttonClassMap: { table: { disable: true } },
    iconTemplate: { table: { disable: true } },
    textTemplate: { table: { disable: true } },
    slottedText: { table: { disable: true } },
    getStyles: { table: { disable: true } },
    keyboardKey: { table: { disable: true } }
  },
  parameters: {
    a11y: {
      element: "md-button"
    }
  }
};

export const Button = () => {
  const darkTheme = boolean("darkMode", false);
  const variant = select("Variant", buttonVariant, "secondary");
  const color = select("Color", buttonColor, "");
  const disabled = boolean("Disabled Mode", false);
  const circle = boolean("Circle", false);
  const loading = boolean("Loading State", false);
  const size = select("Size", buttonSize, 32);
  const tag = select("Tag", buttonTag, "button");
  const type = select("type", buttonType, "button");

  return html`
    <md-theme class="theme-toggle" id="button" ?darkTheme=${darkTheme}>
      <md-button @button-click=${(action('ditail'))} .variant=${variant} ariaLabel="Button Storybook" .color=${color} .disabled=${disabled} .circle=${circle} .loading=${loading} .size=${size} .tag=${tag} .type=${type}>
        ${circle ? html`<md-icon slot="icon" name="icon-search_12"></md-icon>` : html`<span slot="text">Button</span>` }
      </md-button>
    </md-theme>
  `;
};

