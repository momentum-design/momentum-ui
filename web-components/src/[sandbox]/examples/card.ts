import "@/components/card/Card";
import "@/components/badge/Badge";
import { cardMenuItems } from "@/[sandbox]/sandbox.mock";
import { customElement, html, LitElement, property } from "lit-element";

@customElement("card-template-sandbox")
export class CardTemplateSandbox extends LitElement {
  @property({ type: String }) value = "";

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("card-click", this.handleClickCard as EventListener);
    this.addEventListener("card-keydown", this.handleKeydownCard as EventListener);
    this.addEventListener("card-menu-click", this.handleClickMenu as EventListener);
  }

  private handleClickCard(e: MouseEvent) {
    const { id } = e.detail as any;

    this.value = "Card " + id + ": is clickable";
  }

  private handleKeydownCard(e: KeyboardEvent) {
    const { id } = e.detail as any;

    this.value = "Card " + id + ": is key event";
  }

  private handleClickMenu(e: MouseEvent) {
    const { id, type } = e.detail as any;

    this.value = "Card " + id + ": in " + type + " mode";
  }

  private handleKeydownMenu(e: KeyboardEvent) {
    const { id, type } = e.detail as any;

    this.value = "Card " + id + ": in " + type + " mode by keyboard event";
  }

  render() {
    return html`
      <h4>${this.value}</h4>
      <md-card
        .menuOptions=${cardMenuItems}
        id="123456789"
        title="Team A Report - Q1"
        subtitle="Updated 2 hours ago"
        @card-menu-keydown="${(e: KeyboardEvent) => this.handleKeydownMenu(e)}"
        info="Lorem Ipsum is simply sample text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard sample text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      >
        <div slot="content">
          <img
            style="width: 100%;"
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
  }
}

export const cardTemplate = html`
  <h3>Default Card</h3>
  <card-template-sandbox></card-template-sandbox>
`;
