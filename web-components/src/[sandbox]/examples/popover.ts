import "@/components/avatar/Avatar";
import "@/components/button/Button";
import "@/components/coachmark-popover/CoachmarkPopover";
import "@/components/icon/Icon";
import "@/components/popover/Popover";
import { PopoverController } from "@/components/popover/Popover";
import "@/components/radio/Radio";
import "@/components/radio/RadioGroup";
import "@/components/tooltip/Tooltip";
import { css, customElement, html, internalProperty, LitElement } from "lit-element";
import { repeat } from "lit-html/directives/repeat";
@customElement("popover-template-sandbox")
export class PopoverTemplateSandbox extends LitElement {
  @internalProperty()
  private firstOpen = false;

  @internalProperty()
  private secondOpen = false;

  @internalProperty()
  private thirdOpen = false;

  @internalProperty()
  private fourthOpen = false;

  @internalProperty()
  private isButtonWithTooltipPopoverOpen = false;

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

  private popoverController = new PopoverController();

  private sortOptions = [
    { sortLabel: "Sort by name", sortValue: "name" },
    { sortLabel: "Sort by date", sortValue: "date" },
    { sortLabel: "Sort by size", sortValue: "size" }
  ];

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
          triggerID="coachmark-popover1"
          header="Change your interaction preferences"
          primaryButton="Got it"
          secondaryButton="Dismiss"
          ?show=${this.firstOpen}
          @primary-button-action=${() => (this.firstOpen = false)}
          @secondary-button-action=${() => (this.firstOpen = false)}
          @coachmark-close=${() => (this.firstOpen = false)}
        >
          <md-button
            slot="trigger"
            id="coachmark-popover1"
            style="width:32px; height:32px;"
            hasRemoveStyle
            circle
            @button-click=${this.openFirstCoach}
          >
            <md-avatar newMomentum size="32" title="Avatar" type="active"></md-avatar>
          </md-button>
          <div slot="coachmark-content">
            <span>Come here to adjust your call and team details anytime.</span>
          </div>
        </md-coachmark-popover>

        <md-coachmark-popover
          placement="top"
          header="Change your interaction preferences"
          triggerID="coachmark-popover2"
          primaryButton="Got it"
          secondaryButton="Dismiss"
          ?show=${this.secondOpen}
          @primary-button-action=${() => (this.secondOpen = false)}
          @secondary-button-action=${() => (this.secondOpen = false)}
          @coachmark-close=${() => (this.secondOpen = false)}
        >
          <md-button slot="trigger" id="coachmark-popover2" hasRemoveStyle circle @button-click=${this.openSecondCoach}>
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
          triggerID="coachmark-popover3"
          message="Promote the feature, add some delight 🎉 and let the user know any top level information but don’t be instructional or technical. Max 4 lines of copy."
          primaryButton="Got it"
          secondaryButton="Dismiss"
          ?show=${this.thirdOpen}
          @primary-button-action=${() => (this.thirdOpen = false)}
          @secondary-button-action=${() => (this.thirdOpen = false)}
          @coachmark-close=${() => (this.thirdOpen = false)}
        >
          <md-button slot="trigger" id="coachmark-popover3" hasRemoveStyle circle @button-click=${this.openThirdCoach}>
            <md-avatar newMomentum size="32" title="Avatar" type="active"></md-avatar>
          </md-button>
        </md-coachmark-popover>

        <md-coachmark-popover
          placement="right"
          header="Change your interaction preferences"
          primaryButton="Got it"
          triggerID="coachmark-popover4"
          secondaryButton="Dismiss"
          ?show=${this.fourthOpen}
          @primary-button-action=${() => (this.fourthOpen = false)}
          @secondary-button-action=${() => (this.fourthOpen = false)}
          @coachmark-close=${() => (this.fourthOpen = false)}
        >
          <md-button slot="trigger" id="coachmark-popover4" hasRemoveStyle circle @button-click=${this.openFourthCoach}>
            <md-avatar newMomentum size="32" title="Avatar" type="active"></md-avatar>
          </md-button>
          <div slot="coachmark-content">
            <span>Come here to adjust your call and team details anytime.</span>
          </div>
        </md-coachmark-popover>
      </div>
      <br />
      <br />

