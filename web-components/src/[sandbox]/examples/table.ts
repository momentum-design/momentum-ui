/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { tableWarns } from "@/[sandbox]/sandbox.mock";
import "@/components/checkbox/Checkbox";
import "@/components/checkbox/CheckboxGroup";
import "@/components/table/Table";
import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, query, state } from "lit/decorators.js";

const tableError = [
  { row: 4, col: 3 },
  { row: 6, col: 3 }
];

const data =
  "Group, Action, Shortcut Key \n Active Task List, Switch between tasks, Ctrl + Alt + T \n Active Task List, Expand and collapse task list, Ctrl + Alt + C \n Agent State, Available for all channels including call chat email and social channel, Ctrl + Alt + R \n Active Agent State List, Idle for all channels, Ctrl + Alt + N \n Application, Switch between popovers, Ctrl + Alt + E \n Application, Maximize and minimize popover view maximize and minimize, Ctrl + Alt + Q \n Call Handling, Open the list of chat templates, Ctrl + Alt + A \n Call Handling, Attach a file to the chat, Ctrl + Alt + S \n Edit CAD Variables, Save edited call variable values, Ctrl + Alt + O \n Edit CAD Variables, Revert edited call variable values, Ctrl + Alt + N \n Email Handling, Send email, Ctrl + Alt + S \n Email Handling, Reply, Ctrl + Alt + O";

@customElement("table-template-sandbox")
export class TableTemplateSandbox extends LitElement {
  @state() private clean = false;
  @state() private noBorders = false;
  @state() private stripped = false;
  @state() private sorting = false;

  @query("#clean") cleanCheckbox!: HTMLInputElement;
  @query("#noBorders") noBordersCheckbox!: HTMLInputElement;
  @query("#stripped") strippedCheckbox!: HTMLInputElement;
  @query("#sorting") sortingCheckbox!: HTMLInputElement;

  static get styles() {
    return [
      css`
        .page-container {
          display: flex;
          flex-direction: column;
          height: 100%;
          gap: 16px;
        }

        .options-container {
          display: flex;
          justify-content: flex-start;
          gap: 8px;
        }
      `
    ];
  }

  cleanChanged() {
    this.clean = this.cleanCheckbox.checked;
  }

  noBordersChanged() {
    this.noBorders = this.noBordersCheckbox.checked;
  }

  strippedChanged() {
    this.stripped = this.strippedCheckbox.checked;
  }

  sortingChanged() {
    this.sorting = this.sortingCheckbox.checked;
  }

  get mainTableTemplate(): TemplateResult {
    return html`
      <md-table
        tabledata="${data}"
        .warning=${tableWarns}
        .errors=${tableError}
        .sorting=${this.sorting}
        .clean=${this.clean}
        ?no-borders=${this.noBorders}
        .zebra=${this.stripped}
      ></md-table>
    `;
  }

  get optionsTemplate(): TemplateResult {
    return html`
      <md-checkboxgroup group-label="table attributes" alignment="horizontal" class="options-container">
        <md-checkbox id="clean" slot="checkbox" @checkbox-change=${() => this.cleanChanged()}> Clean </md-checkbox>
        <md-checkbox id="noBorders" slot="checkbox" @checkbox-change=${() => this.noBordersChanged()}>
          No Borders
        </md-checkbox>
        <md-checkbox id="stripped" slot="checkbox" @checkbox-change=${() => this.strippedChanged()}>
          Stripped
        </md-checkbox>
        <md-checkbox id="sorting" slot="checkbox" @checkbox-change=${() => this.sortingChanged()}>
          sorting
        </md-checkbox>
      </md-checkboxgroup>
    `;
  }

  render(): TemplateResult {
    return html` <div class="page-container">${this.mainTableTemplate} ${this.optionsTemplate}</div> `;
  }
}

export const tableTemplate = html` <table-template-sandbox></table-template-sandbox> `;
