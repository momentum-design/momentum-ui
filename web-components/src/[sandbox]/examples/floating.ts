import "@/components/button/Button";
import "@/components/floating-modal/FloatingModal";
import { customElement, html, LitElement, property } from "lit-element";

@customElement("floating-template-sandbox")
export class FloatingTemplateSandbox extends LitElement {
  @property({ type: Boolean }) isOpen = false;

  private open() {
    this.isOpen = true;
    this.requestUpdate("isOpen");
  }

  private close() {
    this.isOpen = false;
    this.requestUpdate("isOpen");
  }

  render() {
    return html`
      <md-button @button-click=${() => this.open()}>Open Floating Modal</md-button>

      <md-floating-modal
        heading="Keyboard Shortcuts"
        ?show=${this.isOpen}
        @close-floating=${() => this.close()}
      ></md-floating-modal>
    `;
  }
}

export const floatingModalTemplate = html`
  <floating-template-sandbox></floating-template-sandbox>
`;
