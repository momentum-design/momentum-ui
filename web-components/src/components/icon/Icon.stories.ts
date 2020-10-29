import iconNames from "@momentum-ui/icons/data/iconNames.json";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-html";
import "./Icon";
import { iconSize, iconType } from "./Icon";

export default {
  title: "Icon",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-icon"
    }
  }
};

export const Default = () =>
  html`
    <md-icon name="icon-arrow-up_16"></md-icon>
  `;

export const Color = () => {
  const label = "Color";
  const defaultValue = "red";
  const color = text(label, defaultValue);

  return html`
    <md-icon name="icon-arrow-up_16" .color=${color}></md-icon>
  `;
};
export const IconStyle = () => {
  const label = "Icon Style";
  const defaultValue = "";
  const iconStyle = text(label, defaultValue);

  return html`
    <md-icon name="icon-arrow-up_16" .iconStyle=${iconStyle}></md-icon>
  `;
};
export const Size = () => {
  const label = "Size";
  const defaultValue = "16";
  const size = select(label, iconSize, defaultValue);
  return html`
    <md-icon name="icon-arrow-up_16" size=${size}></md-icon>
  `;
};
export const SizeOverride = () => {
  const label = "Size Override";
  const defaultValue = false;
  const sizeOverrided = boolean(label, defaultValue);

  if (sizeOverrided) {
    return html`
      <md-icon name="icon-arrow-up_16" sizeOverrided></md-icon>
    `;
  } else {
    return html`
      <md-icon name="icon-arrow-up_16"></md-icon>
    `;
  }
};

export const Title = () => {
  const label = "Title";
  const defaultValue = "";
  const title = text(label, defaultValue);

  return html`
    <md-icon name="icon-arrow-up_16" .title=${title}></md-icon>
  `;
};

export const Type = () => {
  const label = "Type";
  const defaultValue = "";
  const type = select(label, iconType, defaultValue);
  return html`
    <md-icon name="icon-arrow-up_16" .type=${type}></md-icon>
  `;
};
export const Name = () => {
  const label = "Name";
  const defaultValue = "asterisk_10";
  const name = select(label, iconNames, defaultValue);

  return html`
    <md-icon .name=${`icon-${name}`}></md-icon>
  `;
};
