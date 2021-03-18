/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/menu/Menu";
import "@/components/menu/MenuItem";
import "@/components/icon/Icon";
import { html } from "lit-element";

export const menuItemTemplate = html`
  <md-menu>
    <md-menu-item>
      <md-icon name="recents_16"></md-icon>
      <span>Contact History</span>
    </md-menu-item>
    <md-menu-item disabled>
      <md-icon name="apps_16"></md-icon>
      <span>Cisco WxM</span>
    </md-menu-item>
    <md-menu-item>
      <md-icon name="cancel_16"></md-icon>
      <span>Cisco Test</span>
    </md-menu-item>
    <md-menu-item>
      <md-icon name="alarm_16"></md-icon>
      <span>Cisco Answer</span>
    </md-menu-item>
  </md-menu>
`;
