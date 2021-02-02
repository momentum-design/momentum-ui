/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fixture, fixtureCleanup } from "@open-wc/testing-helpers";
import "./TableAdvanced";
import { TableAdvanced } from "./TableAdvanced";

const ELEM = () => fixture<TableAdvanced.ELEMENT>(`<md-table-advanced></md-table-advanced>`);

describe("Table Advanced component", () => {
  afterEach(fixtureCleanup);
  test("should render correctly", async () => {
    const elem = await ELEM();
    expect(elem).toBeDefined();
  });
});
