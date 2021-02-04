/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import reset from "@/wc_scss/reset.scss";
import { html, internalProperty, LitElement, property } from "lit-element";
import styles from "./scss/module.scss";
import { ifDefined } from "lit-html/directives/if-defined";
import { nothing } from "lit-html";
import Papa from "papaparse";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";

export namespace TableAdvanced {
  export type Data = string[][];

  export type Config = {
    isStickyHeader?: boolean;
    isInfiniteScroll?: boolean;

    cols: {
      define: (Col | ColGroup)[];
      defineDefault?: Col;
      isResizable?: boolean;
      isDraggable?: boolean;
    };

    rows?: {
      isResizable?: boolean;
      isDraggable?: boolean;
      selectable?: "none" | "single" | "multiple";
    };

    sort?: {
      colId: string;
      order: SortOrder;
    };

    head?: {
      caption?: string;
      summary?: string;
    };
  };

  type Col = {
    id: string;
    title: string;
    sort?: boolean | SortComparator;
    filters?: Filter[]; // ???
    isHeader?: boolean; // highlight
    isCollapsed?: boolean;
  };

  type ColGroup = { groupName: string; children: Col[] };
  type SortOrder = "ascending" | "descending";
  type SortComparator = (a: string, b: string, order: SortOrder) => number; // -number, 0, number
  type Filter = { name: string; func: () => void; funcValidate?: () => void };

  @customElementWithCheck("md-table-advanced")
  export class ELEMENT extends LitElement {
    @property({ attribute: false }) config!: Config;
    @property({ attribute: false }) data!: Data | string;

    @internalProperty() error = "";

    private COLS: Col[] = [];
    private DATA: Data = [];

    connectedCallback() {
      super.connectedCallback();

      this.config.cols.define.forEach(c => ("children" in c ? this.COLS.push(...c.children) : this.COLS.push(c)));
      const lenCols = this.COLS.length;

      if (typeof this.data == "string") {
        const parse = Papa.parse(this.data, {
          skipEmptyLines: true,
          transform: x => x.trim()
        });
        if (parse.errors) {
          this.error = "PARSE ERROR:\n" + JSON.stringify(parse.errors, null, 2);
          return;
        } else {
          this.DATA = parse.data as any;
        }
      } else {
        this.DATA = this.data;
      }

      if (this.DATA.length == 0) {
        this.error = "DATA ERROR: Data is empty";
        return;
      }

      const lenData = this.DATA.reduce((acc, d) => acc + d.length, 0);
      if (lenData % lenCols != 0) {
        this.error = "DATA ERROR: Dividing DATA by COLS is not zero";
        return;
      }

      this.DATA.forEach((d, i) => {
        const len = d.length;
        if (len != lenCols) {
          this.error = `DATA ERROR: Total number of cols (=${lenCols}) and data[${i}] length (=${len}) mismatch`;
        }
      });

      // HACK
      const dataMul = [];
      for (let i = 0; i < 20; i++) {
        dataMul.push(...this.DATA);
      }
      this.DATA = dataMul;
    }

    static get styles() {
      return [reset, styles];
    }

    renderHead() {
      const def = this.config.cols.define;

      let groups = nothing;
      const hasGroup = def.reduce((acc, col) => ("children" in col ? true : acc), false);
      if (hasGroup) {
        groups = html`
          ${def.map(col => {
            if ("children" in col) {
              return html`
                <colgroup span=${col.children.length}></colgroup>
              `;
            } else {
              return html`
                <col />
              `;
            }
          })}
          <tr>
            ${def.map(col => {
              if ("children" in col) {
                return html`
                  <th colspan=${col.children.length} scope="colgroup">${col.groupName}</th>
                `;
              } else {
                return html`
                  <!-- <th rowspan="2"></th> -->
                  <th rowspan="2" scope="col">${col.title}</th>
                `;
              }
            })}
          </tr>
        `;
      }

      const ths = html`
        <tr>
          ${def.map(col => {
            if ("children" in col) {
              return html`
                ${col.children.map(
                  c => html`
                    <th scope="col">${c.title}</th>
                  `
                )}
              `;
            } else {
              if (hasGroup) {
                return nothing;
              } else {
                return html`
                <th scope="col">${col.title}</th>
              `;
              }
              
            }
          })}
        </tr>
      `;

      return html`
        <thead>
          ${groups} ${ths}
        </thead>
      `;
    }

    renderBody() {
      return html`
        <tbody>
          ${this.DATA.map(
            colDat => html`
              <tr>
                ${colDat.map((rowData, i) => {
                  const col = this.COLS[i];
                  return col.isHeader
                    ? html`
                        <th scope="row">${rowData}</th>
                      `
                    : html`
                        <td>${rowData}</td>
                      `;
                })}
              </tr>
            `
          )}
        </tbody>
      `;
    }

    // Accessibility: https://www.w3.org/WAI/tutorials/tables/

    render() {
      if (this.error)
        return html`
          <div>${this.error}</div>
        `;

      const { head } = this.config;

      return html`
        <div class="md-table-advanced">
          <table summary=${ifDefined(head?.summary)}>
            ${head?.caption
              ? html`
                  <caption>
                    ${head?.caption}
                  </caption>
                `
              : nothing}

            <!-- HEAD -->
            ${this.renderHead()}

            <!-- BODY -->
            ${this.renderBody()}
          </table>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-table-advanced": TableAdvanced.ELEMENT;
  }
}
