import { withA11y } from "@storybook/addon-a11y";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import "@/components/icon/Icon";
import "@/components/input/Input";
import { containerSize, iconNames, iconPosition, inputShape, inputSize, inputType, nestedLevel } from "@/components/input/Input";

export default {
  title: "Input",
  component: "md-input",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-input"
    }
  }
};

export const Default = () => {
  const placeholder = text("Enter Text", "Enter Text");
  const label = text("Label", "Label");
  const value = text("Value Text", "Value Text");
  const size = select("Container Size", containerSize, "small-12");
  const disabled = boolean("Input Disabled", false);
  const readOnly = boolean("Read Only", false);
  const shape = select("Shape Pill", inputShape, "pill");
  const multiline = boolean("Input Multiline", false);
  const searchable = boolean("Searchable", false);
  const clear = boolean("Input Clear", false);

  return html`
    <md-input 
      .label=${label} 
      .placeholder=${placeholder} 
      .value=${value} 
      .containerSize="${size}" 
      .disabled=${disabled}
      .shape=${shape}
      ?readOnly=${readOnly}
      ?multiline=${multiline}
      .searchable=${searchable}
      ?clear=${clear}>
    </md-input>
  `;
};


export const Type = () => {
  const type = select("Input Type", inputType, "text");
  return html`
    <md-input label="Input Type" .type=${type}></md-input>
  `;
};

export const Nested = () => {
  const nested = select("Nested Level", nestedLevel, 1);
  return html`
    <md-input label="Default Input"></md-input>
    <md-input label="Input Nested Level" containerSize="small-12" .nestedLevel=${nested}></md-input>
  `;
};

export const Icon = () => {
  const position = select("Icon Position", iconPosition, "before");
  const nameIcon = select("Icon Name", iconNames, "accessibility_16");
  return html`
    <md-input
      label="Input Icon"
      containerSize="small-12"
      placeholder="Enter Text"
      .auxiliaryContentPosition=${position}
    >
      <md-icon slot="input-section${position === "after" ? "-right" : ""}" name=${nameIcon}></md-icon>
    </md-input>
  `;
};

export const HelpText = () => {
  const label = "Help Text";
  const defaultValue = "This is help text for the input.";
  const helpText = text(label, defaultValue);
  return html`
    <md-input label="Input With HelpText" .helpText=${helpText}> </md-input>
  `;
};

export const SecondaryLabel = () => {
  const secondaryLabel = text("Secondary Label", "Secondary Label");
  const defaultValue = true;
  const disabled = boolean("Input Disabled", defaultValue);
  return html`
    <md-input
      label="Input With Secondary Label"
      placeholder="Enter Text"
      .secondaryLabel=${secondaryLabel}
      ?disabled=${disabled}
    ></md-input>
  `;
};

export const Message = () => {
  const messageArr = [
    {
      label: "Success",
      message: "This is where the success message.",
      type: "success"
    },
    {
      label: "Warning",
      message: "This is where the warning message.",
      type: "warning"
    },
    {
      label: "Error",
      message: "This is where the error message.",
      type: "error"
    }
  ];
  const defaultValue = messageArr[0];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const messageValue = select("Message Type", messageArr as any, defaultValue as any);
  return html`
    <md-input
      label="Success"
      htmlId="inputSuccess"
      containerSize="small-12"
      .messageArr=${[messageValue]}
      value="Input Text"
      placeholder="Enter Text"
    ></md-input>
  `;
};
