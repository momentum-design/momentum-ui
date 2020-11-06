
import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement, property } from "lit-element";
import { parse } from "path";
//import { classMap } from "lit-html/directives/class-map.js";
//import styles from "./scss/module.scss";

@customElement("md-table")
export class Table extends LitElement {
  @property({ type: String }) src = "./table.csv";


  tableOutput() {
    const lines = parse //this.src.split("\n");
    let output = [];
    console.log(lines);

    for (var i = 0; i < lines.length; i++) {
      //output.push("<tr><td>" + lines[i].slice(0, -1).split(",").join("</td><td>") + "</td></tr>");
      //output = "<table>" + output.join("") + "</table>";
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.tableOutput();
  }

  static get styles() {
    return [reset];
  }

  render() {
    return html`
      <table class="md-table">
        Test md-table
      </table>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-table": Table;
  }
}