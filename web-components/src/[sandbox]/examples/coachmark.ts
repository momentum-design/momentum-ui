import "@/components/button/Button";
import "@/components/icon/Icon";
import "@/components/coachmark/Coachmark";
import { customElement, html, LitElement, property } from "lit-element";

@customElement("coach-template-sandbox")
export class CoachTemplateSandbox extends LitElement {
  @property({ type: Boolean }) isOpen = false;

  private openCoach() {
    this.isOpen = true;
  }

  private closeCoach() {
    this.isOpen = false;
  }

  render() {
    return html`
      <md-coachmark ?show=${this.isOpen} placement="right">
        <div slot="coachmark-content">
          <span>Coachmark  test content</span>
          <md-button slot="coachmark-content" @click=${this.closeCoach}>Coachmark close</md-button>
        </div>
        <md-button @click=${this.openCoach}>Coachmark Default</md-button>
      </md-coachmark>
    `;
  }

}

export const coachTemplate = html`
  <div class="row md-margin__bottom"><h3>md-coachmark</h3></div>
  <coach-template-sandbox></coach-template-sandbox>
`;
