import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement } from "lit-element";
import styles from "./scss/module.scss";
import "@/components/icon/Icon";
import "@/components/button/Button";

@customElement("md-card")
export class Card extends LitElement {
  static get styles() {
    return [reset, styles];
  }

  render() {
    return html`
      <div class="md-card-container">
        <div class="md-card-header">
          <slot name="header">
            <md-avatar alt="avatar" label="avatar" title="Avatar Title"></md-avatar>
            <div class="md-card-header-title"></div>
            <div class="md-card-header-subtitle"></div>
            <div class="md-card-header-actions">
              <md-menu-overlay>
                <md-icon name="icon-more-adr_16" slot="menu-trigger"></md-icon>
                <md-list>
                  <md-list-item slot="list-item">One</md-list-item>
                  <md-list-item slot="list-item">Two</md-list-item>
                  <md-list-item slot="list-item">Free</md-list-item>
                  <md-list-item slot="list-item">Four</md-list-item>
                </md-list>
              </md-menu-overlay>
            </div>
          </slot>
        </div>
        <div class="md-card-content">
          <slot name="content"></slot>
        </div>
        <div class="md-card-footer">
          <slot name="footer">
            <div class="md-card-footer-container">
              <md-link color="blue">Link Text</md-link>
              <md-button variant="primary">Button</md-button>
            </div>
          </slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-card": Card;
  }
}
