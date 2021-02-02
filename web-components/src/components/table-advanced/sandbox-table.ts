import { customElement, html, LitElement } from "lit-element";
import { TableAdvanced } from "./TableAdvanced";
import "./TableAdvanced";

const CONF: TableAdvanced.Config = {
  cols: {
    define: [
      { id: "col1", title: "Col1" },
      { id: "col2", title: "Col3" },
      { id: "col3", title: "Col4" }
    ]
  }
};

const DATA = [
  ["data11", "data21", "data31"],
  ["data12", "data22", "data32"],
  ["data13", "data23", "data33"]
];


@customElement("momentum-ui-web-components-sandbox")
export class Sandbox extends LitElement {
  render() {
    return html`
      <h2>Advanced Table</h2>
      <md-table-advanced .config=${CONF} .data=${DATA}></md-table-advanced>
    `;
  }
}
