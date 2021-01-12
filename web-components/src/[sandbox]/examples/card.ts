import "@/components/card/Card";
import { html } from "lit-element";

export const cardTemplate = html`
  <h3>Default Card</h3>
  <md-card>
    <div slot="content">
      <img src="https://static.skillshare.com/uploads/users/7330753/user-image-large.png" alt="" />
    </div>

  </md-card>
  <h3>Draggable Card</h3>
  <md-card draggable></md-card>
`;
