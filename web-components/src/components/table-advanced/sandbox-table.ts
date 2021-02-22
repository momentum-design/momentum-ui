import { customElement, html, LitElement } from "lit-element";
import { TableMock } from "./sandbox-table-mock";
import "./TableAdvanced";

@customElement("momentum-ui-web-components-sandbox")
export class Sandbox extends LitElement {
  render() {
    const conf = TableMock.COMPLEX.config;
    conf.cellTemplates = {
      "_tmp_": {
        templateName: "tmp1"
      },
      "_tmp2_": {
        content: "replace",
        templateName: "tmp2",
        templateCb: p => {
          const span = p.fragment.querySelector<HTMLElement>(".sp")!;
          span.innerText = `WORKZZZ - [${p.iRow},${p.iCol}] - ${p.value}`;

          const btn = p.fragment.querySelector<HTMLButtonElement>("button")!;
          btn.addEventListener("click", e => console.log("EVT"));
        }
      }
    };

    return html`
      <div style="height: 400px; width: 100%;">
        <md-table-advanced .config=${conf} .data=${TableMock.COMPLEX.data}>
          <template id="tmp1">
            <span>[ZZZ]</span>
          </template>

          <template id="tmp2">
            <span class="sp">FAILED callback</span>
            <button>BTN</button>
          </template>
        </md-table-advanced>
      </div>
    `;
  }
}
