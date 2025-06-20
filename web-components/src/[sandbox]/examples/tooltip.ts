import "@/components/button/Button";
import "@/components/icon/Icon";
import "@/components/tooltip/Tooltip";
import { Tooltip } from "@/components/tooltip/Tooltip";
import { css, customElement, html, LitElement, property, query } from "lit-element";

@customElement("tooltip-message-template-sandbox")
export class TooltipMessageTemplateSandbox extends LitElement {
  @property({ type: Boolean }) isClicked = false;

  private handleClick() {
    this.isClicked = !this.isClicked;
  }

  render() {
    return html`
      <md-tooltip placement="top" message=${this.isClicked ? "Copied" : "Copy"}>
        <md-button
          type="button"
          circle
          size="28"
          variant=${this.isClicked ? "green" : "secondary"}
          @click=${this.handleClick}
        >
          <md-icon name=${this.isClicked ? "icon-copy_16" : "icon-mouse-cursor_16"}></md-icon
        ></md-button>
      </md-tooltip>
    `;
  }
}

@customElement("tooltip-slot-template-sandbox")
export class TooltipTemplateSandbox extends LitElement {
  @property({ type: Boolean }) isClicked = false;

  private handleClick() {
    this.isClicked = !this.isClicked;
  }

  render() {
    return html`
      <md-tooltip placement="top">
        ${this.isClicked
          ? html` <md-icon slot="tooltip-content" name="icon-copy_16"></md-icon> `
          : html` <md-icon slot="tooltip-content" name="icon-mouse-cursor_16"></md-icon> `}
        <md-button
          type="button"
          circle
          size="28"
          variant=${this.isClicked ? "green" : "red"}
          @click=${this.handleClick}
        >
          <md-icon name="icon-alert-active_16"></md-icon>
        </md-button>
      </md-tooltip>
    `;
  }
}

@customElement("tooltip-disconnected-sandbox")
export class TooltipDisconnectedSandbox extends LitElement {
  @property({ type: Boolean }) isClicked = false;

  @query(".container") container!: HTMLDivElement;
  @query("md-tooltip") tooltip!: Tooltip.ELEMENT;

  private handleClick() {
    this.tooltip.remove();
  }

  static get styles() {
    return css`
      md-tooltip {
        position: absolute;
      }
    `;
  }

  render() {
    return html`
      <md-tooltip placement="top" message="You can remove tooltip by clicking button">
        <md-button type="button" color="mint" size="36" @click=${this.handleClick}> Remove Trigger Button </md-button>
      </md-tooltip>
    `;
  }
}

@customElement("tooltip-animation-sandbox")
export class TooltipAnimationSandbox extends LitElement {
  @property({ type: Boolean, reflect: true }) moved = false;

  static get styles() {
    return css`
      .wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
      }
      .container {
        position: relative;
        display: flex;
        gap: 20px;
        border: 1px dashed #ccc;
        padding: 20px;
        width: fit-content;
        transition: transform 0.5s ease-in-out;
        transform: translateX(0);
      }
      .container.moved {
        transform: translateX(200px);
      }
    `;
  }

  private toggleMove() {
    this.moved = !this.moved;
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="container ${this.moved ? "moved" : ""}">
          <md-tooltip message="I should move with the button.">
            <md-button @click=${this.toggleMove}>Button 1</md-button>
          </md-tooltip>
          <md-tooltip message="I should also move with the button.">
            <md-button>Button 2</md-button>
          </md-tooltip>
        </div>
      </div>
    `;
  }
}

export const tooltipTemplate = html`
  <div class="row md-margin__bottom"><h3>md-tooltip</h3></div>
  <div class="row md-padding__vertical">
    <md-tooltip message="Tooltip Tooltip Tooltip v Tooltip v Tooltip">
      <md-button variant="secondary">Tooltip Default</md-button>
    </md-tooltip>
  </div>
  <div class="row md-padding__vertical">
    <md-tooltip message="Tooltip" placement="right">
      <md-button variant="secondary">Tooltip Right</md-button>
    </md-tooltip>
    <md-tooltip message="Long Tooltip Long Tooltip Long Tooltip Long Tooltip Long Tooltip" placement="left">
      <md-button variant="secondary">Tooltip left</md-button>
    </md-tooltip>
  </div>
  <div class="row md-padding__vertical">
    <md-tooltip message="Tooltip" placement="top">
      <md-button variant="secondary">Tooltip Top</md-button>
    </md-tooltip>
  </div>
  <div class="row md-padding__vertical">
    <md-tooltip message="Tooltip" placement="bottom">
      <md-button variant="secondary">Tooltip Bottom</md-button>
    </md-tooltip>
  </div>
  <div class="row md-padding__vertical">
    <md-tooltip message="Tooltip" placement="left">
      <md-button variant="secondary">Tooltip Left</md-button>
    </md-tooltip>
  </div>
  <div class="row md-padding__vertical">
    <md-tooltip message="Long Tooltip Long Tooltip Long Tooltip Long Tooltip Long Tooltip" placement="right">
      <md-button variant="secondary">Tooltip Right</md-button>
    </md-tooltip>
  </div>
  <div class="row md-padding__vertical">
    <md-tooltip placement="right">
      <div slot="tooltip-content"><md-icon style="margin-right: .5rem" name="headset_12"></md-icon> Call</div>
      <md-button variant="secondary">Tooltip Slot Content</md-button>
    </md-tooltip>
  </div>
  <div class="row md-padding__vertical">
    <tooltip-message-template-sandbox></tooltip-message-template-sandbox>
  </div>
  <div class="row md-padding__vertical">
    <tooltip-slot-template-sandbox></tooltip-slot-template-sandbox>
  </div>
  <div class="row md-padding__vertical">
    <tooltip-disconnected-sandbox></tooltip-disconnected-sandbox>
  </div>
  <div class="row md-padding__vertical">
    <div class="row md-margin__bottom">
      <h3>Tooltip with Animated Trigger</h3>
      <p>The tooltip should follow the button when it moves, but it gets left behind.</p>
    </div>
    <tooltip-animation-sandbox></tooltip-animation-sandbox>
  </div>
`;
