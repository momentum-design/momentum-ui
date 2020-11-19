import { withA11y } from "@storybook/addon-a11y";
import { boolean, number, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-html";
import { badgeColor, BarType, iconSamples, iconColorSample } from "@/utils/enums";
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
  const color = select("Color", badgeColor, "blue");
  const bgColor = text("BG Color Overrides", "blue");
  const textColor = text("Text Color Override", "white");
  const height = text("Height Override", "");
  const valueText = text("value text", "replace this with long string");
  const small = boolean("Small", false);
  const disabled = boolean("Disabled", false);
  const readonly = boolean("readonly", false);

  return html`
    <md-chip .color=${color} .bgColor=${bgColor} .textColor=${textColor} .small=${small} .height=${height} .value="${valueText}" .disabled=${disabled} ?readonly=${readonly}></md-chip>
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
  const icon = select("icon", iconSamples, "");
  const color = select("icon color", iconColorSample, "");
  return html`
    <md-chip value="example-chip@cisco.com" icon="${icon}" iconColor="${color}"> </md-chip>
  `;
};
