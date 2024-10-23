import "@/components/avatar/Avatar";
import "@/components/button/Button";
import "@/components/coachmark-popover/CoachmarkPopover";
import "@/components/icon/Icon";
import { css, customElement, html, internalProperty, LitElement } from "lit-element";

@customElement("coachmark-popover-template-sandbox")
export class CoachTemplateSandbox extends LitElement {
  @internalProperty()
  private firstOpen = false;

  @internalProperty()
  private secondOpen = false;

  @internalProperty()
  private thirdOpen = false;

  @internalProperty()
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
          header="Change your interaction preferences"
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
          <div slot="coachmark-content">
            <span>Come here to adjust your call and team details anytime.</span>
          </div>
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

        <md-popover placement="bottom">
          <md-button slot="triggerElement" class="popover-button" variant="primary" size="32">Test</md-button>
          <div class="popoverContent">
            <span>text</span>
          </div>
        </md-popover>
      </div>
    `;
  }
}

export const coachmarkPopoverTemplate = html`
  <div class="row md-margin__bottom"><h3>md-coachmark-popover</h3></div>
  <coachmark-popover-template-sandbox></coachmark-popover-template-sandbox>
`;
