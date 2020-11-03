/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Key } from "@/constants";
import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement, property, TemplateResult } from "lit-element";
import { nothing } from "lit-html";
import "../avatar/Avatar";
import "../button/Button";
import "../icon/Icon";
import { templateHTML } from "./CompositeAvatar";
import styles from "./scss/module.scss";

@customElement("md-meeting-alert")
export class MeetingAlert extends LitElement {
  @property({ type: Array }) attendees = [{ title: "Attendee", src: null, alt: "Attendee" }];
  @property({ type: String }) closeAriaLabel = "close";
  @property({ attribute: false }) onKeyDown: MeetingAlert["handleKeyDown"] | null = null;
  @property({ attribute: false }) onSnooze: MeetingAlert["handleSnooze"] | null = null;
  @property({ type: String }) message = "";
  @property({ type: String }) snoozeAriaLabel = "snooze";
  @property({ type: String }) role: HTMLElementRole = "button";
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
      onKeyDown,
      snoozeAriaLabel: remindAriaLabel
    } = this;

    const renderAvatar = (): TemplateResult => {
      if (attendees.length >= 2) {
        return templateHTML(attendees);
      } else {
        return html`
          <md-avatar title=${title} src=${src} tabindex="-1"></md-avatar>
        `;
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
              <slot name="custom-avatar">
                ${renderAvatar()}
              </slot>
              <div class=${`md-alert__content ${onSnooze ? "" : " md-alert__content--wide"}`}>
                <div class="md-alert__title" title=${title}>
                  ${title}
                </div>
                <div class="md-alert__status" title=${status}>
                  ${status}
                </div>
                <div class="md-alert__message" title=${message}>
                  ${message}
                </div>
              </div>
              ${onSnooze
                ? html`
                    <div class="md-alert__button">
                      <md-button
                        aria-label=${remindAriaLabel}
                        circle
                        @click=${(e: Event) => {
                          this.handleSnooze(e);
                        }}
                        .size=${40}
                        role=${role}
                      >
                        <md-icon name="icon-alarm_16"></md-icon>
                      </md-button>
                    </div>
                  `
                : nothing}
              <slot name="custom-action">
                <md-button
                  class="md-alert__button"
                  aria-label=${closeAriaLabel}
                  circle
                  @click=${(e: Event) => {
                    this.handleClose(e);
                  }}
                  .size=${40}
                  role=${role}
                >
                  <md-icon name="icon-cancel_16"></md-icon>
                </md-button>
              </slot>
            </div>
          `
        : nothing}
    `;
  }
}

type HTMLElementRole =
  | "alert"
  | "alertdialog"
  | "button"
  | "checkbox"
  | "dialog"
  | "gridcell"
  | "link"
  | "log"
  | "marquee"
  | "menuitem"
  | "menuitemcheckbox"
  | "menuitemradio"
  | "option"
  | "progressbar"
  | "radio"
  | "scrollbar"
  | "searchbox"
  | "slider"
  | "spinbutton"
  | "status"
  | "switch"
  | "tab"
  | "tabpanel"
  | "textbox"
  | "timer"
  | "tooltip"
  | "treeitem"
  | "combobox"
  | "grid"
  | "listbox"
  | "menu"
  | "menubar"
  | "radiogroup"
  | "tablist"
  | "tree"
  | "treegrid"
  | "application"
  | "article"
  | "cell"
  | "columnheader"
  | "definition"
  | "directory"
  | "document"
  | "feed"
  | "figure"
  | "group"
  | "heading"
  | "img"
  | "list"
  | "listitem"
  | "math"
  | "none"
  | "note"
  | "presentation"
  | "region"
  | "row"
  | "rowgroup"
  | "rowheader"
  | "separator"
  | "table"
  | "term"
  | "text"
  | "toolbar"
  | "banner"
  | "complementary"
  | "contentinfo"
  | "form"
  | "main"
  | "navigation"
  | "region"
  | "search"
  | "doc-abstract"
  | "doc-acknowledgments"
  | "doc-afterword"
  | "doc-appendix"
  | "doc-backlink"
  | "doc-biblioentry"
  | "doc-bibliography"
  | "doc-biblioref"
  | "doc-chapter"
  | "doc-colophon"
  | "doc-conclusion"
  | "doc-cover"
  | "doc-credit"
  | "doc-credits"
  | "doc-dedication"
  | "doc-endnote"
  | "doc-endnotes"
  | "doc-epigraph"
  | "doc-epilogue"
  | "doc-errata"
  | "doc-example"
  | "doc-footnote"
  | "doc-foreword"
  | "doc-glossary"
  | "doc-glossref"
  | "doc-index"
  | "doc-introduction"
  | "doc-noteref"
  | "doc-notice"
  | "doc-pagebreak"
  | "doc-pagelist"
  | "doc-part"
  | "doc-preface"
  | "doc-prologue"
  | "doc-pullquote"
  | "doc-qna"
  | "doc-subtitle"
  | "doc-tip"
  | "doc-toc";

declare global {
  interface HTMLElementTagNameMap {
    "md-meeting-alert": MeetingAlert;
  }
}
