/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ComplexTable, ShortkeyTable, SimpleTable } from "@/[sandbox]/sandbox.mock";
import { defineCE, elementUpdated, fixture, fixtureCleanup, html, oneEvent } from "@open-wc/testing-helpers";
import { Filter } from "./src/filter";
import "./TableAdvanced";
import { TableAdvanced } from "./TableAdvanced";

const ELEM = () => {
  const DATA = ComplexTable.data;
  if ("list2d" in DATA) {
    for (let i = 0; i < 100; i++) {
      DATA.list2d.push([Math.random() > 0.5 ? "x" : "y", "2", "3", "4", "5", "6", "7"]);
    }
  }

  const CONF = ComplexTable.config;
  CONF.cellTemplates = {
    _tmp_: { templateName: "tmp1" },
    _tmp2_: {
      contentUse: "replace",
      templateName: "tmp2",
      contentCb: ({ content }) => content,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      templateCb: () => {}
    }
  };

  return fixture<TableAdvanced.ELEMENT>(html`
    <md-table-advanced .config=${CONF} .data=${DATA}>
      <template id="tmp1">OK</template>
      <template id="tmp2">
        <span class="sp"></span>
      </template>
    </md-table-advanced>
  `);
};

describe("Table Advanced component", () => {
  afterEach(fixtureCleanup);

  test("should render correctly", async () => {
    const elem = await ELEM();
    expect(elem).toBeDefined();

    const col1 = elem["COLS"][0];
    const row1 = elem["ROWS"][0];

    elem["dragCol"] = 0;
    elem["dropCol"] = 1;
    elem["onDropCol"]();

    elem["dragRow"] = 0;
    elem["dropRow"] = 1;
    elem["onDropRow"]();

    const eDrag = {
      x: 0,
      y: 0,
      target: document.createElement("div")
    } as any;
    elem["onResize"](eDrag, elem["COLS"][1]);

    elem["sort"](col1, "ascending");
    elem["sort"](col1, "descending");
    elem["filter"](col1);

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const e = { stopPropagation: () => {} } as any;
    elem["collapseToggle"](e, 0);
    elem["collapseToggle"](e, 0);

    elem["selectRow"]({
      row: { cells: row1, idx: 0, first: true, idxDrag: 0, collapse: "none", isGhost: false, children: [] },
      metaKey: false,
      shiftKey: false
    });
  });

  test("should show error on column/row mismatch", async () => {
    const badData = {
      ...ShortkeyTable.data,
      list2d: [["Active Task List", "Switch between tasks", "Ctrl + Alt + T", "error"]]
    };
    const elemWithBadData = await fixture<TableAdvanced.ELEMENT>(html`
      <md-table-advanced .config=${ShortkeyTable.config} .data=${badData}> </md-table-advanced>
    `);
    expect(elemWithBadData["error"]).toContain(
      "Data length mismatch. You must provide (numberOfRows * numberOfColumns) amount of data values."
    );

    const badData2 = {
      ...ShortkeyTable.data,
      list2d: [
        ["Active Task List", "Switch between tasks", "Ctrl + Alt + T", "error"],
        ["Active Task List", "Switch between tasks"]
      ]
    };

    const elem = await fixture<TableAdvanced.ELEMENT>(html`
      <md-table-advanced .config=${ShortkeyTable.config} .data=${badData2}> </md-table-advanced>
    `);
    expect(elem["error"]).toContain("DATA ERROR: Total number of cols");
  });

  test("data parse", async () => {
    const elemCsv = await fixture<TableAdvanced.ELEMENT>(html`
      <md-table-advanced .config=${SimpleTable.config} .data=${SimpleTable.dataCsv}> </md-table-advanced>
    `);
    expect(elemCsv).toBeDefined();

    const elemList = await fixture<TableAdvanced.ELEMENT>(html`
      <md-table-advanced .config=${SimpleTable.config} .data=${SimpleTable.dataList}> </md-table-advanced>
    `);
    expect(elemList).toBeDefined();
  });

  test("should set sticky header and part", async () => {
    const elem = await ELEM();

    const headerClassList = elem.shadowRoot?.querySelector("table")?.classList;
    const expectedClasses = ["sticky-header"];
    expect(headerClassList?.length).toEqual(expectedClasses.length);
    expect(expectedClasses.every(className => headerClassList?.contains(className))).toBe(true);

    const row = elem.shadowRoot?.querySelector("table tbody tr");
    expect(row?.getAttribute("part")).toEqual("first-row");
  });

  test("should set selected row", async () => {
    const elem = await ELEM();
    const row = elem.shadowRoot?.querySelector("table tbody tr") as HTMLElement;

    row?.click();
    await elementUpdated(elem);
    expect(elem["isSelectable"]).toBeTruthy;
  });

  test("should set selected row", async () => {
    const elem = await ELEM();
    const collapseBtn = elem.shadowRoot?.querySelector("table tbody tr td .row-collapsible") as HTMLElement;
    expect(collapseBtn).toBeUndefined;

    const col1 = elem["COLS"][0];
    col1.isCollapsable = true;
    await elementUpdated(elem);

    expect(collapseBtn).toBeDefined;
    const collapseIcon = elem.shadowRoot?.querySelector("table tbody tr td .row-collapsible md-icon") as HTMLElement;
    expect(collapseIcon?.getAttribute("name")).toEqual("plus_12");

    collapseIcon.click();
    await elementUpdated(elem);
  });

  test("should sort by Number", async () => {
    const elem = await ELEM();
    const col2 = elem["COLS"][1];

    col2.sorter = "byNumber";
    await elementUpdated(elem);

    elem["sort"](col2, "ascending");
    elem["sort"](col2, "descending");
  });

  test("should emit event after any filter action", async () => {
    const elem = await ELEM();
    const colObject = { index: 2, filter: { list: Filter.OPTIONS.equals, input: "inputText" } };

    jest.doMock("./src/decorators", () => {
      return jest.fn().mockImplementation(fn => fn);
    });

    setTimeout(() => elem["filter"](colObject as any));
    const { detail } = await oneEvent(elem, "md-table-advanced-change");
    expect(detail).toMatchObject({
      type: "filter-on"
    });
    jest.restoreAllMocks();
  });

  test("should emit event after any sort action", async () => {
    const elem = await ELEM();
    const colObject = { index: 2, sorter: "byString", options: { id: "unique-id" } };

    setTimeout(() => elem["sort"](colObject as any, "ascending"));
    const { detail } = await oneEvent(elem, "md-table-advanced-change");
    expect(detail).toMatchObject({
      type: "sort"
    });
  });

  test("should emit event after row collapse", async () => {
    const elem = await ELEM();
    const event = new Event("click");

    setTimeout(() => elem["collapseToggle"](event, 2));
    const { detail } = await oneEvent(elem, "md-table-advanced-change");
    expect(detail).toMatchObject({
      type: "expand"
    });
  });

  test("should set draggable attribute", async () => {
    const elem = await ELEM();
    const dragIcon = elem.shadowRoot!.querySelector("md-icon[class='drag-handle']");
    const mousedownEvent = new MouseEvent("mousedown");

    dragIcon!.dispatchEvent(mousedownEvent);

    expect(elem["dragRowElem"]!.getAttribute("draggable")).toBeTruthy();
  });

  test("should emit collapse/expand events", async () => {
    const elem = await ELEM();
    const collapseEvent = new Event("input");

    setTimeout(() => elem["collapseToggle"](collapseEvent, 1));
    const { detail: expandDetail } = await oneEvent(elem, "md-table-advanced-change");

    expect(expandDetail).toBeDefined();
    expect(expandDetail).toMatchObject({
      type: "expand",
      row: 1
    });

    elem["expandedRowIdx"] = {
      1: true
    };

    await elementUpdated(elem);

    setTimeout(() => elem["collapseToggle"](collapseEvent, 1));
    const { detail: collapseDetail } = await oneEvent(elem, "md-table-advanced-change");

    expect(collapseDetail).toBeDefined();
    expect(collapseDetail).toMatchObject({
      type: "collapse",
      row: 1
    });
  });

  test("should emit multi-select/select events", async () => {
    const elem = await ELEM();

    const row = {
      cells: [{ text: "x" }, { text: "2" }, { text: "3" }, { text: "4" }, { text: "5" }, { text: "6" }, { text: "7" }],
      idx: 8,
      idxDrag: 8,
      collapse: "child",
      first: false,
      isGhost: false,
      children: []
    } as any;

    setTimeout(() => elem["selectRow"]({ row, shiftKey: true, metaKey: true }));
    const { detail: multiSelectDetail } = await oneEvent(elem, "md-table-advanced-change");

    expect(multiSelectDetail).toBeDefined();
    expect(multiSelectDetail).toMatchObject({
      type: "multi-select"
    });

    elem.tableConfig.rows!.selectable = "single";
    elem["selected"] = { 9: false };
    await elementUpdated(elem);

    setTimeout(() => elem["selectRow"]({ row, shiftKey: true, metaKey: true }));
    const { detail: selectDetail } = await oneEvent(elem, "md-table-advanced-change");

    expect(selectDetail).toBeDefined();
    expect(selectDetail).toMatchObject({
      type: "select"
    });
  });

  test("should calling connected/disconnected callbacks", async () => {
    const tag = defineCE(
      class extends TableAdvanced.ELEMENT {
        connectedCallback() {
          super.connectedCallback();
          this.dispatchEvent(new CustomEvent("connected-callback"));
        }
        disconnectedCallback() {
          super.disconnectedCallback();
          this.dispatchEvent(new CustomEvent("disconnected-callback"));
        }
      }
    );
    const tableAdvanced = document.createElement(`${tag}`) as TableAdvanced.ELEMENT;
    tableAdvanced.config = ComplexTable.config;
    tableAdvanced.data = ComplexTable.data;
    setTimeout(() => tableAdvanced.connectedCallback());
    const connectedEvent = await oneEvent(tableAdvanced, "connected-callback");
    expect(connectedEvent).toBeDefined();

    tableAdvanced.remove();
    setTimeout(() => tableAdvanced.disconnectedCallback());
    const disconnectedEvent = await oneEvent(tableAdvanced, "disconnected-callback");
    expect(disconnectedEvent).toBeDefined();
  });

  test("should render caption when head.caption is defined", async () => {
    const elem = await ELEM();
    elem.tableConfig.head = { caption: "Test Caption", tableDescription: "Test tableDescription" };

    // Wait for changes in the shadow DOM
    await new Promise<void>(resolve => {
      const observer = new MutationObserver(() => {
        resolve();
        observer.disconnect();
      });
      observer.observe(elem.shadowRoot!, { childList: true, subtree: true });
    });

    const caption = elem.shadowRoot!.querySelector("caption");
    expect(caption).toBeDefined();
    expect(caption!.textContent).toContain("Test Caption");
    expect(caption!.textContent).toContain("Test tableDescription");
  });

  test("should render caption when head.caption is defined but head.tableDescription is not defined", async () => {
    const elem = await ELEM();
    elem.tableConfig.head = { caption: "Test Caption" };

    // Wait for changes in the shadow DOM
    await new Promise<void>(resolve => {
      const observer = new MutationObserver(() => {
        resolve();
        observer.disconnect();
      });
      observer.observe(elem.shadowRoot!, { childList: true, subtree: true });
    });

    const caption = elem.shadowRoot!.querySelector("caption");
    expect(caption).toBeDefined();
    expect(caption!.textContent).toContain("Test Caption");
  });

  test("should render tableDescription when head.caption is not defined but head.tableDescription is defined", async () => {
    const elem = await ELEM();
    elem.tableConfig.head = { tableDescription: "Test tableDescription" };

    // Wait for changes in the shadow DOM
    await new Promise<void>(resolve => {
      const observer = new MutationObserver(() => {
        resolve();
        observer.disconnect();
      });
      observer.observe(elem.shadowRoot!, { childList: true, subtree: true });
    });

    const caption = elem.shadowRoot!.querySelector("caption");
    expect(caption).toBeDefined();
    expect(caption!.textContent).toContain("Test tableDescription");
  });

  test("should not render caption when neither head.caption nor head.tableDescription is defined", async () => {
    const elem = await ELEM();
    elem.tableConfig.head = {};

    const caption = elem.shadowRoot!.querySelector("caption");
    expect(caption).toBeNull();
  });
});
