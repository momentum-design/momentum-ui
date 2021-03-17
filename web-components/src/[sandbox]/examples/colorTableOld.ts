/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/table/Table";
import { html } from "lit-element";
import { colorTableData } from "@/wc_scss/colors/vars/color-table-data-string";
import { TableAdvanced } from "@/index";
// import { colorCellTemplates } from "../sandbox.mock";

console.log("colorTableData", colorTableData);

// convert string to 2d array
const colorTableRowData = colorTableData.split("\n");
console.log("colorTableDataArray1", colorTableRowData);

let colorTable2DArray: any = [];
for (let i = 1; i < colorTableRowData.length - 1; i++) {
  colorTable2DArray[i] = colorTableRowData[i].split(",");
}

console.log("2D array", colorTable2DArray);

export const ColorTokenTableData: { config: TableAdvanced.Config; data: TableAdvanced.Data } = {
  config: {
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

const conf = ColorTokenTableData.config;
// conf.cellTemplates = colorCellTemplates;

const generalTempStyle = "display: inline-block; height: 20px; width: 20px; margin-left: 4px; vertical-align: middle;";
export const colorTableTemplate = html`
  <div style="height: 400px;">
    </br>
    <h3>Color Token Instructions</h3>
    <p>Within your stylesheet, you may use any of the CSS variables along with a fallback color as the second value.</p>
    <code>background-color: var(--md-button-primary-bg-color, $md-button-primary-bg-color-light);</code>
    <md-table-advanced .config=${ColorTokenTableData.config} .data=${ColorTokenTableData.data}>
      <template id="mdblue60">
        <div class="color-box" style="${generalTempStyle} background-color: $md-blue-60;"></div>
      </template>
      <template id="mdblue70">
        <div class="color-box" style="${generalTempStyle} background-color: $md-blue-70;"></div>
      </template>
    </md-table-advanced>
  </div>
`;
