import reset from "@/wc_scss/reset.scss";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { html, LitElement, property } from "lit-element";
import styles from "./scss/module.scss";
import "../icon/Icon";
import "../button/Button";
import { ifDefined } from "lit-html/directives/if-defined";

export namespace Card {
  @customElementWithCheck("md-card")
  export class ELEMENT extends LitElement {
    @property({ type: String }) title = "title";
    @property({ type: String }) subtitle = "";
    @property({ type: String }) src = "";
    @property({ type: String }) link = "";
    @property({ type: String }) linkTitle = "";
    @property({ type: String }) buttonTitle = "";

    static get styles() {
      return [reset, styles];
    }

    render() {
      return html`
        <div class="md-card" part="card">
          <div class="md-card-header">
            <slot name="header">
              <md-avatar alt="avatar" label="avatar" title=${this.title} src=${this.src}></md-avatar>
              <div class="md-card-header-title">
                <h3>${this.title}</h3>
                <h5>${this.subtitle}</h5>
              </div>
              <div class="md-card-header-actions">
                <md-menu-overlay placement="bottom-end">
                  <md-button variant="white" slot="menu-trigger" circle>
                    <md-icon slot="icon" name="icon-more-adr_16"></md-icon>
                  </md-button>
                  <md-list></md-list>
                </md-menu-overlay>
              </div>
            </slot>
          </div>
          <div class="md-card-content">
            <slot name="content"></slot>
          </div>
          <div class="md-card-footer">
            <slot name="footer">
              <md-link color="blue" href=${ifDefined(this.link || undefined)}>${this.linkTitle}</md-link>
              <md-button variant="primary">${this.buttonTitle}</md-button>
            </slot>
          </div>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-card": Card.ELEMENT;
  }
}
