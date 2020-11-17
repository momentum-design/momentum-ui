import "@/components/pagination/Pagination";
import "@/components/pagination/PaginationItem";
import { html } from "lit-element";

export const paginationTemplate = html`
  <md-pagination>
    <md-paginationa-item slot="nav-item" label="prev" page="1"></md-paginationa-item>
  </md-pagination>
`;
