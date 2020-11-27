import "@/components/pagination/Pagination";
import "@/components/pagination/PaginationItem";
import { html } from "lit-element";
import { paginationItems } from "@/[sandbox]/sandbox.mock";

export const paginationTemplate = html`
  <div class="container">
    <h3>Default Pagination</h3>
    <md-pagination arrows dots .items=${paginationItems}></md-pagination>
  </div>
  <div class="container">
    <h3>Simple Pagination</h3>
    <md-pagination arrows dots simple .items=${paginationItems}></md-pagination>
  </div>
`;