      <div class="popover-trigger-element-container">
        <md-button id="popover-1" class="popover-button" variant="primary" size="32">Click</md-button>
        <md-popover strategy="fixed" hide-on-outside-click placement="bottom" show-arrow triggerID="popover-1">
          <div class="popoverContent">
            <span>Lorem ipsum dolor site ate aetns ctetuer.</span>
          </div>
        </md-popover>

        <md-button id="popover-2" class="popover-button" variant="primary" size="32">Hover</md-button>
        <md-popover placement="bottom" show-arrow triggerID="popover-2" trigger="mouseenter">
          <div class="popoverContent">
            <span>Lorem ipsum dolor site ate aetns ctetuer.</span>
          </div>
        </md-popover>

        <md-button id="popover-3" class="popover-button" variant="primary" size="32">Focus</md-button>
        <md-popover triggerID="popover-3" show-arrow placement="bottom" trigger="focusin">
          <div class="popoverContent">
            <span>Lorem ipsum dolor site ate aetns ctetuer.</span>
          </div>
        </md-popover>

        <md-button id="popover-4" class="popover-button" variant="primary" size="32">Focus Hover</md-button>
        <md-popover triggerID="popover-4" show-arrow placement="bottom" trigger="mouseenter" delay="500, 0">
          <div class="popoverContent">
            <span>Lorem ipsum dolor site ate aetns ctetuer.</span>
          </div>
        </md-popover>
      </div>

      <h3>append to theme for when in a container with hidden overflow and fixed doesn't work</h3>

      <div style="width: 100px; overflow: hidden; margin-top: 12px;">
        <md-tooltip message="Tooltip message" placement="top" ?disabled=${this.isButtonWithTooltipPopoverOpen}>
          <md-button id="sort-button" circle variant="secondary" size="28" ariaLabel="Sort">
            <md-icon slot="icon" iconSet="momentumDesign" name="unsorted-bold" size="16" ariaHidden="true"></md-icon>
            <span slot="text">Sort</span>
          </md-button>
        </md-tooltip>
        <md-popover
          placement="bottom"
          triggerID="sort-button"
          trigger="click"
          hide-on-escape
          interactive
          show-arrow
          hide-on-outside-click
          focus-trap
          focus-back-to-trigger
          @shown=${() => {
            this.isButtonWithTooltipPopoverOpen = true;
          }}
          @hidden=${() => {
            this.isButtonWithTooltipPopoverOpen = false;
          }}
        >
          <md-radiogroup checked="0">
            ${repeat(
              this.sortOptions,
              (item) => item.sortValue,
              (item) => html`<md-radio slot="radio" value=${item.sortValue}> ${item.sortLabel} </md-radio>`
            )}
          </md-radiogroup>
        </md-popover>
      </div>

      <div style="width: 100px; overflow: hidden; margin-top: 12px;">
        <md-button id="append-to-popover-2" circle variant="secondary" size="28" ariaLabel="Sort">
          <md-icon slot="icon" iconSet="momentumDesign" name="unsorted-bold" size="16" ariaHidden="true"></md-icon>
          <span slot="text">Sort</span>
        </md-button>
        <md-popover
          placement="right"
          triggerID="append-to-popover-2"
          trigger="click"
          append-to="app-theme"
          hide-on-escape
          interactive
          show-arrow
          hide-on-outside-click
          focus-trap
          focus-back-to-trigger
          .controller=${this.popoverController}
        >
          <div style="width: 400px; height: 200px;">
            <md-button @click="${() => this.popoverController.hide()}">Assign to me</md-button>
            <md-button id="nested-copy">copy</md-button>
            <span>information text</span>
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
