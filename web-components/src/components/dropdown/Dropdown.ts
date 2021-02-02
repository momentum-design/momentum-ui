import { customElement, LitElement } from "lit-element";

@customElement("md-dropdown")
export class Dropdown extends LitElement {}

declare global {
  interface HTMLElementTagNameMap {
    "md-dropdown": Dropdown;
  }
}
