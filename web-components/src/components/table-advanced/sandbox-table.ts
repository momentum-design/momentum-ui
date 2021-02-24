import { customElement, html, internalProperty, LitElement } from "lit-element";
import "./TableAdvanced";
import { TableAdvanced } from "./TableAdvanced";

@customElement("momentum-ui-web-components-sandbox")
export class Sandbox extends LitElement {
  @internalProperty({}) litProp = "$";

  render() {
    const conf = MOCK.COMPLEX.config;
    conf.cellTemplates = {
      _tmp_: {
        templateName: "tmp1"
      },
      _tmp2_: {
        content: "replace",
        templateName: "tmp2",
        templateCb: p => {
          const span = p.fragment.querySelector<HTMLElement>(".sp")!;
          span.innerText = `OK - [${p.iRow},${p.iCol}] - ${p.value}`;

          const btn = p.fragment.querySelector<HTMLButtonElement>("button")!;
          btn.addEventListener("click", () => {
            this.litProp = "will not work";
            this.requestUpdate();
            console.log("EVT");
          });
        }
      }
    };

    return html`
      <div style="height: 400px; width: 100%;">
        <md-table-advanced .config=${conf} .data=${MOCK.COMPLEX.data}>
          <template id="tmp1">
            <span>[OK]</span>
          </template>

          <template id="tmp2">
            <span>${this.litProp}</span>
            <span class="sp"></span>
            <button @click=${() => console.log("will not work")}>BTN</button>
          </template>
        </md-table-advanced>
      </div>
    `;
  }
}

export namespace MOCK {
  export const DATA: TableAdvanced.Data = {
    list2d: [
      ["data11", "data21", "data31"],
      ["data12", "data22", "data32"],
      ["data13", "data23", "data33"]
    ]
  };

  export const CSV: TableAdvanced.Data = {
    csv: `data11, data21, data31
          data12, data22, data32
          data13, data23, data33`
  };

  export const CSV_AGENTX =
    "Group, Action, Shortcut Key \n Active Task List, Switch between tasks, Ctrl + Alt + T \n Active Task List, Expand and collapse task list, Ctrl + Alt + C \n Agent State, Available for all channels including call chat email and social channel, Ctrl + Alt + R \n Active Agent State List, Idle for all channels, Ctrl + Alt + N \n Application, Switch between popovers, Ctrl + Alt + E \n Application, Maximize and minimize popover view maximize and minimize, Ctrl + Alt + Q \n Call Handling, Open the list of chat templates, Ctrl + Alt + A \n Call Handling, Attach a file to the chat, Ctrl + Alt + S \n Edit CAD Variables, Save edited call variable values, Ctrl + Alt + O \n Edit CAD Variables, Revert edited call variable values, Ctrl + Alt + N \n Email Handling, Send email, Ctrl + Alt + S \n Email Handling, Reply, Ctrl + Alt + O";

  export const COMPLEX: { config: TableAdvanced.Config; data: TableAdvanced.Data } = {
    config: {
      isStickyHeader: false,

      rows: {
        isDraggable: true,
        selectable: "multiple"
      },

      cols: {
        isDraggable: true,
        isResizable: true,
        collapse: "c1",
        define: [
          {
            groupName: "Group 1",
            children: [
              { id: "c1", title: "Col1f", sorter: "byString", filters: "forString" },
              { id: "c2", title: "Col2s" },
              { id: "c3", title: "Col3" }
            ]
          },
          { id: "c4", title: "Col4h", isHeader: true },
          { id: "c5", title: "Col5s", sorter: "byString" },
          {
            groupName: "group2",
            children: [
              { id: "c6", title: "col6f" },
              { id: "c7", title: "col7" }
            ]
          }
        ]
      }
    },
    data: {
      list2d: [
        ["col _tmp_ 11", "12", "13", "14", "15", "str_tmp2_", "txt _tmp2_ txt"],
        ["_tmp_ col21 sub", "22", "23", "24", "25", "26", "27"],
        ["col31 sub_tmp_", "32", "33", "34", "35", "36", "37"]
      ]
    }
  };
}
