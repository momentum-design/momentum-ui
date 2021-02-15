import { customElement, html, LitElement } from "lit-element";
import { TableMock } from "./src/mock";
import "./TableAdvanced";

@customElement("momentum-ui-web-components-sandbox")
export class Sandbox extends LitElement {
  render() {
    return html`
      <div style="height: 400px; width: 100%;">
        <md-table-advanced .config=${TableMock.COMPLEX.config} .data=${TableMock.COMPLEX.data}></md-table-advanced>
      </div>
      
    `;
  }
}
