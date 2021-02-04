import { customElement, html, LitElement } from "lit-element";
import { TableMock } from "./src/mock";
import "./TableAdvanced";

@customElement("momentum-ui-web-components-sandbox")
export class Sandbox extends LitElement {
  render() {
    return html`
      <!-- <h3>Advanced Table</h3> -->
      <!-- <md-table-advanced .config=${TableMock.CONF} .data=${TableMock.DATA}></md-table-advanced> -->
      
      <h3>Advanced Table Complex</h3>
      <div style="height: 400px; width: 100%;">
        <md-table-advanced .config=${TableMock.COMPLEX.config} .data=${TableMock.COMPLEX.data}></md-table-advanced>
      </div>
      
    `;
  }
}
