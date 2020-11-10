import "./List";
import "./ListItem";
import { withA11y } from "@storybook/addon-a11y";
import { select, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";

export default {
  title: "List",
  component: "md-list",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-list"
    }
  }
};

export const Default = () => {
  return html`
    <md-list label="Transuranium elements">
      <md-list-item slot="list-item">Neptunium</md-list-item>
      <md-list-item slot="list-item">Plutonium</md-list-item>
      <md-list-item slot="list-item">Americium</md-list-item>
      <md-list-item slot="list-item">Curium</md-list-item>
      <md-list-item slot="list-item">Berkelium</md-list-item>
      <md-list-item slot="list-item">Californium</md-list-item>
    </md-list>
  `;
};

export const Disabled = () => {
  return html`
    <md-list label="Transuranium elements">
      <md-list-item slot="list-item">Neptunium</md-list-item>
      <md-list-item slot="list-item" disabled>Plutonium</md-list-item>
      <md-list-item slot="list-item">Americium</md-list-item>
      <md-list-item slot="list-item" disabled>Curium</md-list-item>
      <md-list-item slot="list-item">Berkelium</md-list-item>
      <md-list-item slot="list-item">Californium</md-list-item>
    </md-list>
  `;
};

export const PreSelected = () => {
  return html`
    <md-list label="Transuranium elements" activated="3">
      <md-list-item slot="list-item">Neptunium</md-list-item>
      <md-list-item slot="list-item">Plutonium</md-list-item>
      <md-list-item slot="list-item">Americium</md-list-item>
      <md-list-item slot="list-item">Curium</md-list-item>
      <md-list-item slot="list-item">Berkelium</md-list-item>
      <md-list-item slot="list-item">Californium</md-list-item>
    </md-list>
  `;
};

export const Orientation = () => {
  const options = {
    Vertical: "vertical",
    Horizontal: "horizontal"
  };
  const alignment = select("Orientation", options, "vertical") as "vertical" | "horizontal";

  return html`
    <md-list label="Transuranium elements" .alignment=${alignment}>
      <md-list-item slot="list-item">Neptunium</md-list-item>
      <md-list-item slot="list-item">Plutonium</md-list-item>
      <md-list-item slot="list-item">Americium</md-list-item>
      <md-list-item slot="list-item">Curium</md-list-item>
      <md-list-item slot="list-item">Berkelium</md-list-item>
      <md-list-item slot="list-item">Californium</md-list-item>
    </md-list>
  `;
};
