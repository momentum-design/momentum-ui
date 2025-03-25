/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/button-group/ButtonGroup";
import "@/components/button/Button";
import "@/components/icon/Icon";
import { html } from "lit";

export const buttonGroupTemplate = html`
  <div class="column">
    <h3>Icon only - 2 options</h3>
    <md-button-group>
      <button slot="button" aria-label="text-table" type="button" value="text-table">
        <md-icon name="table-bold" size="16" iconSet="momentumDesign"></md-icon>
      </button>
      <button slot="button" aria-label="analysis" type="button" value="analysis">
        <md-icon name="analysis-bold" size="16" iconSet="momentumDesign"></md-icon>
      </button>
    </md-button-group>
  </div>
  <div class="column">
    <h3>Icon only - disabled</h3>
    <md-button-group disabled>
      <button slot="button" aria-label="text-table" type="button" value="text-table">
        <md-icon name="table-bold" size="16" iconSet="momentumDesign"></md-icon>
      </button>
      <button slot="button" aria-label="analysis" type="button" value="analysis">
        <md-icon name="analysis-bold" size="16" iconSet="momentumDesign"></md-icon>
      </button>
    </md-button-group>
  </div>
  <div class="column">
    <h3>Icon only - 3 options</h3>
    <md-button-group>
      <button slot="button" aria-label="pie-chart" type="button" value="pie-chart">
        <md-icon name="pie-chart-bold" size="16" iconSet="momentumDesign"></md-icon>
      </button>
      <button slot="button" aria-label="text-table" type="button" value="text-table">
        <md-icon name="table-bold" size="16" iconSet="momentumDesign"></md-icon>
      </button>
      <button slot="button" aria-label="analysis" type="button" value="analysis">
        <md-icon name="analysis-bold" size="16" iconSet="momentumDesign"></md-icon>
      </button>
    </md-button-group>
  </div>
  <div class="column">
    <h3>Text Label - 2 options</h3>
    <md-button-group>
      <button slot="button" type="button" value="Option A">Option A</button>
      <button slot="button" type="button" value="Option B">Option B</button>
    </md-button-group>
  </div>
  <div class="column">
    <h3>Text Label - 3 options</h3>
    <md-button-group>
      <button slot="button" type="button" value="Option A">Option A</button>
      <button slot="button" type="button" value="Option B">Option B</button>
      <button slot="button" type="button" value="Option C">Option C</button>
    </md-button-group>
  </div>
`;
