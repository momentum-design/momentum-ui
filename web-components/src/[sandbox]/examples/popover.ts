import "@/components/avatar/Avatar";
import "@/components/button/Button";
import "@/components/coachmark-popover/CoachmarkPopover";
import "@/components/icon/Icon";
import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("popover-template-sandbox")
export class PopoverTemplateSandbox extends LitElement {
  @state()
  private firstOpen = false;

  @state()
  private secondOpen = false;

  @state()
  private thirdOpen = false;

  @state()
  private fourthOpen = false;

  private openFirstCoach() {
    this.firstOpen = true;
  }

  private openSecondCoach() {
    this.secondOpen = true;
  }

  private openThirdCoach() {
    this.thirdOpen = true;
  }

  private openFourthCoach() {
    this.fourthOpen = true;
  }

  static get styles() {
    return [
      css`
        .popover-trigger-element-container {
          display: inline-flex;
          gap: 116px;
        }

        .popoverContent {
          width: 212px;
        }
      `
    ];
  }

  render() {
    return html`
      <div class="popover-trigger-element-container">
        <md-coachmark-popover
          placement="bottom"
          header="Change your interaction preferences"
          primaryButton="Got it"
          secondaryButton="Dismiss"
          ?show=${this.firstOpen}
          @primary-button-action=${() => (this.firstOpen = false)}
          @secondary-button-action=${() => (this.firstOpen = false)}
          @coachmark-close=${() => (this.firstOpen = false)}
        >
          <md-button style="width:32px; height:32px;" hasRemoveStyle circle @button-click=${this.openFirstCoach}>
            <md-avatar newMomentum size="32" title="Avatar" type="active"></md-avatar>
          </md-button>
          <div slot="coachmark-content">
            <span>Come here to adjust your call and team details anytime.</span>
          </div>
        </md-coachmark-popover>

        <md-coachmark-popover
          placement="top"
          header="Change your interaction preferences"
          primaryButton="Got it"
          secondaryButton="Dismiss"
          ?show=${this.secondOpen}
          @primary-button-action=${() => (this.secondOpen = false)}
          @secondary-button-action=${() => (this.secondOpen = false)}
          @coachmark-close=${() => (this.secondOpen = false)}
        >
          <md-button hasRemoveStyle circle @button-click=${this.openSecondCoach}>
            <md-avatar newMomentum size="32" title="Avatar" type="active"></md-avatar>
          </md-button>
          <div slot="coachmark-content">
            <span>Come here to adjust your call and team details anytime.</span>
          </div>
        </md-coachmark-popover>

        <md-coachmark-popover
          placement="left"
          headerIconName="room-lights-bold"
          header="Tip Name"
          message="Promote the feature, add some delight 🎉 and let the user know any top level information but don’t be instructional or technical. Max 4 lines of copy."
          primaryButton="Got it"
          secondaryButton="Dismiss"
          ?show=${this.thirdOpen}
          @primary-button-action=${() => (this.thirdOpen = false)}
          @secondary-button-action=${() => (this.thirdOpen = false)}
          @coachmark-close=${() => (this.thirdOpen = false)}
        >
          <md-button hasRemoveStyle circle @button-click=${this.openThirdCoach}>
            <md-avatar newMomentum size="32" title="Avatar" type="active"></md-avatar>
          </md-button>
        </md-coachmark-popover>

        <md-coachmark-popover
          placement="right"
          header="Change your interaction preferences"
          primaryButton="Got it"
          secondaryButton="Dismiss"
          ?show=${this.fourthOpen}
          @primary-button-action=${() => (this.fourthOpen = false)}
          @secondary-button-action=${() => (this.fourthOpen = false)}
          @coachmark-close=${() => (this.fourthOpen = false)}
        >
          <div slot="coachmark-content">
            <span>Come here to adjust your call and team details anytime.</span>
          </div>
          <md-button hasRemoveStyle circle @button-click=${this.openFourthCoach}>
            <md-avatar newMomentum size="32" title="Avatar" type="active"></md-avatar>
          </md-button>
        </md-coachmark-popover>
      </div>
      <br />
      <br />
      <div class="popover-trigger-element-container">
        <md-popover placement="bottom">
          <md-button slot="triggerElement" class="popover-button" variant="primary" size="32">Click</md-button>
          <div class="popoverContent">
            <span>Lorem ipsum dolor site ate aetns ctetuer.</span>
          </div>
        </md-popover>

        <md-popover placement="bottom" trigger="mouseenter">
          <md-button slot="triggerElement" class="popover-button" variant="primary" size="32">Hover</md-button>
          <div class="popoverContent">
            <span>Lorem ipsum dolor site ate aetns ctetuer.</span>
          </div>
        </md-popover>

        <md-popover placement="bottom" trigger="focus">
          <md-button slot="triggerElement" class="popover-button" variant="primary" size="32">Focus</md-button>
          <div class="popoverContent">
            <span>Lorem ipsum dolor site ate aetns ctetuer.</span>
          </div>
        </md-popover>

        <md-popover placement="bottom" trigger="focus mouseenter">
          <md-button slot="triggerElement" class="popover-button" variant="primary" size="32">Focus Hover</md-button>
          <div class="popoverContent">
            <span>Lorem ipsum dolor site ate aetns ctetuer.</span>
          </div>
        </md-popover>
      </div>
    `;
  }
}

export const popoverTemplate = html`
  <div class="row md-margin__bottom"><h3>md-coachmark-popover</h3></div>
  <popover-template-sandbox></popover-template-sandbox>
`;
