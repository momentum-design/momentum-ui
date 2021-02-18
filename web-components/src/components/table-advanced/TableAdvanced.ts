/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import reset from "@/wc_scss/reset.scss";
import "@/components/icon/Icon";
import "@/components/menu-overlay/MenuOverlay";
import { html, internalProperty, LitElement, property, query } from "lit-element";
import styles from "./scss/module.scss";
import { ifDefined } from "lit-html/directives/if-defined";
import { classMap } from "lit-html/directives/class-map";
import { nothing } from "lit-html";
import Papa from "papaparse";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { Filter } from "./src/filter";
import { debounce, Evt, evt } from "./src/helpers";

const IMG = document.createElement("img");
IMG.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export namespace TableAdvanced {
  export type ChangeEvent = {
    detail:
      | {
          type: "filter-on";
          filter: Filter.Options;
          input: string;
        }
      | {
          type: "filter-off";
          filter: Filter.Options;
        }
      | {
          type: "sort";
          order: SortOrder;
        }
      | {
          type: "select";
          index: number;
          data: string[];
        }
      | {
          type: "multi-select";
          rows: Record<number, string[]>;
        };
  };

  /**
   * @element md-table-advanced
   * @fires md-table-advanced-change
   */
  @customElementWithCheck("md-table-advanced")
  export class ELEMENT extends LitElement {
    @property({ attribute: false }) config!: Config;
    @property({ attribute: false }) data!: Data;

    @internalProperty() private error = "";

    @internalProperty() private COLS: Col[] = [];
    @internalProperty() private ROWS: string[][] = [];

    private updCols = () => this.requestUpdate("COLS");

    @evt() "md-table-advanced-change"!: Evt<ChangeEvent>;

    @query(".container") private elContainer!: HTMLElement;

    connectedCallback() {
      super.connectedCallback();

      // cols

      let index = 0;
      const pushCol = (col: ColOptions, group?: { name: string; length: number }) => {
        const filters = col.filters
          ? col.filters == "forString"
            ? Filter.optionsString
            : col.filters == "forNumber"
            ? Filter.optionsNumber
            : col.filters.length
            ? col.filters
            : null
          : null;

        this.COLS.push({
          options: { ...col },
          index: index++,
          group,
          sort: "default",
          filter: filters
            ? {
                list: filters,
                selectedIndex: 0,
                input: "",
                active: false,
                menuVisible: false
              }
            : undefined
        });
      };

      this.config.cols.define.forEach(col => {
        if ("children" in col) {
          col.children.forEach(c => pushCol(c, { name: col.groupName, length: col.children.length }));
        } else {
          pushCol(col);
        }
      });

      const lenNodes = this.COLS.length;

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
          this.ROWS = parse.data as string[][];
        }
      } else if ("list2d" in this.data) {
        this.ROWS = this.data.list2d;
      } else {
        while (this.data.list.length > lenNodes) {
          this.ROWS.push(this.data.list.splice(0, lenNodes));
        }
        if (this.data.list.length != 0) {
          this.ROWS.push(this.data.list);
        }
      }

      if (this.ROWS.length == 0) {
        this.error = "DATA ERROR: Data is empty";
        return;
      }

      // validate

      const lenData = this.ROWS.reduce((acc, d) => acc + d.length, 0);
      if (lenData % lenNodes != 0) {
        this.error = "DATA ERROR: Dividing DATA by COLS is not zero";
        return;
      }

      this.ROWS.forEach((d, i) => {
        const len = d.length;
        if (len != lenNodes) {
          this.error = `DATA ERROR: Total number of cols (=${lenNodes}) and data[${i}] length (=${len}) mismatch`;
        }
      });

      const s = this.config.default?.sort;
      if (s) {
        const col = this.COLS.find(c => c.options.id == s.colId);
        if (col) {
          this.sort(col, s.order);
        } else {
          console.warn(`Cant find ${s.colId} col - for sorting`);
        }
      }

      const f = this.config.default?.filter;
      if (f) {
        const col = this.COLS.find(c => c.options.id == f.colId);
        if (col) {
          if (col.filter) {
            col.filter.selectedIndex = f.selectedIndex;
            col.filter.input = f.input;
            this.updCols();
            this.filter(col);
          } else {
            console.warn(`Cant find filters on ${f.colId} col`);
          }
        } else {
          console.warn(`Cant find ${f.colId} col - for filtering`);
        }
      }

      // HACK
      const rows = [];
      for (let i = 0; i < 20; i++) rows.push(...this.ROWS);
      this.ROWS = rows;
    }

    sort(col: Col, order?: SortOrder) {
      if (!col.options.sorter) return;

      this.clearSelection();

      this.COLS.forEach(c => {
        if (c.options.id == col.options.id) {
          c.sort = order ? order : c.sort == "default" ? "ascending" : c.sort == "ascending" ? "descending" : "default";
        } else {
          c.sort = "default";
        }
      });

      this.updCols();
      this.requestUpdate();

      this["md-table-advanced-change"].emit({
        type: "sort",
        order: col.sort
      });
    }

    @debounce(500)
    filter(col: Col) {
      if (!col.filter) return;

      this.clearSelection();

      const input = col.filter.input.trim();
      const filter = col.filter.list[col.filter.selectedIndex];

      col.filter.active = input ? true : false;
      this.requestUpdate();

      if (input) {
        this["md-table-advanced-change"].emit({
          type: "filter-on",
          filter,
          input
        });
      } else {
        this["md-table-advanced-change"].emit({
          type: "filter-off",
          filter: col.filter.list[col.filter.selectedIndex]
        });
      }
    }

    @internalProperty() private selected: Record<number, string[]> = {};

    selectRow(p: { i: number; row: string[]; shiftKey: boolean; metaKey: boolean }) {
      const isSelected = this.selected.hasOwnProperty(p.i);
      if (this.config.rows?.selectable == "multiple") {
        if (p.metaKey) {
          if (isSelected) {
            delete this.selected[p.i];
          } else {
            this.selected[p.i] = p.row;
          }
          this.requestUpdate("selected");
        } else if (p.shiftKey) {
          // TODO - if required
        } else {
          this.selected = { [p.i]: p.row };
        }

        this["md-table-advanced-change"].emit({
          type: "multi-select",
          rows: this.selected
        });
      } else {
        if (isSelected) {
          this.clearSelection();
        } else {
          this.selected = { [p.i]: p.row };
          this["md-table-advanced-change"].emit({
            type: "select",
            index: p.i,
            data: p.row
          });
        }
      }
    }

    clearSelection() {
      this.selected = {};
    }

    // RESIZE

    // FIREFOX bug
    // using dragover for mouse X/Y
    // https://stackoverflow.com/a/33672982
    private eX = 0;

    private onResize = (e: DragEvent, col: Col) => {
      const t = e.target as HTMLDivElement;
      e.dataTransfer?.setDragImage(IMG, 0, 0);

      const elems = this.COLS.map(c => this.shadowRoot!.querySelector<HTMLElement>(`th.col-index-${c.index}`)!);
      this.COLS.forEach((c, i) => c.width = elems[i].offsetWidth + "px");
      this.updCols();

      const orgX = e.x;
      this.eX = e.x;

      let posX = -1;
      let set = -1;
      let setLeft = -1;

      const colLeft = this.COLS[col.index - 1];

      const elem = elems[col.index];
      const elemLeft = elems[col.index - 1];
      const elemW = elem.offsetWidth;
      const elemLeftW = elemLeft.offsetWidth;

      const drag = () => {
        const eX = this.eX;
        if (posX != eX && eX != 0) {
          posX = eX;

          // TODO - With this I can catch wher resize is stopped
          /*
          const real = elem.offsetWidth;
          console.log(set, real);
          const realLeft = elemLeft.offsetWidth;
          console.log(setLeft, realLeft);
          */

          const deltaX = posX - orgX;
          set = elemW - deltaX;
          setLeft = elemLeftW + deltaX;

          col.width = set + "px";
          colLeft.width = setLeft + "px";
          this.updCols();
        }
      };

      const dragOver = (evt: DragEvent) => (this.eX = evt.x);

      const dragEnd = () => {
        t.removeEventListener("drag", drag);
        t.removeEventListener("dragend", dragEnd);
        document.removeEventListener("dragover", dragOver);
      };

      t.addEventListener("drag", drag);
      t.addEventListener("dragend", dragEnd);
      document.addEventListener("dragover", dragOver);
    };

    // RENDER
    // ----------------------------------

    renderHead() {
      let groups = nothing;
      let hasGroup = this.COLS.reduce((acc, col) => (acc = col.group ? true : acc), false);
      if (hasGroup) {
        let gName = "";
        groups = html`
          ${this.COLS.map(c => {
            if (c.group) {
              if (gName != c.group.name) {
                gName = c.group.name;
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
            ${this.COLS.map(col => {
              if (col.group) {
                if (gName != col.group.name) {
                  gName = col.group.name;
                  return html`
                    <th colspan=${col.group.length} scope="colgroup">
                      ${col.group.name} ${this.renderResize(col)}
                    </th>
                  `;
                }
              } else {
                return this.renderCol(col, 2);
              }
            })}
          </tr>
        `;
      }

      const heads = html`
        <tr>
          ${this.COLS.map(col => {
            if (hasGroup) {
              if (col.group) {
                return this.renderCol(col);
              }
            } else {
              return this.renderCol(col);
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

    renderCol(col: Col, rowspan?: number) {
      const input = col.filter?.list[col.filter.selectedIndex]?.input;

      return html`
        <th rowspan=${ifDefined(rowspan)} width=${ifDefined(col.width)} scope="col" class=${"col-index-" + col.index}>
          ${col.options.title}

          <!-- SORT  -->
          ${col.options.sorter
            ? html`
                <div class="sort-icon">
                  ${col.sort == "ascending"
                    ? html`
                        <md-icon name="arrow-filled-up_8"></md-icon>
                      `
                    : nothing}
                  ${col.sort == "descending"
                    ? html`
                        <md-icon name="arrow-filled-down_8"></md-icon>
                      `
                    : nothing}
                </div>
                <div class="sort" @click=${() => this.sort(col)}></div>
              `
            : nothing}

          <!-- FILTER -->
          ${col.filter
            ? html`
                ${col.filter.active
                  ? html`
                      <md-icon class="filter-active" name="filter-adr_12"></md-icon></span>
                    `
                  : nothing}

                <md-menu-overlay placement="bottom" class="filter" custom-width="188px">
                  <md-icon class="filter-icon" slot="menu-trigger" name="filter_16"></md-icon>
                  <div class="filter-menu" style="padding:1.25rem; width: 100%;">
                    <select
                      name="filter-type"
                      @change=${(e: any) => {
                        col.filter!.selectedIndex = e.target.value;
                        this.updCols();
                        this.filter(col);
                      }}
                    >
                      ${col.filter.list.map(
                        (c, i) => html`
                          <option value=${i} ?selected=${col.filter!.selectedIndex == i}>${c.label}</option>
                        `
                      )}
                    </select>

                    <input
                      type="text"
                      placeholder=${input!.placeholder}
                      maxlength=${ifDefined(input!.maxlength)}
                      pattern=${ifDefined(input!.pattern)}
                      .value=${col.filter.input}
                      @input=${(e: any) => {
                        col.filter!.input = e.target.value;
                        this.updCols();
                        this.filter(col);
                      }}
                    />
                  </div>
                </md-menu-overlay>
              `
            : nothing}

          <!-- RESIZE  -->
          ${this.renderResize(col)}
        </th>
      `;
    }

    renderResize(col: Col) {
      return this.config.cols.isResizable
        ? html`
            ${col.index > 0
              ? html`
                  <div class="resize" draggable="true" @dragstart=${(e: DragEvent) => this.onResize(e, col)}></div>
                `
              : nothing}
          `
        : nothing;
    }

    renderBody() {
      // filter
      const len = this.COLS.length;
      let rows = this.ROWS.filter(row => {
        for (let i = 0; i < len; i++) {
          const col = this.COLS[i];
          if (col.filter?.active) {
            const filter = col.filter.list[col.filter.selectedIndex];
            const isVisible = filter.predicate(row[i], col.filter.input);
            if (!isVisible) return false;
          }
        }
        return true;
      });

      // sort
      const sortCol = this.COLS.find(c => c.sort != "default");
      if (sortCol) {
        const map = rows.map((r, i) => ({ v: r[sortCol.index], i }));
        const dir = sortCol.sort == "ascending" ? 1 : -1;

        let rowsSorted: SortNode[] = [];
        if (sortCol.options.sorter == "byNumber") {
          rowsSorted = map.sort((a, b) => (dir == 1 ? +a.v - +b.v : +b.v - +a.v));
        } else if (sortCol.options.sorter == "byString") {
          rowsSorted = map.sort((a, b) => (a.v == b.v ? 0 : a.v > b.v ? dir : -dir));
        } else if (typeof sortCol.options.sorter == "function") {
          const func = sortCol.options.sorter;
          rowsSorted = map.sort((a, b) => func(a.v, b.v, dir));
        }

        rows = rowsSorted.map(s => rows[s.i]);
      }

      const isSelectable = !!this.config.rows && this.config.rows?.selectable != "none";

      return html`
        <tbody>
          ${rows.map((row, i) => {
            const isSelected = this.selected.hasOwnProperty(i);
            const clazz = classMap({
              selected: isSelected,
              selectable: isSelectable && !isSelected
            });
            return html`
              <tr
                class=${clazz}
                @click=${({ shiftKey, metaKey }: MouseEvent) => {
                  if (isSelectable) this.selectRow({ i, row, shiftKey, metaKey });
                }}
              >
                ${row.map((rowData, i) => {
                  const col = this.COLS[i];
                  return col.options.isHeader
                    ? html`
                        <th scope="row">${rowData}</th>
                      `
                    : html`
                        <td>${rowData}</td>
                      `;
                })}
              </tr>
            `;
          })}
        </tbody>
      `;
    }

    render() {
      if (this.error)
        return html`
          <div>${this.error}</div>
        `;

      const { head } = this.config;
      const clazz = classMap({
        container: true,
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
  }

  export type Data = { csv: string } | { list: string[] } | { list2d: string[][] };

  export type Config = {
    isStickyHeader?: boolean;
    isInfiniteScroll?: boolean;

    cols: {
      isDraggable?: boolean;
      isResizable?: boolean;
      define: (ColOptions | ColGroup)[];
    };

    rows?: {
      isDraggable?: boolean;
      selectable?: "none" | "single" | "multiple";
    };

    default?: {
      // col?: Pick<ColOptions, "filters" | "sorter">;

      sort?: {
        colId: string;
        order: SortOrder;
      };

      filter?: {
        colId: string;
        input: string;
        selectedIndex: number;
      };
    };

    head?: {
      caption?: string;
      summary?: string;
    };
  };

  type ColOptions = {
    id: string;
    title: string;
    sorter?: "byString" | "byNumber" | SortComparator;
    filters?: "forString" | "forNumber" | Filter.Options[];
    isHeader?: boolean;
    isCollapsed?: boolean;
  };

  type ColGroup = { groupName: string; children: ColOptions[] };
  type SortOrder = "default" | "ascending" | "descending";
  type SortComparator = (a: string, b: string, direction: 1 | -1) => number; // -number, 0, number
  type SortNode = { v: string; i: number };

  type Col = {
    index: number;
    sort: SortOrder;
    width?: string;
    group?: { name: string; length: number };
    filter?: { list: Filter.Options[]; selectedIndex: number; input: string; active: boolean; menuVisible: boolean };
    options: ColOptions;
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "md-table-advanced": TableAdvanced.ELEMENT;
  }
}
