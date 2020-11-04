import "@/components/progress-bar/ProgressBar";
import { html } from "lit-element";

export const progressBarTemplate = html`
  <h2>md-progress-bar</h2>
  <md-progress-bar label="test list" displayFormat="fraction" value="40" dynamic></md-progress-bar>
`;
