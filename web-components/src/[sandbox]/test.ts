import { customElement, html, LitElement } from "lit-element";
import "../../dist/Button";

@customElement("momentum-ui-web-components-sandbox")
export class Sandbox extends LitElement {
    
  render() {
    return html`
      <div>WORKS</div>
      <md-button><span slot="text">Button</span></md-button>
    `;
  }
}
