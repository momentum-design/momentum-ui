import reset from "@/wc_scss/reset.scss";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { html, internalProperty, LitElement, property } from "lit-element";
import styles from "./scss/module.scss";
import "@/components/icon/Icon";
import "@/components/button/Button";
import "@/components/list/List";
import "@/components/list/ListItem";
import "@/components/favorite/Favorite";
import { ifDefined } from "lit-html/directives/if-defined";
import { repeat } from "lit-html/directives/repeat";
import { classMap } from "lit-html/directives/class-map";
import { nothing } from "lit-html";

export namespace Card {
  type Option = { [key: string]: string };

  @customElementWithCheck("md-card")
  export class ELEMENT extends LitElement {
    @property({ type: String }) title = "title";
    @property({ type: String }) subtitle = "";
    @property({ type: String }) id = "";
    @property({ type: Boolean }) fullscreen = false;
    @property({ type: String }) info = "";
    @property({ type: String }) buttonTitle = "";
    @property({ type: Array }) menuOption: (string | Option)[] = [];

    @internalProperty() private full = false;

    static get styles() {
      return [reset, styles];
    }

    get cardClassMap() {
      return {
        "full-screen": this.full
      };
    }

    handleToggleExpandCollapse() {
      this.full = !this.full;
    }

    render() {
      return html`
        <div class="md-card ${classMap(this.cardClassMap)}" id="${this.id}" part="card">
          <div class="md-card-header">
            <slot name="header-icon">
              <md-favorite value="${`card-` + this.id}"></md-favorite>
            </slot>
            <div class="md-card-header-title">
              <h3>${this.title}</h3>
              <h5>${this.subtitle}</h5>
            </div>
            <div class="md-card-header-actions">
              ${this.info
                ? html`
                    <md-tooltip message="${this.info}" placement="bottom">
                      <md-button class="md-card-info-icon" color="color-none" size="size-none">
                        <md-icon slot="icon" name="info_16"></md-icon>
                      </md-button>
                    </md-tooltip>
                  `
                : nothing}
              ${this.fullscreen
                ? html`
                    <md-button
                      @button-click=${this.handleToggleExpandCollapse}
                      class="md-card-max-icon"
                      color="color-none"
                      size="size-none"
                    >
                      <md-icon slot="icon" name=${this.full ? "minimize_16" : "maximize_16"}></md-icon>
                    </md-button>
                  `
                : nothing}
              <md-menu-overlay class="md-card-menu" placement="bottom-end">
                <md-button class="md-card-menu-icon" color="color-none" size="size-none" slot="menu-trigger">
                  <md-icon slot="icon" name="more-adr_16"></md-icon>
                </md-button>
                <div class="md-card-menu-list-items" style="width: 100%;">
                  <md-list>
                    ${repeat(
                      this.menuOption,
                      (item, idx) =>
                        html`
                          <md-list-item class="${`menu-item-` + idx}" slot="list-item">${item}</md-list-item>
                        `
                    )}
                  </md-list>
                </div>
              </md-menu-overlay>
            </div>
          </div>
          <div class="md-card-content">
            <slot name="content"></slot>
          </div>
          <div class="md-card-footer">
            <slot name="footer"> </slot>
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
