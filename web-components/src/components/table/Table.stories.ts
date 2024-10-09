/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/table/Table";
import { ThemeNameValues } from "@/components/theme/Theme";
import { Args } from "@storybook/web-components";
import { html } from "lit-element";
import { formatType } from "./Table"; // Keep type import as a relative path

export default {
  title: "Components/Table",
  component: "md-table",
  argTypes: {
    nodata: { table: { disable: true } },
    csvData: { table: { disable: true } },
    headerRow: { table: { disable: true } },
    results: { table: { disable: true } },
    config: { table: { disable: true } },
    tableClassMap: { table: { disable: true } },
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean", defaultValue: false },
    tabledata: {
      control: "text",
      defaultValue:
        "Group, Action, Shortcut Key \n Active Task List, Switch between tasks, Ctrl + Alt + T \n Active Task List, Expand and collapse task list, Ctrl + Alt + C \n Agent State, Available for all channels including call chat email and social channel, Ctrl + Alt + R \n Active Agent State List, Idle for all channels, Ctrl + Alt + N \n Application, Switch between popovers, Ctrl + Alt + E \n Application, Maximize and minimize popover view maximize and minimize, Ctrl + Alt + Q \n Call Handling, Open the list of chat templates, Ctrl + Alt + A \n Call Handling, Attach a file to the chat, Ctrl + Alt + S \n Edit CAD Variables, Save edited call variable values, Ctrl + Alt + O \n Edit CAD Variables, Revert edited call variable values, Ctrl + Alt + N \n Email Handling, Send email, Ctrl + Alt + S \n Email Handling, Reply, Ctrl + Alt + O"
    },
    label: { defaultValue: "Table" },
    stickheader: { control: "boolean", defaultValue: false },
    zebra: { control: "boolean", defaultValue: false },
    clean: { control: "boolean", defaultValue: false },
    sorting: { control: "boolean", defaultValue: false },
    noBorders: { control: "boolean", defaultValue: false },
    format: { control: { type: "select", options: formatType }, defaultValue: "default" }
  },
  parameters: {
    a11y: {
      element: "md-table"
    },
    docs: {
      description: {
        component:
          '"Data" for create table should have this format: - table header name or column name, for example: column1, column2, column3, column4, - use "\\n" for line break, - in data property you can see example: "id, Product Name, Quantity, Price, Date Purchased \\n 2, Espresso Truffle, 6, 1.75, Sat Aug 22 2020"'
      }
    }
  }
};

//  <p>"Data" for create table should have this format:</br>
//     - table header name or column name, for example: column1, column2, column3, column4;</br>
//     - use "\\n" for line break;</br>
//     - in data property you can see example: </br>
//      <pre>"id, Product Name, Quantity, Price, Date Purchased \\n 2, Espresso Truffle, 6, 1.75, Sat Aug 22 2020"</pre></br>
//   </p> 
export const Table = (args: Args) => {
  return html`
    <md-theme class="theme-toggle" id="table" ?darkTheme=${args.darkTheme} theme=${args.theme}>
      <div style="height: 400px;">
        <md-table
          .zebra=${args.zebra}
          .label="${args.label}"
          .tabledata="${args.tabledata}"
          .stickheader="${args.stickheader}"
          .clean="${args.clean}"
          .sorting="${args.sorting}"
          ?no-borders=${args.noBorders}
          .format=${args.format}
        ></md-table>
      </div>
    </md-theme>
  `;
};
