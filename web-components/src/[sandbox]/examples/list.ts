import "@/components/list/List";
import "@/components/list/ListItem";
import { html } from "lit";

export const listTemplate = html`
  <h3>Selected (WCAG 1.4.11 &ndash; selected label must be BOLD)</h3>
  <div style="width: 280px; border: 1px solid #ccc; padding: 4px;">
    <md-list-item aria-label="Neptunium" role="option">Neptunium (normal)</md-list-item>
    <md-list-item aria-label="Americium selected" role="option" selected>Americium (selected &rarr; bold)</md-list-item>
    <md-list-item aria-label="Curium" role="option">Curium (normal)</md-list-item>
  </div>

  <h3>Default</h3>
  <md-list label="Transuranium elements">
    <md-list-item aria-label="Neptunium" slot="list-item">Neptunium</md-list-item>
    <md-list-item aria-label="Plutonium" slot="list-item">Plutonium</md-list-item>
    <md-list-item aria-label="Americium" slot="list-item">Americium</md-list-item>
    <md-list-item aria-label="Curium" slot="list-item">Curium</md-list-item>
    <md-list-item aria-label="Berkelium" slot="list-item">Berkelium</md-list-item>
    <md-list-item aria-label="Californium" slot="list-item">Californium</md-list-item>
  </md-list>

  <h3>Disabled</h3>
  <md-list label="Transuranium elements">
    <md-list-item slot="list-item">Neptunium</md-list-item>
    <md-list-item slot="list-item" disabled>Plutonium</md-list-item>
    <md-list-item slot="list-item">Americium</md-list-item>
    <md-list-item slot="list-item" disabled>Curium</md-list-item>
    <md-list-item slot="list-item">Berkelium</md-list-item>
    <md-list-item slot="list-item">Californium</md-list-item>
  </md-list>

  <h3>PreSelected</h3>
  <md-list label="Transuranium elements" activated="3">
    <md-list-item slot="list-item">Neptunium</md-list-item>
    <md-list-item slot="list-item">Plutonium</md-list-item>
    <md-list-item slot="list-item">Americium</md-list-item>
    <md-list-item slot="list-item">Curium</md-list-item>
    <md-list-item slot="list-item">Berkelium</md-list-item>
    <md-list-item slot="list-item">Californium</md-list-item>
  </md-list>

  <h3>Orientation</h3>
  <md-list label="Transuranium elements" alignment="horizontal">
    <md-list-item slot="list-item">Neptunium</md-list-item>
    <md-list-item slot="list-item">Plutonium</md-list-item>
    <md-list-item slot="list-item">Americium</md-list-item>
    <md-list-item slot="list-item">Curium</md-list-item>
    <md-list-item slot="list-item">Berkelium</md-list-item>
    <md-list-item slot="list-item">Californium</md-list-item>
  </md-list>

  <h3>Pill</h3>
  <md-list label="Transuranium elements">
    <md-list-item aria-label="Neptunium" slot="list-item" shape="pill">Neptunium</md-list-item>
    <md-list-item aria-label="Plutonium" slot="list-item" shape="pill">Plutonium</md-list-item>
    <md-list-item aria-label="Americium" slot="list-item" shape="pill">Americium</md-list-item>
    <md-list-item aria-label="Curium" slot="list-item" shape="pill">Curium</md-list-item>
    <md-list-item aria-label="Berkelium" slot="list-item" shape="pill">Berkelium</md-list-item>
    <md-list-item aria-label="Californium" slot="list-item" shape="pill">Californium</md-list-item>
  </md-list>

  <h3>List item with trailing icon</h3>
  <md-list label="Trailing list items">
    <md-list-item slot="list-item">
      <md-button><md-icon></md-icon><md-button></md-list-item>
  </md-list>
`;
