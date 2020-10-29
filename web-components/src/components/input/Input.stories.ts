import { withA11y } from "@storybook/addon-a11y";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-html";
import "../icon/Icon";
import "./Input";
import { containerSize, iconNames, iconPosition, inputShape, inputSize, inputType, nestedLevel } from "./Input";

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
  return html`
    <md-input label="Default"></md-input>
  `;
};
export const Placeholder = () => {
  const placeholder = text("Enter Text", "Enter Text");
  return html`
    <md-input label="Placeholder" .placeholder=${placeholder}></md-input>
  `;
};
export const Value = () => {
  const value = text("Value Text", "Value Text");
  return html`
    <md-input label="Placeholder" placeholder="Enter Text" .value=${value}></md-input>
  `;
};
export const ContainerSize = () => {
  const defaultValue = "small-12";
  const size = select("Container Size", containerSize, defaultValue);
  return html`
    <md-input label="Container Size" .containerSize="${size}"></md-input>
  `;
};
export const InputSize = () => {
  const defaultValue = "small-12";
  const size = select("Input Size", inputSize, defaultValue);
  return html`
    <md-input label="Input Size" .containerSize="${size}"></md-input>
  `;
};

export const Label = () => {
  const label = text("Label", "Label");
  return html`
    <md-input .label=${label}> </md-input>
  `;
};

export const Type = () => {
  const defaultValue = "text";
  const type = select("Input Type", inputType, defaultValue);
  return html`
    <md-input label="Input Type" .type=${type}></md-input>
  `;
};

export const Disabled = () => {
  const defaultValue = true;
  const disabled = boolean("Input Disabled", defaultValue);
  return html`
    <md-input label="Input Disabled" value="Disabled Text Value" .disabled=${disabled}></md-input>
  `;
};
export const Shape = () => {
  const defaultValue = "pill";
  const shape = select("Shape Pill", inputShape, defaultValue);
  return html`
    <md-input label="Shape" .shape=${shape}> </md-input>
  `;
};
export const ReadOnly = () => {
  const defaultValue = true;
  const readOnly = boolean("Read Only", defaultValue);
  const disabled = boolean("Read Only Disabled", defaultValue);
  return html`
    <md-input
      label="Readonly"
      containerSize="small-12"
      value="Readonly Text"
      ?readOnly=${readOnly}
      ?disabled="${disabled}"
    ></md-input>
  `;
};

export const Multiline = () => {
  const defaultValue = true;
  const multiline = boolean("Input Multiline", defaultValue);
  return html`
    <md-input label="Multiline" ?multiline=${multiline}></md-input>
  `;
};

export const Clear = () => {
  const defaultValue = true;
  const clear = boolean("Input Clear", defaultValue);
  return html`
    <md-input label="Clear" containerSize="small-12" value="Clear Text" ?clear=${clear}></md-input>
  `;
};

export const Search = () => {
  const defaultValue = true;
  const clear = boolean("Search Clear", defaultValue);
  return html`
    <md-input
      label="Search"
      htmlId="inputSearch"
      searchable
      containerSize="small-12"
      inputSize="small-12"
      placeholder="Enter Text"
      value="Clear Text"
      ?clear=${clear}
    ></md-input>
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
