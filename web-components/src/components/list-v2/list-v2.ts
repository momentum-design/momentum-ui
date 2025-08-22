import { customElement, html, LitElement, property } from "lit-element";
import style from "./scss/module.scss";

export namespace ListV2 {
  export type Gap = "none" | "sm" | "md" | "lg";
  export type Orientation = "vertical" | "horizontal";

  @customElement("md-list-v2")
  export class ELEMENT extends LitElement {
    @property({ type: String }) gap: Gap = "none";
    @property({ type: String }) orientation: Orientation = "vertical";

    override render() {
      return html` <ul>
        <slot></slot>
      </ul>`;
    }

    static get styles() {
      return style;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-list-v2": ListV2.ELEMENT;
  }
}
