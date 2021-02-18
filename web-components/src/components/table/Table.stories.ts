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
import { Description } from '@storybook/addon-docs/blocks';
import "@/components/table/Table";
import "@/components/theme/Theme";
import { formatType } from "@/components/table/Table";


export default {
  title: "Table",
  component: "md-table",
  decorators: [withKnobs, withA11y],
  argTypes: {
    nodata: { table: { disable: true } },
    csvData: { table: { disable: true } },
    headerRow: { table: { disable: true } },
    results: { table: { disable: true } },
    config: { table: { disable: true } },
    tableClassMap: { table: { disable: true } }
  },
  parameters: {
    a11y: {
      element: "md-table"
    },
    docs: { 
      description: {
        component: '####**Data** for create table should have this format: - use "\\n" for line break, - in data property you can see example: ``` "id, Product Name, Quantity, Price, Date Purchased \\n 2, Espresso Truffle, 6, 1.75, Sat Aug 22 2020" ``` \r ####The **Table Header** is passed as a separate variable in the format of an array of objects, for example: ``` { name: "Column name 1", width: "column 1 width in percent" } ```  \r ####To display the icons - Error, Attention, Info in the column, use the following symbols by default in the text of the required cell: ```- Info - !!!; -  Attention - *** ; - Error - xxx; ``` \r ####You can change these characters by passing them to the appropriate variable.'
      },
    } 
  } 
};

const headerColumn = [
  {
    name: "Group",
    width: "30%"
  },
  {
    name: "Action",
    width: "40%"
  },
  {
    name: "Shortcut Key",
    width: "30%"
  }
];

export const Table = () => {
  const darkTheme = boolean("darkMode", false);
  const lumos = boolean("Lumos Theme", false);
  const tabledata = text("Data for Table", "Active Task List, Switch between tasks, Ctrl + Alt + T \n Active Task List, Expand and collapse task list, Ctrl + Alt + C *** \n Agent State, Available for all channels including call chat email and social channel, Ctrl + Alt + R \n Active Agent State List, Idle for all channels, Ctrl + Alt + N \n Application, Switch between popovers, Ctrl + Alt + E !!! \n Application, Maximize and minimize popover view maximize and minimize, Ctrl + Alt + Q \n Call Handling, Open the list of chat templates, Ctrl + Alt + A xxx \n Call Handling, Attach a file to the chat, Ctrl + Alt + S \n Edit CAD Variables, Save edited call variable values, Ctrl + Alt + O \n Edit CAD Variables, Revert edited call variable values, Ctrl + Alt + N \n Email Handling, Send email, Ctrl + Alt + S \n Email Handling, Reply, Ctrl + Alt + O");
  const header = object("Data for Heder", headerColumn);
  const info = text("Info Sign", "!!!");
  const warning = text("Warning Sign", "***");
  const error = text("Error Sign", "xxx");
  const stickheader = boolean("stickheader", false);
  const zebra = boolean("zebra", false);
  const clean = boolean("clean", false);
  const sorting = boolean("sorting", false);
  const noBorders = boolean("noBorders", false);
  const format = select("format", formatType, "default");

  return html`
  
  <md-theme class="theme-toggle" id="table" ?darkTheme=${darkTheme} ?lumos=${lumos}>
    <div style="height: 400px;">
      <md-table
        .zebra=${zebra}
        label="Table"
        .tabledata="${tabledata}"
        .headerdata="${header}"
        .warning="${warning}"
        .info="${info}"
        .error="${error}"
        .stickheader="${stickheader}"
        .clean="${clean}"
        .sorting="${sorting}"
        no-borders="${noBorders}"
        .format=${format}></md-table>
    </div>
  </md-theme>
  
  `;
};
