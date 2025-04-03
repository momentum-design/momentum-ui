/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/button/Button";
import "@/components/icon/Icon";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import styles from "./scss/module.scss";

export enum CardAiVariant {
  USER_QUERY = "user_query",
  RESPONSE = "response"
}

export namespace CardAi {
  @customElementWithCheck("md-card-ai")
  export class ELEMENT extends LitElement {
    @property({ type: String }) id = "";
    @property({ type: String }) title = "";
    @property({ type: String }) cardText = "";
    @property({ type: String }) timestamp = "";
    @property({ type: Boolean }) summariseMoreVisible = false;
    @property({ type: String }) variant: CardAiVariant = CardAiVariant.RESPONSE;
    @state() private copyChecked = false;
    @state() private thumbsUpChecked = false;
    @state() private thumbsDownChecked = false;

    static get styles() {
      return [reset, styles];
    }

    thumbsUpToggled() {
      this.thumbsDownChecked = false;
      this.thumbsUpChecked = !this.thumbsUpChecked;
      this.dispatchEvent(
        new CustomEvent<{ id: string }>("thumbs-up-toggled", { detail: { id: this.id }, bubbles: true, composed: true })
      );
    }

    thumbsDownToggled() {
      this.thumbsUpChecked = false;
      this.thumbsDownChecked = !this.thumbsDownChecked;
      this.dispatchEvent(
        new CustomEvent<{ id: string }>("thumbs-down-toggled", {
          detail: { id: this.id },
          bubbles: true,
          composed: true
        })
      );
    }

    summariseMoreToggled() {
      this.dispatchEvent(
        new CustomEvent<{ id: string }>("summarise-more-toggled", {
          detail: { id: this.id },
          bubbles: true,
          composed: true
        })
      );
    }

    private copyToggled() {
      navigator.clipboard.writeText(this.cardText);
      this.copyChecked = true;
      setTimeout(() => {
        this.copyChecked = false;
      }, 2000);
    }

    private get bottomBorderRadiusClass(): string {
      return this.timestamp ? "with-bottom-border-radius" : "no-bottom-border-radius";
    }

    private get cardTextClassMap() {
      return {
        "md-card-ai-card-body-user-query": this.variant === CardAiVariant.USER_QUERY,
        [`md-card-ai-card-body-response-${this.bottomBorderRadiusClass}`]: this.variant === CardAiVariant.RESPONSE
      };
    }

    private renderHeader() {
      if (this.variant === CardAiVariant.RESPONSE && this.title !== "") {
        return html`
          <div class="md-card-ai-header">
            <slot name="card-header-aside">
              <md-icon name="cisco-ai-assistant-color" iconSet="momentumBrandVisuals"></md-icon>
            </slot>
            <div class="md-card-ai-header-title">
              <slot name="card-header-title">
                <h3>${this.title}</h3>
              </slot>
            </div>
          </div>
        `;
      }
      return nothing;
    }

    private renderCardText() {
      if (this.cardText !== "") {
        return html`
          <div class=${classMap(this.cardTextClassMap)}>
            <h3>${this.cardText}</h3>
            ${this.renderResponseCard()}
          </div>
        `;
      }
      return nothing;
    }

    private renderThumbsUpButton() {
      const thumbsUpButtonVariant = this.thumbsUpChecked ? "secondary" : "ghost";
      const thumbsUpAriaLabel = this.thumbsUpChecked ? "This is helpful, selected" : "This is helpful";

      return html`
        <div class="md-card-ai-thumbs-up">
          <md-button
            circle
            variant=${thumbsUpButtonVariant}
            size="28"
            ariaLabel=${thumbsUpAriaLabel}
            @click=${this.thumbsUpToggled}
          >
            <md-icon slot="icon" name="like-regular" iconSet="momentumDesign"></md-icon>
          </md-button>
        </div>
      `;
    }

    private renderThumbsDownButton() {
      const thumbsDownButtonVariant = this.thumbsDownChecked ? "secondary" : "ghost";
      const thumbsDownAriaLabel = this.thumbsDownChecked ? "This is not helpful, selected" : "This is not helpful";

      return html`
        <div>
          <md-button
            circle
            variant=${thumbsDownButtonVariant}
            size="28"
            ariaLabel=${thumbsDownAriaLabel}
            @click=${this.thumbsDownToggled}
          >
            <md-icon slot="icon" name="dislike-regular" iconSet="momentumDesign"></md-icon>
          </md-button>
        </div>
      `;
    }

    private renderCopyButton() {
      const copyButtonVariant = this.copyChecked ? "secondary" : "ghost";
      const copyAriaLabel = this.copyChecked ? "Copied, selected" : "Copy summary";

      return html`
        <div class="md-card-ai-copy-button-container">
          <md-button
            size="32"
            variant=${copyButtonVariant}
            ariaLabel=${copyAriaLabel}
            outline
            @click=${this.copyToggled}
          >
            <md-icon
              slot="icon"
              name=${this.copyChecked ? "check-regular" : "copy-regular"}
              iconSet="momentumDesign"
            ></md-icon>
            <span slot="text">${this.copyChecked ? "Copied" : "Copy"}</span>
          </md-button>
        </div>
      `;
    }

    private renderResponseCard() {
      const shouldRenderResponse = this.variant === CardAiVariant.RESPONSE && this.timestamp !== "";
      if (shouldRenderResponse) {
        return html`
          <div class="md-card-ai-divider"></div>
          <div class="md-card-ai-time-wrapper">
            <time class="md-card-ai-time" aria-hidden="true" datetime=${this.timestamp}> ${this.timestamp} </time>
            <span class="md-card-ai-dot-separator">&#8226;</span>
            <div class="md-card-ai-feedback">${this.renderThumbsUpButton()} ${this.renderThumbsDownButton()}</div>
            ${this.renderCopyButton()}
          </div>
        `;
      }
      return nothing;
    }

    private renderFooter() {
      const shouldRenderFooter = this.variant === CardAiVariant.RESPONSE && this.summariseMoreVisible;
      if (shouldRenderFooter) {
        return html`
          <div class="md-card-ai-footer">
            <md-button size="32" variant="ghost" outline @click=${this.summariseMoreToggled}>
              <span slot="text">Summarise more</span>
            </md-button>
          </div>
        `;
      }
      return nothing;
    }

    render() {
      return html`
        <div class="md-card-ai" id="${this.id}" part="card" tabindex="0">
          ${this.renderHeader()}
          <div class="content-margin">${this.renderCardText()} ${this.renderFooter()}</div>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-card-ai": CardAi.ELEMENT;
  }
}
