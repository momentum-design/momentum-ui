/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/menu/Menu";
import "@/components/menu/MenuItem";
import { html } from "lit-element";


export const menuItemTemplate = html`
  <md-menu>
    <md-menu-item href="./" inline>
      <md-icon name="recents_16"></md-icon>
      <span>Contact History</span>
    </md-menu-item>
    <md-menu-item href="./" inline>
      <md-icon name="apps_16"></md-icon>
      <span>Cisco WxM</span>
    </md-menu-item>
    <md-menu-overlay style="display: inline-flex;">
      <md-menu-item slot="menu-trigger" inline>
        <md-icon name="cancel_16"></md-icon>
        <span>Cisco Test</span>
      </md-menu-item>
      <div style="padding:0.25rem;">
        <md-menu-item href="./">
          <md-icon name="favorite_16"></md-icon>
          <span>Cisco Favorite</span>
        </md-menu-item>
        <md-menu-item href="./">
          <md-icon name="edit_16"></md-icon>
          <span>Cisco Edit</span>
        </md-menu-item>
      </div>
    </md-menu-overlay>
    <md-menu-item href="./" inline>
      <md-icon name="alarm_16"></md-icon>
      <span>Cisco Answer</span>
    </md-menu-item>
  </md-menu>
`;