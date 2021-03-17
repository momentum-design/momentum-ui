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

const colorTableHeader = 'Theme Color Token Name, Light Mode, Dark Mode';
const finalColorTableData = colorTableHeader + colorTableData;

export const colorTableTemplate = html`
  <div style="height: 400px;">
    <md-table tabledata="${finalColorTableData}"></md-table>
  </div>
`;