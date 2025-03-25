/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/icon/Icon";
import "@/components/menu/Menu";
import "@/components/menu/MenuItem";
import { html } from "lit";

export const menuItemTemplate = html`
  <md-menu>
    <md-menu-item>
      <md-icon name="recents-bold" size="16" iconSet="momentumDesign"></md-icon>
      <span>Contact History</span>
    </md-menu-item>
    <md-menu-item disabled>
      <md-icon name="apps-bold" size="16" iconSet="momentumDesign"></md-icon>
      <span>Cisco WxM</span>
    </md-menu-item>
    <md-menu-item>
      <md-icon name="cancel-bold" size="16" iconSet="momentumDesign"></md-icon>
      <span>Cisco Test</span>
    </md-menu-item>
    <md-menu-item>
      <md-icon name="alarm-bold" size="16" iconSet="momentumDesign"></md-icon>
      <span>Cisco Answer</span>
    </md-menu-item>
  </md-menu>
`;
