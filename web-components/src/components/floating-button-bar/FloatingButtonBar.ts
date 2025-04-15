import "@/components/button/Button";
import "@/components/icon/Icon";
import { customElement, html, LitElement } from "lit-element";
import styles from "./scss/floating-button-bar.styles.scss";

@customElement("md-floating-button-bar")
export class FloatingButtonBar extends LitElement {
  static get styles() {
    return [styles];
  }

  private get closeButtonTemplate() {
    return html`
      <md-button class="button cancel" circle size="20" variant="ghostInheritTextColor">
        <md-icon slot="icon" iconSet="momentumDesign" name="cancel-bold" size="16"></md-icon>
      </md-button>
    `;
  }

  private getPrimaryLabelTemplate(label: string) {
    return html` <span class="primary-label">${label}</span> `;
  }

  private getSecondaryLabelTemplate(label: string) {
    return html` <span class="secondary-label">${label}</span> `;
  }

  private get separatorTemplate() {
    return html` <div class="floating-button-separator"></div> `;
  }

  private get submitButtonTemplate() {
    return html`
      <md-button class="button submit" circle size="24" variant="inverted-secondary">
        <md-icon slot="icon" iconSet="momentumDesign" name="arrow-tail-up-bold" size="16"></md-icon>
      </md-button>
    `;
  }

  render() {
    return html`
      ${this.closeButtonTemplate} ${this.getSecondaryLabelTemplate("# selected")} ${this.separatorTemplate}
      ${this.getPrimaryLabelTemplate("Assign to me")} ${this.submitButtonTemplate}
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "md-floating-button-bar": FloatingButtonBar;
  }
}
