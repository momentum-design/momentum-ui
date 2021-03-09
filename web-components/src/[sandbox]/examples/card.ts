import "@/components/card/Card";
import { html } from "lit-element";

const cardMenu = ["Edit", "View", "Duplicate", "Delete"];

export const cardTemplate = html`
  <h3>Default Card</h3>
  <md-card
    .menuOption=${cardMenu}
    id="123456789"
    title="Team A Report - Q1"
    subtitle="Updated 2 hours ago"
    info="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  >
    <!-- <md-avatar slot="header-icon" alt="avatar" title="Alyson Hoagland Pace" size="44"></md-avatar> -->
    <div slot="content">
      <img
        src="https://media.istockphoto.com/vectors/dashboard-ui-modern-presentation-with-data-graphs-and-hud-diagrams-vector-id1159848977"
        alt=""
      />
    </div>
  </md-card>
`;
