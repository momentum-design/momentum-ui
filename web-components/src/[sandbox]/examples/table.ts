/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/table/Table";
import { html } from "lit-element";

const data = 'Active Task List, Switch between tasks, Ctrl + Alt + T \n Active Task List, Expand and collapse task list, Ctrl + Alt + C *** \n Agent State, Available for all channels including call chat email and social channel, Ctrl + Alt + R xxx \n Active Agent State List, Idle for all channels, Ctrl + Alt + N \n Application, Switch between popovers, Ctrl + Alt + E \n Application, Maximize and minimize popover view maximize and minimize, Ctrl + Alt + Q \n Call Handling, Open the list of chat templates, Ctrl + Alt + A !!! \n Call Handling, Attach a file to the chat, Ctrl + Alt + S \n Edit CAD Variables, Save edited call variable values, Ctrl + Alt + O \n Edit CAD Variables, Revert edited call variable values, Ctrl + Alt + N \n Email Handling, Send email, Ctrl + Alt + S \n Email Handling, Reply, Ctrl + Alt + O'

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

export const tableTemplate = html`
  <div style="height: 400px; width: 100%;">
    <md-table tabledata="${data}" sorting .headerdata="${headerColumn}"></md-table>
  </div>
`;
