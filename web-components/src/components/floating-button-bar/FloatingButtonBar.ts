import "@/components/button/Button";
import "@/components/icon/Icon";
import { customElement, html, LitElement, property } from "lit-element";
import { nothing } from "lit-html";
import styles from "./scss/floating-button-bar.styles.scss";

export type FloatingButtonBarAction = {
  label: string;
  icon: string;
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
  actions: Array<FloatingButtonBarAction> = [];

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
      <md-button
        class="button cancel"
        circle
        size="20"
        variant="ghostInheritTextColor"
        @button-click=${() => this.onCancelButttonAction()}
      >
        <md-icon slot="icon" iconSet="momentumDesign" name="cancel-bold" size="16"></md-icon>
      </md-button>
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

  private getPillButtonTemplate(action: FloatingButtonBarAction) {
    return html`
      <md-button class="button" size="28" variant="inverted-secondary" @button-click=${() => action.action()}>
        <md-icon slot="icon" iconSet="momentumDesign" name=${action.icon} size="16"></md-icon>
        ${this.getPrimaryLabelTemplate(action.label)}
      </md-button>
    `;
  }

  private getCircleButtonTemplate(action: FloatingButtonBarAction) {
    return html`
      <md-button class="button" circle size="24" variant="inverted-secondary" @button-click=${() => action.action()}>
        <md-icon slot="icon" iconSet="momentumDesign" name=${action.icon} size="16"></md-icon>
      </md-button>
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
    return action.isIconOnly ? this.getActionAndLabelTemplate(action) : this.getPillButtonTemplate(action);
  }

  render() {
    return html`
      ${this.showCloseButton ? this.closeButtonTemplate : nothing} ${this.getSecondaryLabelTemplate(this.leadingLabel)}
      ${this.actions.map((action) => html` ${this.separatorTemplate} ${this.getActionTemplate(action)} `)}
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "md-floating-button-bar": FloatingButtonBar;
  }
}
