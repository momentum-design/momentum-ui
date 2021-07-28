import "@/components/pagination/Pagination";
import { html } from "lit";

export const paginationTemplate = html`
  <h3>Default Pagination</h3>
  <md-pagination total-page="20" current-page="10" visible-page="3"></md-pagination>
  <h3>Dots Pagination</h3>
  <md-pagination total-page="20" current-page="10" visible-page="3" dots></md-pagination>
  <h3>Without Arrows Pagination</h3>
  <md-pagination total-page="20" current-page="10" no-navigation></md-pagination>
  <h3>Only Dots Pagination</h3>
  <md-pagination total-page="20" current-page="10" only-dots></md-pagination>
`;
