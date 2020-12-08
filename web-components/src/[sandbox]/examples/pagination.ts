import "@/components/pagination/Pagination";
import { html } from "lit-element";

export const paginationTemplate = html`
  <h3>Default Pagination</h3>
  <md-pagination total-page="20" current-page="10" visible-page="6"></md-pagination>
`;
