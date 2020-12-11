/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/table/Table";
import { html } from "lit-element";


export const menuItemTemplate = html`
  <div>
    <md-menu-item href="./" >
      <md-icon name="recents_16"></md-icon>
      <span>Contact History</span>
    </md-menu-item>
    <md-menu-item href="./" >
      <md-icon name="apps_16"></md-icon>
      <span>Cisco WxM</span>
    </md-menu-item>
    <md-menu-item href="./" >
      <md-icon name="alarm_16"></md-icon>
      <span>Cisco Answer</span>
    </md-menu-item>
  </div>
`;