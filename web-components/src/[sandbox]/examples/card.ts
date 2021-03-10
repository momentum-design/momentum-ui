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
    fullscreen
    @card-click=${(e: MouseEvent) => {
      console.log(e.detail);
    }}
    info="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  >
    <div slot="content">
      <img
        src="https://media.istockphoto.com/vectors/dashboard-ui-modern-presentation-with-data-graphs-and-hud-diagrams-vector-id1159848977"
        alt=""
      />
    </div>

    <md-badge slot="footer" color="violet" small>Active</md-badge>
    <md-badge slot="footer" color="mint" small>Stock Report</md-badge>
    <md-badge slot="footer" color="gold" small>Team Report</md-badge>
    <md-badge slot="footer" color="lime" small>Team A</md-badge>
    <md-badge slot="footer" color="blue" small>TA</md-badge>
    <md-badge slot="footer" color="orange" small>Team B</md-badge>
    <md-badge slot="footer" color="blue" small>Some long long label</md-badge>
    <md-badge slot="footer" color="pink" small>Confidential</md-badge>
  </md-card>
`;
