import { withA11y } from "@storybook/addon-a11y";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-html";
import { badgeColor } from "@/utils/enums";
import "../icon/Icon";
import "./Badge";

export default {
  title: "Badge",
  component: "md-badge",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-badge"
    }
  }
};

export const Default = () => {
  return html`
    <md-badge>Default</md-badge>
  `;
};

export const Color = () => {
  const label = "Color";
  const defaultColor = "blue";
  const color = select(label, badgeColor, defaultColor);
  return html`
    <md-badge color=${color}>
      Badge ${color}
    </md-badge>
  `;
};

export const bgColor = () => {
  const bgLabel = "BG Color Overrides";
  const textLabel = "Text Color Override";
  const defaultBgColor = "blue";
  const defaultTestColor = "white";
  const bgColor = text(bgLabel, defaultBgColor);
  const textColor = text(textLabel, defaultTestColor);
  return html`
    <md-badge bgColor=${bgColor} textColor=${textColor}>
      Custom Badge
    </md-badge>
  `;
};

export const Size = () => {
  const heightLabel = "Height Override";
  const widthLabel = "Width Override";
  const defaultheight = "40px";
  const defaultwidth = "40px";
  const height = text(heightLabel, defaultheight);
  const width = text(widthLabel, defaultwidth);
  return html`
    <md-badge height=${height} width=${width}>
      Custom Badge
    </md-badge>
  `;
};

export const Circle = () => {
  return html`
    <md-badge circle>
      <md-icon name="chat-active_16"></md-icon>
    </md-badge>
  `;
};

export const Small = () => {
  const label = "small";
  const defaultValue = true;
  const small = boolean(label, defaultValue);
  return html`
    <md-badge .small=${small}> <md-icon name="chat-active_16"></md-icon> Chat </md-badge>
  `;
};
