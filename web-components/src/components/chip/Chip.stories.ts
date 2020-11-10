import { withA11y } from "@storybook/addon-a11y";
import { boolean, number, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-html";
import { badgeColor, BarType, iconSamples } from "@/utils/enums";
import "../icon/Icon";
import "./Chip";

export default {
  title: "Chip",
  component: "md-chip",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-chip"
    }
  }
};

export const Default = () => {
  return html`
    <md-chip value="default-chip@cisco.com"></md-chip>
  `;
};

export const Color = () => {
  const label = "Color";
  const defaultColor = "blue";
  const color = select(label, badgeColor, defaultColor);
  return html`
    <md-chip color=${color} value="color-chip@cisco.com"> </md-chip>
  `;
};

export const colorOverride = () => {
  const bgLabel = "BG Color Overrides";
  const textLabel = "Text Color Override";
  const defaultBgColor = "blue";
  const defaultTestColor = "white";
  const bgColor = text(bgLabel, defaultBgColor);
  const textColor = text(textLabel, defaultTestColor);
  return html`
    <md-chip bgColor=${bgColor} textColor=${textColor} value="bg-color-chip@cisco.com"> </md-chip>
  `;
};

export const Size = () => {
  const heightLabel = "Height Override";
  const defaultheight = "40px";
  const height = text(heightLabel, defaultheight);
  const valueText = text("value text", "replace this with long string");
  return html`
    <md-chip height=${height} value="${valueText}"> </md-chip>
  `;
};

export const Small = () => {
  const label = "small";
  const defaultValue = true;
  const small = boolean(label, defaultValue);
  return html`
    <md-chip .small=${small} value="small-chip@cisco.com"> </md-chip>
  `;
};

export const Disabled = () => {
  const label = "disabled";
  const defaultValue = true;
  const disabled = boolean(label, defaultValue);
  return html`
    <md-chip .disabled=${disabled} icon="icon-file-pdf_16" value="small-chip@cisco.com"> </md-chip>
  `;
};

export const Loading = () => {
  const label = "loading";
  const defaultValue = 75;
  const options = {
    range: true,
    min: 0,
    max: 100,
    step: 1
  };
  const defaultType = "indeterminate";
  const type = select("load type", BarType, defaultType);
  const value = number(label, defaultValue, options);
  return type === "indeterminate"
    ? html`
        <md-chip value="example-chip@cisco.com" indeterminateProgress> </md-chip>
      `
    : html`
        <md-chip value="example-chip@cisco.com" determinateProgress="${value}"> </md-chip>
      `;
};
export const SlottedContent = () => {
  return html`
    <md-chip value="example-chip@cisco.com">
      <md-icon name="icon-alert_16" slot="custom-left-content"></md-icon>
      <md-icon name="icon-alarm_16" slot="custom-right-content"></md-icon>
    </md-chip>
  `;
};
export const Icon = () => {
  const defaultValue = "icon-alert_16";
  const defaultColorValue = "md-blue-70";
  const icon = select("icon", iconSamples, defaultValue);
  const color = text("icon color", defaultColorValue);
  return html`
    <md-chip value="example-chip@cisco.com" icon="${icon}" iconColor="${color}"> </md-chip>
  `;
};

export const Readonly = () => {
  const readonly = boolean("readonly", true);
  return html`
    <md-chip value="disabled-chip@cisco.com" ?readonly=${readonly}> </md-chip>
  `;
};
export const OverflowingText = () => {
  const wickedLongText = text("text value", "some really long kind of text string");
  return html`
    <md-chip value="${wickedLongText}"> </md-chip>
  `;
};
