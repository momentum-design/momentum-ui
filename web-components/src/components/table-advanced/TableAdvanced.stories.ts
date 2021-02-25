/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { withA11y } from "@storybook/addon-a11y";
import { boolean, text, withKnobs, select, object } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { TableAdvanced } from "@/components/table-advanced/TableAdvanced";
import "@/components/table-advanced/TableAdvanced";
import "@/components/theme/Theme";

export default {
  title: "Table Advanced",
  component: "md-table-advanced",
  decorators: [withKnobs, withA11y],
  argTypes: {
    nodata: { table: { disable: true } },
  },
  parameters: {
    a11y: {
      element: "md-table-advanced"
    },
    docs: { 
      description: { 
        component: '' 
      },
    }
  }
};

const DefaultAdvancedTable: { config: TableAdvanced.Config; data: TableAdvanced.Data } = {
  config: {
    isStickyHeader: true,

    rows: {
      isDraggable: false,
      selectable: "multiple"
    },

    cols: {
      isDraggable: true,
      isResizable: true,
      define: [
        { id: "col-ani", title: "ANI", sorter: "byString" },
        { id: "col-stage", title: "Abandoment Statge", filters: "forString" },
        { id: "col-transfer", title: "Transfer" },
        { id: "col-wait", title: "Total Wait Time" },
        { id: "col-back", title: "Call Back Received", filters: "forString" },
        { id: "col-time", title: "Call Back Time" }
      ]
    }
  },
  data: {
    list2d: [
      ["12345670", "IRV", "0", "00:45", "Yes", "12:34 PM"],
      ["12345671", "QWT (1-5 min)", "0", "00:20", "No", "Follow-up"],
      ["12345672", "QWT (5-10 min)", "1", "01:15", "Yes", "09:30 AM"],
      ["12345673", "QWT > 10 min", "2", "00:35", "No", "11:25 PM"],
      ["12345674", "QWT > 10 min", "1", "00:15", "Yes", "Follow-up"],
      ["12345675", "IRV", "2", "00:23", "Yes", "Follow-up"],
      ["12345676", "QWT (1-5 min)", "0", "00:52", "No", "10:16 AM"],
      ["12345677", "IRV", "1", "00:25", "Yes", "Follow-up"],
      ["12345678", "QWT (1-5 min)", "2", "01:05", "No", "03:34 PM"],
      ["12345679", "QWT (5-10 min)", "2", "00:35", "Yes", "02:12 AM"],
      ["12345680", "QWT (1-5 min)", "1", "00:41", "No", "Follow-up"]
    ]
  }
};


export const Default = () => {
  const darkTheme = boolean("darkMode", false);
  const lumos = boolean("Lumos Theme", false);

  return html`
  <md-theme class="theme-toggle" id="table" ?darkTheme=${darkTheme} ?lumos=${lumos}>
    <div style="height: 400px;">
      <md-table-advanced .config=${DefaultAdvancedTable.config} .data=${DefaultAdvancedTable.data}> </md-table-advanced>
    </div>
  </md-theme>
  
  `;
};
