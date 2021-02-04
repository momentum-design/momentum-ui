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
import { classMap } from "lit-html/directives/class-map";
import { nothing } from "lit-html";
import Papa from "papaparse";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";

export namespace TableAdvanced {
  export type Data = { csv: string } | { list: string[] } | { list2d: string[][] };

  export type Config = {
    isStickyHeader?: boolean;
    isInfiniteScroll?: boolean;

    cols: {
      define: (Col | ColGroup)[];
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
    sort?: "byString" | SortComparator;
    filters?: Filter[]; // ???
    isHeader?: boolean; // highlight
    isCollapsed?: boolean;
  };

  type ColNode = { group?: { name: string; length: number }; sort: SortOrder; col: Col };
  type ColGroup = { groupName: string; children: Col[] };
  type SortOrder = "default" | "ascending" | "descending";
  type SortComparator = (a: string, b: string, order: SortOrder) => number; // -number, 0, number
  type Filter = { name: string; func: () => void; funcValidate?: () => void };

  @customElementWithCheck("md-table-advanced")
  export class ELEMENT extends LitElement {
    @property({ attribute: false }) config!: Config;
    @property({ attribute: false }) data!: Data;

    @internalProperty() error = "";

    private NODES: ColNode[] = [];
    private DATA: string[][] = [];

    connectedCallback() {
      super.connectedCallback();

      // nodes

      const pushCol = (col: Col, group?: { name: string; length: number }) => {
        this.NODES.push({ sort: "default", group, col: { ...col } });
      };

      this.config.cols.define.forEach(col => {
        if ("children" in col) {
          col.children.forEach(c => pushCol(c, { name: col.groupName, length: this.children.length }));
        } else {
          pushCol(col);
        }
      });

      const lenNodes = this.NODES.length;

      // data

      if ("csv" in this.data) {
        const parse = Papa.parse(this.data.csv, {
          skipEmptyLines: true,
          transform: x => x.trim()
        });
        if (parse.errors) {
          this.error = "PARSE ERROR:\n" + JSON.stringify(parse.errors, null, 2);
          return;
        } else {
          this.DATA = parse.data as string[][];
        }
      } else if ("list2d" in this.data) {
        this.DATA = this.data.list2d;
      } else {
        while (this.data.list.length > lenNodes) {
          this.DATA.push(this.data.list.splice(0, lenNodes))
        }
        if (this.data.list.length != 0) {
          this.DATA.push(this.data.list);
        }
      }

      if (this.DATA.length == 0) {
        this.error = "DATA ERROR: Data is empty";
        return;
      }

      // validate

      const lenData = this.DATA.reduce((acc, d) => acc + d.length, 0);
      if (lenData % lenNodes != 0) {
        this.error = "DATA ERROR: Dividing DATA by COLS is not zero";
        return;
      }

      this.DATA.forEach((d, i) => {
        const len = d.length;
        if (len != lenNodes) {
          this.error = `DATA ERROR: Total number of cols (=${lenNodes}) and data[${i}] length (=${len}) mismatch`;
        }
      });

      if (this.config.sort) {
        const col = this.NODES.find(c => c.col.id == this.config.sort!.colId);
        if (col) {
          this.sort(col, this.config.sort.order);
        } else {
          console.warn(`Cant find ${this.config.sort!.colId} col - for sorting`);
        }
      }

      // HACK
      const dataMul = [];
      for (let i = 0; i < 20; i++) {
        dataMul.push(...this.DATA);
      }
      this.DATA = dataMul;
    }

    sort(node: ColNode, order?: SortOrder) {
      if (!node.col.sort) return;

      console.log("SORT", node, order);
    }

    // RENDER
    // ----------------------------------

    renderHead() {
      let groups = nothing;
      let hasGroup = this.NODES.reduce((acc, node) => (acc = node.group ? true : acc), false);
      if (hasGroup) {
        let gName = "";
        groups = html`
          ${this.NODES.map(c => {
            if (c.group) {
              if (gName != c.group.name) {
                gName == c.group.name;
                return html`
                  <colgroup span=${c.group.length}></colgroup>
                `;
              }
            } else {
              return html`
                <col />
              `;
            }
          })}
          <tr>
            ${this.NODES.map(node => {
              if (node.group) {
                if (gName != node.group.name) {
                  gName == node.group.name;
                  return html`
                    <th colspan=${node.group.length} scope="colgroup">${node.group.name}</th>
                  `;
                }
              } else {
                return this.renderNode(node, 2);
              }
            })}
          </tr>
        `;
      }

      const heads = html`
        <tr>
          ${this.NODES.map(node => {
            if (hasGroup) {
              if (node.group) {
                return this.renderNode(node);
              }
            } else {
              return this.renderNode(node);
            }
          })}
        </tr>
      `;

      return html`
        <thead>
          ${groups} ${heads}
        </thead>
      `;
    }

    renderNode(node: ColNode, rowspan?: number) {
      let click = () => {};
      if (node.sort) {
        if (typeof node.sort == "function") {
          click = () => this.sort(node);
        } else {
          click = () => this.sort(node);
        }
      }

      const clazz = classMap({
        sortable: !!node.col.sort,
        ascending: node.sort == "ascending",
        descending: node.sort == "descending"
      });

      return html`
        <th rowspan=${ifDefined(rowspan)} scope="col" class=${clazz} @click=${click}>${node.col.title}</th>
      `;
    }

    renderBody() {
      return html`
        <tbody>
          ${this.DATA.map(
            colDat => html`
              <tr>
                ${colDat.map((rowData, i) => {
                  const node = this.NODES[i];
                  return node.col.isHeader
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
      const clazz = classMap({
        "sticky-header": !!this.config.isStickyHeader
      });

      return html`
        <div class="md-table-advanced">
          <table class=${clazz} summary=${ifDefined(head?.summary)}>
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

    static get styles() {
      return [reset, styles];
    }

    // ---------------------
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-table-advanced": TableAdvanced.ELEMENT;
  }
}
