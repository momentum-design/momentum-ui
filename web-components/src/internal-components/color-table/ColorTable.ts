import "@/components/table-advanced/TableAdvanced";
import { customElement, html, internalProperty, LitElement, PropertyValues } from "lit-element";
import { colorTableData } from "@/wc_scss/colors/vars/color-table-data-string";
import { TableAdvanced } from "@/components/table-advanced/TableAdvanced";
import { nothing } from "lit-html";
import { colorCellTemplates } from "./data";
import { allColorTemplates } from "./utils";
import reset from "@/wc_scss/reset.scss";
import styles from "./scss/module.scss";

@customElement("color-table")
export class ColorTableSandbox extends LitElement {
  @internalProperty() colorTokenTableData: { config: TableAdvanced.Config; data: TableAdvanced.Data } | undefined =
    undefined;

  firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);

    // convert string to 2d array
    const colorTableRowData = colorTableData.split("\n");

    const colorTable2DArray: any = [];
    for (let i = 1; i < colorTableRowData.length - 1; i++) {
      colorTable2DArray[i] = colorTableRowData[i].split(",");
    }

    this.colorTokenTableData = {
      config: {
        cellTemplates: colorCellTemplates,
        isStickyHeader: true,

        rows: {
          isDraggable: true,
          selectable: "multiple"
        },

        cols: {
          isResizable: true,
          define: [
            { id: "c1", title: "Color Token CSS Variable", width: "40%", sorter: "byString", filters: "forString" },
            { id: "c2", title: "Light Mode", width: "30%", sorter: "byString", filters: "forString" },
            { id: "c3", title: "Dark Mode", width: "30%", filters: "forString" }
          ]
        }
      },

      data: {
        list2d: colorTable2DArray
      }
    };
  }

  renderColorTable() {
    if (this.colorTokenTableData?.config && this.colorTokenTableData?.data) {
      return html`
        </br>
        <h3>Color Token Instructions</h3>
        <p>
          Within your stylesheet, you may use any of the CSS variables along with a fallback color as the second value.
        </p>
        <code class="code-block">background-color: var(--md-button-primary-bg-color, $md-button-primary-bg-color-light);</code>
        <md-table-advanced
          class="color-table"
          .config=${this.colorTokenTableData.config}
          .data=${this.colorTokenTableData.data}
        >
          ${allColorTemplates()}
        </md-table-advanced>
      `;
    } else {
      return nothing;
    }
  }

  static get styles() {
    return [reset, styles];
  }

  render() {
    return html` ${this.renderColorTable()} `;
  }
}
