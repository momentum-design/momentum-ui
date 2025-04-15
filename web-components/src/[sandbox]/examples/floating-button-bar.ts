import "@/components/floating-button-bar/FloatingButtonBar";
import { customElement, LitElement } from "lit-element";
import { html } from "lit-html";

@customElement("floating-button-bar-sandbox")
export class FloatingButtonBarTemplateSandbox extends LitElement {
  render() {
    return html` <md-floating-button-bar></md-floating-button-bar>`;
  }
}

export const floatingButtonBarTemplate = html` <floating-button-bar-sandbox></floating-button-bar-sandbox> `;
