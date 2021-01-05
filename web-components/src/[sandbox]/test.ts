import { customElement, html, LitElement } from "lit-element";
import "../../dist/components/Button";

@customElement("momentum-ui-web-components-sandbox")
export class Sandbox extends LitElement {
    
  render() {
    return html`
      <div>WORKS</div>
      <div>
    <md-button disabled><span slot="text">disabled</span></md-button>
    <md-button variant="primary" disabled><span slot="text">disabled</span></md-button>
    <md-button variant="primary" tab-index="-1" color="violet"><span slot="text">no disabled</span></md-button>
    <md-button loading circle><span slot="text">loading</span></md-button>
    <md-button loading><span slot="text">loading</span></md-button>
    <md-button variant="green" circle loading>
      <md-icon slot="icon" name="pause_16"></md-icon>
      <span slot="text">loading</span>
    </md-button>
  </div>
    `;
  }
}
