import "@/components/button/Button";
import "@/components/icon/Icon.ts";
import "@/components/tooltip/Tooltip.ts";
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
          ? html`
              <md-icon slot="tooltip-content" name="icon-copy_16"></md-icon>
            `
          : html`
              <md-icon slot="tooltip-content" name="icon-mouse-cursor_16"></md-icon>
            `}
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
        <md-button type="button" color="mint" size="36" @click=${this.handleClick}>
          Remove Trigger Button
        </md-button>
      </md-tooltip>
    `;
  }
}

export const tooltipTemplate = html`
  <div class="row md-margin__bottom"><h3>md-tooltip</h3></div>
  <div class="row md-padding__vertical">
    <md-tooltip message="Tooltip Tooltip Tooltip v Tooltip v Tooltip">
      <md-button>Tooltip Default</md-button>
    </md-tooltip>
  </div>
  <div class="row md-padding__vertical">
    <md-tooltip message="Tooltip" placement="right">
      <md-button>Tooltip Right</md-button>
    </md-tooltip>
    <md-tooltip message="Tooltip" placement="right">
      <md-button>Tooltip Right</md-button>
    </md-tooltip>
  </div>
  <div class="row md-padding__vertical">
    <md-tooltip message="Tooltip" placement="top">
      <md-button>Tooltip Top</md-button>
    </md-tooltip>
  </div>
  <div class="row md-padding__vertical">
    <md-tooltip message="Tooltip" placement="bottom">
      <md-button>Tooltip Bottom</md-button>
    </md-tooltip>
  </div>
  <div class="row md-padding__vertical">
    <md-tooltip message="Tooltip" placement="left">
      <md-button>Tooltip Left</md-button>
    </md-tooltip>
  </div>
  <div class="row md-padding__vertical">
    <md-tooltip message="Tooltip" placement="right">
      <md-button>Tooltip Right</md-button>
    </md-tooltip>
  </div>
  <div class="row md-padding__vertical">
    <md-tooltip placement="right">
      <div slot="tooltip-content"><md-icon style="margin-right: .5rem" name="headset_12"></md-icon> Call</div>
      <md-button>Tooltip Slot Content</md-button>
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
`;
