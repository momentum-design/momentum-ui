/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { withA11y } from "@storybook/addon-a11y";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import "@/components/table/Table";
import "@/components/theme/Theme";

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
    }
  }
};

const data = 'Group, Action, Shortcut Key \n Active Task List, Switch between tasks, Ctrl + Alt + T \n Active Task List, Expand and collapse task list, Ctrl + Alt + C \n Agent State, Available for all channels including call chat email and social channel, Ctrl + Alt + R \n Active Agent State List, Idle for all channels, Ctrl + Alt + N \n Application, Switch between popovers, Ctrl + Alt + E \n Application, Maximize and minimize popover view maximize and minimize, Ctrl + Alt + Q \n Call Handling, Open the list of chat templates, Ctrl + Alt + A \n Call Handling, Attach a file to the chat, Ctrl + Alt + S \n Edit CAD Variables, Save edited call variable values, Ctrl + Alt + O \n Edit CAD Variables, Revert edited call variable values, Ctrl + Alt + N \n Email Handling, Send email, Ctrl + Alt + S \n Email Handling, Reply, Ctrl + Alt + O'

export const Table = () => {
  const darkTheme = boolean("darkMode", false);
  const label = text("aria-label", "Table");
  const stickheader = boolean("stickheader", false);
  const zebra = boolean("zebra", false);
  const clean = boolean("clean", false);
  const sorting = boolean("sorting", false);

  return html`
  <p>"Data" for create table should have this format:</br>
    - table header name or column name, for example: column1, column2, column3, column4;</br>
    - use "\\n" for line break;</br>
    - in data property you can see example: </br>
     <pre>"id, Product Name, Quantity, Price, Date Purchased \\n 2, Espresso Truffle, 6, 1.75, Sat Aug 22 2020 \\n 1, Caffe Espresso, 3, 3, Tue Nov 24 2020 \\n 0, Cappuccino, 8, 5, Wed Feb 26 2020 \\n 4, Espresso Truffle, 6, 1.75, Sat Aug 22 2020 \\n 5, Peppermint Mocha Twist, 1, 4, Fri May 01 2020 \\n 6, White Chocolate Mocha, 11, 3.6, Sat Feb 15 2020 \\n 7, Caffe Espresso, 2, 3, Mon Oct 26 2020 \\n 8, Peppermint Mocha Twist, 3, 4, Sat Aug 22 2020 \\n 9, Caffe Espresso, 10, 3, Fri Oct 16 2020 \\n 10, Black Tea, 5, 2.25, Mon Feb 03 2020"</pre></br>
  </p>
  <md-theme class="theme-toggle" id="floating" ?darkTheme=${darkTheme}>
    <div style="height: 400px;">
      <md-table .zebra=${zebra} label="${label}" tabledata="${data}" .stickheader="${stickheader}" .clean="${clean}" .sorting="${sorting}"></md-table>
    </div>
  </md-theme>
  
  `;
};
