import "@/components/activity-button/ActivityButton";
import "@/components/badge/Badge";
import "@/components/button/Button";
import "@/components/coachmark/Coachmark";
import "@/components/icon/Icon";
import "@/components/taskitem/TaskItem";
import { customElement, html, LitElement, property } from "lit-element";

@customElement("coach-template-sandbox")
export class CoachTemplateSandbox extends LitElement {
  @property({ type: Boolean }) isOpen = false;
  @property({ type: Boolean }) isOpenSecond = false;
  @property({ type: Boolean }) isOpenThird = false;
  @property({ type: Boolean }) isOpenFourth = false;

  private openCoach() {
    this.isOpen = true;
  }

  private closeCoach() {
    this.isOpen = false;
    this.isOpenSecond = true;
  }

  private closeCoachSecond() {
    this.isOpenSecond = false;
    this.isOpenThird = true;
  }

  private closeCoachThird() {
    this.isOpenThird = false;
    this.isOpenFourth = true;
  }

  private closeCoachFourth() {
    this.isOpenFourth = false;
  }

  render() {
    return html`
      <md-coachmark ?show=${this.isOpen} placement="auto" color="violet" @coach-action=${this.closeCoach}>
        <div slot="coachmark-content">
          <span>Coachmark test content</span>
        </div>
        <md-button @button-click=${this.openCoach}>Coachmark Default</md-button>
      </md-coachmark>

      <md-coachmark ?show=${this.isOpenSecond} placement="top" color="blue" @coach-action=${this.closeCoachSecond}>
        <div slot="coachmark-content">
          <span>Coachmark second test content</span>
        </div>
        <md-activity-button .type=${"chat"} label="Chat"></md-activity-button>
      </md-coachmark>

      <md-coachmark ?show=${this.isOpenThird} placement="left" color="green" hidebutton>
        <div slot="coachmark-content">
          <span>Coachmark third test content</span>
          <md-button slot="coachmark-action" @button-click=${this.closeCoachThird}>Slot button next</md-button>
        </div>
        <md-badge color="mint">
          <md-icon name="share-c-native-adr_12" size="16"></md-icon>
          Social
          <span class="counter" style="margin:0 1rem">${"3"}</span>
        </md-badge>
      </md-coachmark>

      <md-coachmark ?show=${this.isOpenFourth} placement="bottom" color="purple" hidebutton>
        <div slot="coachmark-content">
          <span>Coachmark fourth test content</span>
          <md-button slot="coachmark-action" @click=${this.closeCoachFourth}>Slot button close</md-button>
        </div>
        <md-task-item
          mediaType="telephony"
          status="conference"
          title="Mihael Varificantare for test text overflow"
          queue="IRV_quelle_1167676776767676asdadadas"
          lastmessage="I can ask one more question"
          quantity="0"
        >
          <div>01:08:00</div>
        </md-task-item>
      </md-coachmark>
    `;
  }
}

export const coachTemplate = html`
  <div class="row md-margin__bottom"><h3>md-coachmark</h3></div>
  <coach-template-sandbox></coach-template-sandbox>
`;
