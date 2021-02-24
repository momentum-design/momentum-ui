import "@/components/table-advanced/TableAdvanced";
import { customElement, html, internalProperty, LitElement } from "lit-element";
import { TableMock } from "@/components/table-advanced/sandbox-table-mock";

@customElement("default-table-advanced-sandbox")
export class DefaultTableAdvanced extends LitElement {
  @internalProperty() litProp = "$";

  render() {
    const conf = TableMock.ShortkeyTable.config;
    conf.cellTemplates = {
      "_info_": {
        templateName: "tmp1"
      },
      "_warn_": {
        templateName: "tmp2"
      },
      "_error_": {
        templateName: "tmp3"
      }
    };

    return html`
      <md-table-advanced .config=${conf} .data=${TableMock.ShortkeyTable.data}>
        <template id="tmp1">
          <md-icon class="warn-icon" name="warning_20" color="blue"></md-icon>
        </template>

        <template id="tmp2">
          <md-icon class="warn-icon" name="warning_20" color="yellow"></md-icon>
        </template>

        <template id="tmp3">
          <md-icon class="warn-icon" name="error_20" color="red"></md-icon>
        </template>
      </md-table-advanced>
    `;
  }
}


export const tableAdvancedTemplate = html`
  <div style="height: 400px; width: 100%;">
    <default-table-advanced-sandbox></default-table-advanced-sandbox>
  </div>
`;