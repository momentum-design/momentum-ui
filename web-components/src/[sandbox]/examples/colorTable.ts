/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/internal-components/color-table/ColorTable";
import { html } from "lit-element";
let isModalOpen = false;
export const colorTableTemplate = html`
  <md-menu-overlay
    custom-width="154px"
    @menu-overlay-open=${() => {
      isModalOpen = true;
    }}
    @menu-overlay-close=${() => {
      isModalOpen = false;
    }}
    class="customization"
  >
    <md-button slot="menu-trigger" variant="ghost" ariaExpanded=${isModalOpen} class="customization-btn"
      ><md-icon slot="icon" aria-hidden="true" name="icon-settings_16"></md-icon
      ><span slot="text">"Customization"</span></md-button
    >
    <div class="customization-menu-overlay">
      <md-list label="customization" role="menu">
        <md-list-item class="custom-list" slot="list-item" aria-haspopup="menu" role="menuitem">
          <md-menu-overlay max-height="344px" placement="right-start" size="small">
            <div class="menu-trigger-button" slot="menu-trigger">
              <span>ShowHide</span>
              <div>
                <md-icon
                  ariaHidden="true"
                  slot="icon"
                  name="arrow-right-bold"
                  size="12"
                  iconSet="momentumDesign"
                ></md-icon>
              </div>
            </div>
            <div class="overlay-container">
              <div class="show-hide-header-wrapper">
                <md-input
                  clear
                  clearAriaLabel="clear"
                  htmlId="pillSearchInput"
                  name="pillSearchInput"
                  shape="pill"
                  placeholder="search"
                  ariaLabel="search"
                  searchable
                  @input-change=${(event: CustomEvent) => console.log("this.handleSearch(event)")}
                >
                </md-input>
                <md-checkbox class="checkbox select-all-checkbox" @checkbox-change=${(event: CustomEvent) => {}}
                  >SelectAll</md-checkbox
                >
              </div>
              <div class="checkbox-container-showhide-column">
                <md-checkboxgroup group-label="column_titles">
                  ${["CB1", "CB2", "CB3"].map((V) => {
                    return html` <md-checkbox class="checkbox" slot="checkbox">${V}</md-checkbox> `;
                  })}
                </md-checkboxgroup>
              </div>
            </div>
          </md-menu-overlay>
        </md-list-item>

        <md-list-item class="custom-list" slot="list-item" aria-haspopup="menu" role="menuitem">
          <md-menu-overlay placement="right-start" size="small">
            <div class="menu-trigger-button" slot="menu-trigger">
              <md-tooltip message="CustomizeMenuWarning" placement="bottom">
                <span>"groupBy"</span>
              </md-tooltip>
              <div>
                <md-icon
                  ariaHidden="true"
                  slot="icon"
                  name="arrow-right-bold"
                  size="12"
                  iconSet="momentumDesign"
                ></md-icon>
              </div>
            </div>
            <div class="overlay-container">
              <div class="group-by-header-wrapper">
                <md-input
                  clear
                  clearAriaLabel="clear"
                  htmlId="pillSearchInput"
                  name="pillSearchInput"
                  shape="pill"
                  placeholder="search"
                  ariaLabel="search"
                  searchable
                  @input-change=${(event: CustomEvent) => console.log("this.handleSearch(event)")}
                >
                </md-input>
              </div>
              <div class="checkbox-container-group-column">
                <md-checkboxgroup group-label="column_titles">
                  ${["C1", "C2", "C3"].map((v) => {
                    return html` <md-checkbox class="checkbox" slot="checkbox">${v}</md-checkbox> `;
                  })}
                </md-checkboxgroup>
              </div>
            </div>
          </md-menu-overlay>
        </md-list-item>
      </md-list>
    </div>
  </md-menu-overlay>
`;
