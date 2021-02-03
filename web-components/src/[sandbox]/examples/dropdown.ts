import { html } from "lit-element";

const stringOptions = ["one", "two", "three"];

const objectOptions = [{ one: "One" }, { two: "Two" }, { three: "Three" }];

export const dropdownTemplate = html`
  <h3>Default</h3>
  <md-dropdown .options="${stringOptions}"></md-dropdown>

  <h3>Default Objects</h3>
  <md-dropdown .options="${objectOptions}"></md-dropdown>
`;
