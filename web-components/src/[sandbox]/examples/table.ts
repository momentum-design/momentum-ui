/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/table/Table";
import { html } from "lit-element";

const data = 'id, Product Name, Quantity, Price, Date Purchased \n 0, Cappuccino, 8, 5, Wed Feb 26 2020 \n 1, Caffe Espresso, 3, 3, Tue Nov 24 2020 \n 2, Cappuccino, 10, 5, Sun Jul 05 2020 \n 3, Caffe Espresso, 5, 3, Tue Jun 02 2020 \n 4, Espresso Truffle, 6, 1.75, Sat Aug 22 2020 \n 5, Peppermint Mocha Twist, 1, 4, Fri May 01 2020 \n 6, White Chocolate Mocha, 11, 3.6, Sat Feb 15 2020 \n 7, Caffe Espresso, 2, 3, Mon Oct 26 2020 \n 8, Peppermint Mocha Twist, 3, 4, Sat Aug 22 2020 \n 9, Caffe Espresso, 10, 3, Fri Oct 16 2020 \n 10, Black Tea, 5, 2.25, Mon Feb 03 2020 \n 11, Espresso Truffle, 8, 1.75, Mon Feb 10 2020 \n 12, Peppermint Mocha Twist, 10, 4, Fri Feb 07 2020 \n 13, Caffe Latte, 6, 4.5, Tue Jun 16 2020 \n 14, Caffe Latte, 5, 4.5, Wed Sep 30 2020'

export const tableTemplate = html`
  <div style="height: 400px;">
    <md-table tabledata="${data}" sorting></md-table>
  </div>
`;