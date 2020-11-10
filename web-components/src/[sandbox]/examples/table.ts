import "@/components/table/Table";
import { html } from "lit-element";

const data = 'id, Product Name, Quantity, Price, Date Purchased \n 2, Espresso Truffle, 6, 1.75, Sat Aug 22 2020 \n 1, Caffe Espresso, 3, 3, Tue Nov 24 2020 \n 0, Cappuccino, 8, 5, Wed Feb 26 2020'

export const tableTemplate = html`
  <md-table tabledata="${data}" sorting zebra clean></md-table>
`;