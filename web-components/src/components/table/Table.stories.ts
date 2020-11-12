/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { withA11y } from "@storybook/addon-a11y";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import "./Table";

export default {
  title: "Table",
  component: "md-table",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-table"
    }
  }
};


export const Table = () => {
  const zebra = boolean("zebra", false);
  const data = text("data", "id, Product Name, Quantity, Price, Date Purchased \n 2, Espresso Truffle, 6, 1.75, Sat Aug 22 2020 \n 1, Caffe Espresso, 3, 3, Tue Nov 24 2020 \n 0, Cappuccino, 8, 5, Wed Feb 26 2020");
  const clean = boolean("clean", false);
  const sorting = boolean("sorting", false)

  return html`
    <md-table .zebra=${zebra} tabledata="${data}" .clean="${clean}" .sorting="${sorting}">
    </md-table>
  `;
};
