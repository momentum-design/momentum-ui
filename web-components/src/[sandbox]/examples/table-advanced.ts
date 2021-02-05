import "@/components/table-advanced/TableAdvanced";
import { html } from "lit-element";
import { TableMock } from "@/components/table-advanced/src/mock";

export const tableAdvancedTemplate = html`
  <div style="height: 400px; width: 100%;">
    <md-table-advanced .config=${TableMock.COMPLEX.config} .data=${TableMock.COMPLEX.data}></md-table-advanced>
  </div>
`;