import "@/components/card/Card";
import { html } from "lit-element";

export const cardTemplate = html`
  <h3>Default Card</h3>
  <md-card></md-card>
  <h3>Draggable Card</h3>
  <md-card draggable></md-card>
`;
