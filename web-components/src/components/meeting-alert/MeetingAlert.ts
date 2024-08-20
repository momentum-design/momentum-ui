/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/avatar/Avatar";
import "@/components/button/Button";
import "@/components/icon/Icon";
import { Key } from "@/constants";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, property, TemplateResult } from "lit-element";
import { nothing } from "lit-html";
import { templateHTML } from "./CompositeAvatar"; // Keep type import as a relative path
import styles from "./scss/module.scss";

export const MeetingAlertRole = [
  "alert",
  "alertdialog",
  "button",
  "checkbox",
  "dialog",
  "link",
  "option",
  "status"
] as const;

export namespace MeetingAlert {
  export type Role = (typeof MeetingAlertRole)[number];

  @customElementWithCheck("md-meeting-alert")
  export class ELEMENT extends LitElement {
    @property({ type: Array }) attendees = [{ title: "Attendee", src: null, alt: "Attendee" }];
    @property({ type: String }) closeAriaLabel = "close";
    @property({ attribute: false }) onKeyDown: MeetingAlert.ELEMENT["handleKeyDown"] | null = null;
    @property({ attribute: false }) onSnooze: MeetingAlert.ELEMENT["handleSnooze"] | null = null;
    @property({ type: String }) message = "";
    @property({ type: String }) snoozeAriaLabel = "snooze";
    @property({ type: String }) role: Role = "button";
    @property({ type: Boolean }) show = false;
    @property({ type: String }) src = "";
    @property({ type: String }) status = "";
    @property({ type: String }) userStyles = "";
    @property({ type: String }) title = "";

    _onSnooze = (e: Event) => {
      this.dispatchEvent(
        new CustomEvent("snooze", {
          composed: true,
          detail: {
            srcEvent: e
          }
        })
      );
    };

    _onClose = (e: Event) => {
      this.dispatchEvent(
        new CustomEvent("close", {
          composed: true,
          detail: {
            srcEvent: e
          }
        })
      );
    };

    handleSnooze = (e: Event) => {
      this.onSnooze ? this.onSnooze(e) : this._onSnooze(e);
      e.stopPropagation();
    };

    handleClose = (e: Event) => {
      this._onClose(e);
      e.stopPropagation();
    };

    handleKeyDown = (e: KeyboardEvent): void => {
      if (e.code === Key.Escape) {
        this.handleClose(e);
      }
      if (e.code === Key.Enter || e.code === Key.Space) {
        const target = e.target as Element;
        switch (target.attributes.getNamedItem("aria-label")!.value) {
          case "close":
            this.handleClose(e);
            break;
          case "snooze":
            this.handleSnooze(e);
            break;
          default:
            break;
        }
        e.preventDefault();
      }
      if (this.onKeyDown) this.onKeyDown(e);
    };

    getStyles() {
      return html`
        <style>
          ::slotted(img) {
            display: inline-block;
            vertical-align: middle;
            -ms-interpolation-mode: bicubic;
            height: auto;
            max-width: 100%;
            border-style: none;
          }
          ${this.userStyles}
        </style>
      `;
    }

    static get styles() {
      return [reset, styles];
    }

    render(): TemplateResult {
      const {
        attendees,
        message,
        onSnooze,
        role,
        src,
        status,
        title,
        closeAriaLabel,
        show,
        snoozeAriaLabel: remindAriaLabel
      } = this;

      const renderAvatar = (): TemplateResult => {
        if (attendees.length >= 2) {
          return templateHTML(attendees);
        } else {
          return html` <md-avatar title=${title} label="avatar" src=${src} tabindex="-1"></md-avatar> `;
        }
      };

      return html`
        ${this.getStyles()}
        ${show
          ? html`
              <div
                aria-label="Meeting Alert"
                class=${`md-alert md-alert--meeting`}
                @keydown=${(e: KeyboardEvent) => this.handleKeyDown(e)}
                role=${role}
              >
                <slot name="custom-avatar"> ${renderAvatar()} </slot>
                <div class=${`md-alert__content ${onSnooze ? "" : " md-alert__content--wide"}`}>
                  <div class="md-alert__title" title=${title}>${title}</div>
                  <div class="md-alert__status" title=${status}>${status}</div>
                  <div class="md-alert__message" title=${message}>${message}</div>
                </div>
                ${onSnooze
                  ? html`
                      <div class="md-alert__button">
                        <md-button
                          variant="secondary"
                          aria-label=${remindAriaLabel}
                          circle
                          @click=${(e: Event) => {
                            this.handleSnooze(e);
                          }}
                          .size=${40}
                        >
                          <md-icon name="icon-alarm_16"></md-icon>
                        </md-button>
                      </div>
                    `
                  : nothing}
                <slot name="custom-action">
                  <md-button
                    class="md-alert__button"
                    variant="ghost"
                    ariaLabel=${closeAriaLabel}
                    circle
                    @click=${(e: Event) => {
                      this.handleClose(e);
                    }}
                    .size=${40}
                  >
                    <md-icon name="cancel-bold" size="16" iconSet="momentumDesign"></md-icon>
                  </md-button>
                </slot>
              </div>
            `
          : nothing}
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-meeting-alert": MeetingAlert.ELEMENT;
  }
}
