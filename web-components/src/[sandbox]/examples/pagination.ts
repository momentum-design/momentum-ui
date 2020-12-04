import "@/components/pagination/Pagination";
import { html } from "lit-element";

export const paginationTemplate = html`
  <h3>Default Pagination</h3>
  <md-pagination page="1" total="101" limit="10" size="5"></md-pagination>
`;
