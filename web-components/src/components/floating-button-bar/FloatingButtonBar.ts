import "@/components/button/Button";
import "@/components/icon/Icon";
import "@/components/tooltip/Tooltip";
import { customElement, html, LitElement, property } from "lit-element";
import { nothing, TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined";
import styles from "./scss/floating-button-bar.styles.scss";

export type FloatingButtonActionGroup = {
  actions: Array<FloatingButtonBarAction>;
};

export type FloatingButtonBarAction = {
  label: string;
  icon?: string;
  isIconOnly: boolean;
  iconAlign?: "left" | "right";
  action: () => void;
};

@customElement("md-floating-button-bar")
export class FloatingButtonBar extends LitElement {
  @property({ type: String })
  leadingLabel: string = "";

  @property({ type: String })
  closeButtonAriaLabel?: string = "";

  @property({ type: Boolean })
  showCloseButton: boolean = true;

  @property({ type: Array })
  actions: Array<FloatingButtonActionGroup> = [];

  static get styles() {
    return [styles];
  }

  private onCancelButttonAction() {
    this.dispatchEvent(
      new CustomEvent("cancel-button-action", {
        composed: true,
        bubbles: true
      })
    );
  }

  private get closeButtonTemplate() {
    return html`
      <md-tooltip
        message="${ifDefined(this.closeButtonAriaLabel)}"
        ?disabled=${!this.closeButtonAriaLabel}
        placement="top"
      >
        <md-button
          class="button cancel"
          circle
          size="20"
          variant="ghostInheritTextColor"
          ariaLabel=${ifDefined(this.closeButtonAriaLabel)}
          @button-click=${() => this.onCancelButttonAction()}
        >
          <md-icon slot="icon" iconSet="momentumDesign" name="cancel-bold" size="16"></md-icon>
        </md-button>
      </md-tooltip>
    `;
  }

  private getPrimaryLabelTemplate(label: string) {
    return html` <span class="label primary">${label}</span> `;
  }

  private getSecondaryLabelTemplate(label: string) {
    return html` <span class="label secondary">${label}</span> `;
  }

  private get separatorTemplate() {
    return html` <div class="separator"></div> `;
  }

  private getIconTemplate(action: FloatingButtonBarAction): TemplateResult | typeof nothing {
    return html`${action.icon
      ? html`<md-icon slot="icon" iconSet="momentumDesign" name=${action.icon} size="16"></md-icon>`
      : nothing}`;
  }

  private getPillButtonTemplate(action: FloatingButtonBarAction) {
    return html`
      <md-button class="button pill" size="24" variant="inverted-ghost" @button-click=${() => action.action()}>
        ${this.getIconTemplate(action)} ${this.getPrimaryLabelTemplate(action.label)}
      </md-button>
    `;
  }

  private getCircleButtonTemplate(action: FloatingButtonBarAction) {
    return html`
      <md-button class="button" circle size="24" variant="inverted-secondary" @button-click=${() => action.action()}>
        ${this.getIconTemplate(action)}
      </md-button>
    `;
  }

  private getTooltipCircleButtonTemplate(action: FloatingButtonBarAction) {
    return html`
      <md-tooltip message="${action.label}" placement="top"> ${this.getCircleButtonTemplate(action)} </md-tooltip>
    `;
  }

  private getActionAndLabelTemplate(action: FloatingButtonBarAction) {
    const iconAlign = action.iconAlign ?? "right";

    return html`
      ${iconAlign === "left"
        ? html`${this.getCircleButtonTemplate(action)} ${this.getPrimaryLabelTemplate(action.label)}`
        : html`${this.getPrimaryLabelTemplate(action.label)} ${this.getCircleButtonTemplate(action)}`}
    `;
  }

  private getActionTemplate(action: FloatingButtonBarAction) {
    return action.isIconOnly ? this.getTooltipCircleButtonTemplate(action) : this.getPillButtonTemplate(action);
  }

  private getActionGroupTemplate(actionGroup: FloatingButtonActionGroup) {
    return html` ${this.separatorTemplate} ${actionGroup.actions.map((action) => this.getActionTemplate(action))} `;
  }

  render() {
    return html`
      ${this.showCloseButton ? this.closeButtonTemplate : nothing} ${this.getSecondaryLabelTemplate(this.leadingLabel)}
      ${this.actions.map((actionGroup) => this.getActionGroupTemplate(actionGroup))}
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "md-floating-button-bar": FloatingButtonBar;
  }
}
