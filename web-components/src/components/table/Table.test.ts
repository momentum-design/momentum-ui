/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { elementUpdated, fixture, fixtureCleanup } from "@open-wc/testing-helpers";
import { html } from "lit-element";
import "./Table";
import { Table } from "./Table";

const data =
  "id, Product Name, Quantity, Price, Date Purchased \n 2, Espresso Truffle, 6, 1.75, Sat Aug 22 2020 \n 1, Caffe Espresso, 3, 3, Tue Nov 24 2020 \n 0, Cappuccino, 8, 5, Wed Feb 26 2020";

describe("Table component", () => {
  afterEach(fixtureCleanup);

  test("should render correctly", async () => {
    const element = await fixture<Table.ELEMENT>(`<md-table></md-table>`);
    expect(element).toBeDefined();
  });

  test("should render size", async () => {
    const element = await fixture<Table.ELEMENT>(html` <md-table clean zebra sorting tableData="${data}"></md-table> `);
    expect(element.zebra).toBeTruthy();
    expect(element.sorting).toBeTruthy();
    expect(element.clean).toBeTruthy();

    const el = element.shadowRoot?.querySelector(".md-table");
    const expectedClasses = ["md-table", "md-table--clean", "md-table--stripped", "md-table--sorting"];
    expect(el?.classList.length).toEqual(expectedClasses.length);
    expectedClasses.forEach((className) => {
      expect(el?.classList.contains(className)).toBe(true);
    });
  });

  test("should render size", async () => {
    const element = await fixture<Table.ELEMENT>(html` <md-table sorting tableData="${data}"></md-table> `);
    const el = element.shadowRoot?.querySelector(".md-table__header tr th a") as HTMLTableElement;

    el.click();
    await elementUpdated(el);
    expect(el.getAttribute("class")).toMatch("sortedAbc");

    el.click();
    await elementUpdated(el);
    expect(el.getAttribute("class")).toMatch("sortedZyx");
  });
});
